import styles from './tipCard.module.scss'
import Image from "next/image";
import Link from "next/link";
import { Tip } from '@/types/contentful';

interface TipCardProps {
    props: Tip;
}
  
export const TipCard: React.FC<TipCardProps> = ({ props }) => {
    return (
        <article className={`${styles.postItem} ${styles.active}`}>
            <Link href={`/tips/${props.slug}`}>
                <div className={styles.postItem__img}>
                    <Image src={props.articleImage.url} alt={props.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className={styles.postItem__content}>
                    <h3>{props.title}</h3>
                    <button className="button button--cta">Lees meer</button>
                </div>
            </Link>
      </article>
    );
};