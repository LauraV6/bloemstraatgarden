"use client";

import { useState } from 'react';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@awesome.me/kit-7d648e8e96/icons/duotone/solid';
import CartPopup from './CartPopup';
import { CartIconButton, CartBadge } from './CartIcon.styled';

export default function CartIcon() {
  const { cartQuantity } = useShoppingCart();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      {cartQuantity > 0 && (
        <CartIconButton
          onClick={() => setIsPopupOpen(true)}
          aria-label={`Winkelwagen openen, ${cartQuantity} items`}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          <CartBadge>
            {cartQuantity}
          </CartBadge>
        </CartIconButton>
      )}
      <CartPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </>
  );
}