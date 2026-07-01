import { useEffect, useState } from "react";
import { searchJobs } from "../api/jobsApi";
import "../styles/jobs.css";

function Jobs() {
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

  return (
    <div className="jobs-container">
      <h2 className="jobs-title">Find Your Dream Job</h2>

      <div className="search-box row">

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
              {job.title}
            </h3>

            <h5 className="company-name">
              {job.company}
            </h5>

            <p className="location">
              {job.location}
            </p>

            <span className="badge-job">
              Full Time
            </span>

            <p className="salary">
              {job.description}
            </p>

            <button
              className="apply-btn"
              disabled
            >
              Apply
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Jobs;