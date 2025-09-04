'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCheck, faPlus, faMinus } from "@awesome.me/kit-7d648e8e96/icons/duotone/solid";
import styles from "./available.module.scss";

const nonAvailableSrc = "/notAvailable.png";

interface AvailableCardProps {
  item: {
    sys: { id: string };
    title: string;
    amount: string;
    date: string;
    postImage: {
      url: string;
    };
  };
  index?: number;
}

export default function AvailableCard({ item, index = 0 }: AvailableCardProps) {
  const { addToCart, canAddToCart, getItemQuantity } = useShoppingCart();
  const maxAmount = parseInt(String(item.amount)) || 1;
  const availableToAdd = canAddToCart(item.sys.id, maxAmount);
  const currentInCart = getItemQuantity(item.sys.id);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Reset quantity to 1 when item is no longer in cart (after order is placed)
  useEffect(() => {
    if (currentInCart === 0) {
      setQuantity(1);
    }
  }, [currentInCart]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= availableToAdd) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (quantity <= availableToAdd) {
      addToCart(item, quantity);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
      setQuantity(Math.min(1, availableToAdd - quantity));
    }
  };

  return (
    <div className={styles.availableCard}>
      {item.postImage?.url && (
        <div className={styles.availableCard__imageWrapper}>
          <Image 
            src={item.postImage.url} 
            alt={item.title}
            width={300}
            height={200}
            priority={index < 4}
            loading={index < 4 ? 'eager' : 'lazy'}
            style={{ 
              width: '100%',
              height: 'auto',
              objectFit: 'cover'
            }}
          />
        </div>
      )}
      <div className={styles.availableCard__content}>
        <h3>{item.title}</h3>
        <p className={styles.availableCard__amount}>Aantal beschikbaar: {item.amount}</p>
        <p className={styles.availableCard__date}>{item.date}</p>
        
        <div className={styles.availableCard__actions}>
          <div className={styles.availableCard__quantity}>
            <button
              className={styles.availableCard__quantityBtn}
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1 || availableToAdd === 0}
              aria-label="Verminder hoeveelheid"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <input
              type="number"
              className={styles.availableCard__quantityInput}
              value={availableToAdd === 0 ? 0 : quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              min={availableToAdd === 0 ? 0 : 1}
              max={availableToAdd}
              disabled={availableToAdd === 0}
              aria-label="Selecteer hoeveelheid"
            />
            <button
              className={styles.availableCard__quantityBtn}
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= availableToAdd || availableToAdd === 0}
              aria-label="Verhoog hoeveelheid"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          
          <button 
            className={`${styles.availableCard__addButton} ${justAdded ? styles['availableCard__addButton--added'] : ''} ${availableToAdd === 0 ? styles['availableCard__addButton--disabled'] : ''}`}
            onClick={handleAddToCart}
            disabled={availableToAdd === 0}
            aria-label={availableToAdd === 0 ? "Maximum bereikt" : "Voeg toe aan winkelwagen"}
          >
            <FontAwesomeIcon icon={availableToAdd === 0 ? faCheck : justAdded ? faCheck : faCartPlus} />
            <span>{availableToAdd === 0 ? "Maximum bereikt" : justAdded ? "Toegevoegd!" : "Voeg toe"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}