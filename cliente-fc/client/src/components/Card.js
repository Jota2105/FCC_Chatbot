import React from 'react';
import './card.css';


const Card = ({ title, icon, description, onClick }) => {
  return (
    <div className="card" onClick={onClick} role="button" tabIndex={0}>
      <div className="icon-container">
        {icon}
      </div>
      <div className="text-container">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
