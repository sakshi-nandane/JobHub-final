import { useEffect, useState } from "react";
import API from "../services/api";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        "/applications/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Applications</h2>

      {applications.length === 0 ? (
        <h5>No Applications Found</h5>
      ) : (
        applications.map((app) => (
          <div
            key={app._id}
            className="card p-4 mb-4 shadow-sm"
          >
            <h3>
              {app.job?.title}
            </h3>

            <h5 className="text-secondary">
              {app.job?.company}
            </h5>

            <p>
              <strong>Location:</strong>{" "}
              {app.job?.location}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`badge ${
                  app.status === "Selected"
                    ? "bg-success"
                    : app.status === "Rejected"
                    ? "bg-danger"
                    : app.status ===
                      "Interview Scheduled"
                    ? "bg-primary"
                    : app.status ===
                      "Shortlisted"
                    ? "bg-warning text-dark"
                    : "bg-secondary"
                }`}
              >
                {app.status}
              </span>
            </p>

            <p>
              <strong>Applied On:</strong>{" "}
              {new Date(
                app.createdAt
              ).toLocaleDateString()}
            </p>

            {app.resume && (
              <a
                href={`http://localhost:5000/uploads/${app.resume}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-primary"
              >
                View Resume
              </a>

              
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyApplications;