import React, { useState, useRef, useEffect, Fragment } from 'react';
import MessageBubble from './MessageBubble';
import ChatResult from './ChatResult';
import botLogo2 from '../assets/bot_logo2.png';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: (<>Namaste! <img src={botLogo2} alt="bot logo" style={{ width: '20px', height: '20px', verticalAlign: 'middle' }} /> I'm AyurSutra Bot, your Ayurvedic wellness assistant. I'll help you discover your Dosha (Prakriti) and recommend personalized Panchakarma therapies. Are you ready to begin your assessment?</>),
      sender: 'bot',
      timestamp: new Date().toISOString(),
      isQuestion: true,
      options: ["Yes, begin assessment", "Tell me more about Ayurveda", "What is Panchakarma?"]
    }
  ]);

  const [showAyurvedaInfo, setShowAyurvedaInfo] = useState(false);
  const [showPanchakarmaInfo, setShowPanchakarmaInfo] = useState(false);
  const [ayurvedaInfoVisible, setAyurvedaInfoVisible] = useState(false);
  const [panchakarmaInfoVisible, setPanchakarmaInfoVisible] = useState(false);
  const [infoSections, setInfoSections] = useState([]);

  const [inputValue, setInputValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [assessmentProgress, setAssessmentProgress] = useState(null);
  const [doshaResults, setDoshaResults] = useState(null);
  const [panchakarmaRecs, setPanchakarmaRecs] = useState(null);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const messagesEndRef = useRef(null);
  const wsRef = useRef(null);

  // This will read from the VITE_WS_URL environment variable set on Render.
  // In production, it will be something like ws://dosha-chatbot-backend:8000/ws/chat (internal Render URL).
  const backendWebSocketUrl = import.meta.env.VITE_WS_URL || 'ws://127.0.0.1:8000/ws/chat';

  // WebSocket connection
  useEffect(() => {
    const connectWebSocket = () => {
      try {
        const ws = new WebSocket(backendWebSocketUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          console.log('Connected to AyurSutra backend');
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          handleWebSocketMessage(data);
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
          console.log('WebSocket connection closed');
          // Try to reconnect after 3 seconds
          setTimeout(connectWebSocket, 3000);
        };
      } catch (error) {
        console.error('Failed to connect to WebSocket:', error);
      }
    };

    connectWebSocket(); // Initiate connection

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [backendWebSocketUrl]); // Add dependency to re-connect if URL changes

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showResults]);

  useEffect(() => {
    if (showResults) {
      setTimeout(() => setResultsVisible(true), 100);
    }
  }, [showResults]);

  useEffect(() => {
    if (showAyurvedaInfo) {
      setTimeout(() => setAyurvedaInfoVisible(true), 100);
    }
  }, [showAyurvedaInfo]);

  useEffect(() => {
    if (showPanchakarmaInfo) {
      setTimeout(() => setPanchakarmaInfoVisible(true), 100);
    }
  }, [showPanchakarmaInfo]);

  const handleWebSocketMessage = (data) => {
    console.log('Received WebSocket message:', data);

    if (data.type === 'typing') {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
      return;
    }

    if (data.type === 'message') {
      const DUPLICATE_WELCOME_TEXT = "Namaste! 🌿 I'm AyurSutra Bot, your Ayurvedic wellness assistant. I'll help you discover your Dosha (Prakriti) and recommend personalized Panchakarma therapies. Are you ready to begin your assessment?";

      if (data.text === DUPLICATE_WELCOME_TEXT) {
        console.log("Skipping duplicate plain text welcome message from backend.");
        setIsTyping(false);
        // Do not return here to allow subsequent real messages to be processed, if any.
        // However, if the backend sends this as a standalone message, we still want to filter it.
        // Given the goal is 'don't resend this paragraph', we explicitly return.
        return;
      }

      const botMessage = {
        id: messages.length + 1,
        text: data.text,
        sender: 'bot',
        timestamp: data.timestamp || new Date().toISOString()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      // Reset info section visibility when new bot message arrives
      setShowAyurvedaInfo(false);
      setShowPanchakarmaInfo(false);
    }

    if (data.type === 'question') {
      const questionMessage = {
        id: messages.length + 1,
        text: data.text,
        sender: 'bot',
        timestamp: data.timestamp || new Date().toISOString(),
        isQuestion: true,
        options: data.options,
        questionId: data.question_id,
        progress: data.progress
      };
      setMessages(prev => [...prev, questionMessage]);
      setAssessmentProgress(data.progress);
      setIsTyping(false);
      // Reset info section visibility when a new question arrives
      setShowAyurvedaInfo(false);
      setShowPanchakarmaInfo(false);
    }

    if (data.type === 'assessment_complete') {
      setDoshaResults(data.dosha_results);
      setPanchakarmaRecs(data.panchakarma_recs);
      setAssessmentComplete(true);
      setShowResults(true);
      setAssessmentProgress(null);

      const completionMessage = {
        id: messages.length + 1,
        text: 'Assessment complete! Check your results below.',
        sender: 'bot',
        timestamp: data.timestamp || new Date().toISOString(),
        isComplete: true
      };
      setMessages(prev => [...prev, completionMessage]);
      setIsTyping(false);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // For any user input, show the welcome message
    const repeatedWelcomeMessage = {
      id: messages.length + 1,
      text: (<>Namaste! <img src={botLogo2} alt="bot logo" style={{ width: '20px', height: '20px', verticalAlign: 'middle' }} /> I'm AyurSutra Bot, your Ayurvedic wellness assistant. I'll help you discover your Dosha (Prakriti) and recommend personalized Panchakarma therapies. Are you ready to begin your assessment?</>),
      sender: 'bot',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, repeatedWelcomeMessage]);
    setInputValue('');
  };

  const handleOptionSelect = (option) => {
    // Add user message from option selection
    const userMessage = {
      id: messages.length + 1,
      text: option,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);

    // Handle Ayurveda and Panchakarma info locally
    if (option.toLowerCase().includes('tell me more about ayurveda')) {
      setTimeout(() => {
        setShowAyurvedaInfo(true);
        // Clear any previous results if navigating to info
        setShowResults(false);
        setDoshaResults(null);
        setPanchakarmaRecs(null);
        setAssessmentComplete(false);
      }, 300);
      return;
    }

    if (option.toLowerCase().includes('what is panchakarma')) {
      setTimeout(() => {
        setShowPanchakarmaInfo(true);
        // Clear any previous results if navigating to info
        setShowResults(false);
        setDoshaResults(null);
        setPanchakarmaRecs(null);
        setAssessmentComplete(false);
      }, 300);
      return;
    }

    // If starting a new assessment, clear previous results
    if (option.toLowerCase().includes('begin assessment') || option.toLowerCase().includes('yes')) {
      setShowResults(false);
      setDoshaResults(null);
      setPanchakarmaRecs(null);
      setAssessmentComplete(false);
      setShowAyurvedaInfo(false); // Also hide info sections when starting assessment
      setShowPanchakarmaInfo(false);
    }

    // Send other options to WebSocket
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        message: option
      }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h1 className="chatbot-title">AyurSutra Assistant</h1>
        <p className="chatbot-subtitle">
          Ask anything about your Ayurvedic wellness journey
        </p>
      </div>

      <div className="chatbot-messages">
        {/* Display all messages first */}
        {messages.map((message) => (
          <React.Fragment key={message.id}>
            <MessageBubble
              message={message}
              onOptionSelect={handleOptionSelect}
            />

            {/* Render information sections inline when the user selects the options */}
            {message.sender === 'user' && message.text.toLowerCase().includes('tell me more about ayurveda') && showAyurvedaInfo && (
              <div
                className={`ayurveda-info-section ${ayurvedaInfoVisible ? 'fade-in' : ''}`}
                style={{ marginTop: '1rem', marginBottom: '1rem' }}
              >
                <div className="ayurveda-info">
                  <h2 className="ayurveda-title">About Ayurveda</h2>

                  <div className="ayurveda-content">
                    <div className="ayurveda-section">
                      <h3>What is Ayurveda?</h3>
                      <p>
                        Ayurveda is a traditional system of medicine originating from India over 5,000 years ago.
                        The word "Ayurveda" comes from Sanskrit, meaning "knowledge of life" (Ayur = life, Veda = knowledge).
                        It is one of the world's oldest holistic healing systems, focusing on achieving balance between body, mind, and spirit.
                      </p>
                    </div>

                    <div className="ayurveda-section">
                      <h3>Eight Components (Ashtanga Ayurveda)</h3>
                      <p>Ayurveda consists of eight specialized branches:</p>
                      <ul>
                        <li><strong>Kaya Chikitsa:</strong> Internal medicine for treating bodily disorders</li>
                        <li><strong>Kaumarbhritya:</strong> Pediatrics and obstetrics</li>
                        <li><strong>Graha Chikitsa:</strong> Psychiatry and spiritual healing</li>
                        <li><strong>Urdhvanga Chikitsa:</strong> Treatment of disorders above the neck</li>
                        <li><strong>Shalya Chikitsa:</strong> Surgery and surgical techniques</li>
                        <li><strong>Agada Tantra:</strong> Toxicology and poison management</li>
                        <li><strong>Rasayana:</strong> Rejuvenation and anti-aging therapies</li>
                        <li><strong>Vajikarana:</strong> Aphrodisiacs and fertility enhancement</li>
                      </ul>
                    </div>

                    <div className="ayurveda-section">
                      <h3>Core Principles</h3>
                      <div className="principles-grid">
                        <div className="principle-card">
                          <h4>Dosha Theory</h4>
                          <p>Three fundamental energies (Vata, Pitta, Kapha) that govern all physical and mental processes.</p>
                        </div>
                        <div className="principle-card">
                          <h4>Dhatus</h4>
                          <p>Seven bodily tissues that maintain structure and function: Plasma, Blood, Muscle, Fat, Bone, Marrow, Reproductive tissues.</p>
                        </div>
                        <div className="principle-card">
                          <h4>Agni</h4>
                          <p>Digestive fire that transforms food into energy and eliminates waste.</p>
                        </div>
                        <div className="principle-card">
                          <h4>Mala</h4>
                          <p>Waste products (urine, feces, sweat) that must be properly eliminated.</p>
                        </div>
                      </div>
                    </div>

                    <div className="ayurveda-section">
                      <h3>Dosha Types</h3>
                      <div className="dosha-types">
                        <div className="dosha-card">
                          <h4>🌀 Vata (Air & Ether)</h4>
                          <p>Controls movement, creativity, and nervous system. Characteristics: Quick, creative, irregular, cold, dry, light.</p>
                        </div>
                        <div className="dosha-card">
                          <h4>🔥 Pitta (Fire & Water)</h4>
                          <p>Governs metabolism, digestion, and transformation. Characteristics: Intense, ambitious, sharp, warm, oily, focused.</p>
                        </div>
                        <div className="dosha-card">
                          <h4>🌿 Kapha (Earth & Water)</h4>
                          <p>Provides structure, stability, and lubrication. Characteristics: Calm, stable, grounded, cool, moist, heavy.</p>
                        </div>
                      </div>
                    </div>

                    <div className="ayurveda-section">
                      <h3>Current Status</h3>
                      <p>
                        Ayurveda is recognized by the World Health Organization (WHO) as a traditional medicine system.
                        It is widely practiced in India and increasingly popular worldwide as a complementary and alternative medicine.
                        Modern research continues to validate many Ayurvedic principles and treatments.
                      </p>
                    </div>

                    <div className="ayurveda-section">
                      <h3>Dietary Principles</h3>
                      <p>Ayurveda emphasizes eating according to your dosha constitution:</p>
                      <ul>
                        <li><strong>Vata:</strong> Warm, cooked, nourishing foods; avoid cold, raw foods</li>
                        <li><strong>Pitta:</strong> Cooling foods, moderate portions; avoid spicy, sour foods</li>
                        <li><strong>Kapha:</strong> Light, warm, spicy foods; avoid heavy, cold, sweet foods</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {message.sender === 'user' && message.text.toLowerCase().includes('what is panchakarma') && showPanchakarmaInfo && (
              <div
                className={`panchakarma-info-section ${panchakarmaInfoVisible ? 'fade-in' : ''}`}
                style={{ marginTop: '1rem', marginBottom: '1rem' }}
              >
                <div className="panchakarma-info">
                  <h2 className="panchakarma-title">What is Panchakarma?</h2>

                  <div className="panchakarma-content">
                    <div className="panchakarma-section">
                      <h3>Overview</h3>
                      <p>
                        Panchakarma is the cornerstone of Ayurvedic detoxification and rejuvenation therapy.
                        "Pancha" means five and "Karma" means therapeutic procedures. It is a comprehensive
                        system of detoxification that eliminates accumulated toxins (ama) from the body and
                        restores constitutional balance.
                      </p>
                    </div>

                    <div className="panchakarma-section">
                      <h3>The Five Therapeutic Procedures</h3>
                      <div className="panchakarma-procedures">
                        <div className="procedure-card">
                          <h4>1. Vamana (Therapeutic Vomiting)</h4>
                          <p><strong>Purpose:</strong> Eliminates Kapha dosha and toxins from the upper body</p>
                          <p><strong>Benefits:</strong> Clears respiratory tract, improves digestion, reduces mucus</p>
                          <p><strong>Best for:</strong> Asthma, allergies, sinus congestion, obesity, diabetes</p>
                        </div>

                        <div className="procedure-card">
                          <h4>2. Virechana (Therapeutic Purgation)</h4>
                          <p><strong>Purpose:</strong> Cleanses the intestines and eliminates Pitta dosha</p>
                          <p><strong>Benefits:</strong> Detoxifies liver, improves skin health, balances metabolism</p>
                          <p><strong>Best for:</strong> Liver disorders, skin conditions, digestive issues, migraines</p>
                        </div>

                        <div className="procedure-card">
                          <h4>3. Basti (Therapeutic Enema)</h4>
                          <p><strong>Purpose:</strong> Nourishes and balances Vata dosha through the colon</p>
                          <p><strong>Benefits:</strong> Strengthens colon, improves elimination, calms nervous system</p>
                          <p><strong>Best for:</strong> Constipation, arthritis, neurological disorders, infertility</p>
                        </div>

                        <div className="procedure-card">
                          <h4>4. Nasya (Nasal Therapy)</h4>
                          <p><strong>Purpose:</strong> Clears toxins from the head and neck region</p>
                          <p><strong>Benefits:</strong> Clears sinuses, improves voice, enhances mental clarity</p>
                          <p><strong>Best for:</strong> Sinusitis, headaches, allergies, thyroid disorders</p>
                        </div>

                        <div className="procedure-card">
                          <h4>5. Raktamokshana (Therapeutic Bloodletting)</h4>
                          <p><strong>Purpose:</strong> Removes impure blood and toxins from circulation</p>
                          <p><strong>Benefits:</strong> Purifies blood, treats skin conditions, reduces inflammation</p>
                          <p><strong>Best for:</strong> Acne, eczema, psoriasis, gout, varicose veins</p>
                        </div>
                      </div>
                    </div>

                    <div className="panchakarma-section">
                      <h3>The Panchakarma Process</h3>
                      <div className="process-steps">
                        <div className="step">
                          <h4>1. Purva Karma (Preparation)</h4>
                          <p>Internal and external oleation (snehana) and fomentation (swedana) to loosen toxins</p>
                        </div>
                        <div className="step">
                          <h4>2. Pradhana Karma (Main Procedures)</h4>
                          <p>The five main therapeutic procedures performed in specific sequence</p>
                        </div>
                        <div className="step">
                          <h4>3. Paschat Karma (Post-Treatment)</h4>
                          <p>Dietary regimen, lifestyle recommendations, and rejuvenation therapies</p>
                        </div>
                      </div>
                    </div>

                    <div className="panchakarma-section">
                      <h3>Benefits of Panchakarma</h3>
                      <ul>
                        <li><strong>Deep Detoxification:</strong> Removes accumulated toxins and metabolic waste</li>
                        <li><strong>Dosha Balance:</strong> Restores constitutional harmony</li>
                        <li><strong>Disease Prevention:</strong> Strengthens immunity and prevents chronic diseases</li>
                        <li><strong>Mental Clarity:</strong> Improves concentration and reduces stress</li>
                        <li><strong>Rejuvenation:</strong> Promotes longevity and vitality</li>
                        <li><strong>Weight Management:</strong> Balances metabolism and reduces ama</li>
                      </ul>
                    </div>

                    <div className="panchakarma-section">
                      <h3>Who Should Consider Panchakarma?</h3>
                      <div className="indications-grid">
                        <div className="indication-group">
                          <h4>Physical Conditions</h4>
                          <ul>
                            <li>Chronic fatigue</li>
                            <li>Digestive disorders</li>
                            <li>Skin conditions</li>
                            <li>Joint pain</li>
                            <li>Respiratory issues</li>
                          </ul>
                        </div>
                        <div className="indication-group">
                          <h4>Mental Conditions</h4>
                          <ul>
                            <li>Stress & anxiety</li>
                            <li>Depression</li>
                            <li>Insomnia</li>
                            <li>Mental fatigue</li>
                            <li>Memory issues</li>
                          </ul>
                        </div>
                        <div className="indication-group">
                          <h4>Preventive Care</h4>
                          <ul>
                            <li>Seasonal detoxification</li>
                            <li>Anti-aging therapy</li>
                            <li>Immune enhancement</li>
                            <li>Weight management</li>
                            <li>Longevity promotion</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="panchakarma-section">
                      <h3>Important Considerations</h3>
                      <div className="considerations">
                        <div className="warning">
                          <h4>⚠️ Professional Supervision Required</h4>
                          <p>Panchakarma should only be performed under the guidance of qualified Ayurvedic physicians.</p>
                        </div>
                        <div className="contraindications">
                          <h4>Contraindications</h4>
                          <ul>
                            <li>Pregnancy and lactation</li>
                            <li>Acute infections or fever</li>
                            <li>Severe anemia or weakness</li>
                            <li>Recent surgery or trauma</li>
                            <li>Certain cardiac conditions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </React.Fragment>
        ))}

        {/* Display dynamic chat elements */}
        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {assessmentProgress && (
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(assessmentProgress.current / assessmentProgress.total) * 100}%`
              }}
            />
            <span className="progress-text">
              Question {assessmentProgress.current} of {assessmentProgress.total}
            </span>
          </div>
        )}

        {/* Assessment results appear after all messages */}
        {showResults && doshaResults && (
          <div
            className={`chat-result-wrapper ${resultsVisible ? 'fade-in' : ''}`}
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
          >
            <ChatResult doshaResults={doshaResults} />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input-area">
        <input
          type="text"
          className="chatbot-input"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="chatbot-send-btn"
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;