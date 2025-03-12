import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./page.module.scss";
import Sidebar from "../../components/layout/sidebar";

export default function PageLoader() {
  return (
    <main>
      <section className={`${styles.postheader} ${styles.postheaderBg}`}>
        <div className={styles.postheader__content}>
          <div>
            <h1>
              <Skeleton width={200} />
            </h1>
            <label>
              <Skeleton width={100} />
            </label>
          </div>
        </div>
      </section>
      <section className={styles.postcontent}>
        <div>
          <div className="breadcrumbs">
            <Skeleton width={250} />
          </div>
          <div>
            <Skeleton count={3} />
          </div>
        </div>
        <Sidebar />
      </section>
    </main>
  );
}
