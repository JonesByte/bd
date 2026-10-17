import React from 'react';

interface FlagProps {
  className?: string;
}

// 🇧🇷 Bandeira do Brasil em SVG ultra-nítido
export const FlagBR: React.FC<FlagProps> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 720 504" className={className} aria-label="Português (Brasil)">
    <rect width="720" height="504" fill="#009c3b" />
    <polygon points="360,48 672,252 360,456 48,252" fill="#ffdf00" />
    <circle cx="360" cy="252" r="126" fill="#002776" />
    <path 
      d="M 234 252 A 126 126 0 0 0 486 252 A 136 136 0 0 1 234 252" 
      fill="#ffffff" 
    />
  </svg>
);

// 🇵🇹 Bandeira de Portugal em SVG ultra-nítido
export const FlagPT: React.FC<FlagProps> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 600 400" className={className} aria-label="Português (Portugal)">
    <rect width="240" height="400" fill="#046A38" />
    <rect x="240" width="360" height="400" fill="#DA291C" />
    <circle cx="240" cy="200" r="66" fill="#FFC400" stroke="#000000" strokeWidth="2.5" />
    <path d="M 214 165 h 52 v 42 a 26 26 0 0 1 -52 0 z" fill="#ffffff" stroke="#DA291C" strokeWidth="3" />
    <path d="M 226 177 h 10 v 14 h -10 z M 244 177 h 10 v 14 h -10 z M 235 195 h 10 v 14 h -10 z" fill="#002776" />
  </svg>
);

// 🇺🇸 Bandeira dos Estados Unidos (Inglês) em SVG ultra-nítido
export const FlagUS: React.FC<FlagProps> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 741 390" className={className} aria-label="English">
    <rect width="741" height="390" fill="#B22234" />
    <path d="M0,30H741M0,90H741M0,150H741M0,210H741M0,270H741M0,330H741" stroke="#FFFFFF" strokeWidth="30" />
    <rect width="296.4" height="210" fill="#3C3B6E" />
    <g fill="#FFFFFF">
      <circle cx="38" cy="32" r="7" /><circle cx="98" cy="32" r="7" /><circle cx="158" cy="32" r="7" /><circle cx="218" cy="32" r="7" /><circle cx="270" cy="32" r="7" />
      <circle cx="68" cy="67" r="7" /><circle cx="128" cy="67" r="7" /><circle cx="188" cy="67" r="7" /><circle cx="244" cy="67" r="7" />
      <circle cx="38" cy="105" r="7" /><circle cx="98" cy="105" r="7" /><circle cx="158" cy="105" r="7" /><circle cx="218" cy="105" r="7" /><circle cx="270" cy="105" r="7" />
      <circle cx="68" cy="142" r="7" /><circle cx="128" cy="142" r="7" /><circle cx="188" cy="142" r="7" /><circle cx="244" cy="142" r="7" />
      <circle cx="38" cy="178" r="7" /><circle cx="98" cy="178" r="7" /><circle cx="158" cy="178" r="7" /><circle cx="218" cy="178" r="7" /><circle cx="270" cy="178" r="7" />
    </g>
  </svg>
);

// 🇪🇸 Bandeira da Espanha (Espanhol) em SVG ultra-nítido
export const FlagES: React.FC<FlagProps> = ({ className = "w-5 h-3.5" }) => (
  <svg viewBox="0 0 750 500" className={className} aria-label="Español">
    <rect width="750" height="500" fill="#AA151B" />
    <rect y="125" width="750" height="250" fill="#F1BF00" />
    <g transform="translate(180, 250)">
      <circle cx="0" cy="0" r="28" fill="#AA151B" opacity="0.85" />
      <circle cx="0" cy="0" r="18" fill="#F1BF00" />
    </g>
  </svg>
);
