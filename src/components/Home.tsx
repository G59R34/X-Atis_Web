import React from 'react';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import styled from '@emotion/styled';

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

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#121212',
      }}
    >
      <GlassContainer>
        <FlightTakeoffIcon sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to X-ATIS
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Your one-stop destination for aviation weather information and METAR reports
        </Typography>
        <Typography variant="body1" paragraph>
          Get instant access to METAR reports for any airport worldwide. Stay informed about weather conditions,
          visibility, wind patterns, and more.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/metar')}
          sx={{ mt: 2 }}
        >
          Search METAR Reports
        </Button>
      </GlassContainer>
    </Container>
  );
};

export default Home;