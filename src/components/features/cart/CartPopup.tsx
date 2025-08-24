"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faPlus, faMinus } from '@awesome.me/kit-7d648e8e96/icons/duotone/solid';
import styles from './cartPopup.module.scss';

interface CartPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartPopup({ isOpen, onClose }: CartPopupProps) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalItems } = useShoppingCart();
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.cartOverlay}>
      <div className={styles.cartPopup} ref={popupRef}>
        <div className={styles.cartPopup__header}>
          <h2>Winkelwagen
            {getTotalItems() > 0 && (
              <span className={styles.cartPopup__badge}>{getTotalItems()}</span>
            )}
          </h2>
          <button
            className={styles.cartPopup__closeBtn}
            onClick={onClose}
            aria-label="Sluit winkelwagen"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className={styles.cartPopup__content}>
          <div className={styles.cartPopup__items}>
            {cartItems.map((item) => (
              <div key={item.sys.id} className={styles.cartItem}>
                {item.postImage?.url && (
                  <div className={styles.cartItem__image}>
                    <Image
                      src={item.postImage.url}
                      alt={item.title}
                      width={80}
                      height={80}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                )}
                <div className={styles.cartItem__details}>
                  <h3>{item.title}</h3>
                  <p className={styles.cartItem__info}>
                    Max. {item.amount} beschikbaar
                  </p>
                  <div className={styles.cartItem__quantity}>
                    <button
                      className={styles.cartItem__quantityBtn}
                      onClick={() => updateQuantity(item.sys.id, item.quantity - 1)}
                      aria-label="Verminder hoeveelheid"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className={styles.cartItem__quantityValue}>
                      {item.quantity}
                    </span>
                    <button
                      className={styles.cartItem__quantityBtn}
                      onClick={() => updateQuantity(item.sys.id, item.quantity + 1)}
                      aria-label="Verhoog hoeveelheid"
                      disabled={item.quantity >= parseInt(item.amount)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
                <button
                  className={styles.cartItem__removeBtn}
                  onClick={() => removeFromCart(item.sys.id)}
                  aria-label="Verwijder uit winkelwagen"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>

          <div className={styles.cartPopup__footer}>
            <button
              className={styles.cartPopup__clearBtn}
              onClick={clearCart}
            >
              Winkelwagen leegmaken
            </button>
            <button
              className={styles.cartPopup__checkoutBtn}
              onClick={() => {
                alert('Neem contact op via Instagram of WhatsApp om je bestelling te plaatsen!');
              }}
            >
              Contact opnemen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}