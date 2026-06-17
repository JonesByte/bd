
import { Feature, Screenshot, ThemeData } from './types';

export const APP_NAME = "Byte Downloader";
export const APP_VERSION = "4.3.3"; 

// Preços
export const PRICE_ORIGINAL = { value: 80.00, display: "80,00" };
export const PRICE_PROMO = 60.00; 

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

// Temas e suas respectivas screenshots
export const THEMES: ThemeData[] = [
  {
    name: 'Byte',
    description: 'A Identidade Principal. Fundo escuro (azul marinho/navy) com botões, textos e contornos em Ciano Neon.',
    screenshots: [
      { id: 'byte-s1', url: '/bd/screenshots/byte/s1.png', caption: 'Aba Vídeos: O motor principal para downloads de vídeos.' },
      { id: 'byte-s2', url: '/bd/screenshots/byte/s2.png', caption: 'Aba Fotos: Pesquisa e captura inteligente de imagens.' },
      { id: 'byte-s3', url: '/bd/screenshots/byte/s3.png', caption: 'Aba Thumbnails: Extraia e gerencie capas em alta definição.' },
      { id: 'byte-s4', url: '/bd/screenshots/byte/s4.png', caption: 'Aba Upscale: Inteligência artificial local para melhorar a resolução.' },
      { id: 'byte-s5', url: '/bd/screenshots/byte/s5.png', caption: 'Aba Conversão: Motor FFmpeg profissional integrado.' },
      { id: 'byte-s6', url: '/bd/screenshots/byte/s6.png', caption: 'Aba Transcrição: Transcrição de áudio e vídeo com extração de legendas.' }
    ]
  },
  {
    name: 'Black',
    description: 'O Modo Noturno Puro. Fundo preto absoluto com contornos sutis e minimalistas.',
    screenshots: [
      { id: 'black-s1', url: '/bd/screenshots/black/s1.png', caption: 'Aba Vídeos: O motor principal para downloads de vídeos.' },
      { id: 'black-s2', url: '/bd/screenshots/black/s2.png', caption: 'Aba Fotos: Pesquisa e captura inteligente de imagens.' },
      { id: 'black-s3', url: '/bd/screenshots/black/s3.png', caption: 'Aba Thumbnails: Extraia e gerencie capas em alta definição.' },
      { id: 'black-s4', url: '/bd/screenshots/black/s4.png', caption: 'Aba Upscale: Inteligência artificial local para melhorar a resolução.' },
      { id: 'black-s5', url: '/bd/screenshots/black/s5.png', caption: 'Aba Conversão: Motor FFmpeg profissional integrado.' },
      { id: 'black-s6', url: '/bd/screenshots/black/s6.png', caption: 'Aba Transcrição: Transcrição de áudio e vídeo com extração de legendas.' }
    ]
  },
  {
    name: 'Light',
    description: 'Inovador. Fundo branco/cinza claro com textos escuros e botões coloridos para dar contraste.',
    screenshots: [
      { id: 'light-s1', url: '/bd/screenshots/light/s1.png', caption: 'Aba Vídeos: O motor principal para downloads de vídeos.' },
      { id: 'light-s2', url: '/bd/screenshots/light/s2.png', caption: 'Aba Fotos: Pesquisa e captura inteligente de imagens.' },
      { id: 'light-s3', url: '/bd/screenshots/light/s3.png', caption: 'Aba Thumbnails: Extraia e gerencie capas em alta definição.' },
      { id: 'light-s4', url: '/bd/screenshots/light/s4.png', caption: 'Aba Upscale: Inteligência artificial local para melhorar a resolução.' },
      { id: 'light-s5', url: '/bd/screenshots/light/s5.png', caption: 'Aba Conversão: Motor FFmpeg profissional integrado.' },
      { id: 'light-s6', url: '/bd/screenshots/light/s6.png', caption: 'Aba Transcrição: Transcrição de áudio e vídeo com extração de legendas.' }
    ]
  },
  {
    name: 'Red Laki',
    description: 'O Agressivo. Fundo escuro rasgado por contornos e botões em Vermelho Sangue / Carmesim.',
    screenshots: [
      { id: 'red-s1', url: '/bd/screenshots/red-laki/s1.png', caption: 'Aba Vídeos: O motor principal para downloads de vídeos.' },
      { id: 'red-s2', url: '/bd/screenshots/red-laki/s2.png', caption: 'Aba Fotos: Pesquisa e captura inteligente de imagens.' },
      { id: 'red-s3', url: '/bd/screenshots/red-laki/s3.png', caption: 'Aba Thumbnails: Extraia e gerencie capas em alta definição.' },
      { id: 'red-s4', url: '/bd/screenshots/red-laki/s4.png', caption: 'Aba Upscale: Inteligência artificial local para melhorar a resolução.' },
      { id: 'red-s5', url: '/bd/screenshots/red-laki/s5.png', caption: 'Aba Conversão: Motor FFmpeg profissional integrado.' },
      { id: 'red-s6', url: '/bd/screenshots/red-laki/s6.png', caption: 'Aba Transcrição: Transcrição de áudio e vídeo com extração de legendas.' }
    ]
  },
  {
    name: 'Hacker',
    description: 'A Nostalgia. Fundo preto com textos e contornos em Verde Neon.',
    screenshots: [
      { id: 'hacker-s1', url: '/bd/screenshots/hacker/s1.png', caption: 'Aba Vídeos: O motor principal para downloads de vídeos.' },
      { id: 'hacker-s2', url: '/bd/screenshots/hacker/s2.png', caption: 'Aba Fotos: Pesquisa e captura inteligente de imagens.' },
      { id: 'hacker-s3', url: '/bd/screenshots/hacker/s3.png', caption: 'Aba Thumbnails: Extraia e gerencie capas em alta definição.' },
      { id: 'hacker-s4', url: '/bd/screenshots/hacker/s4.png', caption: 'Aba Upscale: Inteligência artificial local para melhorar a resolução.' },
      { id: 'hacker-s5', url: '/bd/screenshots/hacker/s5.png', caption: 'Aba Conversão: Motor FFmpeg profissional integrado.' },
      { id: 'hacker-s6', url: '/bd/screenshots/hacker/s6.png', caption: 'Aba Transcrição: Transcrição de áudio e vídeo com extração de legendas.' }
    ]
  },
  {
    name: 'Dracula',
    description: 'O Queridinho dos Devs. Fundo cinza-azulado muito escuro, com destaques em cores pastéis vibrantes.',
    screenshots: [
      { id: 'dracula-s1', url: '/bd/screenshots/dracula/s1.png', caption: 'Aba Vídeos: O motor principal para downloads de vídeos.' },
      { id: 'dracula-s2', url: '/bd/screenshots/dracula/s2.png', caption: 'Aba Fotos: Pesquisa e captura inteligente de imagens.' },
      { id: 'dracula-s3', url: '/bd/screenshots/dracula/s3.png', caption: 'Aba Thumbnails: Extraia e gerencie capas em alta definição.' },
      { id: 'dracula-s4', url: '/bd/screenshots/dracula/s4.png', caption: 'Aba Upscale: Inteligência artificial local para melhorar a resolução.' },
      { id: 'dracula-s5', url: '/bd/screenshots/dracula/s5.png', caption: 'Aba Conversão: Motor FFmpeg profissional integrado.' },
      { id: 'dracula-s6', url: '/bd/screenshots/dracula/s6.png', caption: 'Aba Transcrição: Transcrição de áudio e vídeo com extração de legendas.' }
    ]
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
export const PAYMENT_LINK = "https://pay.hotmart.com/S104243634I?offDiscount=BYTE25";
