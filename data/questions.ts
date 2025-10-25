
import type { QuestionSolo, QuestionDuo } from '../types';

export const questionsDeck: (QuestionSolo | QuestionDuo)[] = [
  // Nourriture & Boissons
  { id: 'q-solo-1', type: 'question-solo', categorie: '🍝 Nourriture & Boissons 🍹', texte: "dire qu'il déteste les fast-foods mais de finir un sceau de 20 nuggets à 3h du matin." },
  { id: 'q-solo-2', type: 'question-solo', categorie: '🍝 Nourriture & Boissons 🍹', texte: "changer d'avis sur le choix du restaurant alors que tout le monde est déjà en route." },
  { id: 'q-solo-3', type: 'question-solo', categorie: '🍝 Nourriture & Boissons 🍹', texte: "commander le plat le plus cher de la carte puis de se plaindre que c'est trop cher." },
  { id: 'q-solo-4', type: 'question-solo', categorie: '🍝 Nourriture & Boissons 🍹', texte: "défendre corps et âme que l'ananas sur la pizza est un crime, mais d'en manger en cachette." },

  // Culture Pop & Divertissement
  { id: 'q-solo-5', type: 'question-solo', categorie: '🍿 Culture Pop & Divertissement 🎬', texte: "critiquer une série pendant 8 épisodes et de la regarder quand même jusqu'au bout." },
  { id: 'q-solo-6', type: 'question-solo', categorie: '🍿 Culture Pop & Divertissement 🎬', texte: 'dire "la musique c\'était mieux avant" mais de connaître par cœur les paroles du dernier hit TikTok.' },
  { id: 'q-solo-7', type: 'question-solo', categorie: '🍿 Culture Pop & Divertissement 🎬', texte: 'spoiler la fin d\'un film en commençant sa phrase par "T\'inquiète, je ne te spoile pas, mais...".' },

  // Scénarios Absurdes
  { id: 'q-solo-8', type: 'question-solo', categorie: '🧟 Scénarios Absurdes & Hypothetiques 🧟', texte: "en cas d'apocalypse zombie, de d'abord essayer de négocier avec les zombies avant de s'enfuir." },
  { id: 'q-solo-9', type: 'question-solo', categorie: '🧟 Scénarios Absurdes & Hypothetiques 🧟', texte: "s'il gagnait au loto, de dire qu'il va tout donner à des œuvres de charité, puis d'acheter une île privée le lendemain." },
  { id: 'q-solo-10', type: 'question-solo', categorie: '🧟 Scénarios Absurdes & Hypothetiques 🧟', texte: "être le premier à trahir le groupe pour survivre dans un film d'horreur." },

  // Vie Quotidienne
  { id: 'q-solo-11', type: 'question-solo', categorie: '🏖️ Vie Quotidienne & Relations Sociales 🤝', texte: "dire \"oui\" à une invitation puis d'annuler 5 minutes avant avec une excuse improbable." },
  { id: 'q-solo-12', type: 'question-solo', categorie: '🏖️ Vie Quotidienne & Relations Sociales 🤝', texte: "donner des conseils en amour qu'il n'applique jamais à lui-même." },
  { id: 'q-solo-13', type: 'question-solo', categorie: '🏖️ Vie Quotidienne & Relations Sociales 🤝', texte: "dire \"je suis en route\" alors qu'il est encore en pyjama dans son lit." },

  // Dilemmes de Survie
  { id: 'q-duo-1', type: 'question-duo', categorie: '💀 Dilemmes de Survie & Scénarios Catastrophes 🌋', acte1: "En cas d'apocalypse zombie, qui serait le plus susceptible de pousser quelqu'un d'autre pour sauver sa propre peau ?", acte2: "...et qui serait la personne poussée parce qu'elle trébuche tout le temps ?" },
  { id: 'q-duo-2', type: 'question-duo', categorie: '💀 Dilemmes de Survie & Scénarios Catastrophes 🌋', acte1: "S'il ne restait qu'une seule barre de céréales pour tout le groupe, qui la mangerait en cachette au milieu de la nuit ?", acte2: "...et à qui appartenait cette barre de céréales à l'origine ?" },
  
  // Trahisons du Quotidien
  { id: 'q-duo-3', type: 'question-duo', categorie: '🤝 Trahisons du Quotidien & Amitiés en Danger 💔', acte1: "Qui est le plus susceptible de raconter LE secret le plus embarrassant de quelqu'un d'autre pour faire rire la galerie ?", acte2: "...et qui a le secret le plus croustillant qui attend d'être révélé ?" },
  { id: 'q-duo-4', type: 'question-duo', categorie: '🤝 Trahisons du Quotidien & Amitiés en Danger 💔', acte1: "Au restaurant, qui est le plus susceptible de \"goûter\" dans l'assiette de quelqu'un d'autre et de prendre la meilleure bouchée ?", acte2: "...et qui commande toujours le plat qui fait le plus envie aux autres ?" },
  
  // Amour, Gloire et Jalousie
  { id: 'q-duo-5', type: 'question-duo', categorie: '❤️ Amour, Gloire et Jalousie ✨', acte1: "Qui est le plus susceptible de commencer à flirter avec le/la crush d'un(e) ami(e) juste \"pour voir\" ?", acte2: "...et qui est le/la pauvre ami(e) qui se ferait \"voler\" son crush sans rien voir venir ?" },
  { id: 'q-duo-6', type: 'question-duo', categorie: '❤️ Amour, Gloire et Jalousie ✨', acte1: "Qui \"aiderait\" un(e) ami(e) à choisir une tenue... en lui conseillant secrètement la moins belle pour briller davantage ?", acte2: "...et qui est l'ami(e) qui n'y verrait que du feu et dirait \"merci, tu gères\" ?" },
];
