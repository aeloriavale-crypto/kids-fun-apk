
import React, { useState, useEffect, useRef } from 'react';
import { GameMode, Language } from './types';
import { GameScreen } from './components/GameScreen';
import { audioService } from './services/audioService';
import { adService } from './services/adService';
import { UI_STRINGS } from './constants';
import { App as CapApp } from '@capacitor/app';

const GameLogo: React.FC = () => {
  return (
    <div className="relative w-44 h-32 md:w-56 md:h-40 animate-float flex items-center justify-center">
      <svg viewBox="0 0 500 350" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: '#ffffff'}} />
            <stop offset="100%" style={{stopColor: '#f0f9ff'}} />
          </linearGradient>
          <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#fbbf24'}} />
            <stop offset="100%" style={{stopColor: '#f97316'}} />
          </linearGradient>
        </defs>
        <path d="M100,100 Q150,50 200,100 Q250,70 300,110 Q380,110 380,170 Q380,230 320,250 Q350,310 280,330 Q200,370 120,330 Q40,330 40,250 Q0,200 40,150 Q40,90 100,100" 
              fill="url(#cloudGrad)" stroke="url(#borderGrad)" strokeWidth="10" />
        <text x="50%" y="210" textAnchor="middle" fontSize="100" fontWeight="900" fill="#0ea5e9" style={{fontFamily: 'Arial'}}>KIDS</text>
      </svg>
    </div>
  );
};

const App: React.FC = () => {
  const [mode, setMode] = useState<GameMode>(GameMode.HOME);
  const [lang, setLang] = useState<Language>(Language.AR);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [musicEnabled, setMusicEnabled] = useState(() => {
    const saved = localStorage.getItem('musicEnabled');
    return saved === null ? true : saved === 'true';
  });

  useEffect(() => {
    const backHandler = CapApp.addListener('backButton', () => {
      if (mode !== GameMode.HOME) {
        setMode(GameMode.HOME);
      } else {
        CapApp.exitApp();
      }
    });
    return () => { backHandler.then(h => h.remove()); };
  }, [mode]);

  useEffect(() => {
    adService.initialize().then(() => {
      adService.showBanner();
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('musicEnabled', String(musicEnabled));
    if (audioRef.current) {
      if (musicEnabled) {
        audioRef.current.volume = 0.1;
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [musicEnabled]);

  const strings = UI_STRINGS[lang];

  const renderHome = () => (
    <div className={`flex flex-col items-center h-full w-full pt-12 pb-2 text-center ${lang === Language.AR ? 'rtl' : 'ltr'}`}>
      {/* Top Controls - Matches Screenshot */}
      <div className="w-full px-8 flex justify-between items-center mb-4 z-20">
         <button onClick={() => {
           const newLang = lang === Language.AR ? Language.EN : Language.AR;
           setLang(newLang);
           audioService.speak(newLang === Language.AR ? "العربية" : "English", newLang);
         }} className="w-20 h-14 bg-white rounded-2xl shadow-kids border-4 border-sky-100 flex items-center justify-center text-sky-600 font-black text-2xl active:shadow-kids-active ring-4 ring-white/50">
           {lang === Language.AR ? 'EN' : 'AR'}
         </button>
         
         <button onClick={() => setMusicEnabled(!musicEnabled)} className={`w-16 h-16 rounded-full shadow-kids flex items-center justify-center transition-all active:shadow-kids-active ring-4 ring-white ${musicEnabled ? 'bg-yellow-400 text-white' : 'bg-gray-400 text-gray-200'}`}>
           <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
             <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"></path>
           </svg>
         </button>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md px-6 mx-auto">
        <div className="mb-2 scale-110"><GameLogo /></div>
        
        <h1 className="text-5xl font-black text-sky-600 mb-8 drop-shadow-sm tracking-tight" style={{ fontFamily: 'Cairo, sans-serif' }}>
          {lang === Language.AR ? 'مَرْحُ الأَطْفَالِ' : 'KIDS FUN'}
        </h1>

        <div className="grid grid-cols-2 gap-5 w-full">
          {/* Letters Button */}
          <button onClick={() => { setMode(GameMode.LETTERS); audioService.speak(strings.letsPlay, lang); }} className="aspect-square bg-orange-400 rounded-[2.5rem] shadow-kids active:shadow-kids-active flex flex-col items-center justify-center border-[8px] border-white transform transition-transform">
            <span className="text-[110px] text-white font-black leading-none mb-1 drop-shadow-lg">{lang === Language.AR ? 'أ' : 'A'}</span>
            <span className="text-2xl font-black text-white drop-shadow-sm">{strings.letters}</span>
          </button>
          {/* Numbers Button */}
          <button onClick={() => { setMode(GameMode.NUMBERS); audioService.speak(strings.letsPlay, lang); }} className="aspect-square bg-green-400 rounded-[2.5rem] shadow-kids active:shadow-kids-active flex flex-col items-center justify-center border-[8px] border-white transform transition-transform">
            <span className="text-[110px] text-white font-black leading-none mb-1 drop-shadow-lg">1</span>
            <span className="text-2xl font-black text-white drop-shadow-sm">{strings.numbers}</span>
          </button>
          {/* Shapes Button */}
          <button onClick={() => { setMode(GameMode.SHAPES); audioService.speak(strings.letsPlay, lang); }} className="aspect-square bg-pink-400 rounded-[2.5rem] shadow-kids active:shadow-kids-active flex flex-col items-center justify-center border-[8px] border-white transform transition-transform">
            <span className="text-[100px] text-white leading-none mb-2 drop-shadow-lg">▲</span>
            <span className="text-2xl font-black text-white drop-shadow-sm">{strings.shapes}</span>
          </button>
          {/* Images Button */}
          <button onClick={() => { setMode(GameMode.IMAGES); audioService.speak(strings.letsPlay, lang); }} className="aspect-square bg-sky-400 rounded-[2.5rem] shadow-kids active:shadow-kids-active flex flex-col items-center justify-center border-[8px] border-white transform transition-transform">
            <span className="text-[100px] text-white leading-none mb-2 drop-shadow-lg">🍎</span>
            <span className="text-2xl font-black text-white drop-shadow-sm">{strings.images}</span>
          </button>
        </div>
      </div>
      
      {/* 🟢 THIS IS THE BANNER AD LOCATION - 100% SAFE 🟢 */}
      {/* هُنا يظهر الإعلان تماماً، قمت بحجز مساحة 90 بكسل له في الأسفل */}
      <div className="w-full h-[95px] flex-shrink-0 flex items-center justify-center">
         <div className="text-[10px] text-sky-200 uppercase tracking-widest font-bold">Ad Banner Area</div>
      </div>
    </div>
  );

  return (
    <div className={`relative h-screen w-full bg-gradient-to-b from-sky-50 to-white overflow-hidden ${lang === Language.AR ? 'rtl' : 'ltr'}`}>
      {mode === GameMode.HOME ? renderHome() : <GameScreen mode={mode} lang={lang} onExit={() => setMode(GameMode.HOME)} />}
      <audio ref={audioRef} loop src="./music.mp3" preload="auto" style={{ display: 'none' }} />
    </div>
  );
};

export default App;
