import { useEffect, useState } from "react";
import API from "../services/api";

function AdminApplications() {
  const [applications, setApplications] =
    useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get(
        "/admin/applications"
      );

      setApplications(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await API.put(
        `/applications/${id}/status`,
        { status }
      );

      fetchApplications();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">

      <h2>
        Manage Applications
      </h2>

      <table className="table">

        <thead>
          <tr>
            <th>Applicant</th>
            <th>Job</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {applications.map((app) => (
            <tr key={app._id}>

              <td>{app.name}</td>

              <td>
                {app.job?.title}
              </td>

              <td>

                <select
                  value={app.status}
                  onChange={(e) =>
                    updateStatus(
                      app._id,
                      e.target.value
                    )
                  }
                >

                  <option>
                    Applied
                  </option>

                  <option>
                    Shortlisted
                  </option>

                  <option>
                    Interview Scheduled
                  </option>

                  <option>
                    Selected
                  </option>

                  <option>
                    Rejected
                  </option>

                </select>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AdminApplications;