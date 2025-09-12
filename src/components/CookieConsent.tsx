'use client';

import { useState, useEffect } from 'react';
import { grantAnalyticsConsent, denyAnalyticsConsent } from '@/lib/analytics/Gtag';
import { CookieConsentContainer, Content, Text, Buttons, AcceptButton, DeclineButton } from './CookieConsent.styled';

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
    <CookieConsentContainer>
      <Content>
        <Text>
          <h3>🍪 Cookies</h3>
          <p>
            We gebruiken analytische cookies om onze website te verbeteren en je tuinervaring 
            te personaliseren. Deze helpen ons begrijpen welke tuininformatie het meest waardevol voor je is.
          </p>
        </Text>
        <Buttons>
          <AcceptButton 
            onClick={acceptCookies} 
            aria-label="Accepteer analytische cookies"
          >
            Accepteren
          </AcceptButton>
          <DeclineButton 
            onClick={declineCookies} 
            aria-label="Weiger analytische cookies"
          >
            Weigeren
          </DeclineButton>
        </Buttons>
      </Content>
    </CookieConsentContainer>
  );
}