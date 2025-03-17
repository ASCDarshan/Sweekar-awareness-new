import React, { useState, useEffect } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const SplashContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  zIndex: 9999,
}));

const Logo = styled('img')(({ theme }) => ({
  maxWidth: '200px',
  marginBottom: theme.spacing(3),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: theme.rainbowTheme.gradients?.rainbow || 'linear-gradient(90deg, #ff0080, #ff8c00, #ffed00, #00f, #00bfff, #ff00bf)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(1),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const SplashScreen = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');

    if (hasSeenSplash) {
      setShow(false);
      return;
    }

    const timer = setTimeout(() => {
      setShow(false);
      localStorage.setItem('hasSeenSplash', 'true');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'fixed', width: '100%', height: '100%', zIndex: 9999 }}
        >
          <SplashContainer>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Logo
                src="/assets/images/sweekar-logo.png"
                alt="Sweekar Logo"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Title variant="h3">LGBTQAI+ Awareness</Title>
              <Subtitle variant="h6" align="center">By Sweekar</Subtitle>
            </motion.div>
          </SplashContainer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;