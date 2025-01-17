import React, { useState } from "react";
import Sidebar from "./Sidebar";  // import your Sidebar component

// Import content components
import DashboardContent from "../pages/DashboardContent"; 
import InvoicesContent from "../pages/Invoices";   
import CardsContent from "../pages/Cards";         
import WalletsContent from "../pages/Wallets";     
import TransactionsContent from "../pages/Transactions"; 

const DashboardLayout = () => {
  const [selectedContent, setSelectedContent] = useState("Dashboard"); // Default selected content

  const handleMenuItemClick = (index) => {
    // Mapping index to corresponding content
    const contentMapping = [
      "Dashboard",       // Index 0
      "Invoices",        // Index 1
      "Cards",           // Index 2
      "Wallets",         // Index 3
      "Transactions",    // Index 4
    ];
    setSelectedContent(contentMapping[index]);
  };

  const renderContent = () => {
    switch (selectedContent) {
      case "Dashboard":
        return <DashboardContent />;
      case "Invoices":
        return <InvoicesContent />;
      case "Cards":
        return <CardsContent />;
      case "Wallets":
        return <WalletsContent />;
      case "Transactions":
        return <TransactionsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
   
      <Sidebar onMenuItemClick={handleMenuItemClick} />
      
      
  );
};

export default DashboardLayout;
