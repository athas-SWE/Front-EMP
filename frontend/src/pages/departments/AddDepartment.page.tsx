import { useState } from "react";
import "./departments.scss";
import { ICreateDepartmentDto } from "../../types/global.typing";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";

const AddDepartment = () => {
  const [department, setDepartment] = useState<ICreateDepartmentDto>({
    name: "",
    code: "",
  });
  const redirect = useNavigate();

  const handleClickSaveBtn = () => {
    if (department.name === "" || department.code === "") {
      alert("Please fill all fields");
      return;
    }
    httpModule
      .post("/Department/Create", department)
      .then(() => redirect("/departments"))
      .catch((error) => console.log(error));
  };

  const handleClickBackBtn = () => {
    redirect("/departments");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "50vh" }}
    >
      <Paper elevation={3} className="add-department-container">
        <Typography variant="h4" align="center" gutterBottom>
          Add New Department
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              autoComplete="off"
              label="Department Name"
              variant="outlined"
              value={department.name}
              onChange={(e) =>
                setDepartment({ ...department, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Department Code</InputLabel>
              <Select
                value={department.code}
                label="Department Code"
                onChange={(e) =>
                  setDepartment({ ...department, code: e.target.value })
                }
              >
                <MenuItem value="IT1010">IT1010</MenuItem>
                <MenuItem value="IT2020">IT2020</MenuItem>
                <MenuItem value="IT3030">IT3030</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} container justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickSaveBtn}
              style={{ width: "48%" }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClickBackBtn}
              style={{ width: "48%" }}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default AddDepartment;
