import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);
      setJob(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const applyJob = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!name || !email || !phone) {
        return alert("Please fill all fields");
      }

      const formData = new FormData();

      formData.append("jobId", id);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);

      if (resume) {
        formData.append("resume", resume);
      }

      await API.post(
        "/applications",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Applied Successfully");

      setName("");
      setEmail("");
      setPhone("");
      setResume(null);

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Application Failed"
      );
    }
  };

  if (!job) {
    return (
      <div className="container mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <div className="card p-4">

        <h2>{job.title}</h2>

        <h5>
          {job.company} - {job.location}
        </h5>

        <hr />

        <p>{job.description}</p>

        <h4 className="mb-3">
          Application Form
        </h4>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />

        <div className="mb-3">
          <label className="form-label">
            Upload Resume (PDF)
          </label>

          <input
            type="file"
            className="form-control"
            accept=".pdf"
            onChange={(e) =>
              setResume(e.target.files[0])
            }
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={applyJob}
        >
          Apply Now
        </button>

      </div>

    </div>
  );
}

export default JobDetails;