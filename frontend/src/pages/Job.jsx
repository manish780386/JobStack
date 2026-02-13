import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Job.css";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Job() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { token, user } = useContext(AuthContext);

  /* ================= COMPANY FILTER FROM URL ================= */
  const params = new URLSearchParams(location.search);
  const companyFilter = params.get("company");

  /* ================= FETCH JOBS ================= */
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/jobs/")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      });

    if (user) {
      const savedJobs =
        JSON.parse(localStorage.getItem(`saved_${user.username}`)) || [];
      setSaved(savedJobs);
    }
  }, [user]);

  /* ================= SAVE JOB ================= */
  const saveJob = (job) => {

    if (!token) {
      alert("Login first ❌");
      navigate("/login");
      return;
    }

    // prevent duplicate save
    if (saved.find((j) => j.id === job.id)) return;

    const updated = [...saved, job];

    setSaved(updated);
    localStorage.setItem(`saved_${user.username}`, JSON.stringify(updated));
  };

  /* ================= APPLY JOB ================= */
  const applyJob = (job) => {

    if (!token) {
      alert("Login first to apply ❌");
      navigate("/login");
      return;
    }

    navigate("/apply", { state: job });
  };

  /* ================= FINAL FILTER (SEARCH + COMPANY) ================= */
  const filteredJobs = jobs.filter((job) => {

    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase());

    const matchesCompany =
      companyFilter ? job.company === companyFilter : true;

    return matchesSearch && matchesCompany;
  });

  /* ================= UI ================= */
  return (
    <div className="job-page">

      {/* HEADER */}
      <div className="job-header">

        <h1>
          {companyFilter
            ? `${companyFilter} Jobs`
            : "Find Your Dream Job 🚀"}
        </h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search jobs..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </div>

      {/* JOB LIST */}
      <div className="job-list">

        {loading && <p>Loading jobs...</p>}

        {!loading && filteredJobs.length === 0 && (
          <p>No jobs found ❌</p>
        )}

        {filteredJobs.map((job) => {

          const isSaved = saved.find((j) => j.id === job.id);

          return (
            <div key={job.id} className="job-card">

              <div className="job-info">
                <h3>{job.title}</h3>
                <p className="company">{job.company}</p>
                <p>{job.location}</p>
                <p>{job.salary}</p>
                <span className="tag">{job.type}</span>
              </div>

              <div className="job-actions">

                <button
                  className="apply-btn"
                  onClick={() => applyJob(job)}
                >
                  Apply Now
                </button>

                <button
                  className="save-btn"
                  style={{ color: isSaved ? "red" : "black" }}
                  onClick={() => saveJob(job)}
                >
                  ❤
                </button>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
