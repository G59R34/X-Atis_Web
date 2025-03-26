import React from 'react';
import { Container, Typography, Paper, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <FlightTakeoffIcon sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to X-ATIS
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Your one-stop destination for aviation weather information and METAR reports
        </Typography>
        <Paper sx={{ p: 4, mt: 4 }}>
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
        </Paper>
      </Box>
    </Container>
  );
};

export default Home; 