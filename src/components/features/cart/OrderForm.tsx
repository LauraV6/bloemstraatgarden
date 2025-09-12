"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faArrowLeft, faExclamationCircle } from '@awesome.me/kit-7d648e8e96/icons/duotone/solid';
import {
  OrderFormContainer,
  OrderFormHeader,
  BackButton,
  OrderFormElement,
  FormField,
  RequiredIndicator,
  FormInput,
  ErrorMessage,
  FormFooter,
  SubmitButton
} from './OrderForm.styled';

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
    <OrderFormContainer>
      <OrderFormHeader>
        <BackButton
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Terug naar winkelwagen</span>
        </BackButton>
        <h3>Contactgegevens</h3>
      </OrderFormHeader>
      
      <OrderFormElement onSubmit={handleSubmit}>
        <FormField>
          <label htmlFor="name">
            Naam <RequiredIndicator>*</RequiredIndicator>
          </label>
          <FormInput
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            hasError={errors.name && touched.name ? true : false}
            disabled={isSubmitting}
            placeholder="Voer uw naam in"
            autoComplete="name"
          />
          {errors.name && touched.name && (
            <ErrorMessage>
              <FontAwesomeIcon icon={faExclamationCircle} />
              {errors.name}
            </ErrorMessage>
          )}
        </FormField>
        
        <FormField>
          <label htmlFor="email">
            E-mailadres <RequiredIndicator>*</RequiredIndicator>
          </label>
          <FormInput
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            hasError={errors.email && touched.email ? true : false}
            disabled={isSubmitting}
            placeholder="uw.email@voorbeeld.nl"
            autoComplete="email"
          />
          {errors.email && touched.email && (
            <ErrorMessage>
              <FontAwesomeIcon icon={faExclamationCircle}/>
              {errors.email}
            </ErrorMessage>
          )}
        </FormField>
        
        <FormFooter>
          <SubmitButton
            type="submit"
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
          </SubmitButton>
        </FormFooter>
      </OrderFormElement>
    </OrderFormContainer>
  );
}