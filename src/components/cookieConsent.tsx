'use client';

import { useState, useEffect } from 'react';
import { grantAnalyticsConsent, denyAnalyticsConsent } from '@/lib/analytics/Gtag';
import styles from './cookieConsent.module.scss';

export default function CookieConsent(): JSX.Element | null {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (consent === null) {
      // Show consent banner if no choice has been made
      setShowConsent(true);
    } else if (consent === 'true') {
      // User previously accepted, grant consent
      grantAnalyticsConsent();
    }
  }, []);

  const acceptCookies = (): void => {
    localStorage.setItem('cookie-consent', 'true');
    setShowConsent(false);
    grantAnalyticsConsent();
  };

  const declineCookies = (): void => {
    localStorage.setItem('cookie-consent', 'false');
    setShowConsent(false);
    denyAnalyticsConsent();
  };

  if (!showConsent) return null;

  return (
    <div className={styles.cookieConsent}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h3>🍪 Cookies</h3>
          <p>
            We gebruiken analytische cookies om onze website te verbeteren en je tuinervaring 
            te personaliseren. Deze helpen ons begrijpen welke tuininformatie het meest waardevol voor je is.
          </p>
        </div>
        <div className={styles.buttons}>
          <button 
            onClick={acceptCookies} 
            className={`${styles.button} ${styles.accept}`}
            aria-label="Accepteer analytische cookies"
          >
            Accepteren
          </button>
          <button 
            onClick={declineCookies} 
            className={`${styles.button} ${styles.decline}`}
            aria-label="Weiger analytische cookies"
          >
            Weigeren
          </button>
        </div>
      </div>
    </div>
  );
}