
import React, { useState, useEffect, useCallback } from 'react';
import { GameMode, GameItem, Language } from '../types';
import { 
  getLettersItems, 
  getNumbersItems, 
  getShapesItems, 
  getImagesItems, 
  UI_STRINGS 
} from '../constants';
import { audioService } from '../services/audioService';
import { adService } from '../services/adService';

interface GameScreenProps {
  mode: GameMode;
  lang: Language;
  onExit: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ mode, lang, onExit }) => {
  const [stage, setStage] = useState(0); 
  const [correctItem, setCorrectItem] = useState<GameItem | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<GameItem[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [itemsList, setItemsList] = useState<GameItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const strings = UI_STRINGS[lang];

  useEffect(() => {
    let list: GameItem[] = [];
    switch (mode) {
      case GameMode.LETTERS: list = getLettersItems(lang); break;
      case GameMode.NUMBERS: list = getNumbersItems(lang); break;
      case GameMode.SHAPES: list = getShapesItems(lang); break;
      case GameMode.IMAGES: list = getImagesItems(lang); break;
    }
    setItemsList([...list].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setStage(0);
  }, [mode, lang]);

  const setupNextStage = useCallback(() => {
    if (itemsList.length === 0) return;
    const correct = itemsList[currentIndex % itemsList.length];
    let wrongOptions = itemsList.filter(i => i.id !== correct.id);
    const wrong = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
    setCorrectItem(correct);
    setShuffledOptions([correct, wrong].sort(() => Math.random() - 0.5));
    setIsSolved(false);
    setTimeout(() => { audioService.speak(correct.speechLabel, lang); }, 400);
  }, [currentIndex, itemsList, lang]);

  useEffect(() => { if (itemsList.length > 0) setupNextStage(); }, [itemsList, setupNextStage]);

  const handleChoice = (item: GameItem) => {
    if (isSolved) return;
    if (item.id === correctItem?.id) {
      setIsSolved(true);
      audioService.playSuccess(lang);
      setTimeout(() => {
        if (stage >= 3) { adService.showInterstitial(); setStage(0); } else { setStage(prev => prev + 1); }
        setCurrentIndex(prev => prev + 1);
      }, 1600);
    } else { audioService.playError(lang); }
  };

  if (!correctItem) return null;

  return (
    <div className={`flex flex-col items-center h-full w-full pt-10 px-6 relative overflow-hidden ${lang === Language.AR ? 'rtl' : 'ltr'}`}>
      <div className="flex justify-between w-full items-center z-10 mb-4">
        <button onClick={onExit} className="bg-red-500 text-white rounded-2xl p-4 shadow-kids active:shadow-kids-active transition-all ring-4 ring-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </button>
        <div className="bg-white/90 rounded-2xl px-6 py-3 shadow-kids border-4 border-sky-100 flex items-center gap-3 ring-4 ring-white">
           <span className="text-2xl font-black text-sky-600">
             {strings.stage} {stage + 1} / 4
           </span>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-around py-4">
        <div className={`relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center bg-white/70 rounded-[4rem] border-[6px] border-dashed transition-all duration-500 shadow-inner ${isSolved ? 'border-green-400 bg-green-50 scale-105' : 'border-sky-200'}`}>
            <div className={`absolute inset-0 flex items-center justify-center text-[200px] md:text-[280px] transition-all duration-700 select-none ${isSolved ? 'opacity-0 scale-150' : 'opacity-10 grayscale brightness-0'}`}>
                {correctItem.content}
            </div>
            <div className={`absolute inset-0 flex items-center justify-center text-[200px] md:text-[280px] drop-shadow-2xl transition-all duration-700 ${isSolved ? 'scale-110 opacity-100 rotate-0 animate-bounce' : 'scale-0 opacity-0'} ${correctItem.color.replace('bg-', 'text-')}`}>
                {correctItem.content}
            </div>
        </div>

        <div className="flex gap-8 w-full justify-center">
          {shuffledOptions.map((item) => (
            <button key={item.id} onClick={() => handleChoice(item)} disabled={isSolved} className={`w-40 h-40 md:w-56 md:h-56 rounded-[3rem] flex items-center justify-center text-[100px] md:text-[140px] text-white shadow-kids active:shadow-kids-active transition-all border-[10px] border-white transform ${item.color} ${isSolved && item.id === correctItem.id ? 'opacity-0 scale-0' : 'opacity-100'} ${isSolved && item.id !== correctItem.id ? 'grayscale opacity-20' : ''}`}>
              {item.content}
            </button>
          ))}
        </div>
      </div>
      
      {/* 🟢 SAME AD AREA AS HOME SCREEN 🟢 */}
      <div className="w-full h-[95px] flex-shrink-0"></div>
    </div>
  );
};
