
import React from 'react';
import type { Question } from '../../types';
import Modal from '../Modal';

interface VengeanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  onSelect: (question: Question) => void;
}

const VengeanceModal: React.FC<VengeanceModalProps> = ({ isOpen, onClose, questions, onSelect }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <h2 className="font-display text-3xl mb-4 text-yellow-400">La Vengeance !</h2>
        <p className="text-slate-300 mb-6">Choisis la question qui sèmera le plus la zizanie.</p>
        <div className="space-y-3">
          {questions.map((q) => (
            <button
              key={q.id}
              onClick={() => onSelect(q)}
              className="w-full text-left p-4 bg-slate-700 rounded-lg hover:bg-pink-900/50 border border-slate-600 transition-colors"
            >
              <p className="text-xs font-bold text-pink-400">{q.categorie}</p>
              <p className="text-white">
                {q.type === 'question-solo' ? `Le plus susceptible de... ${q.texte}` : q.acte1}
              </p>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default VengeanceModal;
