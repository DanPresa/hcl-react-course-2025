import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { authSelector } from '../../redux/auth/auth.slice';
import { resetAuthState } from '../../redux/auth/auth.actions';
import { useNavigate } from 'react-router';
import { Button, Typography, Stack } from '@mui/material';

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(authSelector);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(resetAuthState());
    navigate('/'); // Redirect to Login page
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">Welcome, {user?.email}</Typography>
      <Stack spacing={2} mt={2}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
    </div>
  );
};

export default DashboardPage;
