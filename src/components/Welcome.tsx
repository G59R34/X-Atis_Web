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
  alpha
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { getValue, fetchAndActivate } from 'firebase/remote-config';
import { useAuth } from '../contexts/AuthContext';
import { remoteConfig } from '../firebase';
import styled from '@emotion/styled';

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

const GlassContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  background: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
}));

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
    <Container maxWidth="md">
      <Box
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        sx={{ mt: 4 }}
      >
        <GlassContainer>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              align="center"
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 'bold'
              }}
            >
              Welcome, {currentUser?.email}!
            </Typography>
          </motion.div>
          
          <Divider sx={{ 
            my: 3,
            background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.3)}, transparent)`
          }} />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
              Latest Updates
            </Typography>
          </motion.div>

          <AnimatePresence>
            {loading ? (
              Array.from(new Array(3)).map((_, index) => (
                <StyledCard
                  key={`skeleton-${index}`}
                  variants={itemVariants}
                  sx={{ mb: 2 }}
                >
                  <CardContent>
                    <Skeleton variant="text" width="40%" height={32} />
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="20%" />
                  </CardContent>
                </StyledCard>
              ))
            ) : (
              news.map((item, index) => (
                <StyledCard
                  key={item.title}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  sx={{ 
                    mb: 2,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  }}
                >
                  <CardContent>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{ 
                        color: theme.palette.primary.main,
                        fontWeight: 500
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      paragraph
                      sx={{ 
                        color: alpha(theme.palette.text.primary, 0.9),
                        lineHeight: 1.6
                      }}
                    >
                      {item.content}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: alpha(theme.palette.text.secondary, 0.8),
                        display: 'block',
                        textAlign: 'right'
                      }}
                    >
                      {new Date(item.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </CardContent>
                </StyledCard>
              ))
            )}
          </AnimatePresence>
        </GlassContainer>
      </Box>
    </Container>
  );
};

export default Welcome; 