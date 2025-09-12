"use client";

import { useRouter } from "next/navigation";
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
  icon: faRight
} as const;

export default function StackAction({ 
  className,
  href = STACK_ACTION_CONFIG.defaultHref,
  buttonText = STACK_ACTION_CONFIG.defaultButtonText,
  variant = 'primary'
}: StackActionProps) {
  const router = useRouter();
  const buttonClass = `button button--cta ${variant === 'secondary' ? 'button--secondary' : ''} ${className || ''}`.trim();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a 
      className={buttonClass}
      href={href}
      aria-label={`${buttonText} - Ga naar voorraad pagina`}
      onClick={handleClick}
    >
      <span>{buttonText}</span>
      <FontAwesomeIcon 
        icon={STACK_ACTION_CONFIG.icon} 
        aria-hidden="true"
        className="stack-action-icon"
      />
    </a>
  );
}