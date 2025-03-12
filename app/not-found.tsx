import Link from "next/link";
import heroImage from "../public/images/404.png";
import heroStyles from "../components/layout/hero.module.scss";
import styles from "./[slug]/page.module.scss";
import Image from "next/image";
import Sidebar from "../components/layout/sidebar";

export default function NotFound() {
  return (
    <main>
      <section className={heroStyles.hero}>        
        <Image src={heroImage} alt="404" width={3000} />
      </section>
      <section className={styles.postcontent}>
        <div>
          <h1>🤔 Pagina niet gevonden...</h1>
          <p>
            Niet getreurd! Er zijn genoeg andere verhalen te lezen. Ga terug
            naar de start pagina om ze allemaal te bekijken.
          </p>
          <br />
          <Link className="button button--cta" href="/">
            Terug naar startpagina
          </Link>
        </div>
        <Sidebar />
      </section>
    </main>
  );
}
