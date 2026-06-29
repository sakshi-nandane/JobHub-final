import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditJob() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);

      setTitle(res.data.title);
      setCompany(res.data.company);
      setLocation(res.data.location);
      setDescription(res.data.description);
    } catch (error) {
      console.log(error);
    }
  };

  const updateJob = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/jobs/${id}`, {
        title,
        company,
        location,
        description,
      });

      alert("Job Updated Successfully");

      navigate("/jobs");
    } catch (error) {
      alert("Update Failed");
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Job</h2>

      <form onSubmit={updateJob}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-warning"
        >
          Update Job
        </button>
      </form>
    </div>
  );
}

export default EditJob;