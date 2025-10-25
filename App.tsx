
import React, { useState } from 'react';
import type { Player } from './types';
import PlayerSetup from './components/PlayerSetup';
import Game from './components/Game';

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const handleStartGame = (initialPlayers: Player[]) => {
    setPlayers(initialPlayers);
    setGameStarted(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 selection:bg-pink-500 selection:text-white">
      {gameStarted ? (
        <Game initialPlayers={players} />
      ) : (
        <PlayerSetup onStartGame={handleStartGame} />
      )}
    </div>
  );
};

export default App;
