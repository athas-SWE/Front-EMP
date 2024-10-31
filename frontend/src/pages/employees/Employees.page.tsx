import { useEffect, useState } from "react";
import "./employees.scss";
import httpModule from "../../helpers/http.module";
import { IEmployee } from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import EmployeesGrid from "../../components/employee/EmployeesGrid.component";

const Employees = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    setLoading(true);
    httpModule
      .get<IEmployee[]>("/Employee/Get")
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error fetching Employee");
        console.error(error);
        setLoading(false);
      });
  };

  const handleDelete = (id: string) => {
    // Accept id as string
    httpModule
      .delete(`/Employee/Delete/${id}`)
      .then(() => {
        fetchEmployees(); // Refresh the department list
      })
      .catch((error) => {
        alert("Error deleting Employee");
        console.error(error);
      });
  };

  return (
    <div className="content employees">
      <div className="heading">
        <h2>Employees</h2>
        <Button variant="outlined" onClick={() => redirect("/employees/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : employees.length === 0 ? (
        <h1>No Employee</h1>
      ) : (
        <EmployeesGrid data={employees} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Employees;
