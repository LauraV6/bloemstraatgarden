import Image from "next/image";
import styles from "./nonAvailable.module.scss";
import nonAvailable from "../../public/notAvailable.png";

// Types
interface NonAvailableProps {
  className?: string;
  title?: string;
  description?: string;
  imageAlt?: string;
}

// Constants
const DEFAULT_CONTENT = {
  title: "Geen planten beschikbaar",
  description: "Momenteel zijn er geen planten op voorraad. Kom op een later moment terug om te kijken of er weer planten beschikbaar zijn.",
  imageAlt: "Geen planten beschikbaar illustratie"
} as const;

export default function NonAvailable({ 
  className,
  title = DEFAULT_CONTENT.title,
  description = DEFAULT_CONTENT.description,
  imageAlt = DEFAULT_CONTENT.imageAlt
}: NonAvailableProps) {
  const containerClass = [styles.nonAvailable, className].filter(Boolean).join(' ');

  return (
    <div 
      className={containerClass}
      role="status" 
      aria-live="polite"
    >
      <div className={styles.nonAvailable__content}>
        <div className={styles.nonAvailable__imageWrapper}>
          <Image 
            src={nonAvailable} 
            alt={imageAlt}
            width={300}
            height={300}
            style={{ 
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '150px'
            }}
            priority={false}
          />
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}