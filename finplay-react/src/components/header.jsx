import React from 'react';
import { Box } from '@mui/material';

const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#1976d2',  // Blue background
        color: '#fff',              // White text
        width: '300px',             // Same width as the sidebar
        height: '149px',             // Fixed height for the header
        display: 'flex',            // Flex container
        alignItems: 'center',       // Center text vertically
        justifyContent: 'center',   // Center text horizontally
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.2)', // Subtle shadow
        position: 'fixed',          // Fix the header's position
        top: 0,                     // Align it to the top
        left: 0,                    // Align it to the left of the page
      }}
    >
      <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>FinPay</h1>
    </Box>
  );
};

export default Header;
