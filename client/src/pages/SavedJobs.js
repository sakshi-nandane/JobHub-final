import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function SavedJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const res = await API.get("/jobs/saved/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(res.data);
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Unable to fetch saved jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        Saved Jobs
      </h2>

      {loading ? (
        <h4>Loading...</h4>
      ) : jobs.length === 0 ? (
        <h5>No Saved Jobs</h5>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="card p-3 mb-3 shadow-sm"
          >
            <h4>{job.title}</h4>

            <h6 className="text-muted">
              {job.company}
            </h6>

            <p>{job.location}</p>

            <p>{job.description}</p>

            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/jobs/${job._id}`)
              }
            >
              Apply Now
            </button>
          </div>
        ))
      )}

    </div>
  );
}

export default SavedJobs;