import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Language, Translations } from './types';
import { TRANSLATIONS } from './translations';

type TranslateFn = (lang: Language, text: string, values?: Record<string, string | number>) => string;
let cachedTranslateText: TranslateFn | null = null;
let translateLoadPromise: Promise<TranslateFn> | null = null;

function loadTranslateText(): Promise<TranslateFn> {
  if (cachedTranslateText) return Promise.resolve(cachedTranslateText);
  if (!translateLoadPromise) {
    translateLoadPromise = import('./textTranslations').then((mod) => {
      cachedTranslateText = mod.translateText;
      return mod.translateText;
    });
  }
  return translateLoadPromise;
}

function formatPtBr(text: string, values: Record<string, string | number> = {}): string {
  const key = text.replace(/\s+/g, ' ').trim();
  const leading = text.match(/^\s*/)?.[0] ?? '';
  const trailing = text.match(/\s*$/)?.[0] ?? '';
  return leading + key.replace(/\{(\w+)\}/g, (match, name) => String(values[name] ?? match)) + trailing;
}

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
  tr: (text: string, values?: Record<string, string | number>) => string;
}

const STORAGE_KEY = 'byte_downloader_lang';
const MANUAL_KEY = 'byte_downloader_lang_manual';
const COUNTRY_CACHE_KEY = 'byte_downloader_country_code';

const SPANISH_COUNTRIES = new Set([
  'ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU',
  'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'PR', 'GQ',
]);

export function mapCountryToLanguage(countryCode: string): Language {
  const code = (countryCode || '').toUpperCase().trim();
  if (code === 'BR') return 'pt-BR';
  if (code === 'PT') return 'pt-PT';
  if (SPANISH_COUNTRIES.has(code)) return 'es';
  return 'en';
}

function detectLanguageFromTimezone(): Language | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (!tz) return null;
    if (
      /^America\/(Sao_Paulo|Fortaleza|Recife|Bahia|Belem|Manaus|Cuiaba|Campo_Grande|Porto_Velho|Boa_Vista|Rio_Branco|Maceio|Araguaina|Santarem|Noronha)$/i.test(tz)
    ) {
      return 'pt-BR';
    }
    if (/^(Europe\/Lisbon|Atlantic\/(Azores|Madeira))$/i.test(tz)) {
      return 'pt-PT';
    }
    if (
      /^(Europe\/Madrid|Atlantic\/Canary|America\/(Mexico_City|Cancun|Monterrey|Merida|Tijuana|Argentina\/.+|Buenos_Aires|Bogota|Lima|Santiago|Caracas|Guayaquil|La_Paz|Montevideo|Asuncion|Havana|Santo_Domingo|Guatemala|Tegucigalpa|Managua|San_Salvador|Costa_Rica|Panama|Puerto_Rico))$/i.test(tz)
    ) {
      return 'es';
    }
  } catch {
    // ignore
  }
  return null;
}

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

  return 'en';
}

