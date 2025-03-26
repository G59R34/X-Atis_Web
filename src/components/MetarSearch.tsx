import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CircularProgress,
  useTheme,
  alpha
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchMetar } from '../services/weatherService';
import { 
  AnimatedPage, 
  GlassCard, 
  fadeInUp, 
  scaleIn,
  listItemVariants 
} from './shared/AnimatedComponents';

const MetarSearch = () => {
  const [stationId, setStationId] = useState('');
  const [metarData, setMetarData] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stationId) {
      setError('Please enter a station ID');
      return;
    }

    setLoading(true);
    setError('');
    setMetarData(null);

    try {
      const data = await fetchMetar(stationId.toUpperCase());
      setMetarData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch METAR data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage
      initial="initial"
      animate="enter"
      exit="exit"
      variants={fadeInUp}
    >
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <GlassCard elevation={0} sx={{ p: 4, borderRadius: 2 }}>
            <motion.div variants={scaleIn}>
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
                  fontWeight: 'bold',
                  mb: 4
                }}
              >
                METAR Search
              </Typography>

              <form onSubmit={handleSubmit}>
                <motion.div variants={fadeInUp}>
                  <TextField
                    label="Station ID (ICAO)"
                    fullWidth
                    value={stationId}
                    onChange={(e) => setStationId(e.target.value)}
                    placeholder="Enter ICAO code (e.g., KJFK)"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: alpha(theme.palette.primary.main, 0.3),
                        },
                        '&:hover fieldset': {
                          borderColor: alpha(theme.palette.primary.main, 0.5),
                        },
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    sx={{
                      mt: 2,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Get METAR'}
                  </Button>
                </motion.div>
              </form>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {error}
                    </Alert>
                  </motion.div>
                )}

                {metarData && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="h6" gutterBottom>
                        METAR Report for {metarData.station_id}
                      </Typography>
                      <TableContainer 
                        component={motion.div}
                        variants={listItemVariants}
                        sx={{
                          background: alpha(theme.palette.background.paper, 0.05),
                          backdropFilter: 'blur(10px)',
                          borderRadius: 1,
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        }}
                      >
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell 
                                component="th" 
                                scope="row"
                                sx={{ 
                                  color: theme.palette.primary.main,
                                  fontWeight: 500
                                }}
                              >
                                Raw METAR
                              </TableCell>
                              <TableCell>{metarData.raw_text}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell 
                                component="th" 
                                scope="row"
                                sx={{ 
                                  color: theme.palette.primary.main,
                                  fontWeight: 500
                                }}
                              >
                                Observation Time
                              </TableCell>
                              <TableCell>
                                {new Date(metarData.observation_time).toLocaleString()}
                              </TableCell>
                            </TableRow>
                            {metarData.temp_c !== undefined && (
                              <TableRow>
                                <TableCell 
                                  component="th" 
                                  scope="row"
                                  sx={{ 
                                    color: theme.palette.primary.main,
                                    fontWeight: 500
                                  }}
                                >
                                  Temperature
                                </TableCell>
                                <TableCell>
                                  {metarData.temp_c}°C / {(metarData.temp_c * 9/5 + 32).toFixed(1)}°F
                                </TableCell>
                              </TableRow>
                            )}
                            {metarData.dewpoint_c !== undefined && (
                              <TableRow>
                                <TableCell 
                                  component="th" 
                                  scope="row"
                                  sx={{ 
                                    color: theme.palette.primary.main,
                                    fontWeight: 500
                                  }}
                                >
                                  Dewpoint
                                </TableCell>
                                <TableCell>
                                  {metarData.dewpoint_c}°C / {(metarData.dewpoint_c * 9/5 + 32).toFixed(1)}°F
                                </TableCell>
                              </TableRow>
                            )}
                            {metarData.wind_dir_degrees !== undefined && metarData.wind_speed_kt !== undefined && (
                              <TableRow>
                                <TableCell 
                                  component="th" 
                                  scope="row"
                                  sx={{ 
                                    color: theme.palette.primary.main,
                                    fontWeight: 500
                                  }}
                                >
                                  Wind
                                </TableCell>
                                <TableCell>
                                  {metarData.wind_dir_degrees}° at {metarData.wind_speed_kt} knots
                                </TableCell>
                              </TableRow>
                            )}
                            {metarData.visibility_statute_mi !== undefined && (
                              <TableRow>
                                <TableCell 
                                  component="th" 
                                  scope="row"
                                  sx={{ 
                                    color: theme.palette.primary.main,
                                    fontWeight: 500
                                  }}
                                >
                                  Visibility
                                </TableCell>
                                <TableCell>
                                  {metarData.visibility_statute_mi} statute miles
                                </TableCell>
                              </TableRow>
                            )}
                            {metarData.altim_in_hg !== undefined && (
                              <TableRow>
                                <TableCell 
                                  component="th" 
                                  scope="row"
                                  sx={{ 
                                    color: theme.palette.primary.main,
                                    fontWeight: 500
                                  }}
                                >
                                  Altimeter
                                </TableCell>
                                <TableCell>
                                  {metarData.altim_in_hg.toFixed(2)} inHg
                                </TableCell>
                              </TableRow>
                            )}
                            {metarData.flight_category && (
                              <TableRow>
                                <TableCell 
                                  component="th" 
                                  scope="row"
                                  sx={{ 
                                    color: theme.palette.primary.main,
                                    fontWeight: 500
                                  }}
                                >
                                  Flight Category
                                </TableCell>
                                <TableCell>
                                  {metarData.flight_category}
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </GlassCard>
        </Box>
      </Container>
    </AnimatedPage>
  );
};

export default MetarSearch; 