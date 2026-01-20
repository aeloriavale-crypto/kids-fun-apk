
import { GameItem, Language } from './types';

export const COLORS = [
  'bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 
  'bg-purple-400', 'bg-pink-400', 'bg-orange-400', 'bg-teal-400'
];

export const ARABIC_LETTERS_DATA = [
  { char: 'أ', name: 'أَلِف' }, { char: 'ب', name: 'بَاء' }, { char: 'ت', name: 'تَاء' },
  { char: 'ث', name: 'ثَاء' }, { char: 'ج', name: 'جِيم' }, { char: 'ح', name: 'حَاء' },
  { char: 'خ', name: 'خَاء' }, { char: 'د', name: 'دَال' }, { char: 'ذ', name: 'ذَال' },
  { char: 'ر', name: 'رَاء' }, { char: 'ز', name: 'زَاي' }, { char: 'س', name: 'سِين' },
  { char: 'ش', name: 'شِين' }, { char: 'ص', name: 'صَاد' }, { char: 'ض', name: 'ضَاد' },
  { char: 'ط', name: 'طَاء' }, { char: 'ظ', name: 'ظَاء' }, { char: 'ع', name: 'عَيْن' },
  { char: 'غ', name: 'غَيْن' }, { char: 'ف', name: 'فَاء' }, { char: 'ق', name: 'قَاف' },
  { char: 'ك', name: 'كَاف' }, { char: 'ل', name: 'لاَم' }, { char: 'م', name: 'مِيم' },
  { char: 'ن', name: 'نُون' }, { char: 'هـ', name: 'هَاء' }, { char: 'و', name: 'وَاو' },
  { char: 'ي', name: 'يَاء' }
];

export const ENGLISH_LETTERS_DATA = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

export const SHAPES_DATA = [
  { ar: 'دَائِرَة', en: 'Circle', icon: '●' },
  { ar: 'مُرَبَّع', en: 'Square', icon: '■' },
  { ar: 'مُثَلَّث', en: 'Triangle', icon: '▲' },
  { ar: 'مُسْتَطِيل', en: 'Rectangle', icon: '▮' },
  { ar: 'نَجْمَة', en: 'Star', icon: '★' },
  { ar: 'هِلَال', en: 'Crescent', icon: '🌙' },
  { ar: 'سُدَاسِي', en: 'Hexagon', icon: '⬢' },
  { ar: 'خُمَاسِي', en: 'Pentagon', icon: '⬠' },
  { ar: 'بَيْضَاوِي', en: 'Oval', icon: '⬭' },
  { ar: 'قَلْب', en: 'Heart', icon: '♥' },
  { ar: 'سَهْم', en: 'Arrow', icon: '➔' },
  { ar: 'مُعَيَّن', en: 'Diamond', icon: '◆' },
  { ar: 'مُتَوَازِي أَضْلَاع', en: 'Parallelogram', icon: '▰' },
  { ar: 'شِبْهُ مُنْحَرِف', en: 'Trapezoid', icon: '⏢' },
  { ar: 'حَلَقَة', en: 'Ring', icon: '◎' },
  { ar: 'إِطَار مُرَبَّع', en: 'Square Frame', icon: '▣' },
  { ar: 'قَطْرَة', en: 'Drop', icon: '💧' },
  { ar: 'مَوْجَة', en: 'Wave', icon: '〰' },
  { ar: 'زَهْرَة بَسِيطَة', en: 'Simple Flower', icon: '🌸' },
  { ar: 'سَحَابَة', en: 'Cloud', icon: '☁' }
];

