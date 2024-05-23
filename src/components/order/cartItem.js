import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const CartItem = ({ image, title, quantity, onIncrease, onDecrease }) => {
    return (
        <li>
            <div className='item'>
                <img src={image} alt={title} />
                <h4>{title}</h4>
            </div>
            <div className='amount'>
                <button type="button" aria-label="Decrease item" onClick={onDecrease}><FontAwesomeIcon icon={faMinus} /></button>
                <span>{quantity}</span>
                <button type="button" aria-label="Increase item" onClick={onIncrease}><FontAwesomeIcon icon={faPlus} /></button>
            </div>
        </li>
    )
}

export default CartItem