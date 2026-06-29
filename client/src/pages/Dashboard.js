import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <p>Welcome to JobHub 🚀</p>
    </div>
  );
}

export default Dashboard;