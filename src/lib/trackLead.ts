declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const trackLead = () => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead');
  }
};
