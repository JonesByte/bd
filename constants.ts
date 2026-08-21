import { Feature, Screenshot, ThemeData } from './types';

export const APP_NAME = "Byte Downloader";
export const APP_VERSION = "4.3.3"; 

// Preços
export const PRICE_ORIGINAL = { value: 15.00, display: "15,00" };
export const PRICE_PROMO = 15.00; 

export const FEATURES: Feature[] = [
  {
    id: 'videos-8k',
    title: 'Vídeos até 8K',
    description: 'Cole o link e escolha se quer video em alta qualidade, audio ou o arquivo original.',
    icon: 'video'
  },
  {
    id: 'playlist-selection',
    title: 'Playlists com Seleção',
    description: 'Abra a playlist, marque só o que quer baixar e deixe o Byte cuidar da fila.',
    icon: 'playlist'
  },
  {
    id: 'time-cuts',
    title: 'Cortes por Tempo',
    description: 'Escolha o inicio e o fim para baixar apenas o pedaço que interessa.',
    icon: 'scissors'
  },
  {
    id: 'photos',
    title: 'Fotos e Posts',
    description: 'Pegue fotos e posts de links compativeis sem procurar ferramenta fora.',
    icon: 'image'
  },
  {
    id: 'thumbnails',
    title: 'Thumbnails em Alta',
    description: 'Veja e salve capas em alta para usar em posts, canais e edicoes.',
    icon: 'layers'
  },
  {
    id: 'ai-upscale',
    title: 'Upscaling IA Local',
    description: 'Aumente e limpe imagens no proprio PC, com modo Foto Pro quando quiser caprichar.',
    icon: 'sparkles'
  },
  {
    id: 'byte-gemini',
    title: 'Byte Gemini',
    description: 'Converse com a IA dentro do Byte para tirar duvidas e acelerar ideias.',
    icon: 'bot'
  },
  {
    id: 'media-conversion',
    title: 'Conversão Vídeo/Áudio',
    description: 'Transforme video e audio para formatos prontos para editar, postar ou guardar.',
    icon: 'convert'
  },
  {
    id: 'photo-conversion',
    title: 'Conversão de Fotos',
    description: 'Troque o formato das imagens e mantenha tudo organizado no mesmo fluxo.',
    icon: 'image'
  },
  {
    id: 'model-3d-conversion',
    title: 'Conversão 3D',
    description: 'Converta modelos 3D populares em uma area feita para esse tipo de arquivo.',
    icon: 'box'
  },
  {
    id: 'transcription',
    title: 'Transcrição Inteligente',
    description: 'Transforme video ou audio em texto, legenda SRT ou TXT em poucos cliques.',
    icon: 'captions'
  },
  {
    id: 'mixer',
    title: 'Mixer e Masterização',
    description: 'Deixe voz e video com som mais limpo, nivelado e pronto para publicar.',
    icon: 'sliders'
  },
  {
    id: 'plugin-install',
    title: 'Integração Nativa',
    description: 'Envie seus downloads direto para o Premiere Pro, After Effects ou DaVinci Resolve.',
    icon: 'zap'
  },
  {
    id: 'plugin-capture',
    title: 'Direto no Projeto',
    description: 'Os arquivos já caem no seu projeto ou bin de mídia, poupando muitos cliques e tempo.',
    icon: 'video'
  },
  {
    id: 'plugin-autocut',
    title: 'AutoCut',
    description: 'Selecione trechos e remova os silêncios de vídeos ou áudios diretamente na sua timeline.',
    icon: 'scissors'
  },
  {
    id: 'plugin-flow',
    title: 'Curvas e Suavidade',
    description: 'Ajuste a curva de velocidade (Flow) e aplique presets de animação nos keyframes com um clique.',
    icon: 'sparkles'
  },
  {
    id: 'plugin-autoloop',
    title: 'Auto Loop',
    description: 'Repita mídias selecionadas na timeline automaticamente sem sobrescrever outros clipes.',
    icon: 'refresh'
  },
  {
    id: 'plugin-transcription',
    title: 'Transcrição Whisper',
    description: 'Gere legendas perfeitas e alinhadas para os trechos selecionados usando IA ultrarrápida.',
    icon: 'captions'
  },
  {
    id: 'plugin-audio',
    title: 'Tratamento de Áudio',
    description: 'Separe voz e música, remova ruídos, nivele o volume e marque batidas musicais no seu editor.',
    icon: 'sliders'
  },
  {
    id: 'plugin-viral',
    title: 'Laboratório Beta',
    description: 'Recursos experimentais como detecção de recortes virais, estilos de legenda e color grading.',
    icon: 'bot'
  },
  {
    id: 'browser-extension',
    title: 'Sempre à Mão',
    description: 'A extensão fica no topo do seu navegador, pronta para puxar vídeos com apenas um clique.',
    icon: 'layers'
  },
  {
    id: 'config-downloads',
    title: 'Downloads Múltiplos',
    description: 'Baixe vários arquivos de uma vez só ou limite a fila para não travar a sua internet.',
    icon: 'queue'
  },
  {
    id: 'config-auto',
    title: 'Captura Automática',
    description: 'Copiou um link no computador? O Byte puxa sozinho e já deixa pronto para baixar.',
    icon: 'sparkles'
  },
  {
    id: 'config-folders',
    title: 'Organização Inteligente',
    description: 'Escolha exatamente onde salvar vídeos, fotos e áudios para achar tudo fácil depois.',
    icon: 'box'
  }
];
const SCREENSHOT_ASSET_VERSION = '20260724-v11full';

