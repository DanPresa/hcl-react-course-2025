import { Outlet } from 'react-router';
import { Box } from '@mui/system';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <Box>
      {/* Navbar */}
      <Navbar />

      {/* Main Content (Dynamic Pages) */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
