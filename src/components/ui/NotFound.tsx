'use client';

import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import styled from '@emotion/styled';

const Hero = styled.section`
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  width: 100%;
  max-width: unset;
  margin: 0;
  margin-top: 96px;
  padding: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 112px;
  }

  img {
    width: 100%;
    height: auto;
    min-height: 100%;
    max-height: 400px;
    object-fit: cover;
  }
`;

const PostContent = styled.section`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: ${({ theme }) => theme.spacing.xxl};
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }

  #error-content {
    h1 {
      font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
      font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
      margin-bottom: ${({ theme }) => theme.spacing.lg};
      color: ${({ theme }) => theme.colors.text};
      font-family: ${({ theme }) => theme.typography.fontFamilyHeading};
    }

    p {
      font-size: ${({ theme }) => theme.typography.fontSize.lg};
      line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
      color: ${({ theme }) => theme.colors.textSecondary};
      margin-bottom: ${({ theme }) => theme.spacing.lg};
    }
  }
`;

interface NotFoundProps {
  className?: string;
}

interface NotFoundContentProps {
  title: string;
  description: string;
  buttonText: string;
  homeUrl: string;
}

const ERROR_CONTENT = {
  title: "🤔 Pagina niet gevonden...",
  description: "Niet getreurd! Er zijn genoeg andere verhalen te lezen. Ga terug naar de start pagina om ze allemaal te bekijken.",
  buttonText: "Terug naar startpagina",
  homeUrl: "/",
  imageAlt: "Pagina niet gevonden illustratie"
} as const;

const NotFoundContent: React.FC<NotFoundContentProps> = ({
  title,
  description,
  buttonText,
  homeUrl
}) => (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
    <br />
    <Link
      className="button button--cta"
      href={homeUrl}
      aria-label={`${buttonText} - Ga naar de homepage`}
    >
      <span>{buttonText}</span>
    </Link>
  </div>
);

export default function NotFound({ className }: NotFoundProps) {
  const mainClass = [className].filter(Boolean).join(' ');

  return (
    <main className={mainClass} role="main">
      <Hero role="banner" aria-label="404 foutpagina" style={{backgroundImage: `url(/404.png)`}}></Hero>
      <PostContent role="main" aria-labelledby="error-title">
        <div id="error-content">
          <NotFoundContent
            title={ERROR_CONTENT.title}
            description={ERROR_CONTENT.description}
            buttonText={ERROR_CONTENT.buttonText}
            homeUrl={ERROR_CONTENT.homeUrl}
          />
        </div>

        <Sidebar />
      </PostContent>
    </main>
  );
}