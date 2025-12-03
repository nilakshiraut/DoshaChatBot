import React from 'react';
import { therapies, doshaDietaryRecommendations } from '../data/therapies';
import starIcon from '../assets/star.png';

const ChatResult = ({ doshaResults }) => {
  if (!doshaResults) {
    return (
      <div className="chat-result">
        <h2 className="result-title">No Results Available</h2>
        <p>Please complete the assessment to see your dosha results.</p>
      </div>
    );
  }

  const { percentages, dominant_dosha, secondary_dosha } = doshaResults;

  const doshaColors = {
    vata: '#0B5A42',
    pitta: '#0B5A42',
    kapha: '#0B5A42'
  };

  const doshaNames = {
    vata: 'Vata',
    pitta: 'Pitta',
    kapha: 'Kapha'
  };

  const doshaDescriptions = {
    vata: 'Air & Ether - Creative, quick, light',
    pitta: 'Fire & Water - Intense, ambitious, sharp',
    kapha: 'Earth & Water - Calm, stable, grounded'
  };

  // Get therapies based on dominant dosha using authentic Panchakarma procedures
  const getRecommendedTherapies = () => {
    // Primary Panchakarma therapies based on dosha imbalance
    if (dominant_dosha === 'vata') {
      // Vata is treated with Basti (enema) as primary therapy
      return therapies.filter(t =>
        ['Basti', 'Nasya', 'Virechana'].includes(t.name)
      );
    } else if (dominant_dosha === 'pitta') {
      // Pitta is treated with Virechana (purgation) as primary therapy
      return therapies.filter(t =>
        ['Virechana', 'Nasya', 'Raktamokshana'].includes(t.name)
      );
    } else if (dominant_dosha === 'kapha') {
      // Kapha is treated with Vamana (emesis) as primary therapy
      return therapies.filter(t =>
        ['Vamana', 'Nasya', 'Virechana'].includes(t.name)
      );
    }
    return therapies.slice(0, 3); // fallback to first 3
  };

  const recommendedTherapies = getRecommendedTherapies();
  const dietaryRecs = doshaDietaryRecommendations[dominant_dosha];

  return (
    <div className="chat-result">
      <h2 className="result-title">Your Ayurvedic Profile</h2>

      {/* Dosha Badge */}
      <div className="dosha-badge">
        <span className="dosha-badge-text">
          {doshaNames[dominant_dosha]} Dominant
        </span>
      </div>

      {/* Summary Paragraph */}
      <div className="profile-summary">
        <p>
          Your unique dosha combination reveals a {doshaNames[dominant_dosha].toLowerCase()}-{secondary_dosha ? doshaNames[secondary_dosha].toLowerCase() + ' ' : ''}constitution.
          Understanding your Ayurvedic profile helps identify personalized wellness practices and dietary recommendations for optimal health and balance.
        </p>
      </div>

      {/* Dosha Chart */}
      <div className="dosha-chart">
        {Object.entries(percentages).map(([dosha, percentage]) => (
          <div key={dosha} className="dosha-item">
            <div className="dosha-circle-container">
              <svg className="dosha-circle" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="rgba(11, 90, 66, 0.1)"
                  strokeWidth="10"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke={doshaColors[dosha]}
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - percentage / 100)}`}
                  strokeLinecap="round"
                  className="dosha-progress"
                />
              </svg>
              <div className="dosha-percentage">{percentage}%</div>
            </div>
            <h3 className={`dosha-name ${dosha === dominant_dosha ? 'dominant' : ''}`}>
              {doshaNames[dosha]}
              {dosha === dominant_dosha && (
                <img src={starIcon} alt="Dominant Dosha" style={{ width: '16px', height: '16px', marginLeft: '5px', verticalAlign: 'middle' }} />
              )}
            </h3>
            <p className="dosha-description">{doshaDescriptions[dosha]}</p>
          </div>
        ))}
      </div>

      {/* Therapy Cards Grid */}
      <div className="therapy-recommendations">
        <h3 className="recommendations-title">Recommended Therapies</h3>
        <div className="therapy-grid">
          {recommendedTherapies.map((therapy) => (
            <div key={therapy.id} className="profile-therapy-card">
              <img
                src={therapy.image}
                alt={therapy.name}
                className="profile-therapy-image"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&crop=center';
                }}
              />
              <div className="profile-therapy-content">
                <h4 className="profile-therapy-name">{therapy.name}</h4>
                <p className="profile-therapy-description">{therapy.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dietary Recommendations */}
      {dietaryRecs && (
        <div className="dietary-recommendations">
          <h3 className="recommendations-title">Dietary Recommendations</h3>
          <div className="dietary-content">
            <p className="general-advice">{dietaryRecs.general}</p>
            <div className="food-lists">
              <div className="food-favor">
                <h4>Foods to Favor:</h4>
                <ul>
                  {dietaryRecs.foodsToFavor.map((food, index) => (
                    <li key={index}>{food}</li>
                  ))}
                </ul>
              </div>
              <div className="food-avoid">
                <h4>Foods to Avoid:</h4>
                <ul>
                  {dietaryRecs.foodsToAvoid.map((food, index) => (
                    <li key={index}>{food}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatResult;