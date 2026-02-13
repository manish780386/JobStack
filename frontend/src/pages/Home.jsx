import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const jobs = [
    { title: "Frontend Dev", company: "Google" },
    { title: "Backend Dev", company: "Amazon" },
    { title: "UI/UX Designer", company: "Adobe" },
    { title: "React Native Dev", company: "StartupX" },
  ];

  return (
    <div className="home">

      {/* ===== HERO ===== */}
      <section className="hero">
        <h1>
          Find Your <span>Dream Job</span> Today 🚀
        </h1>
        <p>1000+ companies hiring. Apply instantly.</p>

        <div className="hero-search">
          <input placeholder="Search jobs, skills..." />
          <Link to="/jobs">
            <button>Search Jobs</button>
          </Link>
        </div>
      </section>


      {/* ===== STATS ===== */}
      <section className="stats">
        <div>
          <h2>10K+</h2>
          <p>Jobs</p>
        </div>
        <div>
          <h2>5K+</h2>
          <p>Companies</p>
        </div>
        <div>
          <h2>15K+</h2>
          <p>Candidates</p>
        </div>
      </section>


      {/* ===== FEATURED JOBS ===== */}
      <section className="featured">
        <h2>🔥 Featured Jobs</h2>

        <div className="featured-grid">
          {jobs.map((job, index) => (
            <div key={index} className="featured-card">
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <Link to="/jobs">
                <button>Apply</button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
