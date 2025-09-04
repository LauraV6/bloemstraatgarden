import Image from "next/image";
import Link from "next/link";
import { metadata } from "@/app/layout";
import LogoSmall from '@/components/ui/Logo/logoSmall';
import HeaderLeaveBig from '../../../public/headerLeaveBig.png';
import styles from "./footer.module.scss";

interface FooterProps {
  className?: string;
}

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ className }: FooterProps) {
  const siteTitle = (metadata.title as string) || "Bloemstraat Garden";
  const siteCreator = (metadata.creator as string) || "Laura";

  return (
    <footer 
      className={`${styles.footer} ${className || ''}`}
      role="contentinfo"
      aria-label="Website footer"
    >
      <div className={styles.footer__adding}>
        <div className={styles.container}>
          <Link 
            href="/" 
            className={styles.logoFooter}
            aria-label={`${siteTitle} - Ga naar homepage`}
          >
            <LogoSmall />
          </Link>
          
          <div className={styles.intro}>
            <p>
              <strong>{siteTitle}</strong> is gelegen in Steenwijkerland en richt zich op het 
              leren door te zien, ervaren en kennis te delen van moestuinieren.
            </p>
          </div>
        </div>
        
        <Image
        src={HeaderLeaveBig}
        alt="Decoratief blad"
        className={styles.footer__leave}
        priority={false}
        sizes="(max-width: 768px) 200px, 300px"
        style={{
            width: '100%',
            height: 'auto',
            maxWidth: 'var(--footer-leave-max-width)',
            objectFit: 'contain'
        }}
        />
      </div>
      
      <div className={styles.footer__copyright}>
        Created by {siteCreator} © {CURRENT_YEAR}
      </div>
    </footer>
  );
}