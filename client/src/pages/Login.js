import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login Response:", res.data);

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      console.log(
        "Saved Token:",
        localStorage.getItem("token")
      );

      console.log(
        "Saved User:",
        localStorage.getItem("user")
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {
      console.log("Login Error:", error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          className="btn btn-primary"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;