# 🌿 Bloemstraat Garden

<div align="center">
  <img src="public/logo.png" alt="Bloemstraat Garden Logo" width="200" />

  **A modern gardening blog**
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)

---

## 🌟 Overview

Bloemstraat Garden is a full-featured Next.js application that combines a gardening blog, weather integration, interactive quizzes, and an e-commerce experience. Built with modern web technologies and best practices, it offers a fast, accessible, and SEO-optimized user experience.

### Key Highlights

- 🚀 **Performance First**: Optimized with Next.js 15's latest features
- 🎨 **Modern Design**: Responsive UI with dark/light theme support
- ♿ **Accessible**: WCAG compliant with semantic HTML and ARIA support
- 🔍 **SEO Optimized**: Server-side rendering and metadata optimization
- 📱 **Mobile First**: Responsive design that works on all devices

---

## ✨ Features

### Content Management
- **Blog & Tips Section**: Dynamic content powered by Contentful CMS
- **Rich Media Support**: Images, videos, and interactive elements
- **Category Filtering**: Organized content by topics and tags

### E-Commerce
- **Product Catalog**: Browse available plants and gardening supplies
- **Shopping Cart**: Full cart functionality with local storage persistence
- **Order Management**: Netlify Functions for secure order processing

### Interactive Elements
- **Weather Widget**: Real-time weather data with gardening recommendations
- **Knowledge Quiz**: Test gardening knowledge with interactive quizzes
- **Theme Toggle**: Seamless dark/light mode switching

### Performance & UX
- **Optimized Images**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based splitting
- **Web Vitals Monitoring**: Built-in performance tracking
- **Progressive Enhancement**: Works without JavaScript enabled

---

## 🛠️ Tech Stack

### Core
- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)

### Styling & UI
- **CSS**: Sass/SCSS with CSS Modules
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

### Data & State
- **CMS**: [Contentful](https://www.contentful.com/)
- **GraphQL**: Apollo Client
- **State Management**: React Context API
- **Data Fetching**: SWR for client-side caching

### Testing & Quality
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript strict mode
- **Bundle Analysis**: @next/bundle-analyzer

### Infrastructure
- **Hosting**: [Netlify](https://www.netlify.com/)
- **Functions**: Netlify Functions for serverless APIs
- **Analytics**: Google Analytics 4
- **Monitoring**: Web Vitals tracking

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (20 recommended)
- npm 9+ or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LauraV6/bloemstraatgarden.git
   cd bloemstraatgarden
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   # Contentful CMS
   NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
   NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token

   # Optional: Analytics
   NEXT_PUBLIC_GA_ID=your_google_analytics_id

   # Netlify (for deployment)
   NETLIFY_AUTH_TOKEN=your_netlify_token
   NETLIFY_SITE_ID=your_site_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Quick Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server

# Testing
npm test            # Run tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Code Quality
npm run lint        # Run ESLint
npm run type-check  # Run TypeScript compiler

# Analysis
npm run build:analyze # Analyze bundle size
```

---

## 📁 Project Structure

```
bloemstraatgarden/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── tips/               # Tips section
│   │   ├── quiz/               # Quiz feature
│   │   ├── verkrijgbaar/       # Products catalog
│   │   └── [slug]/             # Dynamic blog posts
│   │
│   ├── components/             # React components
│   │   ├── common/            # Reusable UI components
│   │   ├── features/          # Feature-specific components
│   │   │   ├── posts/         # Blog post components
│   │   │   ├── cart/          # Shopping cart
│   │   │   ├── weather/       # Weather widget
│   │   │   └── quiz/          # Quiz components
│   │   └── layout/            # Layout components
│   │
│   ├── context/               # React Context providers
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Core libraries
│   │   ├── contentful/        # CMS integration
│   │   ├── graphql/           # GraphQL queries
│   │   └── performance/       # Performance utilities
│   │
│   ├── services/              # Business logic
│   ├── types/                 # TypeScript definitions
│   └── utils/                 # Utility functions
│
├── public/                    # Static assets
├── netlify/                   # Netlify Functions
├── __tests__/                 # Test files
└── docs/                      # Documentation
```

---

## 💻 Development

### Code Style

We follow strict TypeScript and React best practices:

- **TypeScript**: Strict mode enabled
- **Components**: Functional components with hooks
- **Imports**: Absolute imports using `@/` alias

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CONTENTFUL_SPACE_ID` | Yes | Contentful space identifier |
| `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN` | Yes | Contentful delivery API token |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics tracking ID |
| `NETLIFY_AUTH_TOKEN` | No | For CI/CD deployments |
| `NETLIFY_SITE_ID` | No | Netlify site identifier |

### Development Workflow

1. Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes
3. Run tests and linting
   ```bash
   npm test
   npm run lint
   ```

4. Commit with conventional commits
   ```bash
   git commit -m "feat: add new feature"
   ```

5. Push and create a pull request

---

## 🧪 Testing

### Test Stack
- **Framework**: Jest
- **React Testing**: React Testing Library
- **Coverage**: Istanbul

### Running Tests

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage

# Update snapshots
npm test -- -u
```

### Coverage Thresholds

| Type | Global | Services | Performance |
|------|--------|----------|-------------|
| Branches | 18% | 80% | 85% |
| Functions | 20% | 80% | 85% |
| Lines | 19% | 80% | 85% |
| Statements | 19% | 80% | 85% |

Coverage reports are generated in `/coverage` directory.

---

## 🚢 Deployment

### Netlify Deployment

The project is configured for automatic deployment on Netlify:

1. **Connect Repository**: Link your GitHub repository to Netlify
2. **Configure Build**:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Set Environment Variables**: Add all required env variables in Netlify dashboard
4. **Deploy**: Automatic deploys on push to main branch

### Configuration

The `netlify.toml` file handles:
- Build settings
- Function routing
- Redirect rules
- Plugin configuration

```toml
[build]
  command = "npm run build"
  publish = ".next"
  functions = "netlify/functions"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Preview Deployments

Pull requests automatically trigger preview deployments with unique URLs for testing.

---

### Quick Start for Contributors

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

### Commit Convention

We use conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions or changes
- `chore:` Maintenance tasks

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Content managed with [Contentful](https://www.contentful.com/)
- Hosted on [Netlify](https://www.netlify.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)

---

<div align="center">
  Made with ❤️ by Laura

  [Website](https://bloemstraatgarden.nl) | [GitHub](https://github.com/LauraV6/bloemstraatgarden)
</div>