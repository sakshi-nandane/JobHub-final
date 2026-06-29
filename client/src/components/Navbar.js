import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          JobHub
        </Link>

        <div className="d-flex gap-2 flex-wrap">

          <Link
            className="btn btn-outline-light"
            to="/jobs"
          >
            Jobs
          </Link>

          {token ? (
            <>
              <Link
                className="btn btn-success"
                to="/add-job"
              >
                Add Job
              </Link>

              <Link
                className="btn btn-success"
                to="/my-applications"
              >
                My Applications
              </Link>

              <Link
  className="btn btn-info"
  to="/profile"
>
  Profile
</Link>

<Link
  to="/saved-jobs"
  className="btn btn-secondary"
>
  Saved Jobs
</Link>
              <button
                className="btn btn-danger"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="btn btn-outline-light"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="btn btn-warning"
                to="/register"
              >
                Register
              </Link>

              
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;