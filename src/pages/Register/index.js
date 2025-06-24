import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import useToast from '../../hooks/useToast';
import axiosInstance from '../../axiosInstance';

const roles = [
  { value: 'business_user', label: 'Business User' },
  { value: 'product_manager', label: 'Product Manager' },
  { value: 'architect', label: 'Architect' },
  { value: 'user', label: 'user' },
];

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('business_user');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axiosInstance.post('/signup', {
        email,
        password,
        name,
        role,
      });
  
      // If the request succeeds and status is 201 (Created)
      if (response.status === 200) {
        showToast('Registered successfully!');
        navigate('/');
      } else {
        // Should rarely hit this if Axios is configured correctly
        console.log("response status...",response.status)
        console.log("response",response)
        showToast(response.data?.message || 'Registration failed', 'error');
      }
    } catch (err) {
      // Axios errors include the server response (if any)
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.detail || // in case of FastAPI/Django style
        'Registration failed';
  
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
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
          background: 'rgba(255,255,255,0.98)',
          px: 2,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 24, marginBottom: 8 }}>
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
            {/* <div style={{
              fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
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
            </div> */}
          </div>
        </div>
        <Typography variant="subtitle1" align="center" color="#34495e" style={{ marginBottom: 8 }}>
          Create your Aura account
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 8 }}>
            <TextField
              id="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              fullWidth
              margin="normal"
              required
              InputProps={{
                style: {
                  background: '#f7f9fa',
                  borderRadius: 8,
                },
              }}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              fullWidth
              margin="normal"
              required
              InputProps={{
                style: {
                  background: '#f7f9fa',
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
              placeholder="Enter your password"
              fullWidth
              margin="normal"
              required
              InputProps={{
                style: {
                  background: '#f7f9fa',
                  borderRadius: 8,
                },
              }}
            />
            {/* <TextField
              id="role"
              label="Role (optional)"
              select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{
                style: {
                  background: '#f7f9fa',
                  borderRadius: 8,
                },
              }}
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value} style={{ color: '#34495e' }}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
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
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register; 