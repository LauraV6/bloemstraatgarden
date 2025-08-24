"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { orderService } from '@/services/orderService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faPlus, faMinus, faSpinner, faCheck } from '@awesome.me/kit-7d648e8e96/icons/duotone/solid';
import styles from './cartPopup.module.scss';

interface CartPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartPopup({ isOpen, onClose }: CartPopupProps) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalItems } = useShoppingCart();
  const popupRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [orderMessage, setOrderMessage] = useState('');
  const [orderId, setOrderId] = useState('');

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

  const handleOrderSubmit = async () => {
    if (cartItems.length === 0) return;

    setIsSubmitting(true);
    setOrderStatus('loading');
    setOrderMessage('');

    try {
      // Use mock service for local development, real service for production
      const response = process.env.NODE_ENV === 'development' 
        ? await orderService.mockSubmitOrder(cartItems)
        : await orderService.submitOrder(cartItems);

      if (response.success) {
        setOrderStatus('success');
        setOrderMessage(response.message);
        setOrderId(response.orderId || '');
        
        // Clear cart after successful order
        setTimeout(() => {
          clearCart();
          // Reset states after 5 seconds
          setTimeout(() => {
            setOrderStatus('idle');
            setOrderMessage('');
            onClose();
          }, 5000);
        }, 2000);
      } else {
        setOrderStatus('error');
        setOrderMessage(response.message);
        // Reset error state after 3 seconds
        setTimeout(() => {
          setOrderStatus('idle');
          setOrderMessage('');
        }, 3000);
      }
    } catch (error) {
      setOrderStatus('error');
      setOrderMessage('Er ging iets mis. Probeer het later opnieuw.');
      setTimeout(() => {
        setOrderStatus('idle');
        setOrderMessage('');
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  title="Verwijder uit winkelwagen"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>

          <div className={styles.cartPopup__footer}>
            {orderStatus === 'success' && (
              <div className={styles.cartPopup__successMessage}>
                <FontAwesomeIcon icon={faCheck} className={styles.successIcon} />
                <p>{orderMessage}</p>
                {orderId && <small>Order ID: {orderId}</small>}
              </div>
            )}
            
            {orderStatus === 'error' && (
              <div className={styles.cartPopup__errorMessage}>
                <p>{orderMessage}</p>
              </div>
            )}

            {orderStatus !== 'success' && (
              <>
                <button
                  className={styles.cartPopup__clearBtn}
                  onClick={clearCart}
                  disabled={isSubmitting}
                > 
                  Winkelwagen leegmaken
                </button>
                <button
                  className={styles.cartPopup__checkoutBtn}
                  onClick={handleOrderSubmit}
                  disabled={isSubmitting || cartItems.length === 0}
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin className={styles.spinner} />
                      Bestelling verzenden...
                    </>
                  ) : (
                    'Bestelling plaatsen'
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}