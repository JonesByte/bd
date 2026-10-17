import { useEffect, useState } from 'react';
import { useLanguage } from './LanguageContext';
import { PRICE_ORIGINAL, PRICE_PROMO } from '../constants';

export interface ConvertedPrice {
  currency: 'BRL' | 'USD' | 'EUR';
  symbol: string;
  promoInt: string;
  promoDec: string;
  promoFormatted: string;
  original: string;
  competitor: string;
  saveText: string;
  isConverted: boolean;
  conversionNotice: string;
}

type RateSnapshot = {
  USD: number;
  EUR: number;
  fetchedAt: number;
  publishedAt: number | null;
};

const FALLBACK_RATES = { USD: 0.1965, EUR: 0.1748 };
const REFRESH_MS = 60_000;
let cachedRates: RateSnapshot | null = null;
let fetchPromise: Promise<RateSnapshot> | null = null;

async function fetchLatestRates(): Promise<RateSnapshot> {
  if (cachedRates && Date.now() - cachedRates.fetchedAt < REFRESH_MS) return cachedRates;
  if (fetchPromise) return fetchPromise;
  fetchPromise = (async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/BRL', {
        signal: controller.signal,
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('Exchange rate service unavailable');
      const data = await response.json();
      const USD = Number(data?.rates?.USD);
      const EUR = Number(data?.rates?.EUR);
      if (data?.result !== 'success' || data?.base_code !== 'BRL' ||
          !Number.isFinite(USD) || USD <= 0 || !Number.isFinite(EUR) || EUR <= 0) {
        throw new Error('Invalid exchange rates');
      }
      const published = Number(data.time_last_update_unix);
      cachedRates = {
        USD, EUR, fetchedAt: Date.now(),
        publishedAt: Number.isFinite(published) && published > 0 ? published * 1000 : null,
      };
      return cachedRates;
    } finally {
      window.clearTimeout(timeout);
    }
  })();
  try {
    return await fetchPromise;
  } finally {
    fetchPromise = null;
  }
}

export const useCurrency = (): ConvertedPrice => {
  const { lang, tr } = useLanguage();
  const [snapshot, setSnapshot] = useState<RateSnapshot | null>(cachedRates);
  const [status, setStatus] = useState<'loading' | 'current' | 'unavailable'>(
    cachedRates ? 'current' : 'loading'
  );

  useEffect(() => {
    if (lang === 'pt-BR') return;
    let active = true;
    const refresh = async () => {
      try {
        const next = await fetchLatestRates();
        if (active) { setSnapshot(next); setStatus('current'); }
      } catch {
        if (active) setStatus('unavailable');
      }
    };
    void refresh();
    return () => { active = false; };
  }, [lang]);

  const currency = lang === 'pt-BR' ? 'BRL' : lang === 'en' ? 'USD' : 'EUR';
  const locale = lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : lang;
  const rate = currency === 'BRL' ? 1 : (snapshot ?? FALLBACK_RATES)[currency];
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2,
  });
  const promo = PRICE_PROMO * rate;
  const original = PRICE_ORIGINAL.value * rate;
  const parts = formatter.formatToParts(promo);
  const number = (type: Intl.NumberFormatPartTypes) => parts.filter(p => p.type === type).map(p => p.value).join('');
  const isConverted = currency !== 'BRL';
  const discount = Math.round((1 - PRICE_PROMO / PRICE_ORIGINAL.value) * 100);
  let conversionNotice = '';
  if (isConverted) {
    if (status === 'loading') conversionNotice = tr('Atualizando câmbio. Valor estimado; confirme no checkout.');
    else if (status === 'unavailable') conversionNotice = tr('Câmbio indisponível. Estimativa; confirme o valor no checkout.');
    else if (snapshot?.publishedAt) {
      const date = new Intl.DateTimeFormat(locale, { dateStyle: 'short', timeStyle: 'short' }).format(snapshot.publishedAt);
      conversionNotice = tr('Câmbio de {date}. Valor estimado; confirme no checkout.', { date });
    } else conversionNotice = tr('Conversão pelo câmbio mais recente disponível. Confirme no checkout.');
  }
  return {
    currency,
    symbol: number('currency'),
    promoInt: number('integer'),
    promoDec: number('decimal') + number('fraction'),
    promoFormatted: formatter.format(promo),
    original: formatter.format(original),
    competitor: formatter.format(210.86 * rate) + tr('/mês'),
    saveText: tr('{discount}% OFF (ECONOMIZE {amount})', { discount, amount: formatter.format(original - promo) }),
    isConverted,
    conversionNotice,
  };
};