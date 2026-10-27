import { Feature, Screenshot, ThemeData, FeedbackItem } from './types';

export const APP_NAME = "Byte Downloader";
export const APP_VERSION = "4.3.3"; 

// Preços
export const PRICE_ORIGINAL = { value: 97.00, display: "97,00" };
export const PRICE_PROMO = 49.90; 

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
  'Vídeos: Downloads em até 8K e múltiplos formatos.',
  'Fotos: Captura e busca inteligente de imagens.',
  'Thumbnails: Extração rápida de capas em alta resolução.',
  'Byte Gemini: Criação e assistência com IA integrada.',
  'Upscaling IA: Restauração e aumento de resolução 4K.',
  'Separar Áudio: Divisão de voz, música e efeitos sonoros.',
  'Transcrição IA: Transcrição automática e extração de legendas.',
  'Plugins: Integração com Premiere, AE e DaVinci.',
  'Conversão: Motor FFmpeg profissional de vídeo e áudio.',
  'Converter Fotos: Conversão prática entre formatos de imagem.',
  'Modelos 3D: Ferramentas dedicadas para arquivos 3D.',
  'Mixer de Mídia: Combinação e fluxo ágil de pós-produção.'
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
export const getFaqs = (isMercadoPago = false) => [
  {
    question: "Quais programas foram considerados na comparação de R$ 210,86/mês?",
    answer: "Consideramos: 4K Downloader Pro (US$ 45,00 ≈ R$ 228,74 vitalício), Topaz Gigapixel (US$ 149,00 ≈ R$ 757,37/ano), AutoCut AI (US$ 178,80 ≈ R$ 908,84/ano), Flow (US$ 35,00 ≈ R$ 177,91 vitalício) e LALAL.AI Lite (US$ 90,00 ≈ R$ 457,47/ano). No 1º ano: US$ 497,80 × R$ 5,083 = R$ 2.530,32 ÷ 12 = R$ 210,86/mês. É uma média de planos anuais e compras únicas para funções semelhantes. Existem alternativas gratuitas, mas a qualidade dos resultados pode variar. Referência: 16/10/2026, sem impostos ou taxas.",
    sources: [
      { label: "4K Downloader", url: "https://www.4kdownload.com/products/videodownloader-42" },
      { label: "Topaz", url: "https://www.topazlabs.com/pricing" },
      { label: "AutoCut", url: "https://www.autocut.com/en/pricing/" },
      { label: "Flow", url: "https://aescripts.com/flow/" },
      { label: "LALAL.AI", url: "https://www.lalal.ai/pricing/" },
      { label: "Câmbio de referência", url: "https://ycharts.com/indicators/us_dollar_to_brazilian_real_exchange_rate" }
    ]
  },
  {
    question: "Como funciona a Licença Vitalícia?",
    answer: "Você paga uma única vez e o Byte Downloader é seu para sempre. Não há mensalidades, cobranças recorrentes ou taxas extras para futuras atualizações."
  },
  {
    question: "O Upscale de IA precisa de internet?",
    answer: "Não! O processamento é feito 100% localmente usando a potência da sua placa de vídeo (GPU), garantindo velocidade máxima e total privacidade dos seus arquivos."
  },
  {
    question: "O envio do programa é automático?",
    answer: isMercadoPago
      ? "Sim! Após o pagamento via Mercado Pago, envie o comprovante na DM do X \"Jones Byte\" com o seu e-mail para ter acesso imediato via Google Drive."
      : "Sim! Após a confirmação do pagamento na Hotmart, o download do instalador é liberado imediatamente. As atualizações seguintes são baixadas e instaladas automaticamente pelo próprio app."
  },
  {
    question: "Funciona em quais sites?",
    answer: "YouTube, Instagram, TikTok, Facebook, X (Twitter), Twitch e mais de 100 outras plataformas com suporte a áudio, vídeo em até 8K e fotos em alta resolução."
  },
  {
    question: "Serve para Premiere, Resolve e Vegas?",
    answer: "Sim! Além de gerar arquivos universais (MP4, MP3, M4A, JPG e PNG) compatíveis com qualquer software de edição, o Byte inclui plugins nativos para Premiere Pro, After Effects e DaVinci Resolve para importar direto na sua timeline."
  }
];

