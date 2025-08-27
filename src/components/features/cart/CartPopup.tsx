"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { orderService } from '@/services/orderService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faPlus, faMinus, faSpinner, faCheck } from '@awesome.me/kit-7d648e8e96/icons/duotone/solid';
import OrderForm from './OrderForm';
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
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderedItems, setOrderedItems] = useState<typeof cartItems>([]);

  const handleClose = () => {
    // Reset all state when closing
    setOrderStatus('idle');
    setOrderMessage('');
    setOrderedItems([]);
    setShowOrderForm(false);
    setOrderId('');
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
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
  }, [isOpen]);

  const handleShowOrderForm = () => {
    if (cartItems.length === 0) return;
    setShowOrderForm(true);
  };

  const handleOrderSubmit = async (customerInfo: { name: string; email: string }) => {
    if (cartItems.length === 0) return;

    // Store items being ordered before any async operations
    const itemsToOrder = [...cartItems];
    setOrderedItems(itemsToOrder);

    setIsSubmitting(true);
    setOrderStatus('loading');
    setOrderMessage('');

    try {
      // Use mock service for local development, real service for production
      const response = process.env.NODE_ENV === 'development' 
        ? await orderService.mockSubmitOrder(itemsToOrder, customerInfo)
        : await orderService.submitOrder(itemsToOrder, customerInfo);

      if (response.success) {
        setOrderStatus('success');
        setOrderMessage(response.message);
        setOrderId(response.orderId || '');
        
        // Clear cart after successful order
        clearCart();
      } else {
        setOrderStatus('error');
        setOrderMessage(response.message);
      }
    } catch (error) {
      setOrderStatus('error');
      setOrderMessage('Er ging iets mis. Probeer het later opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToCart = () => {
    setShowOrderForm(false);
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
            onClick={handleClose}
            aria-label="Sluit winkelwagen"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className={styles.cartPopup__content}>
          {showOrderForm && orderStatus === 'idle' ? (
            <OrderForm
              onSubmit={handleOrderSubmit}
              onBack={handleBackToCart}
              isSubmitting={isSubmitting}
            />
          ) : (
          <div className={styles.cartPopup__items}>
            {orderStatus === 'loading' && (
              <div className={styles.cartPopup__loadingMessage}>
                <FontAwesomeIcon icon={faSpinner} spin />
                <p>Bestelling wordt verwerkt...</p>
              </div>
            )}
            
            {(orderStatus === 'success' || orderStatus === 'error') && (
              <>
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
              </>
            )}
            
            {((orderStatus === 'success' || orderStatus === 'error' || orderStatus === 'loading') ? orderedItems : cartItems).map((item) => (
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
                    {orderStatus === 'success' || orderStatus === 'error' || orderStatus === 'loading'
                      ? `Aantal: ${item.quantity}` 
                      : `Max. ${item.amount} beschikbaar`}
                  </p>
                  {orderStatus !== 'success' && orderStatus !== 'error' && orderStatus !== 'loading' && (
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
                  )}
                </div>
                {orderStatus !== 'success' && orderStatus !== 'error' && orderStatus !== 'loading' && (
                  <button
                    className={styles.cartItem__removeBtn}
                    onClick={() => removeFromCart(item.sys.id)}
                    aria-label="Verwijder uit winkelwagen"
                    title="Verwijder uit winkelwagen"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </div>
            ))}
          </div>
          )}

          {!showOrderForm && orderStatus !== 'success' && orderStatus !== 'error' && orderStatus !== 'loading' && (
            <div className={styles.cartPopup__footer}>
              {(
                <>
                  <button
                    className={styles.cartPopup__clearBtn}
                    onClick={handleClose}
                  > 
                    Verder winkelen
                  </button>
                  <button
                    className={styles.cartPopup__checkoutBtn}
                    onClick={handleShowOrderForm}
                    disabled={isSubmitting || cartItems.length === 0}
                  >
                    Bestelling plaatsen
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}