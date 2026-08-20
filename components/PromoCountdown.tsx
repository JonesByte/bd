import React, { useEffect, useState } from 'react';
import { Clock3, Ticket } from 'lucide-react';
import { PROMOTION_END_ISO, PROMOTION_START_ISO } from '../constants';

export type CountdownPhase = 'upcoming' | 'active' | 'ended';

export type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  phase: CountdownPhase;
  label: string;
  badge: string;
  expired: boolean;
};

const startTime = new Date(PROMOTION_START_ISO).getTime();
const endTime = new Date(PROMOTION_END_ISO).getTime();

const toParts = (distance: number) => {
  const safeDistance = Math.max(0, distance);

  return {
    days: Math.floor(safeDistance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((safeDistance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((safeDistance / (1000 * 60)) % 60),
    seconds: Math.floor((safeDistance / 1000) % 60)
  };
};

export const getCountdown = (): CountdownState => {
  const now = Date.now();

  if (now < startTime) {
    return {
      ...toParts(startTime - now),
      phase: 'upcoming',
      label: 'Começa em 05/08/2026 às 00:00',
      badge: 'PROMOÇÃO EXCLUSIVA programado',
      expired: false
    };
  }

  if (now <= endTime) {
    return {
      ...toParts(endTime - now),
      phase: 'active',
      label: 'Acaba em 20/08/2026 às 23:59',
      badge: 'PROMOÇÃO EXCLUSIVA TEMPO LIMITADO',
      expired: false
    };
  }

  return {
    ...toParts(0),
    phase: 'ended',
    label: 'Promoção encerrada',
    badge: 'Promoção encerrada',
    expired: true
  };
};

const pad = (value: number) => value.toString().padStart(2, '0');

const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownState>(() => getCountdown());

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return timeLeft;
};

type PromoCountdownProps = {
  compact?: boolean;
};

export const PromoCountdown: React.FC<PromoCountdownProps> = ({ compact = false }) => {
  const timeLeft = useCountdown();
  const countdownItems = [
    { label: 'dias', value: timeLeft.days.toString() },
    { label: 'horas', value: pad(timeLeft.hours) },
    { label: 'min', value: pad(timeLeft.minutes) },
    { label: 'seg', value: pad(timeLeft.seconds) }
  ];

  return (
    <div className="w-full text-center">
      <div className={`inline-flex items-center gap-2 rounded-full bg-byte-highlight text-byte-navy font-black uppercase shadow-[0_0_25px_rgba(204,255,0,0.35)] ${compact ? 'px-3 py-1.5 text-[10px]' : 'px-4 py-2 text-xs'} tracking-widest`}>
        <Ticket size={compact ? 13 : 15} /> {timeLeft.badge}
      </div>

      <div className={`mt-3 rounded-2xl border border-byte-highlight/35 bg-black/20 ${compact ? 'p-3' : 'p-4'}`}>
        <div className={`mb-3 flex items-center justify-center gap-2 font-black uppercase tracking-widest text-byte-highlight ${compact ? 'text-[10px]' : 'text-xs'}`}>
          <Clock3 size={compact ? 13 : 15} /> {timeLeft.label}
        </div>
        {timeLeft.expired ? (
          <div className="rounded-xl bg-white/10 px-4 py-3 text-sm font-black uppercase tracking-widest text-white">
            Promoção encerrada
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {countdownItems.map((item) => (
              <div key={item.label} className={`rounded-xl border border-white/10 bg-byte-navy/80 ${compact ? 'px-2 py-2' : 'px-2 py-3'}`}>
                <div className={`font-tech font-black leading-none text-white ${compact ? 'text-xl' : 'text-2xl'}`}>{item.value}</div>
                <div className="mt-1 text-[9px] font-black uppercase tracking-widest text-white/60">{item.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};