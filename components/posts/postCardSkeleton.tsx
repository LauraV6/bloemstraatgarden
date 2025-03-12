import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import styles from "./postCard.module.scss";

export default function PostCardSkeleton({ amount }: any) {
  return Array(amount)
    .fill(0)
    .map((item, index) => (
      <a key={index} className={styles.postItem}>
        <div className={styles.postItem__img}>
          <Skeleton />
        </div>
        <div className={styles.postItem__content}>
          <h2>
            <Skeleton width={200} />
          </h2>
          <p>
            <Skeleton width={300} />
          </p>
        </div>
      </a>
    ));
}
