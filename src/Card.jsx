import React from 'react';
import './Card.css';

const Card = ({ card, onClick }) => {
  return (
    <div
      className={`card ${card.isClicked ? 'clicked' : ''}`} // Ajout d'une classe conditionnelle
      style={{ backgroundColor: card.color }}
      onClick={() => onClick(card.id)} // Appelez toujours onClick, peu importe l'état de isClicked
    >
      {card.shape}
    </div>
  );
};

export default Card;