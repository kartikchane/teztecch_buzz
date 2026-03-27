# TezTecch Buzz Backend

Backend API server for TezTecch Buzz website.

## Features

- Newsletter subscription endpoint
- Contact form submission
- CORS enabled for frontend integration
- Input validation
- Error handling

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Start the development server:
```bash
npm run dev
```

Or for production:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns server status

### Subscribe to Newsletter
- **POST** `/api/subscribe`
- Body: `{ "name": "string", "email": "string" }`
- Validates email format
- Checks for duplicate subscriptions

### Contact Form
- **POST** `/api/contact`
- Body: `{ "name": "string", "email": "string", "phone": "string", "organization": "string", "collaborationType": "string", "message": "string" }`

### Get Subscribers (Admin)
- **GET** `/api/subscribers`
- Returns all subscribers

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
NODE_ENV=development
```

## Running Both Frontend and Backend

1. Start the backend server (in one terminal):
```bash
cd backend
npm run dev
```

2. Start the frontend (in another terminal):
```bash
cd ..
npm run dev
```

The frontend will run on `http://localhost:5173` and connect to the backend on `http://localhost:5000`.
