"use client";

import Profile from "../../public/profile.png";
import styles from './sidebar.module.scss';
import Image from "next/image";
import FadeIn from "../fadeIn";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className={styles.aside}>
            <div className={styles.aside__content}>
                <div className={styles.intro}>
                    <Image src={Profile.src} alt="profile" width={600} height={500} />
                    <div>
                        <div>
                            <h4>Hallo, ik ben Laura!
                            </h4>
                            <p>Overdag programmeur en in de avonduren moestuinierder. Wil jij ook een moestuin beginnen? Laat je op dit blog inspireren om de handen uit de mouwen te steken.</p>
                        </div>
                    </div>
                </div>
                <FadeIn className={styles.test}>
                    <div>
                        <div>
                            <h4>Wil je jouw moestuin kennis testen?</h4>
                            <p>Doe mee aan onze moestuin quiz en stel jouw kennis op de proef! Elke maand zijn er nieuwe vragen.</p>
                            <motion.div
                                whileHover={{ scale: [null, 1.1, 1.05] }}
                                transition={{ duration: 0.3 }}>
                                <Link className='button button--cta' href='/quiz'>Start de quiz</Link>
                            </motion.div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </aside>
    )
}