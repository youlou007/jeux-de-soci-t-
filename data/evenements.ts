
import type { Evenement } from '../types';

export const evenementsDeck: Evenement[] = [
  {
    id: 'evt-1',
    titre: 'Le Compliment Forcé',
    description: 'Vote Inversé : Vous votez pour le MOINS susceptible. Le joueur désigné ne prend pas de point, tous les autres prennent 1 point Seum !',
  },
  {
    id: 'evt-2',
    titre: 'La Vengeance',
    description: 'Le joueur avec le plus de points Seum choisit la prochaine question parmi 3 propositions. La vengeance est un plat qui se mange froid...',
  },
  {
    id: 'evt-3',
    titre: 'Tournée Générale',
    description: 'Pas de vote ce tour-ci ! Tout le monde prend 1 point Seum, sauf le joueur qui a pioché la carte. Santé !',
  },
  {
    id: 'evt-4',
    titre: 'Immunité Diplomatique',
    description: 'Le joueur qui pioche cette carte est intouchable pour ce tour. Personne ne peut voter contre lui. Profites-en bien, petit ange.',
  },
];
