"use client"

import { useRef } from "react";
import { useInView } from "framer-motion";
import styles from "./states.module.scss";
import { faBagSeedling, faShovel, faHandHoldingSeedling } from '@awesome.me/kit-7d648e8e96/icons/duotone/solid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function States() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

    return (
        <section className={styles.states} ref={ref}>
            <div className={styles.states__container}>
                <div className={styles.states__item} 
                style={{
                    transform: isInView ? "none" : "translateY(200px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0s"
                }}>
                    <FontAwesomeIcon icon={faBagSeedling} />
                    <div className={styles.textContainer}>
                        <h4>Zaden selectie</h4>
                        <p>Keuze uit inventaris</p>
                    </div>
                </div>
                <div className={styles.states__item}
                style={{
                    transform: isInView ? "none" : "translateY(200px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
                }}>
                    <FontAwesomeIcon icon={faShovel} />
                    <div className={styles.textContainer}>
                        <h4>Plant techniek</h4>
                        <p>Richten op plant wensen</p>
                    </div>
                </div>
                <div className={styles.states__item} 
                style={{ 
                    transform: isInView ? "none" : "translateY(200px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s"
                }}>
                    <FontAwesomeIcon icon={faHandHoldingSeedling} />
                    <div className={styles.textContainer}>
                        <h4>Beste oogst</h4>
                        <p>Groei en onderhoud</p>
                    </div>
                </div>
            </div>
        </section>
    );
}