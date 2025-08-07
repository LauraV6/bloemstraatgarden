import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./tipCard.module.scss";

export default function TipCardSkeleton({ amount }: any) {
  return (
    <div className={styles.tipsGrid}>
      {Array(amount)
        .fill(0)
        .map((item, index) => (
          <a key={index} className={styles.postItem}>
            <div className={styles.postItem__img}>
              <Skeleton />
            </div>
          </a>
        ))}
    </div>
  );
}
