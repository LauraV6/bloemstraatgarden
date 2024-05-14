import React from 'react'
import { useRef } from "react";
import { useInView } from "framer-motion";
import FooterStepOne from '../images/footerStepOne.png'
import FooterStepTwo from '../images/footerStepTwo.png'
import FooterStepThree from '../images/footerStepThree.png'

const States = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

    return (
        <section className='states' ref={ref}>
            <div className='states-container'>
                <div className='states__item' 
                style={{
                    transform: isInView ? "none" : "translateY(200px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0s"
                }}>
                    <img src={FooterStepOne} alt='step-one'></img>
                    <div className='text-container'>
                        <h4>Zaden selectie</h4>
                        <p>Keuze uit inventaris</p>
                    </div>
                </div>
                <div className='states__item'
                style={{
                    transform: isInView ? "none" : "translateY(200px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
                }}>
                    <img src={FooterStepTwo} alt='step-two'></img>
                    <div className='text-container'>
                        <h4>Plant techniek</h4>
                        <p>Richten op plant wensen</p>
                    </div>
                </div>
                <div className='states__item' 
                style={{ 
                    transform: isInView ? "none" : "translateY(200px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s"
                }}>
                    <img src={FooterStepThree} alt='step-three'></img>
                    <div className='text-container'>
                        <h4>Beste oogst</h4>
                        <p>Groei en onderhoud</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default States