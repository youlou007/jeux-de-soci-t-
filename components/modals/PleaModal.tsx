import React, { useState, useEffect, useRef } from 'react';
import Modal from '../Modal';
import type { Player } from '../../types';

interface PleaModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  applyVerdict: (playerId: string, amount: number) => void;
}

const PleaModal: React.FC<PleaModalProps> = ({ isOpen, onClose, players, applyVerdict }) => {
  const [duration, setDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [view, setView] = useState<'timer' | 'verdict'>('timer');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
        // Simple beep sound to avoid external dependencies
        const beepSound = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=";
        audioRef.current = new Audio(beepSound);
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsActive(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            audioRef.current?.play();
            setView('verdict');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);
  
  useEffect(() => {
    // Reset timer and view when modal is opened
    if (isOpen) {
        setIsActive(false);
        setTimeLeft(duration);
        setView('timer');
        setSelectedPlayerId(null);
    }
  }, [isOpen, duration]);

  const handleStart = () => {
    setTimeLeft(duration);
    setIsActive(true);
  };
  
  const handleClose = () => {
    setIsActive(false);
    setTimeLeft(duration);
    setView('timer');
    setSelectedPlayerId(null);
    onClose();
  }

  const handleVerdict = (amount: number) => {
    if (selectedPlayerId) {
        applyVerdict(selectedPlayerId, amount);
        handleClose();
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
        {view === 'timer' && (
             <div className="text-center">
                <h2 className="font-display text-3xl mb-4 text-yellow-400">Plaidoirie</h2>
                <p className="text-slate-300 mb-6">Le chrono pour la défense de l'accusé.</p>
                
                <div className="font-display text-7xl my-6">{formatTime(timeLeft)}</div>

                <div className="flex justify-center gap-2 mb-6">
                    {[60, 90, 120].map(time => (
                        <button 
                            key={time}
                            onClick={() => setDuration(time)}
                            className={`px-4 py-2 rounded-lg font-bold ${duration === time ? 'bg-pink-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                        >
                            {formatTime(time)}
                        </button>
                    ))}
                </div>
                
                <button 
                    onClick={handleStart} 
                    disabled={isActive && timeLeft > 0}
                    className="font-display w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg text-xl hover:bg-green-600 active:scale-95 transition-transform disabled:bg-slate-600"
                >
                {isActive ? 'En Cours...' : 'START'}
                </button>
            </div>
        )}
        {view === 'verdict' && (
             <div className="text-center">
                <h2 className="font-display text-3xl mb-4 text-yellow-400">Le Verdict !</h2>
                <p className="text-slate-300 mb-6">Sélectionnez un joueur et rendez votre jugement.</p>
                
                <div className="grid grid-cols-2 gap-2 mb-6 max-h-48 overflow-y-auto">
                    {players.map(player => (
                        <button
                            key={player.id}
                            onClick={() => setSelectedPlayerId(player.id)}
                            className={`p-3 rounded-lg text-white font-bold text-lg transition-all ${player.color} ${selectedPlayerId === player.id ? 'ring-4 ring-offset-2 ring-offset-slate-800 ring-yellow-400' : 'opacity-70 hover:opacity-100'}`}
                        >
                            {player.name}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => handleVerdict(-1)}
                        disabled={!selectedPlayerId}
                        className="font-display flex-1 bg-green-500 text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-green-600 active:scale-95 transition-transform disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        Convaincant <span className="font-sans">(-1 Seum)</span>
                    </button>
                    <button
                        onClick={() => handleVerdict(2)}
                        disabled={!selectedPlayerId}
                        className="font-display flex-1 bg-red-600 text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-red-700 active:scale-95 transition-transform disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        Nuuulllll <span className="font-sans">(+2 Seum)</span>
                    </button>
                </div>
            </div>
        )}
    </Modal>
  );
};

export default PleaModal;