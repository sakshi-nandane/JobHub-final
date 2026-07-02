import { useEffect, useState } from "react";
import { searchJobs } from "../api/jobsApi";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/jobs.css";

function Jobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchJobs();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [title, location]);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const data = await searchJobs(title, location);

      setJobs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveJob = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return navigate("/login");
      }

      await API.put(
        `/jobs/${id}/save`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job Saved Successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to save job"
      );
    }
  };

  const applyJob = (job) => {
  if (job.isRapid) {
    window.open(job.applyLink, "_blank");
  } else {
    navigate(`/jobs/${job._id}`);
  }
};

  return (
    <div className="jobs-container">

      <h2 className="jobs-title">
        Find Your Dream Job
      </h2>

      <div className="search-box row">

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search Job Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />
        </div>

        <div className="col-md-2">
          <button
            className="search-btn w-100"
            onClick={fetchJobs}
          >
            Search
          </button>
        </div>

      </div>

      {loading ? (
        <h5>Loading Jobs...</h5>
      ) : jobs.length === 0 ? (
        <h5>No Jobs Found</h5>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="job-card"
          >

            <h3 className="job-title">
  {job.title || job.job_title}
</h3>

<h5 className="company-name">
  {job.company || job.employer_name}
</h5>

<p className="location">
  {job.location ||
    `${job.job_city || ""}, ${job.job_state || ""}, ${job.job_country || ""}`}
</p>

<span className="badge-job">
  {job.jobType || job.job_employment_type || "Full Time"}
</span>

<p className="salary">
  {job.description
    ? job.description.substring(0, 180) + "..."
    : "No Description"}
</p>

            <div className="d-flex gap-2 mt-3">

              <button
  className="btn btn-success"
  onClick={() => applyJob(job)}
>
  Apply
</button>

{!job.isRapid && (
  <button
    className="btn btn-outline-primary"
    onClick={() => saveJob(job._id)}
  >
    Save
  </button>
)}

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default Jobs;