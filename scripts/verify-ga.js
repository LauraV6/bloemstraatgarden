// Run this in your browser console to verify Google Analytics is loaded
// Usage: Copy and paste this entire script into the browser console on your site

console.log('=== Google Analytics Verification ===');

// 1. Check if gtag is loaded
if (typeof gtag !== 'undefined') {
  console.log('✅ gtag function is loaded');
} else {
  console.log('❌ gtag function is NOT loaded');
}

// 2. Check if dataLayer exists
if (typeof dataLayer !== 'undefined') {
  console.log('✅ dataLayer exists with', dataLayer.length, 'events');
  console.log('Recent events:', dataLayer.slice(-5));
} else {
  console.log('❌ dataLayer is NOT defined');
}

// 3. Check GA script in DOM
const gaScript = document.querySelector('script[src*="googletagmanager.com/gtag"]');
if (gaScript) {
  console.log('✅ GA script tag found:', gaScript.src);
} else {
  console.log('❌ GA script tag NOT found in DOM');
}

// 4. Check environment variable
const gaMeasurementId = 'G-8ZPB6E7PLC'; // Your GA ID
console.log('Expected GA ID:', gaMeasurementId);

// 5. Check cookie consent status
const cookieConsent = localStorage.getItem('cookie-consent');
console.log('Cookie consent status:', cookieConsent || 'not set');

// 6. Test sending an event
if (typeof gtag !== 'undefined') {
  console.log('Sending test event...');
  gtag('event', 'test_event', {
    event_category: 'testing',
    event_label: 'manual_test'
  });
  console.log('✅ Test event sent');
} else {
  console.log('❌ Cannot send test event - gtag not loaded');
}

// 7. Check for GA cookies
const gaCookies = document.cookie.split(';').filter(c => c.includes('_ga'));
if (gaCookies.length > 0) {
  console.log('✅ GA cookies found:', gaCookies.length);
  gaCookies.forEach(c => console.log('  -', c.trim()));
} else {
  console.log('❌ No GA cookies found (may be blocked by consent)');
}

console.log('=== End of verification ===');
console.log('');
console.log('Next steps:');
console.log('1. If gtag is not loaded, check your .env.local file');
console.log('2. If cookies are blocked, click "Accept" on cookie banner');
console.log('3. Check GA4 Real-time reports for your test event');