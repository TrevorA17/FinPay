import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // index
  const [limit, setLimit] = useState(20); // Default page size
  const [totalCustomers, setTotalCustomers] = useState(0); // Total count from API

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.dev.zed.business/api/customers_list?page=${page}&limit=${limit}`,
        {
          headers: {
            "x-authorization":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub2IiOnsidmFsdWUiOjUwLCJzdGF0ZSI6ZmFsc2V9LCJ2b2NiIjpmYWxzZSwidXNlcklkIjoiNjM4ZDg4MmUwMjEwZTBiZTNmOTAyZmZiIiwiaWQiOiI2MzhkODgyZTAyMTBlMGJlM2Y5MDJmZmIiLCJlbWFpbCI6Im5yaWNoYXJkbXdhbmdpKzE4QGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiTXdhbmdpIiwiZ3JvdXAiOiJNZXJjaGFudCIsImJpZCI6IjkwMDEyNjEiLCJicmFuY2hJZCI6IjY0OWVhNjAxODlkOTMyMDZmZmZiYzE5YiIsImJpZFN0cmluZyI6IjY0OWVhNjAxODlkOTMyMDZmZmZiYzE5OSIsImJ1c2luZXNzTmFtZSI6IkFRVUEgSEFSRFdBUkUgIiwiYnVzaW5lc3NPd25lclBob25lIjoiKzI1NDcyNzU4OTI2MSIsImJ1c2luZXNzT3duZXJBZGRyZXNzIjoiWWF5YSBDZW50cmUiLCJidWxrVGVybWluYWxzIjpbIjk4MjgyMjIwMDAwMTQ2Il0sInNlc3Npb25FeHBpcnkiOiIyMDI1LTA2LTMwVDA0OjI3OjI0LjExOVoiLCJUaWxsIjoiVm9vbWE6IDUyMjUzMyBBY2M6IDg1ODg4IiwiUGF5YmlsbCI6IiIsIlZvb21hIjoiIiwiRXF1aXRlbCI6IiIsInplZEFjY291bnRpbmdJZCI6IjI2OSIsIndhcmVob3VzZU9uIjp0cnVlLCJsb2NhbEN1cnJlbmN5IjoiS0VTIiwicGFydG5lck5hbWUiOnsiX2lkIjoiNjM4ZDg4MmUwMjEwZTBiZTNmOTAyZmZiIn0sImlhdCI6MTczOTI1NzY0NCwiZXhwIjoxNzUxMjU3NjQ0fQ.yIZQ2yOLT0pXZmzhJK2RNvfZZ70IqxFJIHnOvPZHlo8",
          },
        }
      );

      if (response.data.Status === "SUCCESS") {
        const total = response.data.totalCount || 100; // Total customer count

        const formattedCustomers = response.data.data.map((customer) => ({
          id: customer._id,
          customerName: customer.customerName,
          customerType: customer.customerType,
          email: customer.email,
          mobileNumber: customer.mobileNumber,
          physicalAddress: customer.physicalAddress,
          status: customer.status,
          pendingInvoices: customer.pendingInvoices,
          pendingAmount: customer.pendingAmount,
        }));

        setCustomers(formattedCustomers);
        setTotalCustomers(total);
      } else {
        throw new Error("Failed to fetch customers");
      }
    } catch (err) {
      setError("Error fetching customer data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, limit]); // Re-fetch when `limit` (rows per page) changes

  const pageSizeOptions = [10, 20, 50, 100]; // Ensure limit is in options

  //DataGrid
  return (
    <Box sx={{ height: 500, width: "100%", padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Customer List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <DataGrid
          rows={customers}
          columns={[
            { field: "customerName", headerName: "Customer Name", flex: 1 },
            { field: "customerType", headerName: "Type", flex: 1 },
            { field: "email", headerName: "Email", flex: 1 },
            { field: "mobileNumber", headerName: "Mobile Number", flex: 1 },
            { field: "physicalAddress", headerName: "Address", flex: 1 },
            { field: "status", headerName: "Status", flex: 1 },
            {
              field: "pendingInvoices",
              headerName: "Pending Invoices",
              flex: 1,
            },
            { field: "pendingAmount", headerName: "Pending Amount", flex: 1 },
          ]}
          pagination
          paginationMode="client"
          rowCount={totalCustomers} //  Ensure correct total row count
          pageSize={limit} // Controlled state for page size
          onPageChange={(newPage) => setPage(newPage)} // page handling
          onPageSizeChange={(newPageSize) => {
            setLimit(newPageSize); //  Update page size
            setPage(0); // Reset page to avoid issues
          }}
          pageSizeOptions={pageSizeOptions} // Ensure `limit` is valid
        />
      )}
    </Box>
  );
};

export default CustomerList;
