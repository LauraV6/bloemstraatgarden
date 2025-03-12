import StackAction from "./stockAction";
import styles from "./stocking.module.scss";
import { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRight } from '@awesome.me/kit-7d648e8e96/icons/duotone/solid'

export default function Stack() {
    return (
        <section>
            <div className={styles.boxing}>
                <div className={styles.story}>
                    <div className={styles.story__container}>
                        <div className={styles.story__text}>
                            <h3>Gratis voorraad</h3>
                            <p>Het kan voorkomen dat er meer gezaaid wordt dan dat er plek voor is. Deze planten komen op de voorraad lijst te staan.
                                Meld je aan voor een plant uit de voorraad lijst door mij een bericht te sturen.
                            </p>
                        </div>
                        <div className={styles.story__adding}>
                        <Suspense fallback={
                            <button className='button button--cta' disabled>Bekijk onze voorraad <FontAwesomeIcon icon={faRight}/></button>                      
                        }>
                            <StackAction />
                        </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}