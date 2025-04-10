import styles from './postCard.module.scss'
import Image from "next/image";
import Link from "next/link";

interface Props {
    props: any;
    url?: any;
  }
  
export const PostCard: React.FC<Props> = ({ props, url }) => {
    return (
        <article className={`${styles.postItem} ${styles.active}`}>
            <Link href={(url === undefined) ? (`/${props.slug}`): (`${url}/${props.slug}`)}>
                <div className={styles.postItem__img}>
                    <Image src={props.articleImage.url} alt={props.title} fill sizes="(max-width: 768px) 100vw, 33vw" />      
                </div>
                <div className={styles.postItem__content}>
                    <h2>{props.title}</h2>
                    <p>{props.summary}..</p>
                    <span className={styles.date}>
                        {new Date(props.date).toLocaleDateString("NL", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </span>
                </div>
            </Link>
      </article>
    );
};