"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import Logo from "../logo/logo";
import LogoSmall from "../logo/logoSmall";
import styles from "./header.module.scss";
import ThemeSwitcher from "../themeSwitcher";

export default function Header() {
    const [small, setSmall] = useState(false);

    useEffect(() => {
      if (typeof window !== "undefined") {
        window.addEventListener("scroll", () =>
          setSmall(window.pageYOffset > 0)
        );
      }
    }, []);
    return (
        <header className={small ? `${styles.header} ${styles.headerSmall}` : styles.header}>
            <nav className={styles.nav}>
                <div className={styles.header__socials}>
                    <motion.a 
                      whileHover={{ scale: [null, 1.2, 1.1], rotate: 10 }}
                      transition={{ duration: .1 }}
                      whileTap={{ rotate: 0 }}
                      className={`${styles.shareIcon} button button--cta whapp`} href="https://api.whatsapp.com/send?text=https://bloemstraatgarden.netlify.app/" data-action="share/whatsapp/share" target="_blank" rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faWhatsapp}/><span>Delen</span>
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: [null, 1.2, 1.1], rotate: -10 }}
                      transition={{ duration: .1 }}
                      whileTap={{ rotate: 0 }}
                      className={`${styles.shareIcon} button button--cta linkedin`} href="https://www.linkedin.com/in/laura-vlasma-0692b0159/" target="_blank" rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faLinkedinIn}/><span>Delen</span>
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: [null, 1.2, 1.1], rotate: 10 }}
                      transition={{ duration: .1 }}
                      whileTap={{ rotate: 0 }}
                      className={`${styles.shareIcon} button button--cta insta`} href="https://www.instagram.com/lauravlasma/" target="_blank" rel="noreferrer"
                    >       
                      <FontAwesomeIcon icon={faInstagram}/><span>Delen</span>
                    </motion.a>
                </div>
                <Link href='/' id='logo' className={small ? `${styles.logo} ${styles.logoSmall}` : styles.logo}>{small ? <LogoSmall /> : <Logo />}</Link>
                <ThemeSwitcher />
            </nav>
        </header>
    );
}