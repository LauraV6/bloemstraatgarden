"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./available.module.scss";
import { Verkrijgbaar } from "@/lib/contentful/api";
import { useShoppingCart } from "@/context/ShoppingCartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCheck, faPlus, faMinus } from "@awesome.me/kit-7d648e8e96/icons/duotone/solid";

const nonAvailableSrc = "/notAvailable.png";

// Types
interface AvailableProps {
  className?: string;
  title?: string;
  description?: string;
  imageAlt?: string;
  availablePosts?: Verkrijgbaar[];
}

// Constants
const DEFAULT_CONTENT = {
  title: "Geen planten beschikbaar",
  description: "Momenteel zijn er geen planten op voorraad. Kom op een later moment terug om te kijken of er weer planten beschikbaar zijn.",
  imageAlt: "Geen planten beschikbaar illustratie"
} as const;

// AvailableCard Component
function AvailableCard({ post, index }: { post: Verkrijgbaar; index: number }) {
  const { addToCart, canAddToCart, getItemQuantity } = useShoppingCart();
  const maxAmount = parseInt(post.amount) || 1;
  const availableToAdd = canAddToCart(post.sys.id, maxAmount);
  const currentInCart = getItemQuantity(post.sys.id);
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
      addToCart(post, quantity);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
      setQuantity(Math.min(1, availableToAdd - quantity));
    }
  };

  return (
    <div className={styles.availableCard}>
      {post.postImage?.url && (
        <div className={styles.availableCard__imageWrapper}>
          <Image 
            src={post.postImage.url} 
            alt={post.title}
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
        <h3>{post.title}</h3>
        <p className={styles.availableCard__amount}>Aantal beschikbaar: {post.amount}</p>
        <p className={styles.availableCard__date}>{post.date}</p>
        
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

export default function Available({ 
  className,
  title = DEFAULT_CONTENT.title,
  description = DEFAULT_CONTENT.description,
  imageAlt = DEFAULT_CONTENT.imageAlt,
  availablePosts = []
}: AvailableProps) {
  const containerClass = [styles.available, className].filter(Boolean).join(' ');

  if (availablePosts && availablePosts.length > 0) {
    return (
      <div className={containerClass}>
        <div className={styles.availableGrid}>
          {availablePosts.map((post, index) => (
            <AvailableCard key={post.sys.id} post={post} index={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={containerClass}
      role="status" 
      aria-live="polite"
    >
      <div className={styles.nonAvailable__content}>
        <div className={styles.nonAvailable__imageWrapper}>
          <Image 
            src={nonAvailableSrc} 
            alt={imageAlt}
            width={300}
            height={300}
            style={{ 
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '150px'
            }}
            priority={false}
          />
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}