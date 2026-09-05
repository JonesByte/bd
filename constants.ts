import { Feature, Screenshot, ThemeData, FeedbackItem } from './types';

export const APP_NAME = "Byte Downloader";
export const APP_VERSION = "4.3.3"; 

// Preços
export const PRICE_ORIGINAL = { value: 80.00, display: "80,00" };
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
const SCREENSHOT_ASSET_VERSION = '20260903-temas-oficiais-v12';

const SCREENSHOT_CAPTIONS = [
  'Aba Vídeos: O motor principal para downloads de vídeos.',
  'Aba Fotos: Pesquisa e captura inteligente de imagens.',
  'Aba Thumbnails: Extraia e gerencie capas em alta definição.',
  'Aba Byte IA - Byte Gemini: criação e assistência com IA integrada.',
  'Aba Byte IA - Upscaling: inteligência artificial local para restaurar e ampliar imagens com IA.',
  'Aba Byte IA - Separar Áudio: separação cirúrgica de voz, música e efeitos sonoros.',
  'Aba Byte IA - Transcrição: transcrição de áudio e vídeo com extração de legendas.',
  'Aba Estúdio - Plugin: integração nativa com Premiere Pro, After Effects e DaVinci Resolve.',
  'Aba Conversão - Vídeo/Áudio: motor FFmpeg profissional integrado.',
  'Aba Conversão - Foto: converta imagens entre formatos com praticidade.',
  'Aba Conversão - Modelo 3D: ferramentas dedicadas para arquivos tridimensionais.',
  'Aba Estúdio - Mixer: combine mídia e fluxos de trabalho em uma área dedicada.'
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
export const FEEDBACKS: FeedbackItem[] = [
  {
    id: 'feedback-6',
    author: 'eodoglakk',
    role: 'Editor de Vídeos',
    stars: 5,
    text: 'Essa atualização melhorou DEMAIS tudo, muito gratificante usar o Byte Downloader nos meus trabalhos. PARABÉNS PELO TRABALHO, JONES!',
    url: '/bd/feedbacks/feedback-6-v2.png',
    caption: 'Feedback de eodoglakk - Editor de Vídeos (X / Twitter)',
    source: 'x'
  },
  {
    id: 'feedback-15',
    author: 'Noxxyz (@NoxxyEditor)',
    role: 'Editor e Criador de Conteúdo',
    stars: 5,
    text: 'recomendo!',
    url: '/bd/feedbacks/feedback-15-v2.png',
    caption: 'Feedback de Noxxyz (@NoxxyEditor) - Editor e Criador de Conteúdo (X / Twitter)',
    source: 'x'
  },
  {
    id: 'feedback-1',
    author: 'temoki',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Darei 5 estrelas por conta da unificação de downloaders, já que ao invés de usar downloaders separados para sites diferentes eu consigo simplesmente baixar tudo diretamente do byte downloader, além de funções extras como conversão de arquivos e upscaling que são a 🍒',
    url: '/bd/feedbacks/feedback-1-v2.png',
    caption: 'Feedback de temoki - Editor de Vídeo',
    source: 'discord'
  },
  {
    id: 'feedback-2',
    author: 'Arthur Claro',
    role: 'Criador de Conteúdo',
    stars: 5,
    text: 'Orra Jones, ficou absurdo! Deu certo aqui. Gostei bastante que você colocou para conseguir clipar o tempo. Isso é muito bom para quando quer pegar só um trecho do vídeo. Excelente trabalho!!',
    url: '/bd/feedbacks/feedback-2-v2.png',
    caption: 'Feedback de Arthur Claro - Criador de Conteúdo',
    source: 'discord'
  },
  {
    id: 'feedback-3',
    author: 'João Donizeti',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'O Jones responde rápido e o programa tá f*da, ele é muito atencioso com você. Até daria 1000 se fosse possível! Se eu fosse você compraria rapidamente.',
    url: '/bd/feedbacks/feedback-3-v2.png?v=20260713-real',
    caption: 'Feedback de João Donizeti - Editor de Vídeo',
    source: 'discord'
  },
  {
    id: 'feedback-4',
    author: 'Kcleyton',
    role: 'Criador de Conteúdo',
    stars: 5,
    text: 'Ajuda bastante por baixar só o trecho que precisa do vídeo. Economiza um tempo absurdo na edição.',
    url: '/bd/feedbacks/feedback-4-v2.png?v=20260714-real',
    caption: 'Feedback de Kcleyton - Criador de Conteúdo',
    source: 'discord'
  },
  {
    id: 'feedback-5',
    author: 'guuzera',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Comprei hoje, fiz uns testes básicos e tá filé pra algumas ideias que quero fazer.',
    url: '/bd/feedbacks/feedback-5-v2.png',
    caption: 'Feedback de guuzera - Editor de Vídeo',
    source: 'discord'
  },
  {
    id: 'feedback-7',
    author: 'Rafael Costa',
    role: 'Editor de Vídeos',
    stars: 5,
    text: 'Cara, o app ficou incrível, parabéns pelo trabalho. Essa última versão resolveu alguns dos problemas que tive em comparação às primeiras. Os downloads responderam bem e a UI ficou mais organizada. Tô para testar o plugin do Premiere, mas digo que valeu super a pena a aquisição.',
    url: '/bd/feedbacks/feedback-7-v2.png',
    caption: 'Feedback de Rafael Costa - Editor de Vídeos (X / Twitter)',
    source: 'x'
  },
  {
    id: 'feedback-8',
    author: 'Thiag',
    role: 'Editor de Vídeos',
    stars: 5,
    text: 'PERNETA SEU VERME OLHA AI O PROGRAMA QUE EU USEI PRA TE SALVAR AQUELA VEZ',
    url: '/bd/feedbacks/feedback-8-v2.png',
    caption: 'Feedback de Thiag - Editor de Vídeos (X / Twitter)',
    source: 'x'
  },
  {
    id: 'feedback-9',
    author: 'KAILER',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Comprei teu programa e namoral, é milagroso, tava cansado de entrar em site suspeito pra baixar tudo menos o vídeo que eu queria haha, vale mt a pena',
    url: '/bd/feedbacks/feedback-9-v2.png',
    caption: 'Feedback de KAILER - Editor de Vídeo (X / Twitter)',
    source: 'x'
  },
  {
    id: 'feedback-10',
    author: 'ruikk',
    role: 'Editor e Criador de Conteúdo',
    stars: 5,
    text: 'O Byte é literalmente o sonho de todo editor de video e criador de conteúdo, além disso é feito por um brasileiro e tem um preço super generoso comparado com o tempo e dinheiro que ele te traz de retorno, vamo apoiar meu mano Jones!!',
    url: '/bd/feedbacks/feedback-10-v2.png',
    caption: 'Feedback de ruikk - Editor e Criador de Conteúdo (X / Twitter)',
    source: 'x'
  },
  {
    id: 'feedback-11',
    author: 'Liiki O Editor',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Um monte de gente comentou e perguntou sobre qual ferramenta eu uso: é o Byte Downloader desenvolvido pelo @JonesByte. Depois de mó tempo, finalmente as ferramentas de automatizar tempo na edição funcionaram pra mim.',
    url: '/bd/feedbacks/feedback-11-v2.png',
    caption: 'Feedback de Liiki O Editor - Editor de Vídeo (X / Twitter)',
    source: 'x'
  },
  {
    id: 'feedback-12',
    author: 'kise',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'to usando ha uns dias e ta muito brabo irmão ta agilizando mto o processo vei parabéns mano continua atualizando e vamo que vamo',
    url: '/bd/feedbacks/feedback-12-v2.png',
    caption: 'Feedback de kise - Editor de Vídeo',
    source: 'discord'
  },
  {
    id: 'feedback-13',
    author: 'Lucas (@luqkezin)',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Tá insano esse projeto',
    url: '/bd/feedbacks/feedback-13-v2.png',
    caption: 'Feedback de Lucas (@luqkezin) - Editor de Vídeo (X / Twitter)',
    source: 'x'
  },
  {
    id: 'feedback-14',
    author: 'UnderDogg (@DoggUndr)',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Só o fato de poder baixar uma parte especifica ja tinha despertado meu interesse. To adorando usar',
    url: '/bd/feedbacks/feedback-14-v2.png',
    caption: 'Feedback de UnderDogg (@DoggUndr) - Editor de Vídeo (X / Twitter)',
    source: 'x'
  },
  {
    id: 'feedback-16',
    author: 'Douglas (@entaocara)',
    role: 'Criador de Conteúdo',
    stars: 5,
    text: 'Vai salvar pra criar conteúdo, peguei irmão. Sucesso sempre',
    url: '/bd/feedbacks/feedback-16-v2.png',
    caption: 'Feedback de Douglas (@entaocara) - Criador de Conteúdo (X / Twitter)',
    source: 'x'
  },
  {
    id: 'feedback-17',
    author: 'Allan (@AllxnBRZ)',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Vi sobre, achei bem interessante a proposta do seu programa, ainda mais pra mim que tenho preguiça de fazer um próprio kk, acabei de comprar, creio que vou gostar e usar muito!!',
    url: '/bd/feedbacks/feedback-17-v2.png',
    caption: 'Feedback de Allan (@AllxnBRZ) - Editor de Vídeo (X / Twitter)',
    source: 'x'
  },
  {
    id: 'feedback-18',
    author: 'Hornet editor (@HornetSouls)',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'rapaz, não é que o negócio é bom mesmo? curti pra krl @JonesByte',
    url: '/bd/feedbacks/feedback-18-v2.png',
    caption: 'Feedback de Hornet editor (@HornetSouls) - Editor de Vídeo (X / Twitter)',
    source: 'x'
  },
  {
    id: 'feedback-19',
    author: 'aMoon* (@amooneditora)',
    role: 'Editora de Vídeo',
    stars: 5,
    text: 'muito bom vey !! comprei e ja não vou conseguir viver sem muito chucro',
    url: '/bd/feedbacks/feedback-19-v2.png',
    caption: 'Feedback de aMoon* (@amooneditora) - Editora de Vídeo (X / Twitter)',
    source: 'x'
  },
  {
    id: 'feedback-20',
    author: 'roni YE (@realroniex)',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'SENSACIONAL',
    url: '/bd/feedbacks/feedback-20-v2.png',
    caption: 'Feedback de roni YE (@realroniex) - Editor de Vídeo (X / Twitter)',
    source: 'x'
  },
  {
    id: 'feedback-21',
    author: 'pabas (@pabasx)',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'testado e aprovado 👍 muito bom rapaziada com tantas limitações de download hoje em dia, isso aqui é ouro!!',
    url: '/bd/feedbacks/feedback-21-v2.png',
    caption: 'Feedback de pabas (@pabasx) - Editor de Vídeo (X / Twitter)',
    source: 'x'
  },
  {
    id: 'feedback-22',
    author: 'roni YE (@realroniex)',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Entro no twitter / Vejo programa foda / Compro o programa / Saio do twitter / Vou ser feliz',
    url: '/bd/feedbacks/feedback-22-v2.png',
    caption: 'Feedback de roni YE (@realroniex) - Compra Aprovada (X / Twitter)',
    source: 'x'
  },
  {
    id: 'feedback-23',
    author: 'Safe Sol (@The_safe_sol)',
    role: 'Criador de Conteúdo',
    stars: 5,
    text: 'comprado chefe, barato dms slc',
    url: '/bd/feedbacks/feedback-23-v2.png',
    caption: 'Feedback de Safe Sol (@The_safe_sol) - Criador de Conteúdo (X / Twitter)',
    source: 'x'
  }
];

export const PAYMENT_LINK_BASE = "https://pay.hotmart.com/S104243634I";
export const DISCOUNT_CODE = "BYTE81.25";
export const SCHEDULED_PROMO_PRICE = 15.00;
export const SCHEDULED_PROMO_DISCOUNT_LABEL = "81,25% OFF";
export const SCHEDULED_PROMO_DISCOUNT_PHRASE = "81,25% de desconto";
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
    discountCode: "BYTE81.25",
    discountLabel: '81,25% OFF',
    discountPhrase: '81,25% de desconto',
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
