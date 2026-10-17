import { useState, useEffect } from 'react';
import { APP_VERSION as FALLBACK_VERSION } from '../constants';

export function useAppVersion() {
  const [version, setVersion] = useState(FALLBACK_VERSION);

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await fetch('https://gist.githubusercontent.com/JonesByte/149ab7001bbe58c4c20afb0f007021b2/raw/.js?t=' + Date.now());
        if (response.ok) {
          const data = await response.json();
          if (data.latest_version) {
            setVersion(data.latest_version);
          }
        }
      } catch (error) {
        console.error('Failed to fetch latest app version from Gist:', error);
      }
    };

    fetchVersion();
  }, []);

  return version;
}
