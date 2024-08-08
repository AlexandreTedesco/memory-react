import React, { useState } from 'react';
import GameBoard from './GameBoard';
import './App.css';

const App = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const handleScoreUpdate = (roundScore) => {
    setScore(roundScore); // Met à jour le score avec le score du tour
    setBestScore(prevBestScore => Math.max(prevBestScore, roundScore)); // Met à jour le meilleur score
  };

  const handleGameComplete = () => {
    setLevel(prevLevel => prevLevel + 1); // Passe au niveau suivant
    setScore(0); // Réinitialise le score pour le nouveau niveau
  };

  const resetLevel = () => {
    setLevel(1); // Réinitialiser le niveau à 1
    setScore(0); // Réinitialiser le score
  };

  return (
    <div className="app">
      <h1>Memory Game</h1>
      <p>Level: {level}</p>
      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>
      <GameBoard
        level={level}
        onScoreUpdate={handleScoreUpdate}
        onGameComplete={handleGameComplete}
        resetLevel={resetLevel} 
      />
    </div>
  );
};

export default App;