export const FAQS = getFaqs(false);

// Feedbacks de Usuários
export const FEEDBACKS: FeedbackItem[] = [
  {
    id: 'feedback-youtube-nox',
    author: 'Noxxyz (@NoxxyEditor)',
    role: 'Editor e Criador de Conteúdo',
    stars: 5,
    text: 'A próxima dica, que eu tinha esquecido de falar no vídeo, é o Byte Downloader. Não estou sendo patrocinado, ele é pago e é feito por um brasileiro. Não posso falar o que esse app faz, mas ele é bem intuitivo.',
    url: 'https://i.ytimg.com/vi/zfINGxdh69c/hqdefault.jpg',
    caption: 'Noxxyz (@NoxxyEditor) recomenda o Byte Downloader no YouTube (3:09)',
    source: 'youtube',
    videoId: 'zfINGxdh69c',
    startSeconds: 189,
    avatar: '/bd/feedbacks/avatars/noxxyz.png'
  },
  {
    id: 'feedback-26',
    author: 'Luckyzera',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Rapaaaaz, esse programa tá sendo maravilhoso! Tô gostando mt e usando pros meus clientes. Precisava de uma forma de baixar vídeos com toda qualidade possível, mas além dessa ferramenta, decupar áudio na timeline e ajustar áudio... slk, q parada insana. Você é incrível, indicarei para todos sempre q possível',
    url: '/bd/feedbacks/feedback-26-v2.png',
    caption: 'Feedback de Luckyzera - Editor de Vídeo (Discord)',
    source: 'discord',
    avatar: '/bd/feedbacks/avatars/luckyzera.png'
  },
  {
    id: 'feedback-6',
    author: 'eodoglakk',
    role: 'Editor de Vídeos',
    stars: 5,
    text: 'Essa atualização melhorou DEMAIS tudo, muito gratificante usar o Byte Downloader nos meus trabalhos. PARABÉNS PELO TRABALHO, JONES!',
    url: '/bd/feedbacks/feedback-6-v2.png',
    caption: 'Feedback de eodoglakk - Editor de Vídeos (X / Twitter)',
    source: 'x',
    avatar: '/bd/feedbacks/avatars/eodoglakk.png'
  },
  {
    id: 'feedback-1',
    author: 'temoki',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Darei 5 estrelas por conta da unificação de downloaders, já que ao invés de usar downloaders separados para sites diferentes eu consigo simplesmente baixar tudo diretamente do byte downloader, além de funções extras como conversão de arquivos e upscaling que são a 🍒',
    url: '/bd/feedbacks/feedback-1-v2.png',
    caption: 'Feedback de temoki - Editor de Vídeo',
    source: 'discord',
    avatar: '/bd/feedbacks/avatars/temoki.png'
  },
  {
    id: 'feedback-2',
    author: 'Arthur Claro',
    role: 'Criador de Conteúdo',
    stars: 5,
    text: 'Orra Jones, ficou absurdo! Deu certo aqui. Gostei bastante que você colocou para conseguir clipar o tempo. Isso é muito bom para quando quer pegar só um trecho do vídeo. Excelente trabalho!!',
    url: '/bd/feedbacks/feedback-2-v2.png',
    caption: 'Feedback de Arthur Claro - Criador de Conteúdo',
    source: 'discord',
    avatar: '/bd/feedbacks/avatars/arthur_claro.png'
  },
  {
    id: 'feedback-3',
    author: 'João Donizeti',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'O Jones responde rápido e o programa tá f*da, ele é muito atencioso com você. Até daria 1000 se fosse possível! Se eu fosse você compraria rapidamente.',
    url: '/bd/feedbacks/feedback-3-v2.png?v=20260713-real',
    caption: 'Feedback de João Donizeti - Editor de Vídeo',
    source: 'discord',
    avatar: '/bd/feedbacks/avatars/joao_donizeti.png'
  },
  {
    id: 'feedback-5',
    author: 'guuzera',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Comprei hoje, fiz uns testes básicos e tá filé pra algumas ideias que quero fazer.',
    url: '/bd/feedbacks/feedback-5-v2.png',
    caption: 'Feedback de guuzera - Editor de Vídeo',
    source: 'discord',
    avatar: '/bd/feedbacks/avatars/guuzera.png'
  },
  {
    id: 'feedback-7',
    author: 'Rafael Costa',
    role: 'Editor de Vídeos',
    stars: 5,
    text: 'Cara, o app ficou incrível, parabéns pelo trabalho. Essa última versão resolveu alguns dos problemas que tive em comparação às primeiras. Os downloads responderam bem e a UI ficou mais organizada. Tô para testar o plugin do Premiere, mas digo que valeu super a pena a aquisição.',
    url: '/bd/feedbacks/feedback-7-v2.png',
    caption: 'Feedback de Rafael Costa - Editor de Vídeos (X / Twitter)',
    source: 'x',
    avatar: '/bd/feedbacks/avatars/rafael_costa.png'
  },
  {
    id: 'feedback-8',
    author: 'Thiag',
    role: 'Editor de Vídeos',
    stars: 5,
    text: 'PERNETA SEU VERME OLHA AI O PROGRAMA QUE EU USEI PRA TE SALVAR AQUELA VEZ',
    url: '/bd/feedbacks/feedback-8-v2.png',
    caption: 'Feedback de Thiag - Editor de Vídeos (X / Twitter)',
    source: 'x',
    avatar: '/bd/feedbacks/avatars/thiag.png'
  },
  {
    id: 'feedback-9',
    author: 'KAILER',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Comprei teu programa e namoral, é milagroso, tava cansado de entrar em site suspeito pra baixar tudo menos o vídeo que eu queria haha, vale mt a pena',
    url: '/bd/feedbacks/feedback-9-v2.png',
    caption: 'Feedback de KAILER - Editor de Vídeo (X / Twitter)',
    source: 'x',
    avatar: '/bd/feedbacks/avatars/kailer.png'
  },
  {
    id: 'feedback-10',
    author: 'ruikk',
    role: 'Editor e Criador de Conteúdo',
    stars: 5,
    text: 'O Byte é literalmente o sonho de todo editor de video e criador de conteúdo, além disso é feito por um brasileiro e tem um preço super generoso comparado com o tempo e dinheiro que ele te traz de retorno, vamo apoiar meu mano Jones!!',
    url: '/bd/feedbacks/feedback-10-v2.png',
    caption: 'Feedback de ruikk - Editor e Criador de Conteúdo (X / Twitter)',
    source: 'x',
    avatar: '/bd/feedbacks/avatars/ruikk.png'
  },
  {
    id: 'feedback-11',
    author: 'Liiki O Editor',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Um monte de gente comentou e perguntou sobre qual ferramenta eu uso: é o Byte Downloader desenvolvido pelo @JonesByte. Depois de mó tempo, finalmente as ferramentas de automatizar tempo na edição funcionaram pra mim.',
    url: '/bd/feedbacks/feedback-11-v2.png',
    caption: 'Feedback de Liiki O Editor - Editor de Vídeo (X / Twitter)',
    source: 'x',
    avatar: '/bd/feedbacks/avatars/liiki.png'
  },
  {
    id: 'feedback-12',
    author: 'kise',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'to usando ha uns dias e ta muito brabo irmão ta agilizando mto o processo vei parabéns mano continua atualizando e vamo que vamo',
    url: '/bd/feedbacks/feedback-12-v2.png',
    caption: 'Feedback de kise - Editor de Vídeo',
    source: 'discord',
    avatar: '/bd/feedbacks/avatars/kise.png'
  },
  {
    id: 'feedback-13',
    author: 'Lucas (@luqkezin)',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Tá insano esse projeto',
    url: '/bd/feedbacks/feedback-13-v2.png',
    caption: 'Feedback de Lucas (@luqkezin) - Editor de Vídeo (X / Twitter)',
    source: 'x',
    avatar: '/bd/feedbacks/avatars/lucas.png'
  },
  {
    id: 'feedback-14',
    author: 'UnderDogg (@DoggUndr)',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Só o fato de poder baixar uma parte especifica ja tinha despertado meu interesse. To adorando usar',
    url: '/bd/feedbacks/feedback-14-v2.png',
    caption: 'Feedback de UnderDogg (@DoggUndr) - Editor de Vídeo (X / Twitter)',
    source: 'x',
    avatar: '/bd/feedbacks/avatars/underdogg.png'
  },
  {
    id: 'feedback-16',
    author: 'Douglas (@entaocara)',
    role: 'Criador de Conteúdo',
    stars: 5,
    text: 'Vai salvar pra criar conteúdo, peguei irmão. Sucesso sempre',
    url: '/bd/feedbacks/feedback-16-v2.png',
    caption: 'Feedback de Douglas (@entaocara) - Criador de Conteúdo (X / Twitter)',
    source: 'x',
    avatar: '/bd/feedbacks/avatars/douglas.png'
  },
  {
    id: 'feedback-17',
    author: 'Allan (@AllxnBRZ)',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Vi sobre, achei bem interessante a proposta do seu programa, ainda mais pra mim que tenho preguiça de fazer um próprio kk, acabei de comprar, creio que vou gostar e usar muito!!',
    url: '/bd/feedbacks/feedback-17-v2.png',
    caption: 'Feedback de Allan (@AllxnBRZ) - Editor de Vídeo (X / Twitter)',
    source: 'x',
    avatar: '/bd/feedbacks/avatars/allan.png'
  },
  {
    id: 'feedback-18',
    author: 'Hornet editor (@HornetSouls)',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'rapaz, não é que o negócio é bom mesmo? curti pra krl @JonesByte',
    url: '/bd/feedbacks/feedback-18-v2.png',
    caption: 'Feedback de Hornet editor (@HornetSouls) - Editor de Vídeo (X / Twitter)',
    source: 'x',
    avatar: '/bd/feedbacks/avatars/hornet.png'
  },
  {
    id: 'feedback-19',
    author: 'aMoon* (@amooneditora)',
    role: 'Editora de Vídeo',
    stars: 5,
    text: 'muito bom vey !! comprei e ja não vou conseguir viver sem muito chucro',
    url: '/bd/feedbacks/feedback-19-v2.png',
    caption: 'Feedback de aMoon* (@amooneditora) - Editora de Vídeo (X / Twitter)',
    source: 'x',
    avatar: '/bd/feedbacks/avatars/amoon.png'
  },
  {
    id: 'feedback-20',
    author: 'roni YE (@realroniex)',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'SENSACIONAL',
    url: '/bd/feedbacks/feedback-20-v2.png',
    caption: 'Feedback de roni YE (@realroniex) - Editor de Vídeo (X / Twitter)',
    source: 'x',
    avatar: '/bd/feedbacks/avatars/roni.png'
  },
  {
    id: 'feedback-21',
    author: 'pabas (@pabasx)',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'testado e aprovado 👍 muito bom rapaziada com tantas limitações de download hoje em dia, isso aqui é ouro!!',
    url: '/bd/feedbacks/feedback-21-v2.png',
    caption: 'Feedback de pabas (@pabasx) - Editor de Vídeo (X / Twitter)',
    source: 'x',
    avatar: '/bd/feedbacks/avatars/pabas.png'
  },
  {
    id: 'feedback-22',
    author: 'roni YE (@realroniex)',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Entro no twitter / Vejo programa foda / Compro o programa / Saio do twitter / Vou ser feliz',
    url: '/bd/feedbacks/feedback-22-v2.png',
    caption: 'Feedback de roni YE (@realroniex) - Compra Aprovada (X / Twitter)',
    source: 'x',
    avatar: '/bd/feedbacks/avatars/roni.png'
  },
  {
    id: 'feedback-23',
    author: 'Safe Sol (@The_safe_sol)',
    role: 'Criador de Conteúdo',
    stars: 5,
    text: 'comprado chefe, barato dms slc',
    url: '/bd/feedbacks/feedback-23-v2.png',
    caption: 'Feedback de Safe Sol (@The_safe_sol) - Criador de Conteúdo (X / Twitter)',
    source: 'x',
    avatar: '/bd/feedbacks/avatars/safe_sol.png'
  },
  {
    id: 'feedback-24',
    author: 'Gui',
    role: 'Editor de Vídeo',
    stars: 5,
    text: 'Opa! Eu sou editor de clips de livestream e o Byte ta salvando MUITO a minha vida pra extrair 1 minuto de uma live de 3 horas! Só tenho a agradecer.',
    url: '/bd/feedbacks/feedback-24-v2.png',
    caption: 'Feedback de Gui - Editor de Clips e Vídeo (Discord)',
    source: 'discord',
    avatar: '/bd/feedbacks/avatars/gui.png'
  },
  {
    id: 'feedback-25',
    author: 'ImPeter',
    role: 'Membro BITS',
    stars: 5,
    text: 'So good guys, you need that!!',
    url: '/bd/feedbacks/feedback-25-v2.png',
    caption: 'Feedback de ImPeter - Membro BITS (Discord)',
    source: 'discord',
    avatar: '/bd/feedbacks/avatars/impeter.png'
  }
];

