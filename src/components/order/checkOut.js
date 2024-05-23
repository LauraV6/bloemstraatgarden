import React, { useContext, useState } from 'react';
import UserProgressContext from '../../store/userProgressContext';
import Modal from '../modal';
import axios from 'axios';
import CartContext from '../../store/cartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons';

const CheckOut = () => {
    const userProgressCtx = useContext(UserProgressContext);
    const cartCtx = useContext(CartContext)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [openSuccesModal, setOpenSuccesModal] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        window.location.reload();
    }   

    const plantList = cartCtx.items.map(item => item.title + ' ' + item.quantity).join(" / ");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serviceId = 'service_yj9kvin';
        const templateId = 'template_b0hj8jj';
        const publicKey = 'kghIiU15YWZ_aDhh0';
        
        let data = {
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
                from_name: name,
                to_name: 'Laura',
                from_email: email,
                message: plantList
            }
        };

        try {
            const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data)
            console.log(res.data);
            setName('');
            setEmail('');
            setOpenSuccesModal(true);
        } catch (error) {
            console.log(error);
            setOpenErrorModal(true);
        }
    };

    if(openSuccesModal === true) {
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
                <h2><FontAwesomeIcon icon={faCheckCircle} />Succesvol verzonden</h2>
                <p>Bedankt voor uw bestelling bij Bloemstraat Garden. Binnen enkele seconden zal u een bevestigingsmail ontvangen. <br /><br /> We nemen zo snel mogelijk contact op.</p>
                <div className='modal__footer'>
                    <button className='button button--cta' onClick={handleFinish}>Sluiten</button>
                </div>
            </Modal>
        )
    }

    if(openErrorModal === true) {
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
                <h2><FontAwesomeIcon icon={faWarning} />Niet verzonden</h2>
                <p>Er is iets fout gegaan. Probeer het opnieuw. Gaat de foutmelding niet weg? Neem dan contact op met Bloemstraat Garden.</p>
                <div>
                    <button className='button button--cta' onClick={handleClose}>Okay</button>
                </div>
            </Modal>
        )
    }
    
    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <div className='modal__inputs'>   
                    <ul className='modal__items checkout'>
                    {
                        cartCtx.items.map(item => <div className='item' key={item.id}><li>{item.quantity}x {item.title}</li></div>)
                    }     
                    </ul>        
                    <div>
                        <label htmlFor='name'>Naam</label>
                        <input id='name' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor='email'>E-mailadres</label>
                        <input id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                </div>
                <div className='modal__footer'>
                    <button type='button' onClick={handleClose} className='button button--ter'>Annuleren</button>
                    <button id="submit" className='button button--cta' >Versturen</button>
                </div>
            </form>
            {    console.log(`'email:' ${email}, 'naam:' ${name}`)
}
        </Modal>
    )
}

export default CheckOut