import React from 'react';

const TherapyCard = ({ therapy }) => {
  if (!therapy) return null;

  return (
    <div className="profile-therapy-card">
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
  );
};

export default TherapyCard;