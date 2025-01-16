import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import WalletIcon from '@mui/icons-material/Wallet';
import TransactionIcon from '@mui/icons-material/AccountBalanceWallet';

const Sidebar = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#7733da', // Sidebar color
        color: '#fff',              // White text
        width: '280px',             // Sidebar width
        height: '425px', // Height of the sidebar, taking space below the header 
        position: 'fixed',          // Fix the sidebar in place
        top: '150px',                // Position it below the header
        left: 0,                    // Align to the left of the screen
        paddingTop: '15px',         // Top padding for spacing
        borderBottomRightRadius: '15px', // Rounded corner on the bottom-right
        display: 'flex',            // Flexbox for aligning content
        flexDirection: 'column',    // Stack items vertically
        alignItems: 'center',       // Center horizontally
      }}
    >
      <List sx={{ width: '100%' }}>
        <ListItemButton
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
        >
          <ListItemIcon sx={{ color: '#fff', justifyContent: 'center' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ textAlign: 'left' }} />
        </ListItemButton>
        <ListItemButton
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
        >
          <ListItemIcon sx={{ color: '#fff', justifyContent: 'center' }}>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Invoices" sx={{ textAlign: 'left' }} />
        </ListItemButton>
        <ListItemButton
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
        >
          <ListItemIcon sx={{ color: '#fff', justifyContent: 'center' }}>
            <CreditCardIcon />
          </ListItemIcon>
          <ListItemText primary="Cards" sx={{ textAlign: 'left' }} />
        </ListItemButton>
        <ListItemButton
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
        >
          <ListItemIcon sx={{ color: '#fff', justifyContent: 'center' }}>
            <WalletIcon />
          </ListItemIcon>
          <ListItemText primary="Wallets" sx={{ textAlign: 'left' }} />
        </ListItemButton>
        <ListItemButton
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
        >
          <ListItemIcon sx={{ color: '#fff', justifyContent: 'center' }}>
            <TransactionIcon />
          </ListItemIcon>
          <ListItemText primary="Transactions" sx={{ textAlign: 'left' }} />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
