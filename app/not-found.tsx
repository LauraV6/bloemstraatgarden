import Image from "next/image";
import Link from "next/link";
import heroImage from "../public/404.png";
import Sidebar from "../components/layout/sidebar";
import heroStyles from "../components/layout/hero.module.scss";
import styles from "./[slug]/page.module.scss";

// Types
interface NotFoundProps {
  className?: string;
}

interface NotFoundContentProps {
  title: string;
  description: string;
  buttonText: string;
  homeUrl: string;
}

// Constants
const ERROR_CONTENT = {
  title: "🤔 Pagina niet gevonden...",
  description: "Niet getreurd! Er zijn genoeg andere verhalen te lezen. Ga terug naar de start pagina om ze allemaal te bekijken.",
  buttonText: "Terug naar startpagina",
  homeUrl: "/",
  imageAlt: "Pagina niet gevonden illustratie"
} as const;

// Content Component
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
      {buttonText}
    </Link>
  </div>
);

export default function NotFound({ className }: NotFoundProps) {
  const mainClass = [className].filter(Boolean).join(' ');

  return (
    <main className={mainClass} role="main">
      {/* Hero Section with 404 Image */}
      <section 
        className={heroStyles.hero}
        role="banner"
        aria-label="404 foutpagina"
      >        
        <Image 
          src={heroImage} 
          alt={ERROR_CONTENT.imageAlt}
          width={3000}
          height={2000}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
            minHeight: '100%',
            maxHeight: '400px',
            objectFit: 'cover'
          }}
          priority={true}
        />
      </section>

      {/* Content Section */}
      <section 
        className={styles.postcontent}
        role="main"
        aria-labelledby="error-title"
      >
        <div id="error-content">
          <NotFoundContent
            title={ERROR_CONTENT.title}
            description={ERROR_CONTENT.description}
            buttonText={ERROR_CONTENT.buttonText}
            homeUrl={ERROR_CONTENT.homeUrl}
          />
        </div>
        
        <Sidebar />
      </section>
    </main>
  );
}