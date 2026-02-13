import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Company.css";

export default function Company() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState([]);

  /* ================= FETCH JOBS FROM BACKEND ================= */
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/jobs/")
      .then((res) => {

        const jobs = res.data;

        /* ===== AUTO GROUP BY COMPANY ===== */
        const grouped = {};

        jobs.forEach(job => {
          if (!grouped[job.company]) {
            grouped[job.company] = {
              name: job.company,
              location: job.location,
              jobs: 0
            };
          }
          grouped[job.company].jobs += 1;
        });

        setCompanies(Object.values(grouped));
      });
  }, []);

  /* ================= SEARCH ================= */
  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= VIEW JOBS ================= */
  const viewJobs = (companyName) => {
    navigate(`/jobs?company=${companyName}`);
  };

  return (
    <div className="company-page">

      {/* ===== HEADER ===== */}
      <div className="company-header">
        <h1>Top Hiring Companies 🏢</h1>

        <input
          type="text"
          placeholder="Search company..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ===== GRID ===== */}
      <div className="company-grid">

        {filtered.map((company, index) => (
          <div key={index} className="company-card">

            {/* logo */}
            <div className="company-logo">
              {company.name.charAt(0)}
            </div>

            <h3>{company.name}</h3>

            <p className="location">
              <MapPin size={16}/> {company.location}
            </p>

            <p className="jobs">
              <Briefcase size={16}/> {company.jobs} Open Jobs
            </p>

            <button
              className="view-btn"
              onClick={() => viewJobs(company.name)}
            >
              View Jobs
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}
