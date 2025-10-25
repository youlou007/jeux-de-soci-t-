export interface Player {
  id: string;
  name: string;
  color: string; // ex: 'bg-red-500' (classe Tailwind)
  seumScore: number;
  hasUsedCoupDouble: boolean;
}

export interface CarteBase {
  id: string;
}

export interface QuestionSolo extends CarteBase {
  type: 'question-solo';
  categorie: string;
  texte: string;
}

export interface QuestionDuo extends CarteBase {
  type: 'question-duo';
  categorie: string;
  acte1: string;
  acte2: string;
}

export interface Evenement extends CarteBase {
  titre: string;
  description: string;
}

export type Question = QuestionSolo | QuestionDuo;