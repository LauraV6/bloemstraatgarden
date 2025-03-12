"use client";

import Profile from "../../public/images/profile.png";
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
                            <h4>Hallo, wij zijn Laura en Pieter              
                            </h4>
                            <p>Ook zelf een moestuin beginnen? We nemen je in dit blog mee in de voortgang van onze tuin. Lees over onze ervaring, tips and tricks.</p>
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