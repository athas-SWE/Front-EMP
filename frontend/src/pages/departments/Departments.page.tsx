// Departments.page.tsx

import { useEffect, useState } from "react";
import "./departments.scss";
import httpModule from "../../helpers/http.module";
import { IDepartment } from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DepartmentsGrid from "../../components/department/DepartmentGrid.component"; // Correct component import

const Departments = () => {
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    setLoading(true);
    httpModule
      .get<IDepartment[]>("/Department/Get")
      .then((response) => {
        setDepartments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error fetching departments");
        console.error(error);
        setLoading(false);
      });
  };

  const handleDelete = (id: string) => {
    // Accept id as string
    httpModule
      .delete(`/Department/Delete/${id}`)
      .then(() => {
        fetchDepartments(); // Refresh the department list
      })
      .catch((error) => {
        alert("Error deleting department");
        console.error(error);
      });
  };

  return (
    <div className="content companies">
      <div className="heading">
        <h2>Departments</h2>
        <Button variant="outlined" onClick={() => navigate("/departments/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : departments.length === 0 ? (
        <h1>No Departments Found</h1>
      ) : (
        <DepartmentsGrid data={departments} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Departments;
