import { useState, useEffect } from "react";
import "./employees.scss";
import { ICreateEmployeeDto } from "../../types/global.typing";

import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
//import { ArrowBack, Save } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";

const AddEmployee = () => {
  const [employee, setEmployee] = useState<ICreateEmployeeDto>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    salary: 0,
    department: "",
  });
  const [age, setAge] = useState<number | null>(null);
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    salary: "",
  });

  const redirect = useNavigate();

  useEffect(() => {
    if (employee.dateOfBirth) {
      const birthDate = new Date(employee.dateOfBirth);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        calculatedAge--;
      }

      setAge(calculatedAge);
    } else {
      setAge(null);
    }
  }, [employee.dateOfBirth]);

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

  const handleClickSaveBtn = () => {
    if (!validateFields()) return;

    const newEmployeeFormData = new FormData();
    newEmployeeFormData.append("firstName", employee.firstName);
    newEmployeeFormData.append("lastName", employee.lastName);
    newEmployeeFormData.append("email", employee.email);
    newEmployeeFormData.append("phone", employee.phone);
    newEmployeeFormData.append("dateOfBirth", employee.dateOfBirth);
    newEmployeeFormData.append("salary", String(employee.salary));
    newEmployeeFormData.append("department", employee.department);

    httpModule
      .post("/Employee/Create", newEmployeeFormData)
      .then(() => redirect("/employees"))
      .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/employees");
  };

  return (
    <div className="content">
      <Card
        className="employee-card"
        sx={{ maxWidth: 600, margin: "auto", padding: 3, mt: 4, boxShadow: 5 }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add New Employee
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
                label="Age"
                fullWidth
                variant="outlined"
                value={age !== null ? age : ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickSaveBtn}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClickBackBtn}
            >
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEmployee;
