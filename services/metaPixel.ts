type PixelWindow = Window & {
  __byteMetaPixelInitialized?: boolean;
  fbq?: (...args: unknown[]) => void;
};

// The Hotmart checkout sends InitiateCheckout on load and Purchase on conversion.
// Record the landing page outbound click separately to avoid double counting checkout events.
export function trackCheckoutClick(provider: 'hotmart' | 'mercadopago'): boolean {
  if (typeof window === 'undefined') return false;
  const pixelWindow = window as PixelWindow;
  if (window.location.hostname !== 'jonesbyte.github.io' ||
      window.location.pathname !== '/bd/' ||
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
