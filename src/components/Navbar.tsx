import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme, alpha } from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import FlightIcon from '@mui/icons-material/Flight';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import styled from '@emotion/styled';
import { Theme } from '@mui/material/styles';

interface AnimatedButtonProps {
  to?: string;
  theme?: Theme;
  children?: React.ReactNode;
  [key: string]: any;
}

const AnimatedButton = styled(motion.div)<AnimatedButtonProps>`
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #90caf9;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const StyledAppBar = styled(AppBar)`
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch {
      // Handle error
    }
  }

  const buttonVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05 }
  };

  const logoVariants = {
    initial: { rotate: -180, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    hover: { rotate: 360, transition: { duration: 0.5 } }
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <motion.div
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={logoVariants}
        >
          <FlightIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
        </motion.div>
        
        <Typography 
          variant="h6" 
          component={motion.div}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          sx={{ 
            flexGrow: 1,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 'bold'
          }}
        >
          X-ATIS
        </Typography>

        <Box component={motion.div} sx={{ display: 'flex', gap: 1 }}>
          {currentUser ? (
            <>
              <AnimatedButton as={RouterLink} to="/">
                <Button
                  color="inherit"
                  sx={{ 
                    color: location.pathname === '/' ? theme.palette.primary.main : 'inherit'
                  }}
                >
                  Home
                </Button>
              </AnimatedButton>
              <AnimatedButton as={RouterLink} to="/metar">
                <Button
                  color="inherit"
                  sx={{ 
                    color: location.pathname === '/metar' ? theme.palette.primary.main : 'inherit'
                  }}
                >
                  METAR Search
                </Button>
              </AnimatedButton>
              <AnimatedButton
                as={RouterLink}
                to="/about"
                color="inherit"
                variants={buttonVariants}
                whileHover="hover"
                sx={{ 
                  color: location.pathname === '/about' ? theme.palette.primary.main : 'inherit'
                }}
              >
                About
              </AnimatedButton>
              <AnimatedButton
                color="inherit"
                onClick={handleLogout}
                variants={buttonVariants}
                whileHover="hover"
                sx={{
                  background: alpha(theme.palette.error.main, 0.1),
                  '&:hover': {
                    background: alpha(theme.palette.error.main, 0.2),
                  }
                }}
              >
                Log Out
              </AnimatedButton>
            </>
          ) : (
            <>
              <AnimatedButton>
                <Button
                  component={RouterLink}
                  to="/login"
                  color="inherit"
                  sx={{ 
                    color: location.pathname === '/login' ? '#90caf9' : 'inherit'
                  }}
                >
                  Log In
                </Button>
              </AnimatedButton>
              <AnimatedButton>
                <Button
                  component={RouterLink}
                  to="/signup"
                  color="inherit"
                  sx={{ 
                    color: location.pathname === '/signup' ? '#90caf9' : 'inherit'
                  }}
                >
                  Sign Up
                </Button>
              </AnimatedButton>
            </>
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;