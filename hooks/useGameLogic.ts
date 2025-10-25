import { useState, useCallback } from 'react';
import type { Player, Question, Evenement } from '../types';
import { questionsDeck as initialQuestions } from '../data/questions';
import { evenementsDeck as initialEvents } from '../data/evenements';

const GAGE_SCORE = 5;
const EVENT_CHANCE = 0.33;

const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const useGameLogic = (initialPlayers: Player[]) => {
  const [players, setPlayers] = useState<Player[]>(() => shuffle(initialPlayers));
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const [questionDeck, setQuestionDeck] = useState<Question[]>(() => shuffle(initialQuestions));
  const [eventDeck] = useState<Evenement[]>(() => shuffle(initialEvents));
  const [drawnQuestions, setDrawnQuestions] = useState<Question[]>([]);
  
  const [turnState, setTurnState] = useState<'drawing' | 'voting'>('drawing');
  const [isCoupDoubleActive, setIsCoupDoubleActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentEvent, setCurrentEvent] = useState<Evenement | null>(null);
  const [showActe2, setShowActe2] = useState(false);

  const [playerToGetGage, setPlayerToGetGage] = useState<Player | null>(null);
  const [vengeanceChoices, setVengeanceChoices] = useState<Question[]>([]);

  const currentPlayer = players[currentPlayerIndex];

  const nextTurn = useCallback((switchToVoting = false) => {
    if (switchToVoting) {
        setTurnState('voting');
    } else {
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
        setTurnState('drawing');
        setCurrentQuestion(null);
        setCurrentEvent(null);
        setShowActe2(false);
        setIsCoupDoubleActive(false);
    }
  }, [players.length]);


  const checkGage = (updatedPlayers: Player[]) => {
      const gagedPlayer = updatedPlayers.find(p => p.seumScore >= GAGE_SCORE && players.find(op => op.id === p.id)!.seumScore < GAGE_SCORE);
      if (gagedPlayer) {
          setPlayerToGetGage(gagedPlayer);
      } else {
          nextTurn();
      }
  };

  const handleVote = (votedPlayerId: string) => {
    let updatedPlayers = [...players];
    const pointsToAdd = isCoupDoubleActive ? 2 : 1;

    if (currentEvent?.titre === 'Le Compliment Forcé') {
      updatedPlayers = updatedPlayers.map(p => {
        if (p.id !== votedPlayerId) {
          return { ...p, seumScore: p.seumScore + 1 };
        }
        return p;
      });
    } else {
      updatedPlayers = updatedPlayers.map(p =>
        p.id === votedPlayerId ? { ...p, seumScore: p.seumScore + pointsToAdd } : p
      );
    }
    
    if (isCoupDoubleActive) {
        updatedPlayers = updatedPlayers.map(p =>
            p.id === currentPlayer.id ? { ...p, hasUsedCoupDouble: true } : p
        );
        setIsCoupDoubleActive(false); // Reset after use
    }
    
    setPlayers(updatedPlayers);
    checkGage(updatedPlayers);
  };
  
  const handleDrawCard = (highestScorer: Player) => {
    setCurrentQuestion(null);
    setCurrentEvent(null);
    setShowActe2(false);

    let deck = [...questionDeck];
    if (deck.length === 0) {
        deck = shuffle(drawnQuestions);
        setQuestionDeck(deck);
        setDrawnQuestions([]);
    }

    if (Math.random() < EVENT_CHANCE) {
        const event = eventDeck[Math.floor(Math.random() * eventDeck.length)];
        setCurrentEvent(event);

        if (event.titre === 'Tournée Générale') {
            const updatedPlayers = players.map(p =>
                p.id !== currentPlayer.id ? { ...p, seumScore: p.seumScore + 1 } : p
            );
            setPlayers(updatedPlayers);
            // No vote, directly check for gage
            checkGage(updatedPlayers);
            return;
        }

        if (event.titre === 'La Vengeance') {
            const choices: Question[] = [];
            const tempDeck = [...deck];
            for (let i = 0; i < 3 && tempDeck.length > 0; i++) {
                const choiceIndex = Math.floor(Math.random() * tempDeck.length);
                choices.push(tempDeck.splice(choiceIndex, 1)[0]);
            }
            setVengeanceChoices(choices);
            return; 
        }
    }
    
    // Regular question draw if no blocking event
    const [nextQuestion, ...restOfDeck] = deck;
    setCurrentQuestion(nextQuestion);
    setDrawnQuestions(prev => [...prev, nextQuestion]);
    setQuestionDeck(restOfDeck);
  };

  const handleSkipQuestion = () => {
    setCurrentQuestion(null);
    setCurrentEvent(null);
    setShowActe2(false);
  };
  
  const handleGageAcknowledged = () => {
    if (playerToGetGage) {
        setPlayers(players.map(p => p.id === playerToGetGage.id ? { ...p, seumScore: 0 } : p));
        setPlayerToGetGage(null);
        nextTurn();
    }
  };

  const addPlayerMidGame = (name: string, color: string, seumScore: number) => {
    const newPlayer: Player = { id: crypto.randomUUID(), name, color, seumScore, hasUsedCoupDouble: false };
    setPlayers(prev => [...prev, newPlayer]);
  };

  const updatePlayerScore = (playerId: string, newScore: number) => {
    const score = Math.max(0, Math.min(4, newScore || 0));
    setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, seumScore: score } : p));
  };

  const removePlayer = (playerIdToRemove: string) => {
    if (players.length <= 2) {
        return; // Prevent removing players if it would break the game
    }
    
    const playerIndexToRemove = players.findIndex(p => p.id === playerIdToRemove);
    if (playerIndexToRemove === -1) return;

    const newPlayers = players.filter(p => p.id !== playerIdToRemove);
    setPlayers(newPlayers);
    
    // Adjust currentPlayerIndex to maintain turn order
    if (playerIndexToRemove < currentPlayerIndex) {
      setCurrentPlayerIndex(prev => prev - 1);
    } else if (playerIndexToRemove === currentPlayerIndex) {
      // If the current player was removed, the index is now pointing to the next player.
      // But if it was the *last* player in the array, the index is now out of bounds.
      setCurrentPlayerIndex(prev => prev % newPlayers.length);
    }
  };

  const closeVengeanceModal = () => setVengeanceChoices([]);

  const chooseVengeanceQuestion = (question: Question) => {
    setCurrentQuestion(question);
    const updatedDeck = questionDeck.filter(q => q.id !== question.id);
    setQuestionDeck(updatedDeck);
    setDrawnQuestions(prev => [...prev, question]);
    closeVengeanceModal();
  };

  const applyPleaVerdict = (playerId: string, amount: number) => {
    setPlayers(prevPlayers => prevPlayers.map(p => {
        if (p.id === playerId) {
            return { ...p, seumScore: Math.max(0, p.seumScore + amount) };
        }
        return p;
    }));
  };

  return {
    players,
    currentPlayer,
    currentPlayerIndex,
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
    handleSkipQuestion
  };
};