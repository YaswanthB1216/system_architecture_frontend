import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Plus, User, ChevronDown, LogOut } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import ProjectList from './components/ProjectList';
import ChatInterface from './components/ChatInterface';
import kaaraLogo from '../../kaara_logo.png';

function Dashboard() {
  const { logout } = useAuth();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem('user'));
  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <Box display="flex" height="100vh" sx={{ background: '#F8FAFC' }}>
      {/* Left Sidebar - Project List */}
      <Box width={260} borderRight={0} bgcolor="rgba(255,255,255,0.95)" p={2} display="flex" flexDirection="column" boxShadow="0 4px 12px rgba(0, 0, 0, 0.05)" borderRadius={0}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            mb: 2,
            pb: '12px',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <span style={{
            fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: 700,
            fontSize: 16,
            color: '#334155',
            letterSpacing: '0.5px',
            marginBottom: 4,
            display: 'block',
          }}>
            Architect Copilot
          </span>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ml: 1, mb: 1 }}>
            <span style={{
              fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
              fontWeight: 400,
              fontSize: 11,
              color: '#64748B',
              marginRight: 4,
              display: 'block',
            }}>
              by
            </span>
            <img
              src={kaaraLogo}
              alt="kaara Logo"
              style={{
                height: '22px',
                width: 'auto',
                verticalAlign: 'middle',
              }}
            />
          </Box>
        </Box>
        <ProjectList
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </Box>

      {/* Main Content Area */}
      <Box flex={1} display="flex" flexDirection="column">
        {/* Top Bar: Project title left, user login right */}
        <Box p={2} display="flex" alignItems="center" justifyContent="space-between" sx={{ background: 'rgba(255,255,255,0.95)', borderRadius: 0, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
          <Typography 
            variant="h5" 
            fontWeight={600} 
            color="#334155"
            sx={{
              letterSpacing: '0.2px'
            }}
          >
            {selectedProject?.name || 'Dashboard'}
          </Typography>
          <Box position="relative">
            <Button 
              variant="outlined"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                borderColor: '#E2E8F0', 
                color: '#334155', 
                fontWeight: 600, 
                background: '#fff', 
                borderRadius: 2, 
                boxShadow: 0,
                '&:hover': {
                  borderColor: '#475569',
                  background: '#F8FAFC'
                }
              }}
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            >
              <Box width={32} height={32} borderRadius="50%" bgcolor="#F1F5F9" display="flex" alignItems="center" justifyContent="center" color="#334155" fontWeight={700} fontSize={18}>
                {user?.name?.charAt(0).toUpperCase()}
              </Box>
              <span style={{ color: '#334155', fontWeight: 600 }}>{user?.name}</span>
              <ChevronDown style={{ height: 20, width: 20, transition: 'transform 0.2s', transform: showUserDropdown ? 'rotate(180deg)' : 'none', color: '#334155' }} />
            </Button>
            {showUserDropdown && (
              <Box position="absolute" right={0} mt={1} width={180} bgcolor="#fff" borderRadius={2} boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)" zIndex={10}>
                <Button
                  onClick={handleSignOut}
                  startIcon={<LogOut />}
                  fullWidth
                  sx={{ 
                    justifyContent: 'flex-start', 
                    color: '#334155', 
                    fontWeight: 600, 
                    borderRadius: 2,
                    '&:hover': {
                      background: '#F1F5F9'
                    }
                  }}
                >
                  Sign Out
                </Button>
              </Box>
            )}
          </Box>
        </Box>
        {/* Second Row: Centered card for project title and chat */}
        <Box flex={1} display="flex" flexDirection="column" alignItems="stretch" justifyContent="stretch">
          <Box flex={1} width="100%" sx={{ background: 'rgba(255,255,255,0.85)', borderRadius: 0, boxShadow: 1, p: 3, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            
            <Box flex={1} display="flex" flexDirection="column">
              <ChatInterface selectedProject={selectedProject} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;