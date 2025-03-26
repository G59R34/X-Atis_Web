import { Box, Card, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

// Animation variants for page transitions
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

// Animation variants for list items
export const listItemVariants = {
  initial: { opacity: 0, x: -20 },
  enter: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: { opacity: 0, x: 20 }
};

// Styled components
export const AnimatedPage = styled(motion(Box))`
  flex-grow: 1;
  width: 100%;
`;

export const AnimatedCard = styled(motion(Card))`
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-4px);
  }
`;

export const GlassCard = styled(motion(Paper))`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease-in-out;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

// Framer Motion animations for elements
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 }
}; 