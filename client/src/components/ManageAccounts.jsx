import React, { useState } from "react";
import UserDropdown from "./UserDropdown";
import AccountForm from "./AccountForm";
import { Container, Typography } from "@mui/material";

const ManageAccounts = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Manage User Accounts
      </Typography>
      <UserDropdown onSelect={setSelectedUserId} />
      {selectedUserId && <AccountForm userId={selectedUserId} />}
    </Container>
  );
};

export default ManageAccounts;
