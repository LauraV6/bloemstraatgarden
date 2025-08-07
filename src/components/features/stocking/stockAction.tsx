"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRight } from '@awesome.me/kit-7d648e8e96/icons/duotone/solid';

// Types
interface StackActionProps {
  className?: string;
  href?: string;
  buttonText?: string;
  variant?: 'primary' | 'secondary';
}

// Constants
const STACK_ACTION_CONFIG = {
  defaultHref: '/verkrijgbaar',
  defaultButtonText: 'Bekijk onze voorraad',
  animationDuration: 0.3,
  hoverScale: 1.05,
  tapScale: 0.95,
  icon: faRight
} as const;

export default function StackAction({ 
  className,
  href = STACK_ACTION_CONFIG.defaultHref,
  buttonText = STACK_ACTION_CONFIG.defaultButtonText,
  variant = 'primary'
}: StackActionProps) {
  const buttonClass = `button button--cta ${variant === 'secondary' ? 'button--secondary' : ''} ${className || ''}`.trim();

  return (
    <motion.div       
      whileHover={{ scale: STACK_ACTION_CONFIG.hoverScale }}
      whileTap={{ scale: STACK_ACTION_CONFIG.tapScale }}
      transition={{ duration: STACK_ACTION_CONFIG.animationDuration }}
    >
      <Link 
        className={buttonClass}
        href={href}
        aria-label={`${buttonText} - Ga naar voorraad pagina`}
      >
        {buttonText} 
        <FontAwesomeIcon 
          icon={STACK_ACTION_CONFIG.icon} 
          aria-hidden="true"
          style={{ marginLeft: '0.5rem' }}
        />
      </Link>
    </motion.div>
  );
}