import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Bloemstraat Garden - Moestuinieren leren';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #00381e 0%, #006838 50%, #2d8b4e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            opacity: 0.8,
            marginBottom: 20,
          }}
        >
          🌱
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Bloemstraat Garden
        </div>
        <div
          style={{
            fontSize: 28,
            opacity: 0.85,
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          Leer moestuinieren door ervaring, tips en kennis te delen
        </div>
      </div>
    ),
    { ...size }
  );
}