export const IMAGES_DATA = [
  { ar: 'تُفَّاحَة', en: 'Apple', icon: '🍎' },
  { ar: 'سَيَّارَة', en: 'Car', icon: '🚗' },
  { ar: 'شَمْس', en: 'Sun', icon: '☀️' },
  { ar: 'أَسَد', en: 'Lion', icon: '🦁' },
  { ar: 'فَرَاوِلَة', en: 'Strawberry', icon: '🍓' },
  { ar: 'طَمَاطِم', en: 'Tomato', icon: '🍅' },
  { ar: 'خِيَار', en: 'Cucumber', icon: '🥒' },
  { ar: 'جَزَر', en: 'Carrot', icon: '🥕' },
  { ar: 'دَرَّاجَة', en: 'Bicycle', icon: '🚲' },
  { ar: 'سَفِينَة', en: 'Ship', icon: '🚢' },
  { ar: 'قَمَر', en: 'Moon', icon: '🌙' },
  { ar: 'شَجَرَة', en: 'Tree', icon: '🌳' },
  { ar: 'سَحَابَة', en: 'Cloud', icon: '☁️' },
  { ar: 'كُوب مَاء', en: 'Cup of water', icon: '🥤' },
  { ar: 'بَطِّيخ', en: 'Watermelon', icon: '🍉' },
  { ar: 'لُعْبَة دُب', en: 'Teddy bear', icon: '🧸' },
  { ar: 'قِط', en: 'Cat', icon: '🐱' },
  { ar: 'كَلْب', en: 'Dog', icon: '🐶' },
  { ar: 'نِمْر', en: 'Tiger', icon: '🐯' },
  { ar: 'فِيل', en: 'Elephant', icon: '🐘' }
];

export const getLettersItems = (lang: Language): GameItem[] => {
  if (lang === Language.AR) {
    return ARABIC_LETTERS_DATA.map((item, i) => ({
      id: `letter-ar-${i}`,
      label: item.char,
      speechLabel: item.name,
      content: item.char,
      color: COLORS[i % COLORS.length]
    }));
  } else {
    return ENGLISH_LETTERS_DATA.map((char, i) => ({
      id: `letter-en-${i}`,
      label: char.toUpperCase(),
      speechLabel: char, 
      content: char.toUpperCase(),
      color: COLORS[i % COLORS.length]
    }));
  }
};

export const getNumbersItems = (lang: Language): GameItem[] => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `num-${i + 1}`,
    label: `${i + 1}`,
    speechLabel: `${i + 1}`,
    content: `${i + 1}`,
    color: COLORS[i % COLORS.length]
  }));
};

export const getShapesItems = (lang: Language): GameItem[] => {
  return SHAPES_DATA.map((item, i) => ({
    id: `shape-${i}`,
    label: lang === Language.AR ? item.ar : item.en,
    speechLabel: lang === Language.AR ? item.ar : item.en,
    content: item.icon,
    color: COLORS[i % COLORS.length]
  }));
};

export const getImagesItems = (lang: Language): GameItem[] => {
  return IMAGES_DATA.map((item, i) => ({
    id: `img-${i}`,
    label: lang === Language.AR ? item.ar : item.en,
    speechLabel: lang === Language.AR ? item.ar : item.en,
    content: item.icon,
    color: COLORS[i % COLORS.length]
  }));
};

export const ADMOB_CONFIG = {
  APP_ID: 'ca-app-pub-1213962555863100~2718989995',
  INTERSTITIAL_ID: 'ca-app-pub-1213962555863100/2914431119',
  BANNER_ID: 'ca-app-pub-1213962555863100/7779744986'
};

export const UI_STRINGS = {
  AR: {
    title: 'Kids Fun',
    chooseGame: 'اختر لعبة لتبدأ!',
    letters: 'الحروف',
    numbers: 'الأرقام',
    shapes: 'الأشكال',
    images: 'الصور',
    letsPlay: 'هَيَّا نَلْعَب!',
    wellDone: 'أَحْسَنْتَ!',
    tryAgain: 'حَاوِل مَرَّةً أُخْرَى',
    stage: 'المرحلة'
  },
  EN: {
    title: 'Kids Fun',
    chooseGame: 'Choose a game to start!',
    letters: 'Letters',
    numbers: 'Numbers',
    shapes: 'Shapes',
    images: 'Images',
    letsPlay: "Let's Play!",
    wellDone: 'Well Done!',
    tryAgain: 'Try Again',
    stage: 'Stage'
  }
};
