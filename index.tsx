import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { isPromotionActive } from './constants';

const PROMO_HOTMART_LINK = 'https://pay.hotmart.com/S104243634I?offDiscount=BYTE83,51';
const REGULAR_HOTMART_LINK = 'https://pay.hotmart.com/S104243634I';
const getTargetHotmartLink = () => (isPromotionActive() ? PROMO_HOTMART_LINK : REGULAR_HOTMART_LINK);

// Keep the main Hotmart purchase button on the requested Brazil offer link (zero MutationObserver overhead).
if (typeof document !== 'undefined') {
  const updateHotmartLinks = (node: ParentNode) => {
    node.querySelectorAll<HTMLAnchorElement>('a[href*="pay.hotmart.com/S104243634I"]').forEach((link) => {
      const targetUrl = getTargetHotmartLink();
      if (link.href !== targetUrl) link.href = targetUrl;
    });
  };

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest<HTMLAnchorElement>('a[href*="pay.hotmart.com/S104243634I"]');
    if (link) link.href = getTargetHotmartLink();
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => updateHotmartLinks(document), { once: true });
  } else {
    updateHotmartLinks(document);
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
