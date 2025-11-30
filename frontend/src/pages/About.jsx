import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import './About.css'
import aboutHeroImage from '../Assets/ayursutra1.jpg';

const About = () => {
  return (
    <div className="about-page">
      <Header />
      <main className="about-main">
        <div className="about-container">
          <div className="about-content">
            <h1 className="about-title">About Us</h1>
            <div className="title-underline"></div>

            <div className="about-intro-content">
              {/* LEFT SIDE: Image */}
              <div className="about-image-container">
                <img src={aboutHeroImage} alt="Ayurvedic philosophy and elements" />
              </div>
            
            <div className="about-text-content">
            <p className="about-description">
              Welcome to AyurSutra, your gateway to the harmonious fusion of ancient Ayurvedic 
              wisdom and modern technology. At AyurSutra, we're dedicated to empowering individuals 
              with profound insights into their well-being, health, and constitution. Our journey 
              began with a simple yet powerful question: how can we blend the timeless principles 
              of Ayurveda with the precision of modern machine learning to enhance lives?
            </p>
            
            <p className="about-description">
              We believe that understanding your unique Dosha (Prakriti) is the first step toward 
              achieving optimal health and wellness. Through our AI-powered assessment, we help you 
              discover your mind-body constitution and provide personalized Panchakarma therapy 
              recommendations tailored to your specific needs.
            </p>
          </div>
        </div>
            
            <div className="solutions-section">
              <h2 className="solutions-title">YOUR SOLUTIONS</h2>
              
              <div className="solution-step">
                <div className="step-icon">✓</div>
                <div className="step-content">
                  <h3 className="step-title">Click On Chat Bot</h3>
                  <p className="step-description">
                    Locate the Chat with our Ayurvedic Expert button on the homepage and click it.
                  </p>
                </div>
              </div>
              
              <div className="solution-step">
                <div className="step-icon">✓</div>
                <div className="step-content">
                  <h3 className="step-title">Start the Conversation</h3>
                  <p className="step-description">
                    Once the chat interface opens, initiate a conversation with our AI-powered 
                    chatbot by responding to its greetings.
                  </p>
                  <div className="step-buttons">
                    <button className="see-dosha-btn">
                      <span>See Your Dosha</span>
                      <span>👍</span>
                    </button>
                    <Link to="/chat" className="chat-bot-btn">
                      <span>Chat Bot</span>
                      <span>💬</span>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="solution-step">
                <div className="step-icon">✓</div>
                <div className="step-content">
                  <h3 className="step-title">Answer Questions</h3>
                  <p className="step-description">
                    The chatbot will ask you a series of questions related to your health, 
                    lifestyle, and physical characteristics. Answer honestly to get the most 
                    accurate assessment of your Dosha.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default About
