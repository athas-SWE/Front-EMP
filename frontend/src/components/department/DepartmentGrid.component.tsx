// DepartmentsGrid.component.tsx

import "./departments-grid.scss";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import { IDepartment } from "../../types/global.typing";
import { useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";

interface IDepartmentsGridProps {
  data: IDepartment[];
  onDelete: (id: string) => void; // Ensure this is a string
}

const DepartmentsGrid = ({ data, onDelete }: IDepartmentsGridProps) => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "code", headerName: "Code", width: 150 },
    {
      field: "createdAt",
      headerName: "Creation Time",
      width: 200,
      renderCell: (params) => moment(params.row.createdAt).format("YYYY-MM-DD"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="actions">
          <IconButton
            onClick={() => navigate(`/departments/edit/${params.row.id}`)}
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
    <Box sx={{ width: "100%", height: 450 }} className="departments-grid">
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.id} // Ensure this correctly maps to your data
        rowHeight={50}
      />
    </Box>
  );
};

export default DepartmentsGrid;
