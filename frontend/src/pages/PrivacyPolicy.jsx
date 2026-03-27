import React from 'react';
import { Link } from 'react-router-dom';
import './UtilityPages.css';

const PrivacyPolicy = () => {
  return (
    <div className="utility-page privacy-policy-page">
      <div className="page-hero policy-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p className="hero-subtitle">Your privacy is important to us</p>
          <p className="last-updated">Last updated: December 31, 2025</p>
        </div>
      </div>

      <div className="container">
        <div className="content-section policy-content">
          
          {/* Quick Navigation */}
          <div className="policy-nav">
            <h3>Quick Navigation</h3>
            <ul className="nav-list">
              <li><a href="#introduction">Introduction</a></li>
              <li><a href="#information-collection">Information We Collect</a></li>
              <li><a href="#information-use">How We Use Your Information</a></li>
              <li><a href="#data-sharing">Data Sharing & Disclosure</a></li>
              <li><a href="#data-security">Data Security</a></li>
              <li><a href="#cookies">Cookies & Tracking</a></li>
              <li><a href="#your-rights">Your Privacy Rights</a></li>
              <li><a href="#children">Children's Privacy</a></li>
              <li><a href="#changes">Changes to Policy</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          <section id="introduction" className="policy-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Teztecch Buzz ("we," "our," or "us"). We are committed to protecting 
              your personal information and your right to privacy. This Privacy Policy explains 
              what information we collect, how we use it, and what rights you have in relation 
              to it.
            </p>
            <p>
              If you have any questions or concerns about our policy or our practices regarding 
              your personal information, please contact us at{' '}
              <a href="mailto:privacy@teztecchbuzz.in">privacy@teztecchbuzz.in</a>.
            </p>
            <div className="info-box">
              <strong>📌 Key Points:</strong>
              <ul>
                <li>We collect minimal data necessary to provide our services</li>
                <li>We never sell your personal information to third parties</li>
                <li>You have control over your data and can request deletion at any time</li>
                <li>We use industry-standard security measures to protect your data</li>
              </ul>
            </div>
          </section>

          <section id="information-collection" className="policy-section">
            <h2>2. Information We Collect</h2>
            <p>
              We collect information that you provide to us directly, information we obtain 
              automatically when you use our website, and information from third-party sources.
            </p>
            
            <h3>2.1 Information You Provide to Us</h3>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, username when you create an account or subscribe to our newsletter</li>
              <li><strong>Contact Information:</strong> Email address, phone number when you contact us or fill out forms</li>
              <li><strong>Communication Data:</strong> Messages, feedback, or other communications you send to us</li>
              <li><strong>Content:</strong> Stories, comments, photos, videos you submit or upload to our platform</li>
              <li><strong>Payment Information:</strong> Billing details if you make purchases (processed securely through third-party payment processors)</li>
            </ul>

            <h3>2.2 Information Collected Automatically</h3>
            <ul>
              <li><strong>Device Information:</strong> Device type, operating system, browser type and version</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked, search queries</li>
              <li><strong>Location Data:</strong> Approximate location based on IP address</li>
              <li><strong>Cookies & Tracking Technologies:</strong> Information collected through cookies, web beacons, and similar technologies</li>
              <li><strong>Log Data:</strong> IP address, browser type, referring/exit pages, date/time stamps</li>
            </ul>

            <h3>2.3 Information from Third-Party Sources</h3>
            <ul>
              <li>Social media platforms if you connect your account or share our content</li>
              <li>Analytics providers to understand how our website is used</li>
              <li>Advertising partners for targeted marketing campaigns</li>
            </ul>
          </section>

          <section id="information-use" className="policy-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect for various purposes:</p>
            
            <h3>3.1 To Provide and Maintain Our Services</h3>
            <ul>
              <li>Deliver content and services you request</li>
              <li>Process newsletter subscriptions and send weekly digests</li>
              <li>Manage your account and preferences</li>
              <li>Respond to your inquiries and provide customer support</li>
            </ul>

            <h3>3.2 To Improve Our Services</h3>
            <ul>
              <li>Analyze usage patterns and user behavior</li>
              <li>Understand what content resonates with our audience</li>
              <li>Test new features and functionality</li>
              <li>Gather feedback to enhance user experience</li>
            </ul>

            <h3>3.3 To Communicate With You</h3>
            <ul>
              <li>Send newsletters and updates about our content</li>
              <li>Notify you about changes to our services or policies</li>
              <li>Send promotional materials and special offers (with your consent)</li>
              <li>Respond to your comments and questions</li>
            </ul>

            <h3>3.4 For Security and Legal Compliance</h3>
            <ul>
              <li>Detect, prevent, and address fraud and security issues</li>
              <li>Protect against malicious, deceptive, or illegal activity</li>
              <li>Comply with legal obligations and enforce our terms</li>
              <li>Protect the rights and safety of our users and the public</li>
            </ul>
          </section>

          <section id="data-sharing" className="policy-section">
            <h2>4. Data Sharing & Disclosure</h2>
            <p>We may share your information in the following circumstances:</p>

            <h3>4.1 Service Providers</h3>
            <p>
              We share data with third-party service providers who perform services on our behalf, 
              such as hosting, analytics, email delivery, and payment processing. These providers 
              are contractually obligated to protect your data.
            </p>

            <h3>4.2 Business Transfers</h3>
            <p>
              If we are involved in a merger, acquisition, or sale of assets, your information 
              may be transferred. We will notify you before your data is transferred and becomes 
              subject to a different privacy policy.
            </p>

            <h3>4.3 Legal Requirements</h3>
            <p>
              We may disclose your information if required to do so by law or in response to 
              valid requests by public authorities (e.g., court orders or government agencies).
            </p>

            <h3>4.4 With Your Consent</h3>
            <p>
              We may share your information with third parties when you give us explicit consent 
              to do so.
            </p>

            <div className="warning-box">
              <strong>⚠️ Important:</strong> We do NOT sell, rent, or trade your personal 
              information to third parties for their marketing purposes.
            </div>
          </section>

          <section id="data-security" className="policy-section">
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect 
              your personal data against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h3>Security Measures Include:</h3>
            <ul>
              <li>Encryption of data in transit using SSL/TLS protocols</li>
              <li>Secure server infrastructure with regular security updates</li>
              <li>Access controls limiting who can view your personal data</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Employee training on data protection and privacy</li>
              <li>Incident response procedures for data breaches</li>
            </ul>

            <p className="disclaimer-text">
              <strong>Note:</strong> While we strive to protect your personal information, no 
              method of transmission over the internet or electronic storage is 100% secure. 
              We cannot guarantee absolute security.
            </p>
          </section>

          <section id="cookies" className="policy-section">
            <h2>6. Cookies & Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website 
              and store certain information. Cookies are small data files stored on your device.
            </p>

            <h3>Types of Cookies We Use:</h3>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Marketing Cookies:</strong> Track your browsing to show relevant ads</li>
            </ul>

            <h3>Managing Cookies:</h3>
            <p>
              You can instruct your browser to refuse all cookies or indicate when a cookie is 
              being sent. However, if you do not accept cookies, you may not be able to use 
              some portions of our website. You can manage your cookie preferences through your 
              browser settings.
            </p>
          </section>

          <section id="your-rights" className="policy-section">
            <h2>7. Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal data:
            </p>

            <div className="rights-grid">
              <div className="right-card">
                <div className="right-icon">🔍</div>
                <h4>Right to Access</h4>
                <p>Request copies of your personal data</p>
              </div>
              <div className="right-card">
                <div className="right-icon">✏️</div>
                <h4>Right to Rectification</h4>
                <p>Request correction of inaccurate data</p>
              </div>
              <div className="right-card">
                <div className="right-icon">🗑️</div>
                <h4>Right to Erasure</h4>
                <p>Request deletion of your data</p>
              </div>
              <div className="right-card">
                <div className="right-icon">⛔</div>
                <h4>Right to Object</h4>
                <p>Object to processing of your data</p>
              </div>
              <div className="right-card">
                <div className="right-icon">🔒</div>
                <h4>Right to Restriction</h4>
                <p>Request restriction of processing</p>
              </div>
              <div className="right-card">
                <div className="right-icon">📦</div>
                <h4>Right to Portability</h4>
                <p>Request transfer of your data</p>
              </div>
            </div>

            <p className="rights-note">
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:privacy@teztecchbuzz.in">privacy@teztecchbuzz.in</a>. 
              We will respond to your request within 30 days.
            </p>
          </section>

          <section id="children" className="policy-section">
            <h2>8. Children's Privacy</h2>
            <p>
              Our service is not directed to children under the age of 13. We do not knowingly 
              collect personally identifiable information from children under 13. If you are a 
              parent or guardian and you are aware that your child has provided us with personal 
              data, please contact us. If we become aware that we have collected personal data 
              from children without verification of parental consent, we will take steps to 
              remove that information from our servers.
            </p>
          </section>

          <section id="changes" className="policy-section">
            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any 
              changes by posting the new Privacy Policy on this page and updating the "Last 
              updated" date at the top of this policy.
            </p>
            <p>
              We recommend reviewing this Privacy Policy periodically for any changes. Changes 
              to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          <section id="contact" className="policy-section contact-section">
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy 
              or our data practices, please contact us:
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <strong>📧 Email:</strong>
                <a href="mailto:privacy@teztecchbuzz.in">privacy@teztecchbuzz.in</a>
              </div>
              <div className="contact-item">
                <strong>🌐 Website:</strong>
                <a href="https://www.teztecchbuzz.in" target="_blank" rel="noopener noreferrer">
                  www.teztecchbuzz.in
                </a>
              </div>
              <div className="contact-item">
                <strong>💬 Feedback:</strong>
                <Link to="/contact">Contact Form</Link>
              </div>
            </div>

            <p className="response-time">
              We aim to respond to all privacy-related inquiries within 2-3 business days.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
