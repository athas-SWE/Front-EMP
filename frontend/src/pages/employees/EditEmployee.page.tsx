import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { Save, Cancel } from "@mui/icons-material";
import httpModule from "../../helpers/http.module";
import { ICreateEmployeeDto } from "../../types/global.typing";

const EditEmployee = () => {
  const [employee, setEmployee] = useState<ICreateEmployeeDto>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    salary: 0,
    department: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    salary: "",
  });
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    httpModule
      .get(`/Employee/Get/${id}`)
      .then((response) => {
        if (response.data) {
          setEmployee(response.data);
        } else {
          alert("Employee not found");
          navigate("/employees");
        }
      })
      .catch((error) => {
        console.log("Error fetching employee:", error);
        alert("Error fetching employee details");
      });
  }, [id, navigate]);

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    let valid = true;

    if (!emailRegex.test(employee.email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }

    if (!phoneRegex.test(employee.phone)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Phone number should be 10 digits",
      }));
      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }

    if (employee.salary <= 0) {
      setErrors((prev) => ({
        ...prev,
        salary: "Salary must be a positive number",
      }));
      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, salary: "" }));
    }

    return valid;
  };

  const handleSave = () => {
    if (!validateFields()) return;

    httpModule
      .put(`/Employee/Update/${id}`, employee)
      .then(() => {
        alert("Employee updated successfully");
        navigate("/employees");
      })
      .catch((error) => {
        console.log("Error updating employee:", error);
        alert("Error updating employee");
      });
  };

  return (
    <div className="content">
      <Card
        className="edit-employee-card"
        sx={{ maxWidth: 600, margin: "auto", padding: 3, mt: 4, boxShadow: 5 }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Edit Employee
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                fullWidth
                variant="outlined"
                value={employee.firstName}
                onChange={(e) =>
                  setEmployee({ ...employee, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                fullWidth
                variant="outlined"
                value={employee.lastName}
                onChange={(e) =>
                  setEmployee({ ...employee, lastName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                value={employee.email}
                error={!!errors.email}
                helperText={errors.email}
                onChange={(e) =>
                  setEmployee({ ...employee, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                fullWidth
                variant="outlined"
                value={employee.phone}
                error={!!errors.phone}
                helperText={errors.phone}
                onChange={(e) =>
                  setEmployee({ ...employee, phone: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Date of Birth"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={employee.dateOfBirth}
                onChange={(e) =>
                  setEmployee({ ...employee, dateOfBirth: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Salary"
                fullWidth
                variant="outlined"
                value={employee.salary}
                error={!!errors.salary}
                helperText={errors.salary}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    salary: parseInt(e.target.value, 10) || 0,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Department"
                fullWidth
                variant="outlined"
                value={employee.department}
                onChange={(e) =>
                  setEmployee({ ...employee, department: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <div
            className="btn-group"
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="outlined" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/employees")}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditEmployee;
