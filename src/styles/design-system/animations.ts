/**
 * Animation System
 * Comprehensive animation utilities and patterns
 */

import { keyframes, css } from '@emotion/react';
import { tokens } from './tokens';

// Animation durations
export const duration = {
  instant: `${tokens.durations.instant}ms`,
  fast: `${tokens.durations.fast}ms`,
  normal: `${tokens.durations.normal}ms`,
  slow: `${tokens.durations.slow}ms`,
  slower: `${tokens.durations.slower}ms`,
  slowest: `${tokens.durations.slowest}ms`,
} as const;

// Easing functions
export const easing = tokens.easings;

// Keyframe animations
export const keyframeAnimations = {
  fadeIn: keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `,

  fadeOut: keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
  `,

  slideInUp: keyframes`
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  `,

  slideInDown: keyframes`
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  `,

  slideInLeft: keyframes`
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  `,

  slideInRight: keyframes`
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  `,

  scaleIn: keyframes`
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  `,

  scaleOut: keyframes`
    from {
      transform: scale(1);
      opacity: 1;
    }
    to {
      transform: scale(0);
      opacity: 0;
    }
  `,

  rotate: keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `,

  pulse: keyframes`
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  `,

  bounce: keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  `,

  shake: keyframes`
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
    20%, 40%, 60%, 80% { transform: translateX(2px); }
  `,

  shimmer: keyframes`
    0% { background-position: -100% 0; }
    100% { background-position: 100% 0; }
  `,

  wave: keyframes`
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(20deg); }
    75% { transform: rotate(-20deg); }
  `,
};

// Transition presets
export const transitions = {
  all: {
    instant: `all ${duration.instant} ${easing.easeInOut}`,
    fast: `all ${duration.fast} ${easing.easeInOut}`,
    normal: `all ${duration.normal} ${easing.easeInOut}`,
    slow: `all ${duration.slow} ${easing.easeInOut}`,
  },

  opacity: {
    instant: `opacity ${duration.instant} ${easing.easeInOut}`,
    fast: `opacity ${duration.fast} ${easing.easeInOut}`,
    normal: `opacity ${duration.normal} ${easing.easeInOut}`,
    slow: `opacity ${duration.slow} ${easing.easeInOut}`,
  },

  transform: {
    instant: `transform ${duration.instant} ${easing.easeInOut}`,
    fast: `transform ${duration.fast} ${easing.easeInOut}`,
    normal: `transform ${duration.normal} ${easing.easeInOut}`,
    slow: `transform ${duration.slow} ${easing.easeInOut}`,
  },

  color: {
    instant: `color ${duration.instant} ${easing.easeInOut}`,
    fast: `color ${duration.fast} ${easing.easeInOut}`,
    normal: `color ${duration.normal} ${easing.easeInOut}`,
    slow: `color ${duration.slow} ${easing.easeInOut}`,
  },

  background: {
    instant: `background ${duration.instant} ${easing.easeInOut}`,
    fast: `background ${duration.fast} ${easing.easeInOut}`,
    normal: `background ${duration.normal} ${easing.easeInOut}`,
    slow: `background ${duration.slow} ${easing.easeInOut}`,
  },

  border: {
    instant: `border ${duration.instant} ${easing.easeInOut}`,
    fast: `border ${duration.fast} ${easing.easeInOut}`,
    normal: `border ${duration.normal} ${easing.easeInOut}`,
    slow: `border ${duration.slow} ${easing.easeInOut}`,
  },

  shadow: {
    instant: `box-shadow ${duration.instant} ${easing.easeInOut}`,
    fast: `box-shadow ${duration.fast} ${easing.easeInOut}`,
    normal: `box-shadow ${duration.normal} ${easing.easeInOut}`,
    slow: `box-shadow ${duration.slow} ${easing.easeInOut}`,
  },
};

// Motion patterns
export const motionPatterns = {
  // Micro-interactions
  hover: css`
    transition: ${transitions.all.fast};
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  `,

  scale: css`
    transition: ${transitions.transform.fast};
    cursor: pointer;

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.98);
    }
  `,

  // Page transitions
  pageEnter: css`
    animation: ${keyframeAnimations.fadeIn} ${duration.normal} ${easing.easeOut};
  `,

  pageExit: css`
    animation: ${keyframeAnimations.fadeOut} ${duration.normal} ${easing.easeIn};
  `,

  // Content reveals
  revealUp: css`
    animation: ${keyframeAnimations.slideInUp} ${duration.normal} ${easing.easeOut};
  `,

  revealDown: css`
    animation: ${keyframeAnimations.slideInDown} ${duration.normal} ${easing.easeOut};
  `,

  // Loading states
  skeleton: css`
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.05) 25%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.05) 75%
    );
    background-size: 200% 100%;
    animation: ${keyframeAnimations.shimmer} ${duration.slower} ${easing.easeInOut} infinite;
  `,

  spinner: css`
    animation: ${keyframeAnimations.rotate} ${duration.slow} ${easing.linear} infinite;
  `,
};

// Reduced motion support
export const reducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    transition: none !important;
  }
`;

// Helper to create custom animations
export const createAnimation = (
  name: keyof typeof keyframeAnimations,
  duration: keyof typeof tokens.durations = 'normal',
  easing: keyof typeof tokens.easings = 'easeInOut',
  options?: {
    delay?: number;
    iterations?: number | 'infinite';
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
    fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  }
) => {
  const {
    delay = 0,
    iterations = 1,
    direction = 'normal',
    fillMode = 'both',
  } = options || {};

  return css`
    animation: ${keyframeAnimations[name]}
      ${tokens.durations[duration]}ms
      ${tokens.easings[easing]}
      ${delay}ms
      ${iterations}
      ${direction}
      ${fillMode};
  `;
};

// Stagger animation helper
export const staggerChildren = (
  delayIncrement: number = 50,
  baseDelay: number = 0
) => css`
  > * {
    opacity: 0;
    animation: ${keyframeAnimations.fadeIn} ${duration.normal} ${easing.easeOut} forwards;

    ${Array.from({ length: 10 }, (_, i) => `
      &:nth-child(${i + 1}) {
        animation-delay: ${baseDelay + i * delayIncrement}ms;
      }
    `).join('')}
  }
`;

export type AnimationDuration = keyof typeof duration;
export type AnimationEasing = keyof typeof easing;