export const PAYMENT_LINK_BASE = "https://pay.hotmart.com/S104243634I";
export const DISCOUNT_CODE = "BYTE48,56";
export const SCHEDULED_PROMO_PRICE = 49.90;
export const SCHEDULED_PROMO_DISCOUNT_LABEL = "48% OFF";
export const SCHEDULED_PROMO_DISCOUNT_PHRASE = "48% de desconto";
export const PROMOTION_START_ISO = "2026-09-05T09:36:00-03:00";
export const PROMOTION_END_ISO = "2026-09-08T23:00:00-03:00";

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
    promoPrice: 49.90,
    discountCode: "BYTE48,56",
    discountLabel: '48% OFF',
    discountPhrase: '48% de desconto',
    isDiscountActive: false
  };
};

export const getDiscountCode = () => getCurrentOffer().discountCode ?? DISCOUNT_CODE;
export const getPromoPrice = () => 49.90;
export const getDiscountLabel = () => '48% OFF';
export const getDiscountPhrase = () => '48% de desconto';

export const getPaymentLink = () => {
  const code = DISCOUNT_CODE;
  return code ? `${PAYMENT_LINK_BASE}?offDiscount=${code}` : PAYMENT_LINK_BASE;
};

export const PAYMENT_LINK = getPaymentLink();