async function fetchCountryCode(): Promise<string | null> {
  try {
    const cached = sessionStorage.getItem(COUNTRY_CACHE_KEY);
    if (cached && /^[A-Z]{2}$/.test(cached)) return cached;
  } catch {
    // ignore
  }

  const endpoints = [
    { url: 'https://api.country.is/', parse: (d: { country?: string }) => d?.country },
    { url: 'https://ipapi.co/json/', parse: (d: { country_code?: string }) => d?.country_code },
  ];

  for (const ep of endpoints) {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 2500);
    try {
      const res = await fetch(ep.url, { signal: controller.signal, cache: 'no-store' });
      if (!res.ok) continue;
      const data = await res.json();
      const code = String(ep.parse(data) || '').toUpperCase().trim();
      if (/^[A-Z]{2}$/.test(code)) {
        try { sessionStorage.setItem(COUNTRY_CACHE_KEY, code); } catch {}
        return code;
      }
    } catch {
      // try next endpoint
    } finally {
      window.clearTimeout(timer);
    }
  }
  return null;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'pt-BR',
  setLang: () => {},
  t: TRANSLATIONS['pt-BR'],
  tr: (text, values) => formatPtBr(text, values),
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const urlLang = detectLanguageFromUrl();
      if (urlLang) {
        localStorage.setItem(STORAGE_KEY, urlLang);
        return urlLang;
      }
      const isCrawler = /bot|google|crawl|spider|slurp|bing|yandex/i.test(navigator.userAgent);
      if (isCrawler) {
        return 'pt-BR';
      }
      if (localStorage.getItem(MANUAL_KEY) === '1') {
        const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
        if (saved && TRANSLATIONS[saved]) return saved;
      }
      try {
        const cachedCountry = sessionStorage.getItem(COUNTRY_CACHE_KEY);
        if (cachedCountry && /^[A-Z]{2}$/.test(cachedCountry)) {
          return mapCountryToLanguage(cachedCountry);
        }
      } catch {
        // ignore
      }
      return detectLanguageFromTimezone() || detectBrowserLanguage();
    }
    return 'pt-BR';
  });

  // Detecta o país real do visitante por IP (e aplica idioma correspondente se não houver escolha manual)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (detectLanguageFromUrl()) return;
    if (/bot|google|crawl|spider|slurp|bing|yandex/i.test(navigator.userAgent)) return;
    if (localStorage.getItem(MANUAL_KEY) === '1') return;

    let active = true;
    void fetchCountryCode().then((code) => {
      if (!active || !code) return;
      if (localStorage.getItem(MANUAL_KEY) === '1') return;
      const countryLang = mapCountryToLanguage(code);
      setLangState(countryLang);
      localStorage.setItem(STORAGE_KEY, countryLang);
    });
    return () => { active = false; };
  }, []);

  const setLang = (newLang: Language) => {
    if (TRANSLATIONS[newLang]) {
      setLangState(newLang);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, newLang);
        localStorage.setItem(MANUAL_KEY, '1');
      }
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    const seoByLang: Record<Language, { title: string; description: string; locale: string; image: string }> = {
      'pt-BR': {
        title: 'Byte Downloader | Tudo em Um',
        description: 'Um único app para baixar em 8K, transformar em 4K com IA local e editar no Premiere e After Effects. 35+ ferramentas. Sem mensalidade.',
        locale: 'pt_BR',
        image: 'https://jonesbyte.github.io/bd/preview-bd-v10.png',
      },
      'pt-PT': {
        title: 'Byte Downloader | Tudo em Um',
        description: 'Uma única app para transferir em 8K, melhorar para 4K com IA local e editar no Premiere e After Effects. 35+ ferramentas. Sem mensalidade.',
        locale: 'pt_PT',
        image: 'https://jonesbyte.github.io/bd/preview-bd-v10.png',
      },
      en: {
        title: 'Byte Downloader | All in One',
        description: 'One desktop app to download in 8K, upscale to 4K locally with AI, and automate Premiere & After Effects. 35+ tools. One-time payment.',
        locale: 'en_US',
        image: 'https://jonesbyte.github.io/bd/preview-bd-en-v10.png',
      },
      es: {
        title: 'Byte Downloader | Todo en Uno',
        description: 'Una sola app para descargar en 8K, mejorar a 4K con IA local y editar en Premiere y After Effects. 35+ herramientas. Sin suscripciones.',
        locale: 'es_ES',
        image: 'https://jonesbyte.github.io/bd/preview-bd-es-v10.png',
      },
    };
    const seo = seoByLang[lang] || seoByLang['pt-BR'];
    document.title = seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', seo.locale);
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]', 'meta[property="og:image:alt"]', 'meta[name="twitter:image:alt"]']) {
      document.querySelector(selector)?.setAttribute('content', seo.title);
    }
    for (const selector of ['meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      document.querySelector(selector)?.setAttribute('content', seo.description);
    }
    for (const selector of ['meta[property="og:image"]', 'meta[property="og:image:secure_url"]', 'meta[name="twitter:image"]']) {
      document.querySelector(selector)?.setAttribute('content', seo.image);
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

  const [dictReady, setDictReady] = useState<boolean>(() => Boolean(cachedTranslateText));

  useEffect(() => {
    if (lang === 'pt-BR' || cachedTranslateText) return;
    let active = true;
    void loadTranslateText().then(() => {
      if (active) setDictReady(true);
    });
    return () => { active = false; };
  }, [lang]);

  const tr = useCallback(
    (text: string, values?: Record<string, string | number>) => {
      if (lang === 'pt-BR') return formatPtBr(text, values);
      if (cachedTranslateText) return cachedTranslateText(lang, text, values);
      return formatPtBr(text, values);
    },
    [lang, dictReady]
  );
  const t = TRANSLATIONS[lang] || TRANSLATIONS['pt-BR'];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
