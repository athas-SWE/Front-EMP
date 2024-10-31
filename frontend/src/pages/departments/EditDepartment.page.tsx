import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import httpModule from "../../helpers/http.module";
import { ICreateDepartmentDto } from "../../types/global.typing";

const EditDepartment = () => {
  const [department, setDepartment] = useState<ICreateDepartmentDto>({
    name: "",
    code: "",
  });
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the department details by ID
    httpModule
      .get(`/Department/Get/${id}`)
      .then((response) => {
        if (response.data) {
          setDepartment(response.data);
        } else {
          alert("Department not found");
          navigate("/departments"); // Redirect if not found
        }
      })
      .catch((error) => {
        console.log("Error fetching department:", error);
        alert("Error fetching department details");
      });
  }, [id, navigate]);

  const handleSave = () => {
    if (department.name === "" || department.code === "") {
      alert("Please fill all fields");
      return;
    }

    // Log the department being updated
    console.log("Updating department:", department);

    httpModule
      .put(`/Department/Update/${id}`, department)
      .then(() => {
        alert("Department updated successfully");
        navigate("/departments");
      })
      .catch((error) => {
        console.log(
          "Error updating department:",
          error.response?.data || error.message
        );
        alert("Error updating department");
      });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "50vh" }}
    >
      <Paper elevation={3} className="edit-department-container">
        <Typography variant="h4" align="center" gutterBottom>
          Edit Department
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
              onClick={handleSave}
              style={{ width: "48%" }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/departments")}
              style={{ width: "48%" }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default EditDepartment;
