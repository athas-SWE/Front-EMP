import "./home.scss";
import img2 from "./img.jpg";

const Home = () => {
  return (
    <div className="content home">
      <div className="header">
        <h1>Welcome to the Employee Management System</h1>
        <p>Manage employee data efficiently and effectively</p>
      </div>
      <div className="image-container">
        <img
          className="logo img mt-4"
          src={img2}
          style={{ width: "80%", borderRadius: "8px" }}
          alt="Employee Management"
        />
      </div>
      <div className="home-info">
        <h3>Key Features</h3>
        <ul>
          <li>Add, Edit, and Remove Employee Information</li>
          <li>View Employee Details and Statistics</li>
          <li>Organize Departments and Roles</li>
          <li>Track Performance and Attendance</li>
        </ul>
      </div>
      <div className="cta">
        <button className="btn-primary">Get Started</button>
        <button className="btn-secondary">View Reports</button>
      </div>
    </div>
  );
};

export default Home;
