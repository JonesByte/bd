
import { Feature, Screenshot, ThemeData } from './types';

export const APP_NAME = "Byte Downloader";
export const APP_VERSION = "4.3.3"; 

// Preços
export const PRICE_ORIGINAL = { value: 80.00, display: "80,00" };
export const PRICE_PROMO = 40.00; 

export const FEATURES: Feature[] = [
  {
    id: 'videos-8k',
    title: 'Vídeos até 8K',
    description: 'Cole o link, verifique as informações e escolha 1080p, 2K, 4K, 6K, 8K, MP3, M4A ou qualidade original.',
    icon: 'video'
  },
  {
    id: 'playlist-selection',
    title: 'Playlists com Seleção',
    description: 'Abra playlists em uma janela dedicada, busque itens, marque apenas o que quer baixar e acompanhe tudo em fila.',
    icon: 'playlist'
  },
  {
    id: 'time-cuts',
    title: 'Cortes por Tempo',
    description: 'Defina início e fim para baixar somente o trecho necessário, com integração ao FFmpeg quando o corte exige renderização.',
    icon: 'scissors'
  },
  {
    id: 'photos',
    title: 'Fotos e Posts',
    description: 'Baixe imagens de links compatíveis, redes sociais e páginas com um fluxo separado para packs e buscas visuais.',
    icon: 'image'
  },
  {
    id: 'thumbnails',
    title: 'Thumbnails em Alta',
    description: 'Pré-visualize e salve capas de vídeos em alta definição para posts, canais, edições e thumbnails profissionais.',
    icon: 'layers'
  },
  {
    id: 'ai-upscale',
    title: 'Upscaling IA Local',
    description: 'Use modelos Real-ESRGAN, escala 2x/4x, TTA, ajuste de nitidez e modo Foto Pro com GPU quando disponível.',
    icon: 'sparkles'
  },
  {
    id: 'byte-gemini',
    title: 'Byte Gemini',
    description: 'Chat integrado com modelos Gemini, contexto local importado, nova conversa por sessão e base interna sobre o app.',
    icon: 'bot'
  },
  {
    id: 'media-conversion',
    title: 'Conversão Vídeo/Áudio',
    description: 'Converta mídia local com FFmpeg, controle CRF/bitrate e aceleração de hardware para codecs suportados.',
    icon: 'convert'
  },
  {
    id: 'photo-conversion',
    title: 'Conversão de Fotos',
    description: 'Transforme imagens entre formatos e mantenha o fluxo de saída organizado dentro da mesma área de conversão.',
    icon: 'image'
  },
  {
    id: 'model-3d-conversion',
    title: 'Conversão 3D',
    description: 'Converta modelos 3D como OBJ, STL, DAE, GLTF, GLB, PLY e ZIP usando o modo dedicado de malhas.',
    icon: 'box'
  },
  {
    id: 'transcription',
    title: 'Transcrição e Legendas',
    description: 'Extraia legendas do YouTube e use transcrição online leve para transformar áudio e vídeo em texto.',
    icon: 'captions'
  },
  {
    id: 'maintenance',
    title: 'Fila, GPU e Updates',
    description: 'Gerencie progresso, tarefas inativas, aceleração por hardware e atualizações do app ou do motor yt-dlp.',
    icon: 'queue'
  }
];
const SCREENSHOT_ASSET_VERSION = '20260713-96a7268';

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
    url: `/bd/screenshots/${slug}/s${index + 1}.png?v=${SCREENSHOT_ASSET_VERSION}`,
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
  { id: 'feedback-2', url: '/bd/feedbacks/feedback-2-v2.png', caption: 'Feedback da Comunidade - 2' },
  { id: 'feedback-3', url: '/bd/feedbacks/feedback-3-v2.png?v=20260713-real', caption: 'Feedback da Comunidade - 3' }
];

export const PAYMENT_LINK_BASE = "https://pay.hotmart.com/S104243634I";
export const PAYMENT_LINK = "https://pay.hotmart.com/S104243634I?offDiscount=BYTE50";
