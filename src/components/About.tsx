import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const About = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <InfoIcon sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1">
            About X-ATIS
          </Typography>
        </Box>
        <Paper sx={{ p: 4 }}>
          <Typography variant="body1" paragraph>
            X-ATIS is a modern web application designed to provide quick and easy access to aviation weather
            information, specifically METAR (Meteorological Terminal Air Report) data for airports worldwide.
          </Typography>
          <Typography variant="body1" paragraph>
            Our application uses the Aviation Weather Center's API to fetch real-time METAR data, ensuring
            that pilots, aviation enthusiasts, and weather observers have access to the most current
            weather information.
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Features
          </Typography>
          <ul>
            <Typography component="li">Real-time METAR data retrieval</Typography>
            <Typography component="li">Decoded METAR information in an easy-to-read format</Typography>
            <Typography component="li">Support for all international airports with ICAO codes</Typography>
            <Typography component="li">Dark mode interface for comfortable viewing</Typography>
          </ul>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Data Source
          </Typography>
          <Typography variant="body1" paragraph>
            All weather data is provided by the Aviation Weather Center (AWC), a part of the National Weather
            Service (NWS) and the National Oceanic and Atmospheric Administration (NOAA).
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default About; 