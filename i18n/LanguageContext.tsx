import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations } from './types';
import { TRANSLATIONS } from './translations';
import { translateText } from './textTranslations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
  tr: (text: string, values?: Record<string, string | number>) => string;
}

const STORAGE_KEY = 'byte_downloader_lang';

export function detectLanguageFromUrl(): Language | null {
  if (typeof window === 'undefined') return null;

  // 1. Query parameter: ?lang=en, ?lang=us, ?hl=en
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const param = (searchParams.get('lang') || searchParams.get('hl') || '').toLowerCase().trim();
    if (param === 'en' || param === 'us' || param === 'en-us') return 'en';
    if (param === 'es') return 'es';
    if (param === 'pt-pt') return 'pt-PT';
    if (param === 'pt' || param === 'pt-br') return 'pt-BR';
  } catch {
    // fallback se URLSearchParams falhar
  }

  // 2. Segmentos do caminho: /us, /us/, /en, /en/, /en-us
  const pathname = window.location.pathname.toLowerCase();
  const segments = pathname.split('/').map(s => s.trim().replace(/\.html$/, '')).filter(Boolean);
  if (segments.some(s => s === 'us' || s === 'en' || s === 'en-us')) {
    return 'en';
  }
  if (segments.some(s => s === 'es')) {
    return 'es';
  }
  if (segments.some(s => s === 'pt-pt')) {
    return 'pt-PT';
  }
  if (segments.some(s => s === 'pt' || s === 'pt-br')) {
    return 'pt-BR';
  }

  // 3. Hash: #/us, #us, #/en, #en
  const hash = window.location.hash.toLowerCase();
  if (hash.includes('/us') || hash === '#us' || hash.includes('/en') || hash === '#en') {
    return 'en';
  }

  return null;
}

function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined' || !navigator) return 'pt-BR';

  const browserLanguages = navigator.languages && navigator.languages.length > 0 
    ? navigator.languages 
    : [navigator.language || ''];

  for (const raw of browserLanguages) {
    const l = (raw || '').toLowerCase().trim();
    if (l === 'pt-pt' || l.startsWith('pt-pt')) return 'pt-PT';
    if (l.startsWith('pt')) return 'pt-BR';
    if (l.startsWith('es')) return 'es';
    if (l.startsWith('en')) return 'en';
  }

  // Se o navegador estiver em qualquer outro idioma global (francês, alemão, etc.), usa inglês
  return 'en';
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'pt-BR',
  setLang: () => {},
  t: TRANSLATIONS['pt-BR'],
  tr: (text, values) => translateText('pt-BR', text, values),
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const urlLang = detectLanguageFromUrl();
      if (urlLang) {
        localStorage.setItem(STORAGE_KEY, urlLang);
        return urlLang;
      }
      const saved = localStorage.getItem(STORAGE_KEY) as Language;
      if (saved && TRANSLATIONS[saved]) {
        return saved;
      }
      return detectBrowserLanguage();
    }
    return 'pt-BR';
  });

  const setLang = (newLang: Language) => {
    if (TRANSLATIONS[newLang]) {
      setLangState(newLang);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, newLang);
      }
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    const copy = TRANSLATIONS[lang];
    document.title = 'Byte Downloader - ' + [copy.hero.title1, copy.hero.title2, copy.hero.title3].join(' ');
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.hero.subtitle + ' ' + copy.hero.subtitleBold);
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      document.querySelector(selector)?.setAttribute('content', document.title);
    }
    for (const selector of ['meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      document.querySelector(selector)?.setAttribute('content', copy.hero.subtitle);
    }
    const imgUrl = (lang === 'en')
      ? 'https://jonesbyte.github.io/bd/preview-bd-en-v1.png?v=20261022-en1'
      : 'https://jonesbyte.github.io/bd/preview-bd-v8.png';
    for (const selector of ['meta[property="og:image"]', 'meta[property="og:image:secure_url"]', 'meta[name="twitter:image"]']) {
      document.querySelector(selector)?.setAttribute('content', imgUrl);
    }
  }, [lang]);

  useEffect(() => {
    const handleUrlChange = () => {
      const urlLang = detectLanguageFromUrl();
      if (urlLang && urlLang !== lang) {
        setLangState(urlLang);
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, urlLang);
        }
      }
    };
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [lang]);

  const tr = (text: string, values?: Record<string, string | number>) => translateText(lang, text, values);
  const t = TRANSLATIONS[lang] || TRANSLATIONS['pt-BR'];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
