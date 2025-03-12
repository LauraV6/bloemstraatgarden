"use client";

import Link from "next/link"
import { Hero } from "../../components/layout/hero"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRight } from "@awesome.me/kit-7d648e8e96/icons/duotone/solid"
import { TitleLine } from "../../components/titleLine";
import NonAvailable from "../../components/available/nonAvailable";
import Zaaitrays from "../../public/zaaitrays.jpg";
import styles from "../../components/stocking/stocking.module.scss";
import Image from "next/image";

export default function Available() {
    return (
        <>
            <main>
                <Hero theme="dark" title="Verkrijgbare planten" paragraph="Bekijk hier de planten die verkrijgbaar zijn bij onze moestuin, deze zijn gratis mee te nemen. Interesse? Stuur mij een bericht via Instagram of Whatsapp." />
                <section>
                    <div className="breadcrumbs"><Link href='/'>Blog</Link><FontAwesomeIcon icon={faRight} /><span>Verkrijgbaar</span></div>
                    <div className={styles.story}>
                        <div className={styles.story__container}>
                            <div className={styles.story__text}>
                                <h2>Overschot</h2>
                                <p>Bij het voorzaaien worden er meerdere zaaitrays in gebruik genomen. Het komt voor dat er een overschot komt van bepaalde planten. 
                                Deze planten worden hier gratis aangeboden om van groter nut te kunnen zijn bij iemand anders.
                                De planten worden in doosjes meegeven en de potjes zullen hergebruikt worden voor het volgende zaai item.</p>
                                <p>Ben je op de hoogte van het zaaischema en zie je er een plant tussen staan die je graag wilt hebben? Stuur dan een persoonlijk bericht.</p>
                            </div>
                            <div className={styles.story__adding}>
                                <Image src={Zaaitrays} alt="zaaitrays" width={500} />
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <TitleLine title="Beschikbare planten" />
                    <NonAvailable />
                </section>
            </main>
        </>
    )
}