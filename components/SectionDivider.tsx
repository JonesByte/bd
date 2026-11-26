import React from 'react';

interface SectionDividerProps {
  accent?: string;
  from?: string;
  to?: string;
}

/** Transição limpa em degradê entre seções, sem traços luminosos ou glows. */
export const SectionDivider: React.FC<SectionDividerProps> = ({ from = '#050C16', to = '#050C16' }) => (
  <div
    aria-hidden="true"
    className="relative h-12 md:h-16 pointer-events-none"
    style={{ background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)` }}
  />
);
