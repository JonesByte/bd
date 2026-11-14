import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { isPromotionActive } from './constants';

const PROMO_HOTMART_LINK = 'https://pay.hotmart.com/S104243634I?offDiscount=BYTE83,51';
const REGULAR_HOTMART_LINK = 'https://pay.hotmart.com/S104243634I';
const getTargetHotmartLink = () => (isPromotionActive() ? PROMO_HOTMART_LINK : REGULAR_HOTMART_LINK);

// Keep the main Hotmart purchase button on the requested Brazil offer link.
if (typeof document !== 'undefined') {
  const updateHotmartLinks = (node: ParentNode) => {
    node.querySelectorAll<HTMLAnchorElement>('a[href*="pay.hotmart.com/S104243634I"]').forEach((link) => {
      if (link.href !== getTargetHotmartLink()) link.href = getTargetHotmartLink();
    });
  };

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) {
          if (node.matches('a[href*="pay.hotmart.com/S104243634I"]')) {
            (node as HTMLAnchorElement).href = getTargetHotmartLink();
          }
          updateHotmartLinks(node);
        }
      });
    });
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest<HTMLAnchorElement>('a[href*="pay.hotmart.com/S104243634I"]');
    if (link) link.href = getTargetHotmartLink();
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => updateHotmartLinks(document));
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
