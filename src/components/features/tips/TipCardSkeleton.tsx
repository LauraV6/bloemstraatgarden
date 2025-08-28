import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./tipCard.module.scss";

interface TipCardSkeletonProps {
  amount?: number;
}

export default function TipCardSkeleton({ amount = 3 }: TipCardSkeletonProps) {
  return (
    <div className={styles.tipsGrid}>
      {Array(amount)
        .fill(0)
        .map((_, index) => (
          <a key={index} className={styles.postItem}>
            <div className={styles.postItem__img}>
              <Skeleton />
            </div>
          </a>
        ))}
    </div>
  );
}
