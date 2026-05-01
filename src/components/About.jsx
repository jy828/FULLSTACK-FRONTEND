import React, { useState } from 'react';
import './About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I file a complaint?",
      answer: "Navigate to your dashboard and click on 'Create a Complaint' in the Complaints section. Fill in the title, description, select a category and location, optionally upload an image, then click 'Submit Complaint'. Your complaint will be assigned a tracking ID."
    },
    {
      id: 2,
      question: "How can I track my complaint?",
      answer: "Go to 'My Complaints' section from the dropdown menu. You'll see all your filed complaints with their current status (Pending, In Progress, Resolved, or Rejected). You can filter by status or search by keywords."
    },
    {
      id: 3,
      question: "What complaint categories are available?",
      answer: "We handle complaints in the following categories: Road Issues, Water Supply Problems, Electricity Issues, Sanitation Problems, and Other. Choose the category that best matches your complaint for faster resolution."
    },
    {
      id: 4,
      question: "Can I upload images with my complaint?",
      answer: "Yes! You can upload images to support your complaint. This helps our team better understand the issue. Images are optional but highly recommended for faster resolution."
    },
    {
      id: 5,
      question: "How long does it take to resolve a complaint?",
      answer: "Resolution time depends on the complexity and category of the complaint. Simple issues are typically resolved within 24-48 hours, while complex issues may take 5-7 business days."
    },
    {
      id: 6,
      question: "What is the resolution rate?",
      answer: "You can view our current resolution statistics on your dashboard in the Analytics section. We strive for 100% resolution of all valid complaints."
    },
    {
      id: 7,
      question: "Can I edit my complaint after submission?",
      answer: "Currently, you can view your complaint history but cannot edit submissions. If you need to update information, please contact support with your complaint ID."
    },
    {
      id: 8,
      question: "How do emergency services work?",
      answer: "Our Emergency Services page provides quick access to critical phone numbers. For police, ambulance, fire, women's helpline, and disaster control. In life-threatening emergencies, always dial 100 or your local emergency number directly."
    }
  ];

  const supportChannels = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'For detailed inquiries and documentation',
      contact: 'support@citysmart.gov.in',
      responseTime: '24-48 hours'
    },
    {
      icon: '📞',
      title: 'Helpline',
      description: 'Speak with our support team directly',
      contact: '1800-CITY-HELP (1800-2489-4357)',
      responseTime: 'Immediate'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Quick assistance during business hours',
      contact: 'Available 9 AM - 6 PM (IST)',
      responseTime: 'Real-time'
    },
    {
      icon: '🏢',
      title: 'Visit Us',
      description: 'Civic Center - City Administration Building',
      contact: 'Main Road, Sector 12, City Center',
      responseTime: 'Mon-Fri, 9 AM - 5 PM'
    }
  ];

  const features = [
    {
      icon: '📋',
      title: 'Easy Complaint Filing',
      description: 'Submit complaints in seconds with location tracking and image upload'
    },
    {
      icon: '📊',
      title: 'Real-time Tracking',
      description: 'Monitor complaint status from submission to resolution'
    },
    {
      icon: '📰',
      title: 'City News & Updates',
      description: 'Stay informed with latest announcements and events'
    },
    {
      icon: '🚨',
      title: 'Emergency Services',
      description: 'Quick access to critical emergency contact numbers'
    },
    {
      icon: '🌍',
      title: 'Weather Information',
      description: 'Check weather conditions across different city locations'
    },
    {
      icon: '📈',
      title: 'Analytics Dashboard',
      description: 'View complaint statistics and city performance metrics'
    }
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="about-container">
      <div className="about-page">
        {/* Hero Section */}
        <div className="about-hero">
          <div className="about-hero-content">
            <h1>🏛️ CitySmart</h1>
            <p className="about-tagline">Empowering Citizens, Building Better Cities</p>
            <p className="about-subtitle">
              A modern platform connecting citizens with city services. Report issues, track resolutions, and stay informed.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="about-tabs">
          <button
            className={`about-tab ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About CitySmart
          </button>
          <button
            className={`about-tab ${activeTab === 'guide' ? 'active' : ''}`}
            onClick={() => setActiveTab('guide')}
          >
            How to Use
          </button>
          <button
            className={`about-tab ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            FAQs
          </button>
          <button
            className={`about-tab ${activeTab === 'support' ? 'active' : ''}`}
            onClick={() => setActiveTab('support')}
          >
            Contact Support
          </button>
        </div>

        {/* Tab Content */}
        <div className="about-content">
          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="about-tab-content">
              <section className="about-section">
                <h2>What is CitySmart?</h2>
                <p>
                  CitySmart is a comprehensive digital platform designed to bridge the gap between citizens and city administration. 
                  Our mission is to make city services more accessible, transparent, and responsive.
                </p>
                <p>
                  Whether you're reporting a pothole, water supply issue, or electricity problem, CitySmart provides a streamlined 
                  process to get your concerns addressed quickly and efficiently.
                </p>
              </section>

              <section className="about-section">
                <h2>Our Mission</h2>
                <div className="about-mission-cards">
                  <div className="mission-card">
                    <div className="mission-icon">🎯</div>
                    <h3>Efficiency</h3>
                    <p>Fast complaint resolution through organized tracking</p>
                  </div>
                  <div className="mission-card">
                    <div className="mission-icon">🔍</div>
                    <h3>Transparency</h3>
                    <p>Real-time status updates on all submissions</p>
                  </div>
                  <div className="mission-card">
                    <div className="mission-icon">🤝</div>
                    <h3>Community</h3>
                    <p>Empowering citizens to participate in civic improvement</p>
                  </div>
                  <div className="mission-card">
                    <div className="mission-icon">🚀</div>
                    <h3>Innovation</h3>
                    <p>Modern technology for better city governance</p>
                  </div>
                </div>
              </section>

              <section className="about-section">
                <h2>Key Features</h2>
                <div className="about-features-grid">
                  {features.map((feature, idx) => (
                    <div key={idx} className="feature-card">
                      <div className="feature-icon">{feature.icon}</div>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* Guide Tab */}
          {activeTab === 'guide' && (
            <div className="about-tab-content">
              <section className="about-section">
                <h2>How to File a Complaint</h2>
                
                <div className="guide-steps">
                  <div className="guide-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h3>Log In or Sign Up</h3>
                      <p>Create your account or log in with your credentials. You can register as either a citizen or admin.</p>
                    </div>
                  </div>

                  <div className="guide-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h3>Go to Dashboard</h3>
                      <p>Click on "Citizen Dashboard" to access your complaint filing interface.</p>
                    </div>
                  </div>

                  <div className="guide-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h3>Fill Complaint Details</h3>
                      <p>Enter a clear title and detailed description of the issue you want to report.</p>
                    </div>
                  </div>

                  <div className="guide-step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h3>Select Category & Location</h3>
                      <p>Choose the appropriate category (Road, Water, Electricity, etc.) and specify the location.</p>
                    </div>
                  </div>

                  <div className="guide-step">
                    <div className="step-number">5</div>
                    <div className="step-content">
                      <h3>Upload Image (Optional)</h3>
                      <p>Attach a photo of the issue for better understanding. This helps our team respond faster.</p>
                    </div>
                  </div>

                  <div className="guide-step">
                    <div className="step-number">6</div>
                    <div className="step-content">
                      <h3>Submit & Track</h3>
                      <p>Click "Submit Complaint" and track the status from your complaint history anytime.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="about-section">
                <h2>Tracking Your Complaint</h2>
                <div className="tracking-info">
                  <p>Once you submit a complaint, it goes through these stages:</p>
                  <div className="status-flow">
                    <div className="status-item">
                      <div className="status-badge" style={{ background: '#f59e0b' }}>📍</div>
                      <span>Pending</span>
                    </div>
                    <div className="status-arrow">→</div>
                    <div className="status-item">
                      <div className="status-badge" style={{ background: '#f97316' }}>⚙️</div>
                      <span>In Progress</span>
                    </div>
                    <div className="status-arrow">→</div>
                    <div className="status-item">
                      <div className="status-badge" style={{ background: '#10b981' }}>✅</div>
                      <span>Resolved</span>
                    </div>
                  </div>
                  <p className="tracking-note">You can check your complaint status anytime from "My Complaints" section.</p>
                </div>
              </section>

              <section className="about-section">
                <h2>Tips for Better Complaints</h2>
                <div className="tips-grid">
                  <div className="tip-card">
                    <h3>✍️ Be Specific</h3>
                    <p>Provide clear, detailed descriptions of the issue</p>
                  </div>
                  <div className="tip-card">
                    <h3>📸 Add Photos</h3>
                    <p>Upload clear images showing the problem</p>
                  </div>
                  <div className="tip-card">
                    <h3>📍 Include Location</h3>
                    <p>Select the exact sector or area where issue occurs</p>
                  </div>
                  <div className="tip-card">
                    <h3>⏰ Note Time</h3>
                    <p>Mention when the issue started if relevant</p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="about-tab-content">
              <section className="about-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-list">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="faq-item">
                      <button
                        className="faq-question"
                        onClick={() => toggleFaq(faq.id)}
                      >
                        <span>{faq.question}</span>
                        <span className="faq-toggle">
                          {expandedFaq === faq.id ? '✕' : '+'}
                        </span>
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <div className="about-tab-content">
              <section className="about-section">
                <h2>Get in Touch</h2>
                <p className="support-intro">
                  Need help? Our support team is here to assist you. Reach out through any of these channels:
                </p>

                <div className="support-channels">
                  {supportChannels.map((channel, idx) => (
                    <div key={idx} className="support-card">
                      <div className="support-icon">{channel.icon}</div>
                      <h3>{channel.title}</h3>
                      <p className="support-description">{channel.description}</p>
                      <div className="support-details">
                        <p className="support-contact"><strong>{channel.contact}</strong></p>
                        <p className="support-time">⏱️ {channel.responseTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="about-section">
                <h2>Report a Bug</h2>
                <div className="bug-report-box">
                  <p>Found an issue with the platform? Help us improve!</p>
                  <p>Email us at: <strong>bugs@citysmart.gov.in</strong></p>
                  <p>Include a screenshot and description of the problem.</p>
                </div>
              </section>

              <section className="about-section">
                <h2>Operating Hours</h2>
                <div className="hours-grid">
                  <div className="hours-card">
                    <h3>Online Platform</h3>
                    <p>24/7 Available</p>
                  </div>
                  <div className="hours-card">
                    <h3>Email Support</h3>
                    <p>Mon-Fri: 9 AM - 6 PM</p>
                  </div>
                  <div className="hours-card">
                    <h3>Live Chat</h3>
                    <p>Mon-Fri: 9 AM - 6 PM</p>
                  </div>
                  <div className="hours-card">
                    <h3>Helpline</h3>
                    <p>24/7 Emergency Only</p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="about-footer">
          <p>Version 2.0 • Last Updated: February 2026</p>
          <p>© 2026 CitySmart - City Administration. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
