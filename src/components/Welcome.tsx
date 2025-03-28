import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
  Divider,
  Skeleton,
  useTheme,
  alpha,
  Button,
  Link
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { getValue, fetchAndActivate } from 'firebase/remote-config';
import { useAuth } from '../contexts/AuthContext';
import { remoteConfig } from '../firebase';
import styled from '@emotion/styled';
import { Link as RouterLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';

interface NewsItem {
  title: string;
  content: string;
  date: string;
}

// Styled components
const StyledCard = styled(motion(Card))`
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-4px);
  }
`;

const GlassContainer = styled(Box)`
  padding: 32px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 800px;
  color: white;
  text-align: center;
`;

const Welcome = () => {
  const { currentUser } = useAuth();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        await fetchAndActivate(remoteConfig);
        const latestNewsValue = getValue(remoteConfig, 'latest_news_web');
        const newsItems = JSON.parse(latestNewsValue.asString());
        setNews(newsItems);
      } catch (error) {
        console.error('Error fetching latest news:', error);
        setNews([{
          title: 'Welcome to X-ATIS',
          content: 'Get real-time aviation weather information.',
          date: new Date().toISOString()
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#121212', // Ensure the background color is visible
      }}
    >
      <Box
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        sx={{ width: '100%' }}
      >
        <GlassContainer>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to X-ATIS
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
            A Modern ATIS Information System
          </Typography>
          <Typography variant="body1" paragraph>
            This application is currently in active development. We're working hard to bring you the best possible ATIS experience.
          </Typography>
          <Typography variant="body1" paragraph>
            Check out our progress and contribute on GitHub:
          </Typography>
          <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
            component={Link}
            href="https://github.com/yourusername/x-atis"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ 
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              },
              mb: 4
            }}
          >
            View on GitHub
          </Button>
          <Box>
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              sx={{ mr: 2 }}
            >
              Log In
            </Button>
            <Button
              component={RouterLink}
              to="/signup"
              variant="outlined"
              sx={{ 
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Sign Up
            </Button>
          </Box>
        </GlassContainer>
      </Box>
    </Container>
  );
};

export default Welcome;