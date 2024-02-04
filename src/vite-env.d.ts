/// <reference types="vite/client" />

export interface Paper {
  paper: string;
  year: string;
  p: number;
  physics: Question[];
  chemistry: Question[];
  mathematics: Question[];
  id: string;
}

export interface Question {
  type: "numerical" | "singleCorrect" | "multipleCorrect";
  pyq: Pyq;
  subject: string;
  chapters: string[];
  content: Content;
  solution: Content;
  correctValue?: null | string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  image?: any;
  isCorrect: boolean;
}

export interface Content {
  text: string;
  image?: any;
}

export interface Pyq {
  _id: string;
  title: string;
  isVisible: boolean;
}
