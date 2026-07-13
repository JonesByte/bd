
import { Feature, Screenshot, ThemeData } from './types';

export const APP_NAME = "Byte Downloader";
export const APP_VERSION = "4.3.3"; 

// Preços
export const PRICE_ORIGINAL = { value: 80.00, display: "80,00" };
export const PRICE_PROMO = 40.00; 

export const FEATURES: Feature[] = [
  {
    id: '1',
    title: 'Suíte Profissional',
    description: 'Baixe vídeos, thumbnails e fotos de qualquer site da internet com um clique.',
    icon: 'image'
  },
  {
    id: '2',
    title: 'Motor Híbrido V4',
    description: 'Aceleração de hardware real. Downloads em 4K/8K com alta estabilidade e velocidade.',
    icon: 'zap'
  },
  {
    id: '3',
    title: 'IA Upscaling (Local)',
    description: 'Aumente a resolução de imagens usando modelos avançados direto no seu hardware.',
    icon: 'globe'
  },
  {
    id: '4',
    title: 'Playlists & Cortes',
    description: 'Escolha o que e como baixar de playlists completas ou apenas trechos específicos.',
    icon: 'refresh'
  },
  {
    id: '5',
    title: 'Auto-Update Inteligente',
    description: 'O software se adapta automaticamente às mudanças das plataformas, garantindo funcionamento contínuo.',
    icon: 'refresh'
  },
  {
    id: '6',
    title: 'Segurança & Suporte',
    description: 'Zero anúncios e suporte direto. Foco total na integridade do seu sistema e arquivos.',
    icon: 'shield'
  }
];

const SCREENSHOT_CAPTIONS = [
  'Aba Vídeos: O motor principal para downloads de vídeos.',
  'Aba Fotos: Pesquisa e captura inteligente de imagens.',
  'Aba Thumbnails: Extraia e gerencie capas em alta definição.',
  'Aba Byte IA - Upscaling: inteligência artificial local para melhorar a resolução.',
  'Aba Byte IA - Byte Gemini: criação e assistência com IA integrada.',
  'Aba Conversão - Vídeo/Áudio: motor FFmpeg profissional integrado.',
  'Aba Conversão - Foto: converta imagens entre formatos com praticidade.',
  'Aba Conversão - Modelo 3D: ferramentas dedicadas para arquivos tridimensionais.',
  'Aba Transcrição: transcrição de áudio e vídeo com extração de legendas.',
  'Aba Mixer: combine mídia e fluxos de trabalho em uma área dedicada.'
];

const createScreenshots = (slug: string, idPrefix: string): Screenshot[] =>
  SCREENSHOT_CAPTIONS.map((caption, index) => ({
    id: `${idPrefix}-s${index + 1}`,
    url: `/bd/screenshots/${slug}/s${index + 1}.png`,
    caption
  }));

// Temas e suas respectivas screenshots
export const THEMES: ThemeData[] = [
  {
    name: 'Byte',
    description: 'A Identidade Principal. Fundo escuro (azul marinho/navy) com botões, textos e contornos em Ciano Neon.',
    screenshots: createScreenshots('byte', 'byte')
  },
  {
    name: 'Black',
    description: 'O Modo Noturno Puro. Fundo preto absoluto com contornos sutis e minimalistas.',
    screenshots: createScreenshots('black', 'black')
  },
  {
    name: 'Light',
    description: 'Inovador. Fundo branco/cinza claro com textos escuros e botões coloridos para dar contraste.',
    screenshots: createScreenshots('light', 'light')
  },
  {
    name: 'Red Laki',
    description: 'O Agressivo. Fundo escuro rasgado por contornos e botões em Vermelho Sangue / Carmesim.',
    screenshots: createScreenshots('red-laki', 'red')
  },
  {
    name: 'Hacker',
    description: 'A Nostalgia. Fundo preto com textos e contornos em Verde Neon.',
    screenshots: createScreenshots('hacker', 'hacker')
  },
  {
    name: 'Dracula',
    description: 'O Queridinho dos Devs. Fundo cinza-azulado muito escuro, com destaques em cores pastéis vibrantes.',
    screenshots: createScreenshots('dracula', 'dracula')
  }
];
export const FAQS = [
  {
    question: "Como funciona a Licença Vitalícia?",
    answer: "Você paga uma única vez e o software é seu para sempre. Sem mensalidades, com todas as atualizações futuras inclusas."
  },
  {
    question: "O Upscale de IA precisa de internet?",
    answer: "Não! O processamento é feito localmente usando a potência da sua placa de vídeo (GPU), garantindo total privacidade."
  },
  {
    question: "O envio do programa é automático?",
    answer: "Sim! Após a confirmação do pagamento na Hotmart, o download do instalador é liberado imediatamente. As atualizações seguintes são baixadas e instaladas automaticamente pelo próprio programa."
  },
  {
    question: "Funciona em quais sites?",
    answer: "YouTube, Instagram, TikTok, Facebook, X, Twitch e mais de 100 outras plataformas via motor híbrido."
  }
];

// Feedbacks de Usuários
export const FEEDBACKS = [
  { id: 'feedback-1', url: '/bd/feedbacks/feedback-1-v2.png', caption: 'Feedback da Comunidade - 1' },
  { id: 'feedback-2', url: '/bd/feedbacks/feedback-2-v2.png', caption: 'Feedback da Comunidade - 2' }
];

export const PAYMENT_LINK_BASE = "https://pay.hotmart.com/S104243634I";
export const PAYMENT_LINK = "https://pay.hotmart.com/S104243634I?offDiscount=BYTE50";
