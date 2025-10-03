"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { orderService } from '@/services/orderService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faSpinner, faCheck } from '@awesome.me/kit-7d648e8e96/icons/duotone/solid';
import { faPlus, faMinus } from "@awesome.me/kit-7d648e8e96/icons/classic/solid";
import OrderForm from './OrderForm';
import {
  CartOverlay,
  CartPopupContainer,
  CartHeader,
  CartBadge,
  CloseButton,
  CartContent,
  CartItems,
  CartFooter,
  ClearButton,
  CheckoutButton,
  CartItem,
  CartItemImage,
  CartItemDetails,
  CartItemInfo,
  CartItemQuantity,
  QuantityButton,
  QuantityValue,
  RemoveButton,
  SuccessMessage,
  ErrorMessage,
  LoadingMessage
} from './CartPopup.styled';

interface CartPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartPopup({ isOpen, onClose }: CartPopupProps) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartQuantity } = useShoppingCart();
  const popupRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [orderMessage, setOrderMessage] = useState('');
  const [orderId, setOrderId] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderedItems, setOrderedItems] = useState<typeof cartItems>([]);

  const handleClose = useCallback(() => {
    // Reset all state when closing
    setOrderStatus('idle');
    setOrderMessage('');
    setOrderedItems([]);
    setShowOrderForm(false);
    setOrderId('');
    onClose();
  }, [onClose]);

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
  }, [isOpen, handleClose]);

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
    <CartOverlay>
      <CartPopupContainer ref={popupRef}>
        <CartHeader>
          <h2>Winkelwagen
            {cartQuantity > 0 && (
              <CartBadge>{cartQuantity}</CartBadge>
            )}
          </h2>
          <CloseButton
            onClick={handleClose}
            aria-label="Sluit winkelwagen"
          >
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </CartHeader>

        <CartContent>
          {showOrderForm && orderStatus === 'idle' ? (
            <OrderForm
              onSubmit={handleOrderSubmit}
              onBack={handleBackToCart}
              isSubmitting={isSubmitting}
            />
          ) : (
          <CartItems>
            {orderStatus === 'loading' && (
              <LoadingMessage>
                <FontAwesomeIcon icon={faSpinner} spin />
                <p>Bestelling wordt verwerkt...</p>
              </LoadingMessage>
            )}
            
            {(orderStatus === 'success' || orderStatus === 'error') && (
              <>
                {orderStatus === 'success' && (
                  <SuccessMessage>
                    <FontAwesomeIcon icon={faCheck} className="successIcon" />
                    <p>{orderMessage}</p>
                    {orderId && <small>Order ID: {orderId}</small>}
                  </SuccessMessage>
                )}
                
                {orderStatus === 'error' && (
                  <ErrorMessage>
                    <p>{orderMessage}</p>
                  </ErrorMessage>
                )}
              </>
            )}
            
            {((orderStatus === 'success' || orderStatus === 'error' || orderStatus === 'loading') ? orderedItems : cartItems).map((item) => (
              <CartItem key={item.sys.id}>
                {item.postImage?.url && (
                  <CartItemImage>
                    <Image
                      src={item.postImage.url}
                      alt={`Winkelwagen product: ${item.title}`}
                      width={80}
                      height={80}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </CartItemImage>
                )}
                <CartItemDetails>
                  <h3>{item.title}</h3>
                  <CartItemInfo>
                    {orderStatus === 'success' || orderStatus === 'error' || orderStatus === 'loading'
                      ? `Aantal: ${item.quantity}` 
                      : `Max. ${item.amount} beschikbaar`}
                  </CartItemInfo>
                  {orderStatus !== 'success' && orderStatus !== 'error' && orderStatus !== 'loading' && (
                    <CartItemQuantity>
                      <QuantityButton
                        onClick={() => updateQuantity(item.sys.id, item.quantity - 1)}
                        aria-label="Verminder hoeveelheid"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </QuantityButton>
                      <QuantityValue>
                        {item.quantity}
                      </QuantityValue>
                      <QuantityButton
                        onClick={() => updateQuantity(item.sys.id, item.quantity + 1)}
                        aria-label="Verhoog hoeveelheid"
                        disabled={item.quantity >= parseInt(item.amount)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </QuantityButton>
                    </CartItemQuantity>
                  )}
                </CartItemDetails>
                {orderStatus !== 'success' && orderStatus !== 'error' && orderStatus !== 'loading' && (
                  <RemoveButton
                    onClick={() => removeFromCart(item.sys.id)}
                    aria-label="Verwijder uit winkelwagen"
                    title="Verwijder uit winkelwagen"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </RemoveButton>
                )}
              </CartItem>
            ))}
          </CartItems>
          )}

          {!showOrderForm && orderStatus !== 'success' && orderStatus !== 'error' && orderStatus !== 'loading' && (
            <CartFooter>
              {(
                <>
                  <ClearButton
                    onClick={handleClose}
                  > 
                    Verder winkelen
                  </ClearButton>
                  <CheckoutButton
                    onClick={handleShowOrderForm}
                    disabled={isSubmitting || cartItems.length === 0}
                  >
                    Bestelling plaatsen
                  </CheckoutButton>
                </>
              )}
            </CartFooter>
          )}
        </CartContent>
      </CartPopupContainer>
    </CartOverlay>
  );
}