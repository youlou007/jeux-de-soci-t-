import React, { useState } from 'react';
import type { Player } from '../types';

const PLAYER_COLORS = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-400', 
  'bg-orange-500', 'bg-purple-500', 'bg-pink-500', 'bg-black'
];

interface PlayerSetupProps {
  onStartGame: (players: Player[]) => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStartGame }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PLAYER_COLORS[0]);
  const [error, setError] = useState<string | null>(null);

  const availableColors = PLAYER_COLORS.filter(color => !players.some(p => p.color === color));

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) {
      setError('Le nom ne peut pas être vide.');
      return;
    }
    if (players.length >= 8) {
      setError('Maximum 8 joueurs.');
      return;
    }

    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name: newPlayerName.trim(),
      color: selectedColor,
      seumScore: 0,
      hasUsedCoupDouble: false,
    };

    setPlayers([...players, newPlayer]);
    setNewPlayerName('');
    setError(null);
    if (availableColors.length > 1) {
        setSelectedColor(availableColors[1]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-8 animate-fade-in-down">
        <h1 className="font-display text-6xl md:text-8xl font-bold text-yellow-400 drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]">
          MANGE TON SEUM
        </h1>
        <p className="text-slate-300 text-lg md:text-xl mt-2">Le jeu qui teste les amitiés</p>
      </div>

      <div className="w-full max-w-md bg-slate-800 p-6 rounded-2xl shadow-2xl space-y-6">
        <h2 className="font-display text-3xl text-center text-white">Ajouter des Joueurs</h2>
        
        {error && <p className="text-red-400 text-center">{error}</p>}
        
        <div className="space-y-4">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Nom du joueur"
            className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
          />
          <div className="grid grid-cols-4 gap-3">
            {availableColors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`h-12 w-full rounded-lg transition-transform transform hover:scale-110 ${color} ${selectedColor === color ? 'ring-4 ring-offset-2 ring-offset-slate-800 ring-yellow-400' : ''}`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleAddPlayer}
          disabled={players.length >= 8 || !newPlayerName.trim()}
          className="w-full font-display bg-pink-600 text-white font-bold py-3 px-4 rounded-lg text-xl hover:bg-pink-700 active:scale-95 transition-transform disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          Ajouter
        </button>

        <div className="space-y-2">
            <h3 className="font-display text-xl text-center">Joueurs Inscrits</h3>
            <div className="flex flex-wrap gap-2 justify-center">
            {players.map(player => (
                <div key={player.id} className={`flex items-center gap-2 text-white font-bold px-3 py-1 rounded-full text-sm ${player.color}`}>
                    <span>{player.name}</span>
                </div>
            ))}
            </div>
        </div>

        {players.length >= 2 && (
          <button
            onClick={() => onStartGame(players)}
            className="w-full font-display bg-green-500 text-white font-bold py-4 px-4 rounded-lg text-2xl hover:bg-green-600 active:scale-95 transition-transform animate-pulse"
          >
            Lancer la Partie !
          </button>
        )}
      </div>
    </div>
  );
};

export default PlayerSetup;