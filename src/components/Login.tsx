import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from '@emotion/styled';

const GlassContainer = styled(Box)`
  padding: 32px;
  border-radius: 8px;
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(144, 202, 249, 0.1);
  width: 100%;
  max-width: 400px;
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch {
      setError('You Fucking Suck');
    }
    setLoading(false);
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <GlassContainer>
        <Typography variant="h5" component="h2" gutterBottom>
          Log In
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            required
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            required
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Log In
          </Button>
          <Box textAlign="center">
            <Typography variant="body2">
              Need an account?{' '}
              <RouterLink to="/signup" style={{ color: '#90caf9' }}>
                Sign Up
              </RouterLink>
            </Typography>
          </Box>
        </Box>
      </GlassContainer>
    </Box>
  );
}