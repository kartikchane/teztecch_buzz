// Migration Script: Local MongoDB → Atlas
// Usage: node migrateToAtlas.js "mongodb+srv://username:password@cluster0.eum9qca.mongodb.net/teztecch_buzz"

import mongoose from 'mongoose';

const LOCAL_URI = 'mongodb://localhost:27017/teztecch_buzz';
const ATLAS_URI = process.argv[2];

if (!ATLAS_URI) {
  console.error('❌ Atlas URI required!');
  console.error('Usage: node migrateToAtlas.js "mongodb+srv://username:password@cluster0.eum9qca.mongodb.net/teztecch_buzz"');
  process.exit(1);
}

async function migrate() {
  try {
    // Connect to local MongoDB
    console.log('🔗 Connecting to local MongoDB...');
    const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
    console.log('✅ Local MongoDB connected');

    // Connect to Atlas
    console.log('🔗 Connecting to Atlas...');
    const atlasConn = await mongoose.createConnection(ATLAS_URI).asPromise();
    console.log('✅ Atlas connected');

    // Get all collection names from local
    const collections = await localConn.db.listCollections().toArray();
    console.log(`\n📦 Found ${collections.length} collections to migrate:\n`);

    let totalDocs = 0;

    for (const col of collections) {
      const collName = col.name;
      
      // Read all documents from local
      const docs = await localConn.db.collection(collName).find({}).toArray();
      
      if (docs.length === 0) {
        console.log(`  ⏭️  ${collName}: 0 documents (skipped)`);
        continue;
      }

      // Drop existing collection on Atlas (if exists) to avoid duplicates
      try {
        await atlasConn.db.collection(collName).drop();
      } catch (e) {
        // Collection doesn't exist yet, that's fine
      }

      // Insert all documents to Atlas
      await atlasConn.db.collection(collName).insertMany(docs);
      console.log(`  ✅ ${collName}: ${docs.length} documents migrated`);
      totalDocs += docs.length;
    }

    // Also copy indexes
    console.log('\n📑 Copying indexes...');
    for (const col of collections) {
      const collName = col.name;
      const indexes = await localConn.db.collection(collName).indexes();
      
      for (const index of indexes) {
        if (index.name === '_id_') continue; // Skip default _id index
        try {
          const { key, ...options } = index;
          delete options.v;
          delete options.ns;
          await atlasConn.db.collection(collName).createIndex(key, options);
        } catch (e) {
          // Index might already exist
        }
      }
    }

    console.log(`\n🎉 Migration complete! ${totalDocs} total documents migrated across ${collections.length} collections.`);

    // Close connections
    await localConn.close();
    await atlasConn.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

migrate();
