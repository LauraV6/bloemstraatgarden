"use client";

import styles from "../layout/hero.module.scss";
import HeaderLeaveBig from "../../public/headerLeaveBig.png";
import HeaderLeaveSmall from "../../public/headerLeaveSmall.png";
import HeaderImg from "../../public/headerBgTransparent.png";
import FadeIn from "../fadeIn";
import Image from "next/image";

interface Props {
  theme?: string;
  title: string;
  paragraph: string;
}

export const Hero: React.FC<Props> = ({ theme, title, paragraph }) => {
  return (
    <section
      className={
        theme !== undefined ? `${styles.hero} ${styles.heroDark}` : styles.hero
      }
      style={{ backgroundImage: `url(${HeaderImg.src})` }}
    >
      <div className={styles.hero__container}>
        <div className={styles.hero__text}>
          <div>
            <h1>{title}</h1>
            <p>{paragraph}</p>
          </div>
        </div>
        <div className={styles.hero__images}>
          <FadeIn>
            <Image
              src={HeaderLeaveBig.src}
              className={styles.leave + " " + styles.leaveOne}
              alt="leaves"
              width={300}
              height={300}
            />
          </FadeIn>
          <FadeIn>
            <Image
              src={HeaderLeaveSmall.src}
              className={styles.leave + " " + styles.leaveTwo}
              alt="leaves"
              width={300}
              height={240}
            />
          </FadeIn>
          <FadeIn>
            <Image
              src={HeaderLeaveBig.src}
              className={styles.leave + " " + styles.leaveThree}
              alt="leaves"
              width={300}
              height={300}
            />
          </FadeIn>
          <FadeIn>
            <Image
              src={HeaderLeaveSmall.src}
              className={styles.leave + " " + styles.leaveFour}
              alt="leaves"
              width={300}
              height={240}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
