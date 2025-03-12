import styles from "./footer.module.scss";
import LogoSmall from '../logo/logoSmall';
import HeaderLeaveBig from '../../public/headerLeaveBig.png';
import Link from "next/link";
import { metadata } from "../../app/layout";

export default function Footer() {
    const title = metadata.title as string;

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__adding}>
                <div className={styles.container}>
                    <Link id="logoFooter" href='/'><LogoSmall /></Link>
                    <div className={styles.intro}>
                        <p>{title} is gelegen in Steenwijkerland en richt zich op het leren door te zien, ervaren en kennis te delen van moestuinieren.</p>
                    </div>
                </div>
                <img src={HeaderLeaveBig.src} className={styles.footer__leave} alt='big-leave'></img>
            </div>
            <div className={styles.footer__copyright}>
            <label>
                Created by {metadata.creator} © 2025
            </label>
            </div>
        </footer>
    )
}