const SCREENSHOT_CAPTIONS = [
  'Aba Vídeos: O motor principal para downloads de vídeos.',
  'Aba Fotos: Pesquisa e captura inteligente de imagens.',
  'Aba Thumbnails: Extraia e gerencie capas em alta definição.',
  'Aba Plugin: integração nativa com Premiere Pro, After Effects e DaVinci Resolve.',
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
    answer: "Sim! Após a confirmação do pagamento na Hotmart, o download do instalador é liberado imediatamente. As atualizações seguintes são baixadas e instaladas automaticamente pelo pr[...]"
  },
  {
    question: "Funciona em quais sites?",
    answer: "YouTube, Instagram, TikTok, Facebook, X, Twitch e mais de 100 outras plataformas via motor hibrido."
  },
  {
    question: "Serve para Premiere, Resolve e Vegas?",
    answer: "Sim! Além de gerar arquivos comuns (MP4, MP3, M4A, JPG e PNG) para usar em qualquer editor como Vegas e CapCut, o Byte inclui um plugin nativo para Premiere Pro, After Effects e DaV[...]"
  }
];

// Feedbacks de Usuários
export const FEEDBACKS = [
  { id: 'feedback-1', url: '/bd/feedbacks/feedback-1-v2.png', caption: 'Feedback da Comunidade - 1' },
  { id: 'feedback-2', url: '/bd/feedbacks/feedback-2-v2.png', caption: 'Feedback da Comunidade - 2' },
  { id: 'feedback-3', url: '/bd/feedbacks/feedback-3-v2.png?v=20260713-real', caption: 'Feedback da Comunidade - 3' },
  { id: 'feedback-4', url: '/bd/feedbacks/feedback-4-v2.png?v=20260714-real', caption: 'Feedback da Comunidade - 4' }
];

export const PAYMENT_LINK_BASE = "https://pay.hotmart.com/S104243634I";
export const DISCOUNT_CODE = "BYTE70";
export const SCHEDULED_PROMO_PRICE = 15.00;
export const SCHEDULED_PROMO_DISCOUNT_LABEL = "70% OFF";
export const SCHEDULED_PROMO_DISCOUNT_PHRASE = "70% de desconto";
export const PROMOTION_START_ISO = "2026-08-19T00:00:00-03:00";
export const PROMOTION_END_ISO = "2026-08-20T23:59:00-03:00";

export type OfferPhase = 'upcoming' | 'active' | 'ended';

export type OfferState = {
  phase: OfferPhase;
  promoPrice: number;
  discountCode: string | null;
  discountLabel: string;
  discountPhrase: string;
  isDiscountActive: boolean;
};

export const getCurrentOffer = (now = Date.now()): OfferState => {
  return {
    phase: 'ended',
    promoPrice: 15.00,
    discountCode: "BYTE70",
    discountLabel: '70% OFF',
    discountPhrase: '70% de desconto',
    isDiscountActive: false
  };
};

export const getDiscountCode = () => getCurrentOffer().discountCode ?? DISCOUNT_CODE;
export const getPromoPrice = () => 15.00;
export const getDiscountLabel = () => getCurrentOffer().discountLabel;
export const getDiscountPhrase = () => getCurrentOffer().discountPhrase;

export const getPaymentLink = () => {
  const code = DISCOUNT_CODE;
  return code ? `${PAYMENT_LINK_BASE}?offDiscount=${code}` : PAYMENT_LINK_BASE;
};

export const PAYMENT_LINK = getPaymentLink();
