import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { Plus } from 'lucide-react';
import axiosInstance from '../../../axiosInstance';
import useToast from '../../../hooks/useToast';





export default function ProjectList({ selectedProject, setSelectedProject }) {
    const { showToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleCreateProject = async () => {
    if (newProjectName.trim()) {
      try {
        const payload = {
          name: newProjectName,
          description: 'A project for AI-assisted development',
        };
        const response = await axiosInstance.post('/projects', payload);
        const createdProject = response.data?.data;
        const updatedProjects = [createdProject, ...projects];
        setProjects(updatedProjects);
        setSelectedProject(createdProject);
        setNewProjectName('');
        setShowCreateModal(false);
        showToast('Project created successfully!');
      } catch (error) {
        console.error('Error creating project:', error);
      }
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get('/projects');
      const data = response.data?.data;
      setProjects(Array.isArray(data) ? data : []);
      setSelectedProject(Array.isArray(data) && data.length > 0 ? data[0] : null);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    }
  }
 useEffect(() => {
     fetchProjects();
     setSelectedProject(projects?.[0]);
 },[])
  return (
    <>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {projects?.map((project) => (
          <Card
            key={project.id || project._id}
            sx={{
              p: 1.2,
              mb: 1.2,
              boxShadow: 'none',
              border: selectedProject?.id === project?.id || selectedProject?._id === project?._id
                ? '1.5px solid #334155'
                : '1.5px solid #E2E8F0',
              backgroundColor: selectedProject?.id === project?.id || selectedProject?._id === project?._id
                ? 'rgba(51, 65, 85, 0.05)'
                : 'rgba(248, 250, 252, 0.7)',
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'border 0.2s, background 0.2s',
            }}
            onClick={() => setSelectedProject(project)}
          >
            <Typography
              sx={{
                color: selectedProject?.id === project?.id || selectedProject?._id === project?._id ? '#334155' : '#64748B',
                fontWeight: selectedProject?.id === project?.id || selectedProject?._id === project?._id ? 700 : 500,
                fontSize: 16,
                letterSpacing: 0.2,
                px: 0.5,
              }}
            >
              {project?.name}
            </Typography>
          </Card>
        ))}
      </div>

     {user.role === 'business_user' &&
     
      <Button
        variant="contained"
        startIcon={<Plus size={12} />}
        sx={{
          mt: 2,
          width: '70%',
          background: '#334155',
          color: '#fff',
          fontWeight: 600,
          borderRadius: 2,
          boxShadow: '0 2px 4px 0 rgba(51, 65, 85, 0.15)',
          fontSize: 12,
          letterSpacing: 0.5,
          textTransform: 'none',
          '&:hover': {
            background: '#475569',
          },
        }}
        onClick={() => setShowCreateModal(true)}
      >
        New Project
      </Button>}

      <Dialog open={showCreateModal} onClose={() => setShowCreateModal(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            background: '#FFFFFF',
            boxShadow: '0 8px 32px 0 rgba(51, 65, 85, 0.15)',
            p: 2,
          }
        }}
      >
        <DialogTitle sx={{
          fontWeight: 700,
          fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
          color: '#334155',
          textAlign: 'center',
          fontSize: 22,
        }}>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="projectName"
            label="Project Name"
            type="text"
            fullWidth
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
            InputProps={{
              style: {
                background: '#F8FAFC',
                borderRadius: 2,
                fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '14px',
                color: '#334155',
              },
              sx: {
                '& fieldset': {
                  borderColor: '#E2E8F0',
                },
                '&:hover fieldset': {
                  borderColor: '#475569',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#334155',
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button onClick={() => setShowCreateModal(false)}
            sx={{
              color: '#64748B',
              fontWeight: 600,
              borderRadius: 2,
              px: 2,
              textTransform: 'none',
              '&:hover': { 
                background: '#F1F5F9',
                color: '#334155'
              },
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleCreateProject} variant="contained"
            sx={{
              background: '#334155',
              color: '#fff',
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              textTransform: 'none',
              boxShadow: '0 2px 4px 0 rgba(51, 65, 85, 0.15)',
              '&:hover': {
                background: '#475569',
              },
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}