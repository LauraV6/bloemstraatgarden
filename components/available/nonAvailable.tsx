import styles from "./nonAvailable.module.scss";
import Image from "next/image";
import nonAvailable from "../../public/images/notAvailable.png";

export default function NonAvailable() {
  return (
    <div className={styles.nonAvailable}>
      <div className={styles.nonAvailable__content}>
        <Image src={nonAvailable} alt="Niet beschikbaar" />
        <h3>Geen planten beschikbaar</h3>
        <p>
          Momenteel zijn er geen planten op voorraad. Kom op een later moment
          terug om te kijken of er weer planten beschikbaar zijn.
        </p>
      </div>
    </div>
  );
}
