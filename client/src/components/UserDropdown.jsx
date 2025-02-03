import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api/userApi";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const UserDropdown = ({ onSelect }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      const userData = await fetchUsers();
      setUsers(userData);
    };

    loadUsers();
  }, []);

  const handleChange = (event) => {
    const userId = event.target.value;
    setSelectedUser(userId);
    onSelect(userId); // Pass selected user ID to parent
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Select User</InputLabel>
      <Select value={selectedUser} onChange={handleChange}>
        {users.map((user) => (
          <MenuItem key={user._id} value={user._id}>
            {user.fullName} ({user.email})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UserDropdown;
