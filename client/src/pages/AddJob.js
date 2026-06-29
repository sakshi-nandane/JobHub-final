import { useState } from "react";
import API from "../services/api";

function AddJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.post("/jobs", {
        title,
        company,
        location,
        description,
      });

      alert("Job Added Successfully");

      setTitle("");
      setCompany("");
      setLocation("");
      setDescription("");

    } catch (error) {
      alert("Failed to add job");
    }
  };

  return (
    <div className="container mt-5">

      <h2>Add New Job</h2>

      <form onSubmit={submitHandler}>

        <input
          type="text"
          placeholder="Job Title"
          className="form-control mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Company"
          className="form-control mb-3"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          className="form-control mb-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="form-control mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="btn btn-success"
          type="submit"
        >
          Add Job
        </button>

      </form>

    </div>
  );
}

export default AddJob;