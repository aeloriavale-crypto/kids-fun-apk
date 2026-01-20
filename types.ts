
export enum GameMode {
  LETTERS = 'LETTERS',
  NUMBERS = 'NUMBERS',
  SHAPES = 'SHAPES',
  IMAGES = 'IMAGES',
  HOME = 'HOME'
}

export interface GameItem {
  id: string;
  label: string;
  speechLabel: string; // النص الذي سيتم نطقه فعلياً
  content: string; 
  color: string;
}

export interface GameState {
  mode: GameMode;
  stageIndex: number; 
  roundIndex: number;
  isMusicEnabled: boolean;
}

export enum Language {
  AR = 'AR',
  EN = 'EN'
}
