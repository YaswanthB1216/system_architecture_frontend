import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import axiosInstance from '../../axiosInstance';
import logo from '../../logo.svg'; // Placeholder, will replace with northern lights SVG


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (username && password) {
      try {
        const responseData = await login(username, password);
        console.log('25', responseData);
  
        if (responseData.status === 200) {
          showToast('Logged in successfully!');
          navigate('/dashboard');
        } else {
          showToast('Invalid username or password', 'error');
        }
      } catch (error) {
        console.error('Login error:', error);
        showToast('An error occurred during login', 'error');
      }
    } else {
      showToast('Please enter both username and password', 'error');
    }
  };
  

  const handleSignupClick = () => {
    navigate('/register');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #3498db 100%)',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 4,
          boxShadow: '0 8px 32px 0 rgba(44, 62, 80, 0.25)',
          // background: '#8eb1bfe8',
          background: '#ffffff',
          px: 2,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 24, marginBottom: 8 }}>
          {/* Text-based Aura Vibe logo */}
          <div style={{ width: '100%', textAlign: 'center' }}>
            <span style={{
              fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 700,
              fontSize: 38,
              color: '#1E293B',
              letterSpacing: '0.5px',
              textAlign: 'center',
              textTransform: 'none',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
              display: 'block',
              marginBottom: '4px'
            }}>Architect Copilot</span>
            <div style={{
              fontFamily: 'Segoe UI, sans-serif',
              fontWeight: 400,
              fontSize: 14,
              color: '#34495e',
              marginTop: 4,
              textAlign: 'center',
              maxWidth: 260,
              lineHeight: 1.4,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              Turn your idea into reality.
            </div>
          </div>
        </div>
        {/* <Typography variant="subtitle1" align="center" color="#f58529" style={{ marginBottom: 8 }}>
          Welcome back to Aura
        </Typography> */}
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 8 }}>
            <TextField
              id="username"
              label="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Name"
              fullWidth
              margin="normal"
              InputProps={{
                style: {
                  // background: 'rgb(184 201 208 / 91%)',
                  background: '#ffffff',
                  borderRadius: 8,
                  
                },
              }}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              fullWidth
              margin="normal"
              InputProps={{
                style: {
                  // background: 'rgb(184 201 208 / 91%)',
                  background: '#ffffff',
                  borderRadius: 8,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: 'linear-gradient(90deg, #2c3e50 0%, #34495e 50%, #3498db 100%)',
                color: '#fff',
                fontWeight: 600,
                borderRadius: 8,
                boxShadow: '0 2px 8px 0 rgba(44, 62, 80, 0.25)',
                py: 1.5,
                fontSize: 18,
                letterSpacing: 1,
                mt: 1,
                '&:hover': {
                  background: 'linear-gradient(90deg, #3498db 0%, #34495e 50%, #2c3e50 100%)',
                },
              }}
            >
              Sign In
            </Button>
          </form>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, cursor: 'pointer', color: '#34495e', textDecoration: 'underline' }}
            onClick={handleSignupClick}
          >
            Don't have an account? Sign up
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;