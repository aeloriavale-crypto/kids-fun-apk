
import { Language } from '../types';

class AudioService {
  private static instance: AudioService;
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];

  private constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.loadVoices();
    }
  }

  static getInstance() {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  private loadVoices() {
    this.voices = this.synth.getVoices();
  }

  private getBestVoice(lang: Language): SpeechSynthesisVoice | null {
    const targetLang = lang === Language.AR ? 'ar' : 'en';
    // محاولة جلب الأصوات مجدداً في حال لم تكن محملة
    if (this.voices.length === 0) this.voices = this.synth.getVoices();
    
    const langVoices = this.voices.filter(v => v.lang.toLowerCase().startsWith(targetLang));
    if (langVoices.length === 0) return null;

    const scoredVoices = langVoices.map(v => {
      let score = 0;
      const name = v.name.toLowerCase();
      if (name.includes('google')) score += 100;
      if (name.includes('natural')) score += 80;
      if (name.includes('female')) score += 50;
      return { voice: v, score };
    });

    scoredVoices.sort((a, b) => b.score - a.score);
    return scoredVoices[0]?.voice || langVoices[0];
  }

  speak(text: string, lang: Language = Language.AR) {
    if (!this.synth) return;
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const bestVoice = this.getBestVoice(lang);

    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.lang = lang === Language.AR ? 'ar-SA' : 'en-US';
    utterance.pitch = 1.2; // صوت طفولي أكثر
    utterance.rate = 0.95;
    this.synth.speak(utterance);
  }

  playSuccess(lang: Language) {
    const texts = lang === Language.AR 
      ? ["أَحْسَنْتَ!", "رَائِع!", "مُمْتَاز!", "بَطَل!"] 
      : ["Well done!", "Great!", "Excellent!", "You rock!"];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    this.speak(randomText, lang);
  }

  playError(lang: Language) {
    const text = lang === Language.AR ? "حَاوِل مَرَّةً أُخْرَى" : "Try again!";
    this.speak(text, lang);
  }
}

export const audioService = AudioService.getInstance();
