import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, CheckCircle, LogOut, Plus } from "lucide-react";
import "./Admin.css";

export default function Admin() {

  /* ================= ADMIN LOGIN ================= */
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("admin") === "true"
  );

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const ADMIN_ID = "admin";
  const ADMIN_PASS = "12345";


  /* ================= JOB STATES ================= */
  const [jobs, setJobs] = useState([]);

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full Time",
    description: "",
  });


  /* ================= FETCH JOBS ================= */
  const fetchJobs = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/jobs/");
    setJobs(res.data);
  };

  useEffect(() => {
    if (isAdmin) fetchJobs();
  }, [isAdmin]);


  /* ================= LOGIN ================= */
  const handleLogin = (e) => {
    e.preventDefault();

    if (
      loginData.username === ADMIN_ID &&
      loginData.password === ADMIN_PASS
    ) {
      localStorage.setItem("admin", "true");
      setIsAdmin(true);
      alert("Admin Login Success ✅");
    } else {
      alert("Wrong Admin ID or Password ❌");
    }
  };


  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("admin");
    setIsAdmin(false);
  };


  /* ================= CREATE JOB ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://127.0.0.1:8000/api/jobs/create/",
      job
    );

    alert("Job Posted 🚀");

    setJob({
      title: "",
      company: "",
      location: "",
      salary: "",
      type: "Full Time",
      description: "",
    });

    fetchJobs();
  };


  /* ================= DELETE ================= */
  const deleteJob = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/jobs/${id}/delete/`);
    fetchJobs();
  };


  /* ================= SOLD OUT ================= */
  const markClosed = async (id) => {
    await axios.patch(`http://127.0.0.1:8000/api/jobs/${id}/close/`);
    fetchJobs();
  };


  /* ================= LOGIN SCREEN ================= */
  if (!isAdmin) {
    return (
      <div className="admin-login">
        <form onSubmit={handleLogin} className="login-box">
          <h2>🔐 Admin Login</h2>

          <input
            placeholder="Admin ID"
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />

          <button>Login</button>
        </form>
      </div>
    );
  }


  /* ================= DASHBOARD ================= */
  return (
    <div className="admin-container">

      {/* HEADER */}
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button onClick={logout} className="logout">
          <LogOut size={18} /> Logout
        </button>
      </div>


      {/* CREATE JOB */}
      <form className="job-form" onSubmit={handleSubmit}>

        <h3><Plus size={18}/> Post New Job</h3>

        <input
          placeholder="Title"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />

        <input
          placeholder="Company"
          value={job.company}
          onChange={(e) => setJob({ ...job, company: e.target.value })}
        />

        <input
          placeholder="Location"
          value={job.location}
          onChange={(e) => setJob({ ...job, location: e.target.value })}
        />

        <input
          placeholder="Salary"
          value={job.salary}
          onChange={(e) => setJob({ ...job, salary: e.target.value })}
        />

        {/* Dropdown */}
        <select
          value={job.type}
          onChange={(e) => setJob({ ...job, type: e.target.value })}
        >
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Internship</option>
          <option>Remote</option>
          <option>Contract</option>
        </select>

        <textarea
          placeholder="Description"
          value={job.description}
          onChange={(e) => setJob({ ...job, description: e.target.value })}
        />

        <button className="post-btn">Post Job</button>
      </form>


      {/* JOB LIST */}
      <div className="job-list">

        <h3>Posted Jobs</h3>

        {jobs.map((item) => (
          <div key={item.id} className="job-card">

            <div>
              <h4>{item.title}</h4>
              <p>{item.company} • {item.location}</p>
              <span className="type">{item.type}</span>
            </div>

            <div className="actions">
              <button onClick={() => markClosed(item.id)}>
                <CheckCircle size={18}/>
              </button>

              <button onClick={() => deleteJob(item.id)}>
                <Trash2 size={18}/>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
