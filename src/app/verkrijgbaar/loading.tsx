import headerStyles from "@/app/[slug]/page.module.scss";
import styles from "@/components/features/stocking/Stocking.module.scss";
import Skeleton from "react-loading-skeleton";
import titlelineStyles from "@/components/common/TitleLine/titleLine.module.scss";
import "react-loading-skeleton/dist/skeleton.css";

export default function Available() {
  return (
    <>
      <main>
        <section className={`${headerStyles.postheader} ${headerStyles.postheaderBg}`}>
          <div className={headerStyles.postheader__content}>
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
        <section>
          <div className="breadcrumbs">
            <Skeleton width={150} />
          </div>
          <div className={styles.story}>
            <div className={styles.story__container}>
              <div className={styles.story__text}>
                <h2>
                  <Skeleton width={250} />
                </h2>
                <p>
                  <Skeleton count={3} />
                </p>
              </div>
              <div className={styles.story__adding}>
                <Skeleton width={400} height={270} />
              </div>
            </div>
          </div>
        </section>
        <section>
          <h4 className={titlelineStyles.titleLine}>
            <span>
              <Skeleton width={150} />
            </span>
          </h4>
          <div>
            <Skeleton width={500} />
          </div>
        </section>
      </main>
    </>
  )
}