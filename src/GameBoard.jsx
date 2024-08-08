import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';

const shapes = ['Circle', 'Square', 'Triangle', 'Star'];
const colors = ['Red', 'Green', 'Blue', 'Yellow'];

const generateCards = (level) => {
  const cards = [];
  for (let i = 0; i < level * 4; i++) {
    const shape = shapes[i % shapes.length];
    const color = colors[Math.floor(i / shapes.length) % colors.length];
    cards.push({ id: i, shape, color, isClicked: false });
  }
  return cards.sort(() => Math.random() - 0.5); // Shuffle cards
};

// Fonction pour mélanger les cartes
const shuffleCards = (cards) => {
  return cards.sort(() => Math.random() - 0.5);
};

const GameBoard = ({ level, onScoreUpdate, onGameComplete, resetLevel }) => {
  const [cards, setCards] = useState(() => generateCards(level));
  const [score, setScore] = useState(0);

  const resetGame = useCallback(() => {
    setCards(generateCards(level)); // Générer de nouvelles cartes
    setScore(0); // Réinitialiser le score
  }, [level]);

  useEffect(() => {
    resetGame();
  }, [level, resetGame]);

  useEffect(() => {
    if (score === level * 4) { // Vérifiez si toutes les cartes ont été cliquées
      onScoreUpdate(score);
      onGameComplete();
    }
  }, [score, level, onScoreUpdate, onGameComplete]);

  const handleCardClick = (id) => {
    console.log(`Card clicked: ${id}`); // Log pour débogage
    setCards(prevCards => {
      const clickedCard = prevCards.find(card => card.id === id);
      console.log(`Clicked card ID: ${id}, isClicked: ${clickedCard.isClicked}`); // Log pour débogage

      // Vérifiez si la carte a déjà été cliquée
      if (clickedCard.isClicked) {
        // Si la carte a déjà été cliquée, réinitialisez le jeu
        console.log("Carte déjà cliquée, réinitialisation du jeu."); // Log pour débogage
        resetLevel(); // Réinitialiser le niveau dans le composant parent
        resetGame(); // Réinitialiser le jeu
        return prevCards; // Ne changez pas les cartes
      }

      // Mettez à jour l'état des cartes
      const newCards = prevCards.map(card => {
        if (card.id === id) {
          return { ...card, isClicked: true }; // Mettez à jour l'état de la carte
        }
        return card; // Retournez les autres cartes sans changement
      });

      // Incrémentez le score après la mise à jour des cartes
      const newScore = score + 1; // Incrémentez le score ici
      setScore(newScore); // Mettez à jour l'état local
      onScoreUpdate(newScore); // Passez le score mis à jour au composant parent

      // Mélangez les cartes après un clic valide
      const shuffledCards = shuffleCards(newCards);
      return shuffledCards; // Retournez le nouvel état des cartes mélangées
    });
  };

  return (
    <div className="game-board">
      {cards.map(card => (
        <Card
          key={card.id}
          card={card}
          onClick={() => handleCardClick(card.id)} // Gérer le clic sur la carte
        />
      ))}
    </div>
  );
};

export default GameBoard;