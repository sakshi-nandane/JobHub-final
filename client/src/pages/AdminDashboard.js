import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    jobs: 0,
    users: 0,
    applications: 0,
    recentApplications: [],
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        Admin Dashboard
      </h2>

      <div className="row mb-5">

        <div className="col-md-4">
          <div className="card p-4 text-center">
            <h5>Total Jobs</h5>
            <h1>{stats.jobs}</h1>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-4 text-center">
            <h5>Total Users</h5>
            <h1>{stats.users}</h1>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-4 text-center">
            <h5>Total Applications</h5>
            <h1>{stats.applications}</h1>
          </div>
        </div>

      </div>

      <h3 className="mb-3">
        Recent Applications
      </h3>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>#</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Applied On</th>
          </tr>
        </thead>

        <tbody>
          {stats.recentApplications.map(
            (app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>

                <td>
                  {app.job?.title}
                </td>

                <td>
                  {app.job?.company}
                </td>

                <td>
                  {new Date(
                    app.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            )
          )}
        </tbody>

      </table>

    </div>
  );
}

export default AdminDashboard;