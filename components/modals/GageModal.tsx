
import React from 'react';
import type { Player } from '../../types';
import Modal from '../Modal';

interface GageModalProps {
  isOpen: boolean;
  player: Player | null;
  onAcknowledge: () => void;
}

const GageModal: React.FC<GageModalProps> = ({ isOpen, player, onAcknowledge }) => {
  if (!player) return null;

  return (
    <Modal isOpen={isOpen} onClose={onAcknowledge}>
      <div className="text-center p-4">
        <h2 className="font-display text-5xl text-red-500 animate-pulse mb-4">GAGE !</h2>
        <p className="text-2xl mb-6">
          <span className={`font-bold ${player.color.replace('bg-', 'text-')}`}>{player.name}</span> a atteint {player.seumScore} points !
        </p>
        <p className="text-slate-300 mb-6">Les autres joueurs décident de son sort. Une fois la sentence exécutée, cliquez ci-dessous.</p>
        <button 
          onClick={onAcknowledge}
          className="font-display bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-xl hover:bg-green-600 active:scale-95 transition-transform"
        >
          Gage Effectué
        </button>
      </div>
    </Modal>
  );
};

export default GageModal;
