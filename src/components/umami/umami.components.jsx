import { useEffect } from 'react';

export const UmamiTracker = () => {
  useEffect(() => {
    const scriptUrl = import.meta.env.VITE_UMAMI_SCRIPT_URL;
    const websiteId = import.meta.env.VITE_UMAMI_ID;

    if (!scriptUrl || !websiteId) return;

    if (document.querySelector(`script[src="${scriptUrl}"]`)) return;

    const script = document.createElement('script');
    script.defer = true;
    script.src = scriptUrl;
    script.setAttribute('data-website-id', websiteId);
    
    document.head.appendChild(script);
  }, []);

  return null;
};
