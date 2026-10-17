type PixelWindow = Window & {
  __byteMetaPixelInitialized?: boolean;
  fbq?: (...args: unknown[]) => void;
};

// An outbound checkout click is not a completed purchase or a loaded checkout.
export function trackCheckoutClick(provider: 'hotmart' | 'mercadopago'): boolean {
  if (typeof window === 'undefined') return false;
  const pixelWindow = window as PixelWindow;
  if (window.location.hostname !== 'jonesbyte.github.io' ||
      !window.location.pathname.startsWith('/bd/') ||
      /^\/bd\/teste(?:\/|$)/.test(window.location.pathname) ||
      !pixelWindow.__byteMetaPixelInitialized || typeof pixelWindow.fbq !== 'function') return false;
  try {
    pixelWindow.fbq('trackCustom', 'CheckoutClick', {
      content_name: 'Byte Downloader',
      checkout_provider: provider,
      button_name: 'purchase_cta',
    });
    return true;
  } catch {
    // Analytics must never prevent the buyer from opening the checkout.
    return false;
  }
}
