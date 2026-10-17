export type Language = 'pt-BR' | 'pt-PT' | 'en' | 'es';

export interface LanguageOption {
  code: Language;
  name: string;
}

export interface Translations {
  navbar: {
    features: string;
    showcase: string;
    feedbacks: string;
    faq: string;
    cta: string;
  };
  sections: {
    hero: string;
    features: string;
    showcase: string;
    feedbacks: string;
    pricing: string;
    faq: string;
  };
  hero: {
    title1: string;
    title2: string;
    title3: string;
    subtitle: string;
    subtitleBold: string;
    cta: string;
    usersCount: string;
    rating: string;
    badgeWin: string;
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    btnUseLikeThis: string;
    btnGetByte: string;
    tabAll: string;
    tabVideos: string;
    tabAudio: string;
    tabPlugins: string;
  };
  showcase: {
    badge: string;
    title: string;
    subtitle: string;
  };
  feedbacks: {
    badge: string;
    title: string;
    subtitle: string;
  };
  pricing: {
    badge: string;
    title: string;
    subtitle: string;
    ctaButton: string;
    secureNotice: string;
    secureNoticeSub: string;
    otherApps: string;
    monthSub: string;
    oneTimePay: string;
    guarantee: string;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
  };
  footer: {
    rights: string;
    terms: string;
    privacy: string;
  };
}
