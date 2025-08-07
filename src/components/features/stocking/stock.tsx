import { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRight } from '@awesome.me/kit-7d648e8e96/icons/duotone/solid';
import StackAction from "./stockAction";
import styles from "./stocking.module.scss";

// Types
interface StockProps {
  className?: string;
}

interface StockContentProps {
  title: string;
  description: string;
}

// Constants
const STOCK_CONTENT = {
  title: "Gratis voorraad",
  description: "Het kan voorkomen dat er meer gezaaid wordt dan dat er plek voor is. Deze planten komen op de voorraad lijst te staan. Meld je aan voor een plant uit de voorraad lijst door mij een bericht te sturen.",
  buttonText: "Bekijk onze voorraad",
  buttonIcon: faRight
} as const;

// Components
const StockFallback: React.FC = () => (
  <button 
    className="button button--cta" 
    disabled
    aria-label={`${STOCK_CONTENT.buttonText} - Laden...`}
  >
    {STOCK_CONTENT.buttonText} 
    <FontAwesomeIcon icon={STOCK_CONTENT.buttonIcon} aria-hidden="true" />
  </button>
);

const StockContent: React.FC<StockContentProps> = ({ title, description }) => (
  <div className={styles.story__text}>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const StockAction: React.FC = () => (
  <div className={styles.story__adding}>
    <Suspense fallback={<StockFallback />}>
      <StackAction />
    </Suspense>
  </div>
);

export default function Stock({ className }: StockProps) {
  const sectionClass = [className].filter(Boolean).join(' ');

  return (
    <section 
      className={sectionClass}
      aria-labelledby="stock-heading"
    >
      <div className={styles.boxing}>
        <div className={styles.story}>
          <div className={styles.story__container}>
            <StockContent title={STOCK_CONTENT.title} description={STOCK_CONTENT.description} />
            <StockAction />
          </div>
        </div>
      </div>
    </section>
  );
}