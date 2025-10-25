import React, { useState, useMemo, useEffect } from 'react';
import type { Player } from '../../types';
import Modal from '../Modal';

const PLAYER_COLORS = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-400', 
    'bg-orange-500', 'bg-purple-500', 'bg-pink-500', 'bg-black'
];

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlayer: (name: string, color: string, seumScore: number) => void;
  players: Player[];
  onRemovePlayer: (playerId: string) => void;
  onUpdatePlayerScore: (playerId: string, score: number) => void;
}

const AddPlayerModal: React.FC<AddPlayerModalProps> = ({ isOpen, onClose, onAddPlayer, players, onRemovePlayer, onUpdatePlayerScore }) => {
  const [name, setName] = useState('');
  const [score, setScore] = useState(0);
  const [error, setError] = useState('');

  const availableColors = useMemo(() => PLAYER_COLORS.filter(color => !players.some(p => p.color === color)), [players]);
  const [selectedColor, setSelectedColor] = useState(availableColors[0] || '');

  useEffect(() => {
    if (isOpen) {
        setError('');
        setName('');
        setScore(0);
        if(availableColors.length > 0) {
            setSelectedColor(availableColors[0]);
        }
    }
  }, [isOpen, availableColors]);

  const handleSubmit = () => {
    if (!name.trim()) {
        setError('Le nom est requis.');
        return;
    }
    if (players.length >= 8) {
        setError('Maximum 8 joueurs.');
        return;
    }
    if (!selectedColor) {
        setError('Veuillez choisir une couleur.');
        return;
    }
    setError('');
    onAddPlayer(name, selectedColor, score);
    setName('');
    setScore(0);
    // Let useEffect handle the next color
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <h2 className="font-display text-3xl text-center text-yellow-400">Gérer les Joueurs</h2>
        
        <div>
            <h3 className="font-display text-xl mb-2 text-slate-300">Joueurs actuels</h3>
            <div className="space-y-2 max-h-52 overflow-y-auto pr-2">
                {players.map(player => (
                    <div key={player.id} className="flex items-center gap-3 bg-slate-700 p-2 rounded-lg">
                        <div className={`w-4 h-4 rounded-full flex-shrink-0 ${player.color}`} />
                        <span className="flex-grow text-left font-bold truncate" title={player.name}>{player.name}</span>
                        <input
                            type="number"
                            aria-label={`Score de Seum pour ${player.name}`}
                            value={player.seumScore}
                            onChange={(e) => onUpdatePlayerScore(player.id, parseInt(e.target.value, 10))}
                            min="0"
                            max="4"
                            className="w-16 bg-slate-600 text-white text-center rounded-md py-1 border border-slate-500"
                        />
                        <button 
                            onClick={() => onRemovePlayer(player.id)} 
                            disabled={players.length <= 2}
                            className="text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label={`Retirer ${player.name}`}
                        >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>

        {players.length < 8 && (
            <div>
                 <hr className="border-slate-600 my-4" />
                 <h3 className="font-display text-xl mb-2 text-slate-300">Ajouter un nouveau joueur</h3>
                 {error && <p className="text-red-400 mb-2 text-sm">{error}</p>}
                 <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nom du joueur"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                    />
                    <input
                        type="number"
                        placeholder="Score de Seum initial"
                        value={score}
                        onChange={(e) => setScore(Math.min(3, Math.max(0, parseInt(e.target.value, 10) || 0)))}
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
                    <button onClick={handleSubmit} className="font-display w-full bg-pink-600 text-white font-bold py-3 px-4 rounded-lg text-xl hover:bg-pink-700 active:scale-95 transition-transform">
                        Ajouter
                    </button>
                 </div>
            </div>
        )}
      </div>
    </Modal>
  );
};

export default AddPlayerModal;