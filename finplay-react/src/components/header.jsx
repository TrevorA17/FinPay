import React from 'react';
import { Box } from '@mui/material';

const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#8833da',  // Blue background
        color: '#fff',              // White text
        width: '260px',              // Full width
        height: '125px',             // Fixed height for the header
        display: 'flex',            // Flex container
        alignItems: 'center',       // Center text vertically
        justifyContent: 'center',   // Center text horizontally
        position: 'fixed',          // Fix the header's position
        top: 0,                     // Align it to the top
        left: 0,                    // Align it to the left
        zIndex: 1000,               // Ensure the header is above other elements
        borderTopRightRadius: '15px', // Rounded corner on the top-right
      }}
    >
      <h1 style={{ margin: 0, fontSize: '30px', fontWeight: 'bold' }}>FinPay</h1>
    </Box>
  );
};

export default Header;
