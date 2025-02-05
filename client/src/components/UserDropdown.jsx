import React, { useEffect, useState } from "react";
import { fetchLoggedInUser } from "../api/userApi";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const UserDropdown = ({ onSelect }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await fetchLoggedInUser();
      if (userData) {
        setUser(userData);
        onSelect(userData._id); // Automatically select the logged-in user
      }
    };

    loadUser();
  }, [onSelect]);

  return (
    <FormControl fullWidth>
      <InputLabel>User</InputLabel>
      <Select value={user ? user._id : ""} disabled>
        {user && (
          <MenuItem key={user._id} value={user._id}>
            {user.fullName} ({user.email})
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default UserDropdown;
