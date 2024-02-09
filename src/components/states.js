import React from 'react'
import FooterStepOne from '../images/footerStepOne.png'
import FooterStepTwo from '../images/footerStepTwo.png'
import FooterStepThree from '../images/footerStepThree.png'

const States = () => {
    return (
        <section className='states'>
            <div className='states-container'>
                <div className='states__item'>
                    <img src={FooterStepOne} alt='step-one'></img>
                    <div className='text-container'>
                        <h4>Zaden selectie</h4>
                        <p>Keuze uit inventaris</p>
                    </div>
                </div>
                <div className='states__item'>
                    <img src={FooterStepTwo} alt='step-two'></img>
                    <div className='text-container'>
                        <h4>Plant techniek</h4>
                        <p>Richten op plant wensen</p>
                    </div>
                </div>
                <div className='states__item'>
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