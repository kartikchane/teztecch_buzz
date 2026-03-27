import React from 'react';
import { Link } from 'react-router-dom';
import './UtilityPages.css';

const TermsOfUse = () => {
  return (
    <div className="utility-page terms-of-use-page">
      <div className="page-hero terms-hero">
        <div className="container">
          <h1>Terms of Use</h1>
          <p className="hero-subtitle">Please read these terms carefully before using our services</p>
          <p className="last-updated">Last updated: December 31, 2025</p>
        </div>
      </div>

      <div className="container">
        <div className="content-section policy-content">
          
          {/* Quick Navigation */}
          <div className="policy-nav">
            <h3>Quick Navigation</h3>
            <ul className="nav-list">
              <li><a href="#acceptance">Acceptance of Terms</a></li>
              <li><a href="#services">Description of Services</a></li>
              <li><a href="#accounts">User Accounts</a></li>
              <li><a href="#content">User Content</a></li>
              <li><a href="#conduct">Prohibited Conduct</a></li>
              <li><a href="#intellectual">Intellectual Property</a></li>
              <li><a href="#disclaimer">Disclaimer</a></li>
              <li><a href="#limitation">Limitation of Liability</a></li>
              <li><a href="#termination">Termination</a></li>
              <li><a href="#contact">Contact Information</a></li>
            </ul>
          </div>

          <section id="acceptance" className="policy-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              Welcome to Teztecch Buzz. By accessing or using our website, mobile application, 
              or any of our services (collectively, the "Services"), you agree to be bound by 
              these Terms of Use ("Terms"). If you do not agree to these Terms, please do not 
              use our Services.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you and Teztecch Buzz 
              ("we," "us," or "our"). We reserve the right to update these Terms at any time, 
              and your continued use of the Services constitutes acceptance of any changes.
            </p>
            <div className="info-box">
              <strong>📌 Important Points:</strong>
              <ul>
                <li>You must be at least 13 years old to use our Services</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You agree not to misuse our Services or help anyone else do so</li>
                <li>We may modify these Terms from time to time</li>
              </ul>
            </div>
          </section>

          <section id="services" className="policy-section">
            <h2>2. Description of Services</h2>
            <p>
              Teztecch Buzz is a digital media platform that provides:
            </p>
            <ul>
              <li>Positive and inspiring stories across various categories</li>
              <li>Video content and visual storytelling</li>
              <li>Weekly newsletters and content digests</li>
              <li>Community engagement and interaction features</li>
              <li>Content submission and contribution opportunities</li>
              <li>Brand partnership and advertising services</li>
            </ul>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of our Services 
              at any time, with or without notice. We will not be liable to you or any third 
              party for any modification, suspension, or discontinuance of the Services.
            </p>
          </section>

          <section id="accounts" className="policy-section">
            <h2>3. User Accounts</h2>
            
            <h3>3.1 Account Registration</h3>
            <p>
              To access certain features of our Services, you may need to create an account. 
              When you create an account, you must:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept all responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>

            <h3>3.2 Account Responsibilities</h3>
            <p>
              You are solely responsible for all activities conducted through your account. 
              We are not liable for any loss or damage arising from your failure to maintain 
              the security of your account credentials.
            </p>

            <h3>3.3 Account Termination</h3>
            <p>
              We reserve the right to suspend or terminate your account at any time, with or 
              without notice, for violating these Terms or for any other reason we deem appropriate.
            </p>
          </section>

          <section id="content" className="policy-section">
            <h2>4. User Content</h2>
            
            <h3>4.1 Content Submission</h3>
            <p>
              Our Services may allow you to submit, post, or share content including comments, 
              stories, photos, videos, and other materials ("User Content"). By submitting 
              User Content, you:
            </p>
            <ul>
              <li>Retain ownership of your User Content</li>
              <li>Grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your User Content</li>
              <li>Represent that you have all necessary rights to the User Content</li>
              <li>Agree that your User Content does not violate any laws or third-party rights</li>
            </ul>

            <h3>4.2 Content Standards</h3>
            <p>You agree that all User Content you submit will:</p>
            <ul>
              <li>Be accurate and not misleading</li>
              <li>Not violate any intellectual property rights</li>
              <li>Not contain hate speech, harassment, or discrimination</li>
              <li>Not include violent, graphic, or disturbing content</li>
              <li>Not contain spam or commercial solicitation</li>
              <li>Not include personal information of others without consent</li>
            </ul>

            <h3>4.3 Content Moderation</h3>
            <p>
              We reserve the right to review, moderate, remove, or refuse to publish any User 
              Content that violates these Terms or that we find objectionable. However, we are 
              not obligated to monitor User Content and assume no responsibility for content 
              posted by users.
            </p>
          </section>

          <section id="conduct" className="policy-section">
            <h2>5. Prohibited Conduct</h2>
            <p>When using our Services, you agree NOT to:</p>
            
            <div className="prohibited-grid">
              <div className="prohibited-item">
                <div className="prohibited-icon">⚠️</div>
                <h4>Illegal Activities</h4>
                <p>Engage in any illegal or unauthorized activities</p>
              </div>
              <div className="prohibited-item">
                <div className="prohibited-icon">🚫</div>
                <h4>Harassment</h4>
                <p>Harass, abuse, or harm other users</p>
              </div>
              <div className="prohibited-item">
                <div className="prohibited-icon">🔓</div>
                <h4>Unauthorized Access</h4>
                <p>Attempt to gain unauthorized access to our systems</p>
              </div>
              <div className="prohibited-item">
                <div className="prohibited-icon">🤖</div>
                <h4>Automated Use</h4>
                <p>Use bots, scrapers, or automated systems without permission</p>
              </div>
              <div className="prohibited-item">
                <div className="prohibited-icon">💣</div>
                <h4>Malicious Code</h4>
                <p>Upload viruses, malware, or harmful code</p>
              </div>
              <div className="prohibited-item">
                <div className="prohibited-icon">🎭</div>
                <h4>Impersonation</h4>
                <p>Impersonate others or misrepresent your identity</p>
              </div>
            </div>

            <p className="violation-note">
              Violation of these prohibited activities may result in immediate termination of 
              your account and legal action.
            </p>
          </section>

          <section id="intellectual" className="policy-section">
            <h2>6. Intellectual Property Rights</h2>
            
            <h3>6.1 Our Content</h3>
            <p>
              All content on our Services, including but not limited to text, graphics, logos, 
              images, videos, audio clips, software, and design elements, is the property of 
              Teztecch Buzz or its content suppliers and is protected by Indian and international 
              copyright, trademark, and other intellectual property laws.
            </p>

            <h3>6.2 Limited License</h3>
            <p>
              We grant you a limited, non-exclusive, non-transferable license to access and use 
              our Services for personal, non-commercial purposes. This license does not include:
            </p>
            <ul>
              <li>Any resale or commercial use of our Services or content</li>
              <li>Downloading or copying content for commercial purposes</li>
              <li>Use of data mining, robots, or similar data gathering tools</li>
              <li>Creating derivative works based on our content</li>
            </ul>

            <h3>6.3 Trademarks</h3>
            <p>
              "Teztecch Buzz" and related logos are trademarks of Teztecch Buzz. You may not 
              use our trademarks without our prior written permission.
            </p>

            <h3>6.4 Copyright Infringement</h3>
            <p>
              We respect intellectual property rights. If you believe any content on our Services 
              infringes your copyright, please contact us at{' '}
              <a href="mailto:legal@teztecchbuzz.in">legal@teztecchbuzz.in</a> with:
            </p>
            <ul>
              <li>Identification of the copyrighted work</li>
              <li>Location of the infringing material</li>
              <li>Your contact information</li>
              <li>A statement of good faith belief</li>
              <li>A statement of accuracy under penalty of perjury</li>
              <li>Your physical or electronic signature</li>
            </ul>
          </section>

          <section id="disclaimer" className="policy-section">
            <h2>7. Disclaimer of Warranties</h2>
            <div className="warning-box">
              <strong>⚠️ IMPORTANT NOTICE:</strong>
            </div>
            <p>
              OUR SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY 
              WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul>
              <li>Warranties of merchantability or fitness for a particular purpose</li>
              <li>Warranties that the Services will be uninterrupted or error-free</li>
              <li>Warranties regarding the accuracy, reliability, or completeness of content</li>
              <li>Warranties that defects will be corrected</li>
              <li>Warranties regarding security or the absence of viruses</li>
            </ul>
            <p>
              We do not warrant that the Services will meet your requirements or that any 
              errors in the Services will be corrected. You use the Services at your own risk.
            </p>
          </section>

          <section id="limitation" className="policy-section">
            <h2>8. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, TEZTECCH BUZZ AND ITS AFFILIATES, OFFICERS, 
              DIRECTORS, EMPLOYEES, AGENTS, AND LICENSORS WILL NOT BE LIABLE FOR ANY:
            </p>
            <ul>
              <li>Indirect, incidental, special, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Loss of or damage to property</li>
              <li>Personal injury or emotional distress</li>
              <li>Costs of procurement of substitute services</li>
            </ul>
            <p>
              This applies whether based on warranty, contract, tort (including negligence), 
              or any other legal theory, and whether or not we have been advised of the 
              possibility of such damages.
            </p>
            <p className="disclaimer-text">
              <strong>Note:</strong> Some jurisdictions do not allow the exclusion of certain 
              warranties or limitation of liability, so some of the above limitations may not 
              apply to you.
            </p>
          </section>

          <section id="termination" className="policy-section">
            <h2>9. Termination</h2>
            
            <h3>9.1 Termination by You</h3>
            <p>
              You may stop using our Services at any time. If you have an account, you can 
              delete it by contacting us at{' '}
              <a href="mailto:hello@teztecchbuzz.in">hello@teztecchbuzz.in</a>.
            </p>

            <h3>9.2 Termination by Us</h3>
            <p>
              We reserve the right to suspend or terminate your access to the Services at any 
              time, with or without cause, with or without notice, for any reason including:
            </p>
            <ul>
              <li>Violation of these Terms</li>
              <li>Fraudulent or illegal activity</li>
              <li>Extended period of inactivity</li>
              <li>Request from law enforcement or government agencies</li>
              <li>Technical or security issues</li>
            </ul>

            <h3>9.3 Effect of Termination</h3>
            <p>
              Upon termination, your right to use the Services will immediately cease. All 
              provisions of these Terms that by their nature should survive termination shall 
              survive, including ownership provisions, warranty disclaimers, and limitations 
              of liability.
            </p>
          </section>

          <section className="policy-section">
            <h2>10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Teztecch Buzz and its affiliates, 
              officers, directors, employees, agents, and licensors from and against any claims, 
              liabilities, damages, losses, and expenses, including reasonable attorney's fees, 
              arising out of or in any way connected with:
            </p>
            <ul>
              <li>Your access to or use of the Services</li>
              <li>Your User Content</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>11. Governing Law & Dispute Resolution</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of 
              India, without regard to its conflict of law provisions.
            </p>
            <p>
              Any disputes arising out of or relating to these Terms or the Services shall be 
              resolved through binding arbitration in accordance with the Arbitration and 
              Conciliation Act, 1996. The arbitration shall be conducted in English and the 
              seat of arbitration shall be [Your City], India.
            </p>
          </section>

          <section className="policy-section">
            <h2>12. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of 
              material changes by:
            </p>
            <ul>
              <li>Posting the updated Terms on this page</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending an email notification to registered users (for significant changes)</li>
            </ul>
            <p>
              Your continued use of the Services after any changes indicates your acceptance 
              of the new Terms. If you do not agree to the modified Terms, you must stop using 
              the Services.
            </p>
          </section>

          <section className="policy-section">
            <h2>13. Miscellaneous</h2>
            
            <h3>13.1 Entire Agreement</h3>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement 
              between you and Teztecch Buzz regarding the Services.
            </p>

            <h3>13.2 Severability</h3>
            <p>
              If any provision of these Terms is found to be unenforceable, the remaining 
              provisions will continue in full force and effect.
            </p>

            <h3>13.3 Waiver</h3>
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered 
              a waiver of those rights.
            </p>

            <h3>13.4 Assignment</h3>
            <p>
              You may not assign or transfer these Terms or your rights hereunder without our 
              prior written consent. We may assign our rights to any of our affiliates or 
              successors without restriction.
            </p>
          </section>

          <section id="contact" className="policy-section contact-section">
            <h2>14. Contact Information</h2>
            <p>
              If you have any questions, concerns, or feedback about these Terms of Use, 
              please contact us:
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <strong>📧 Legal Email:</strong>
                <a href="mailto:legal@teztecchbuzz.in">legal@teztecchbuzz.in</a>
              </div>
              <div className="contact-item">
                <strong>💬 General Inquiries:</strong>
                <a href="mailto:hello@teztecchbuzz.in">hello@teztecchbuzz.in</a>
              </div>
              <div className="contact-item">
                <strong>🌐 Website:</strong>
                <a href="https://www.teztecchbuzz.in" target="_blank" rel="noopener noreferrer">
                  www.teztecchbuzz.in
                </a>
              </div>
              <div className="contact-item">
                <strong>📝 Contact Form:</strong>
                <Link to="/contact">Submit an Inquiry</Link>
              </div>
            </div>

            <div className="acknowledgment-box">
              <strong>✅ Acknowledgment:</strong>
              <p>
                BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF USE 
                AND AGREE TO BE BOUND BY THEM.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
