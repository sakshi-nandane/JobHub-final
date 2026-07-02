import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    alert("Unable to load job details");
  }
};

  const applyJob = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return navigate("/login");
      }

      if (!name || !email || !phone) {
        return alert("Please fill all fields");
      }

      if (!resume) {
        return alert("Please upload your resume");
      }

      const formData = new FormData();

      formData.append("jobId", id);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("resume", resume);

      await API.post("/applications", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Application Submitted Successfully ✅");

      setName("");
      setEmail("");
      setPhone("");
      setResume(null);

      navigate("/my-applications");

    } catch (error) {
      console.log(error);

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
      <div className="card shadow p-4">

        <h2>
  {job.title || job.job_title}
</h2>

<h5>
  {(job.company || job.employer_name)} -
  {" "}
  {job.location ||
    `${job.job_city || ""}, ${job.job_state || ""}, ${job.job_country || ""}`}
</h5>

<p>
  {job.description || job.job_description}
</p>

        <h4 className="mb-3">
          Apply for this Job
        </h4>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label className="form-label">
          Upload Resume (PDF)
        </label>

        <input
          type="file"
          accept=".pdf"
          className="form-control mb-4"
          onChange={(e) =>
            setResume(e.target.files[0])
          }
        />

        <button
          className="btn btn-primary w-100"
          onClick={applyJob}
        >
          Apply Now
        </button>

      </div>
    </div>
  );
}

export default JobDetails;