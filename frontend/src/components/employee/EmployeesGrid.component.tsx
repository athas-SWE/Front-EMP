import "./employees-grid.scss";
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models";
import moment from "moment";
import React from "react";
import { IEmployee } from "../../types/global.typing";
import { useNavigate } from "react-router-dom";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

const calculateAge = (dob: string) => {
  const today = moment();
  const birthDate = moment(dob);
  return today.diff(birthDate, "years");
};

interface IEmployeesGridProps {
  data: IEmployee[];
  onDelete: (id: string) => void;
}

const EmployeesGrid = ({ data, onDelete }: IEmployeesGridProps) => {
  const navigate = useNavigate();

  const column: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "firstName", headerName: "First Name", width: 120 },
    { field: "lastName", headerName: "Last Name", width: 120 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "dateOfBirth", headerName: "Date of Birth", width: 150 },
    {
      field: "age",
      headerName: "Age",
      width: 100,
      valueGetter: (params) => calculateAge(params.row.dateOfBirth),
    },
    { field: "salary", headerName: "Salary", width: 120 },
    { field: "department", headerName: "Department", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="actions">
          <IconButton
            onClick={() => navigate(`/employees/edit/${params.row.id}`)}
          >
            <Edit />
          </IconButton>
          <IconButton onClick={() => onDelete(params.row.id.toString())}>
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <Box sx={{ width: "100%", height: 450 }} className="jobs-grid">
        <DataGrid
          rows={data}
          columns={column}
          getRowId={(row) => row.id}
          rowHeight={50}
        />
      </Box>
    </>
  );
};

export default EmployeesGrid;
