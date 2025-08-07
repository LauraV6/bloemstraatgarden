import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Sidebar from "@/components/layout/sidebar";
import styles from "./page.module.scss";

// Types
interface PageLoaderProps {
  className?: string;
  showWeather?: boolean;
  contentLines?: number;
}

interface SkeletonSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

// Constants
const SKELETON_CONFIG = {
  title: { width: 200, height: 40 },
  date: { width: 100, height: 20 },
  breadcrumbs: { width: 250, height: 16 },
  defaultContentLines: 5,
  weather: { width: 80, height: 30 }
} as const;

// Components
const SkeletonSection: React.FC<SkeletonSectionProps> = ({ 
  title, 
  children, 
  className 
}) => (
  <section className={className} aria-label={`${title} wordt geladen`}>
    {children}
  </section>
);

const PostHeaderSkeleton: React.FC<{ showWeather?: boolean }> = ({ showWeather = false }) => (
  <SkeletonSection 
    title="Artikel header" 
    className={`${styles.postheader} ${styles.postheaderBg}`}
  >
    <div className={styles.postheader__content}>
      <div>
        <h1>
          <Skeleton 
            width={SKELETON_CONFIG.title.width} 
            height={SKELETON_CONFIG.title.height} 
          />
        </h1>
        <div>
          <Skeleton 
            width={SKELETON_CONFIG.date.width} 
            height={SKELETON_CONFIG.date.height} 
          />
        </div>
      </div>
      {showWeather && (
        <div className={styles.weatherSkeleton}>
          <Skeleton 
            width={SKELETON_CONFIG.weather.width} 
            height={SKELETON_CONFIG.weather.height} 
          />
        </div>
      )}
    </div>
  </SkeletonSection>
);

const ContentSkeleton: React.FC<{ contentLines: number }> = ({ contentLines }) => (
  <div>
    <nav className="breadcrumbs" aria-label="Breadcrumb navigatie wordt geladen">
      <Skeleton 
        width={SKELETON_CONFIG.breadcrumbs.width} 
        height={SKELETON_CONFIG.breadcrumbs.height} 
      />
    </nav>
    
    <article aria-label="Artikel inhoud wordt geladen">
      <div className={styles.postcontent__story}>
        <Skeleton 
          count={contentLines} 
          style={{ marginBottom: '1rem' }}
        />
      </div>
    </article>
  </div>
);

export default function PageLoader({ 
  className,
  showWeather = false,
  contentLines = SKELETON_CONFIG.defaultContentLines 
}: PageLoaderProps) {
  const mainClass = [className].filter(Boolean).join(' ');

  return (
    <main className={mainClass} role="main" aria-label="Pagina wordt geladen">
      <PostHeaderSkeleton showWeather={showWeather} />
      
      <SkeletonSection title="Artikel inhoud" className={styles.postcontent}>
        <ContentSkeleton contentLines={contentLines} />
        <Sidebar />
      </SkeletonSection>
    </main>
  );
}