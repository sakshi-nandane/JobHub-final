import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

function SavedJobs() {
  const [jobs, setJobs] =
    useState([]);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.get(
            "/jobs/saved/me",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setJobs(res.data);

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="container mt-5">

      <h2>
        Saved Jobs
      </h2>

      {jobs.length === 0 ? (
        <h5>
          No Saved Jobs
        </h5>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="card p-3 mb-3"
          >
            <h4>
              {job.title}
            </h4>

            <h6>
              {job.company}
            </h6>

            <p>
              {job.location}
            </p>
          </div>
        ))
      )}

    </div>
  );
}

export default SavedJobs;