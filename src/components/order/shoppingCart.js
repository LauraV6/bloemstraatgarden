import React, { useContext } from 'react';
import CartContext from '../../store/cartContext';
import UserProgressContext from '../../store/userProgressContext';
import Modal from '../modal';
import CartItem from './cartItem';

const ShoppingCart = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
            <h2>Winkelwagen {totalCartItems}</h2>
            <ul className='modal__items'>
                {cartCtx.items.map(item => 
                    <CartItem 
                        key={item.id} 
                        image={item.availableimage.url}
                        title={item.title} 
                        quantity={item.quantity}
                        onIncrease={() => cartCtx.addItem(item)}
                        onDecrease={() => cartCtx.removeItem(item.id)}
                    />
                )}
            </ul>
            <div className='modal__footer'>
                <button className='button button--ter' onClick={handleCloseCart}>Annuleren</button>
                {cartCtx.items.length > 0 && <button className='button button--cta' onClick={handleGoToCheckout}>Bestellen</button>}
            </div>
        </Modal>
    )
}

export default ShoppingCart