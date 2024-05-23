import React, { useContext } from 'react';
import CartContext from '../../store/cartContext';
import UserProgressContext from '../../store/userProgressContext';

const OrderHeader = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    return (
        <div className='order-header'>
            <div>
                <h2>Planten bestellen</h2>
                <p>Het is via de website evenals een persoonlijk bericht mogelijk om planten te bestellen.</p>
            </div>            
            {
                totalCartItems >= 1 ? <button className="button button--cta" onClick={handleShowCart}>Bestellen ({totalCartItems})</button> : ''
            }
        </div>
    )
}

export default OrderHeader