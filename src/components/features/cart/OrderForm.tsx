"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faArrowLeft, faExclamationCircle } from '@awesome.me/kit-7d648e8e96/icons/duotone/solid';
import styles from './orderForm.module.scss';

interface OrderFormProps {
  onSubmit: (customerInfo: { name: string; email: string }) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function OrderForm({ onSubmit, onBack, isSubmitting }: OrderFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: ''
  });
  
  const [touched, setTouched] = useState({
    name: false,
    email: false
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: '',
      email: ''
    };
    
    let isValid = true;
    
    if (!formData.name.trim()) {
      newErrors.name = 'Naam is verplicht';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Naam moet minimaal 2 karakters bevatten';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mailadres is verplicht';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Voer een geldig e-mailadres in';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: 'name' | 'email', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (touched[field]) {
      const newErrors = { ...errors };
      
      if (field === 'name') {
        if (value.trim() && value.trim().length >= 2) {
          newErrors.name = '';
        }
      } else if (field === 'email') {
        if (value.trim() && validateEmail(value)) {
          newErrors.email = '';
        }
      }
      
      setErrors(newErrors);
    }
  };

  const handleBlur = (field: 'name' | 'email') => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    const newErrors = { ...errors };
    
    if (field === 'name') {
      if (!formData.name.trim()) {
        newErrors.name = 'Naam is verplicht';
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Naam moet minimaal 2 karakters bevatten';
      } else {
        newErrors.name = '';
      }
    } else if (field === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = 'E-mailadres is verplicht';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Voer een geldig e-mailadres in';
      } else {
        newErrors.email = '';
      }
    }
    
    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true });
    
    if (validateForm()) {
      onSubmit({
        name: formData.name.trim(),
        email: formData.email.trim()
      });
    }
  };

  return (
    <div className={styles.orderForm}>
      <div className={styles.orderForm__header}>
        <button
          type="button"
          onClick={onBack}
          className={styles.orderForm__backBtn}
          disabled={isSubmitting}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Terug naar winkelwagen</span>
        </button>
        <h3>Contactgegevens</h3>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.orderForm__form}>
        <div className={styles.orderForm__field}>
          <label htmlFor="name">
            Naam <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            className={errors.name && touched.name ? styles.error : ''}
            disabled={isSubmitting}
            placeholder="Voer uw naam in"
            autoComplete="name"
          />
          {errors.name && touched.name && (
            <span className={styles.orderForm__error}>
              <FontAwesomeIcon icon={faExclamationCircle} />
              {errors.name}
            </span>
          )}
        </div>
        
        <div className={styles.orderForm__field}>
          <label htmlFor="email">
            E-mailadres <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={errors.email && touched.email ? styles.error : ''}
            disabled={isSubmitting}
            placeholder="uw.email@voorbeeld.nl"
            autoComplete="email"
          />
          {errors.email && touched.email && (
            <span className={styles.orderForm__error}>
              <FontAwesomeIcon icon={faExclamationCircle} style={{ color: 'var(--color-error)'}}/>
              {errors.email}
            </span>
          )}
        </div>
        
        <div className={styles.orderForm__footer}>
          <button
            type="submit"
            className={styles.orderForm__submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                Bestelling verzenden...
              </>
            ) : (
              'Bestelling verzenden'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}