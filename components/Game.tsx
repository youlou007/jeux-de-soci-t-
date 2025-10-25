import React, { useState, useMemo } from 'react';
import type { Player, Question, Evenement } from '../types';
import { useGameLogic } from '../hooks/useGameLogic';
import Modal from './Modal';
import AddPlayerModal from './modals/AddPlayerModal';
import GageModal from './modals/GageModal';
import PleaModal from './modals/PleaModal';
import VengeanceModal from './modals/VengeanceModal';

interface GameProps {
    initialPlayers: Player[];
}

const Game: React.FC<GameProps> = ({ initialPlayers }) => {
    const {
        players,
        currentPlayer,
        turnState,
        currentQuestion,
        currentEvent,
        showActe2,
        playerToGetGage,
        vengeanceChoices,
        isCoupDoubleActive,
        setIsCoupDoubleActive,
        handleDrawCard,
        handleVote,
        handleGageAcknowledged,
        addPlayerMidGame,
        chooseVengeanceQuestion,
        setShowActe2,
        closeVengeanceModal,
        nextTurn,
        updatePlayerScore,
        removePlayer,
        applyPleaVerdict,
        handleSkipQuestion,
    } = useGameLogic(initialPlayers);

    const [isPleaModalOpen, setIsPleaModalOpen] = useState(false);
    const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);

    const highestScorer = useMemo(() => {
        return [...players].sort((a, b) => b.seumScore - a.seumScore)[0];
    }, [players]);

    const handleDrawAndTransition = () => {
        handleDrawCard(highestScorer);
    };

    const handleEndTurnAndVote = () => {
        nextTurn(true); // switch to voting state
    };


    return (
        <div className="flex flex-col min-h-screen p-2 md:p-4 pb-32">
            <header className="flex justify-between items-center mb-4">
                <div className="font-display text-xl md:text-2xl bg-slate-800 px-4 py-2 rounded-lg shadow-md">
                    Au tour de : <span className={`font-bold ${currentPlayer.color.replace('bg-', 'text-')}`}>{currentPlayer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setIsPleaModalOpen(true)} className="font-display bg-slate-700 text-white font-bold py-2 px-5 rounded-full hover:bg-yellow-500 transition-colors shadow-md">Chrono</button>
                    <button onClick={() => setIsAddPlayerModalOpen(true)} className="font-display bg-slate-700 text-white font-bold py-2 px-5 rounded-full hover:bg-blue-500 transition-colors shadow-md">Plus</button>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center space-y-6">
                {turnState === 'drawing' && (
                    <>
                        {currentEvent && (
                             <div className="w-full max-w-2xl bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-2xl shadow-lg border-2 border-purple-400 transform transition-transform duration-500 scale-100">
                                <h3 className="font-display text-3xl text-yellow-300 text-center mb-2">{currentEvent.titre}</h3>
                                <p className="text-center text-white">{currentEvent.description}</p>
                            </div>
                        )}
                        {currentQuestion && (
                             <div className="w-full max-w-2xl bg-white text-slate-800 p-6 rounded-2xl shadow-lg transform transition-transform duration-500 scale-100">
                                <p className="text-sm font-bold text-pink-600 mb-2">{currentQuestion.categorie}</p>
                                {currentQuestion.type === 'question-solo' ? (
                                    <p className="text-2xl font-semibold">Le plus susceptible de... {currentQuestion.texte}</p>
                                ) : (
                                    <>
                                        <p className="text-xl font-semibold mb-2"><span className="font-display text-pink-700">Acte 1:</span> {currentQuestion.acte1}</p>
                                        {showActe2 ? (
                                            <p className="text-xl font-semibold animate-pulse"><span className="font-display text-pink-700">Acte 2:</span> {currentQuestion.acte2}</p>
                                        ) : (
                                            <button onClick={() => setShowActe2(true)} className="font-display mt-2 w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-lg">Révéler l'Acte 2</button>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                        
                        {!currentQuestion && currentEvent?.titre !== "La Vengeance" && currentEvent?.titre !== "Tournée Générale" && (
                             <button onClick={handleDrawAndTransition} className="font-display text-4xl bg-yellow-400 text-slate-900 font-bold py-6 px-12 rounded-2xl shadow-lg hover:bg-yellow-300 transition-transform active:scale-95 animate-pulse">
                                Piocher
                             </button>
                        )}

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                            {(currentQuestion || currentEvent?.titre === "Tournée Générale") && (
                                <button onClick={handleEndTurnAndVote} className="font-display text-2xl bg-green-500 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:bg-green-600 transition-transform active:scale-95">
                                    Fin du Tour {'->'} Voter
                                </button>
                            )}
                             {currentQuestion && (
                                <button onClick={handleSkipQuestion} className="font-display text-lg bg-slate-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-slate-700 transition-transform active:scale-95">
                                    Passer la question
                                </button>
                            )}
                        </div>
                    </>
                )}

                {turnState === 'voting' && (
                    <div className="w-full max-w-3xl text-center">
                        <h2 className="font-display text-4xl mb-6 text-yellow-400">Qui a mangé son Seum ?</h2>
                        
                        <div className="mb-6">
                            <button
                                onClick={() => setIsCoupDoubleActive(prev => !prev)}
                                disabled={currentPlayer.hasUsedCoupDouble}
                                className={`font-display text-xl font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg border-2 border-transparent
                                ${ isCoupDoubleActive 
                                    ? 'bg-red-600 text-white animate-pulse ring-4 ring-red-400' 
                                    : 'bg-orange-500 text-white hover:bg-orange-600'
                                } 
                                disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed`}
                            >
                                Vote Double x2
                            </button>
                            {currentPlayer.hasUsedCoupDouble && (
                                <p className="text-sm text-slate-400 mt-2">Vous avez déjà utilisé votre Vote Double pour cette partie.</p>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {players.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => handleVote(p.id)}
                                    disabled={currentEvent?.titre === "Immunité Diplomatique" && p.id === currentPlayer.id}
                                    className={`p-4 rounded-lg text-white font-bold text-xl transition-transform active:scale-90 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed ${p.color} shadow-lg hover:scale-105`}
                                >
                                    {p.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm p-3 shadow-2xl-top">
                <h3 className="font-display text-center text-xl mb-2 text-yellow-400">Jauge de Seum</h3>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                    {players.map(p => (
                        <div key={p.id} className={`flex items-center gap-2 text-white font-bold px-3 py-1 rounded-full text-sm ${p.color} ${p.seumScore >= 5 ? 'animate-pulse ring-2 ring-red-500' : ''}`}>
                            <span>{p.name}</span>
                            <span className="bg-white/30 rounded-full w-6 h-6 flex items-center justify-center">{p.seumScore}</span>
                        </div>
                    ))}
                </div>
            </footer>
            
            <PleaModal 
                isOpen={isPleaModalOpen} 
                onClose={() => setIsPleaModalOpen(false)} 
                players={players}
                applyVerdict={applyPleaVerdict}
            />
            <AddPlayerModal 
                isOpen={isAddPlayerModalOpen} 
                onClose={() => setIsAddPlayerModalOpen(false)} 
                onAddPlayer={addPlayerMidGame} 
                players={players}
                onRemovePlayer={removePlayer}
                onUpdatePlayerScore={updatePlayerScore}
            />
            <VengeanceModal isOpen={vengeanceChoices.length > 0} onClose={closeVengeanceModal} questions={vengeanceChoices} onSelect={chooseVengeanceQuestion} />
            <GageModal isOpen={!!playerToGetGage} player={playerToGetGage} onAcknowledge={handleGageAcknowledged} />
        </div>
    );
};

export default Game;