// Capítulos do vídeo demo (/bd/byte-demo.mp4, 3:49). Tempos em segundos.
export interface VideoChapter {
  start: number;
  title: string;
  desc: string;
  tag?: string;
  shortTitle?: string;
  icon?: string;
}

export const DEMO_VIDEO_DURATION = 229;

export const VIDEO_CHAPTERS: VideoChapter[] = [
  { start: 0,   title: 'Aba Vídeos',                 shortTitle: 'Vídeos',         tag: 'Download 8K',      desc: 'Cole o link e baixe em alta qualidade', icon: 'download' },
  { start: 9,   title: 'Aba Fotos',                  shortTitle: 'Fotos',          tag: 'Imagens',          desc: 'Pesquise e salve imagens', icon: 'image' },
  { start: 17,  title: 'Byte IA · Byte Gemini',      shortTitle: 'Gemini IA',      tag: 'Chat IA',          desc: 'Chat com IA dentro do app', icon: 'bot' },
  { start: 21,  title: 'Byte IA · Upscaling',        shortTitle: 'Upscaling',      tag: 'Melhoria IA',      desc: 'Melhore imagens com IA local', icon: 'sparkles' },
  { start: 27,  title: 'Byte IA · Separar Áudio',    shortTitle: 'Separar Áudio',  tag: 'Stems',            desc: 'Voz, música e efeitos separados', icon: 'music' },
  { start: 33,  title: 'Byte IA · Transcrição',      shortTitle: 'Transcrição',    tag: 'Áudio em Texto',   desc: 'Áudio e vídeo em texto e legenda', icon: 'file-text' },
  { start: 36,  title: 'Estúdio · Plugin & AutoCut', shortTitle: 'AutoCut & Plugin', tag: 'Premiere/AE/DaVinci', desc: 'Premiere, After Effects e DaVinci + AutoCut', icon: 'scissors' },
  { start: 56,  title: 'Plugin · Curvas Bézier',     shortTitle: 'Curvas Bézier',  tag: 'Suavização',       desc: 'Presets de animação nos keyframes', icon: 'activity' },
  { start: 72,  title: 'Plugin · Auto Loop',         shortTitle: 'Auto Loop',      tag: 'Loop Clipes',      desc: 'Repita mídias na timeline', icon: 'repeat' },
  { start: 78,  title: 'Plugin · Transcrição',       shortTitle: 'Legendas Timeline', tag: 'Whisper IA',     desc: 'Legendas direto na timeline', icon: 'captions' },
  { start: 99,  title: 'Plugin · Estilos de Legenda', shortTitle: 'Estilos Legenda', tag: 'Presets Visuais', desc: 'Presets prontos para as legendas', icon: 'type' },
  { start: 111, title: 'Plugin · Áudio & Mixer',     shortTitle: 'Mixer Áudio',    tag: 'Tratamento',       desc: 'Voz, música e mixer na timeline', icon: 'sliders' },
  { start: 135, title: 'Plugin · Laboratório Beta',  shortTitle: 'Lab Beta',       tag: 'Recursos Beta',    desc: 'Recursos extras e experimentais', icon: 'flask-conical' },
  { start: 158, title: 'Conversão · Vídeo/Áudio',    shortTitle: 'Conversor',      tag: 'FFmpeg Turbo',     desc: 'Motor FFmpeg integrado', icon: 'refresh-cw' },
  { start: 165, title: 'Conversão · Foto e 3D',      shortTitle: 'Fotos & 3D',     tag: 'Formatos 3D',      desc: 'Imagens e modelos 3D', icon: 'box' },
  { start: 171, title: 'Estúdio · Mixer',            shortTitle: 'Mixer Master',   tag: 'Masterização',     desc: 'Mixagem e masterização do áudio', icon: 'volume-2' },
  { start: 191, title: 'Configurações',              shortTitle: 'Configurações',  tag: 'Ajustes',          desc: 'Ajustes do sistema e pastas', icon: 'settings' },
  { start: 212, title: 'Vídeos · Download em ação',  shortTitle: 'Download Real',  tag: 'Na Prática',       desc: 'Do link ao arquivo pronto', icon: 'play' }
];

export const MERCADO_PAGO_PAYMENT_LINK = "https://mpago.la/2xwHvjU";
export const MERCADO_PAGO_INSTRUCTION = 'Byte Downloader Vitalício (Envie o comprovante na DM do X "Jones Byte", junto com o email pra ter acesso via Google Drive)';
export const TWITTER_DM_LINK = "https://x.com/JonesByte";

export const isMercadoPagoRoute = (): boolean => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  return (
    path.includes('mercadopago') ||
    hash.includes('mercadopago') ||
    search.includes('mercadopago')
  );
};
