## Inhoudsopgave

- [Overzicht](#overzicht)
- [Belangrijkste features](#belangrijkste-features)
- [Snel starten](#snel-starten)
- [Scripts](#scripts)
- [Tech stack](#tech-stack)
- [Projectstructuur](#projectstructuur)
- [Configuratie & Omgevingsvariabelen](#configuratie--omgevingsvariabelen)
- [Testing](#testing)
- [Quality & Performance](#quality--performance)
- [Accessibility & SEO](#accessibility--seo)
- [Deployment](#deployment)
- [Troubleshooting / FAQ](#troubleshooting--faq)
- [Contributing](#contributing)
- [License](#license)

## Overzicht

Bloemstraat Garden is een Next.js-app die content (o.a. blog/tips), een quiz, weergegevens en een eenvoudige winkelervaring (verkrijgbaar + winkelmand) samenbrengt. Doel: bezoekers informeren en converteren met snelle, toegankelijke UI en moderne best practices. Live link: `https://LauraV6.github.io/bloemstraatgarden` (indien geconfigureerd).

## Belangrijkste features

- **Contentful-integratie**: Content ophalen en tonen (posts/tips).  
- **Verkrijgbaar + winkelmand**: Productoverzicht, toevoegen aan cart, order submit via Netlify Function.
- **Weer-widget**: Huidige weersomstandigheden en tips gerelateerd aan tuinieren.  
- **Quiz**: Interactieve quiz met scorelogica.  
- **Dark/Light theme**: Thema wisselen met `next-themes`.  
- **Performance monitoring**: Web Vitals en optimalisaties (SSR/ISR, code-splitting waar van toepassing).

## Snel starten

Vereisten:
- Node.js 18+ (aanbevolen 20)
- npm 9+

Installatie en run:

```bash
npm install
npm run dev
# Open http://localhost:3000
```

Build en start productie:

```bash
npm run build
npm start
```

Codekwaliteit:

```bash
npm run lint
```

## Scripts

Uit `package.json`:

- **dev**: start ontwikkelserver (`next dev`).
- **build**: bouwt productiebuild (`next build`).
- **build:analyze**: bouw met bundle analyzer (`ANALYZE=true`).
- **start**: start productie (`next start`).
- **lint**: voer ESLint uit.
- **test**: draai Jest-tests.
- **test:watch**: tests in watch-modus.
- **test:coverage**: tests met coverage rapporten.

Voorbeelden:

```bash
npm run dev
npm run build:analyze
npm run test:coverage
```

## Tech stack

- **Framework**: Next.js ^15, React ^19, TypeScript ^5
- **Styling**: Sass (SCSS)
- **State/Providers**: Context API (bijv. ShoppingCartProvider)
- **CMS**: Contentful SDK
- **Data**: GraphQL (`@apollo/client`, `graphql`) waar van toepassing
- **Animaties**: framer-motion
- **Thema**: next-themes
- **Testing**: Jest, React Testing Library, jsdom
- **Deploy**: Netlify (`@netlify/plugin-nextjs`, Netlify Functions)

## Projectstructuur

Compacte mappenboom (hoofdonderdelen):

```
src/
  app/               # Next.js app router pagina's (home, tips, quiz, [slug], verkrijgbaar)
  components/        # UI en feature-componenten (cart, posts, weather, layout)
  context/           # ShoppingCartContext provider
  hooks/             # Custom hooks (Contentful, IntersectionObserver)
  lib/               # API-clients, performance, analytics, quizlogica
  services/          # orderService (bestellingen)
  types/             # TypeScript types (contentful, features, api)
  utils/             # Hulpfuncties (DateFormatter, Shuffle)
netlify/functions/   # Netlify serverless (submit-order)
```

## Configuratie & Omgevingsvariabelen

Maak `.env.local` met:

```bash
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=[TODO: space id]
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=[TODO: delivery token]
NEXT_PUBLIC_GA_ID=[OPTIONEEL: Google Analytics ID]

NETLIFY_AUTH_TOKEN=[voor CI/preview deploys]
NETLIFY_SITE_ID=[site id]
```

TypeScript `paths` alias: `@/*` verwijst naar `./src/*` (zie `tsconfig.json`).

## Testing

Test commando's:

```bash
npm test
npm run test:watch
npm run test:coverage
```

Coverage thresholds (uit `jest.config.js` globaal): branches 18%, functions 20%, lines 19%, statements 19%. Specifieke mappen (`src/services`, `src/lib/performance`) hebben 80–85% drempels. Coverage rapporten in `coverage/` (html/lcov/json).

Meer details zie `TESTING.md`.

## Quality & Performance

- **ESLint**: `npm run lint` (Next + TypeScript regels).
- **Performance**: gebruik van Web Vitals; optimalisaties via Next.js (SSR/ISR), kritieke CSS (`critters`), code-splitting.  
- **Bundles**: analyse via `npm run build:analyze` met `@next/bundle-analyzer`.

## Accessibility & SEO

- Richtlijnen: semantische HTML, toetsenbordtoegankelijkheid, aria-attributen waar nodig.
- Thema-contrasten via dark/light theme.  
- SEO: Next.js app router best practices. [TODO] Overweeg `next-seo` of meta-config uitbreiden.

## Deployment

Netlify-config in `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"
  functions = "netlify/functions"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[redirects]]
  from = "/api/orders/*"
  to = "/.netlify/functions/submit-order"
  status = 200
```

Stappen:

1. Koppel Git-repo aan Netlify.
2. Stel build commando `npm run build` in; publish directory `.next` (Next on Netlify plugin handelt routing bundling af).
3. Voeg ENV-variabelen toe (Contentful, GA, Netlify tokens/site id).
4. Deploy. Voor previews: gebruik Netlify PR deploys.

## Troubleshooting / FAQ

- **Kan module alias `@/` niet vinden**: cache wissen `npm test -- --clearCache` en controleer `tsconfig.paths` en Jest `moduleNameMapper`.
- **`fetch is not defined` in tests**: mock `global.fetch` in de test.
- **Stijl- of asset-import errors in tests**: wordt afgehandeld via `identity-obj-proxy` en `__mocks__/fileMock.js`.
- **Langzame builds**: draai `build:analyze` om grote bundles te vinden; bekijk `framer-motion`/`fontawesome` imports voor tree-shaking.

## Contributing

Workflow suggestie: feature branches, PR's met beschrijving, groene checks (lint, test, build) vereist. Schrijf duidelijke commit messages en voeg tests toe voor nieuwe functionaliteit.