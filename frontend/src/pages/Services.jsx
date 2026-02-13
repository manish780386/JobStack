import React from "react";
import {
  FileText,
  Crown,
  Bell,
  Users,
  Briefcase
} from "lucide-react";
import { useNavigate } from "react-router-dom";



import "./Services.css";

export default function Services() {
  const navigate = useNavigate();
  return (
    <div className="services-page">

      {/* HEADER */}
      <div className="services-header">
        <h1>Our Services 🚀</h1>
        <p>Everything you need to boost your career growth</p>
      </div>

      {/* GRID */}
      <div className="services-grid">

        {/* Resume Builder */}
        <div className="service-card">
          <FileText size={34} className="icon" />
          <h3>Resume Builder</h3>
          <p>Create ATS friendly professional resumes easily.</p>
          <button onClick={() => navigate("/resume-builder")}>
            Learn More
          </button>
        </div>

        {/* Premium */}
        <div className="service-card">
          <Crown size={34} className="icon" />
          <h3>Premium Membership</h3>
          <p>Unlock unlimited job applies & priority visibility.</p>
          <button onClick={() => navigate("/premium")}>
            Learn More 
          </button>
        </div>

        {/* Alerts */}
        <div className="service-card">
          <Bell size={34} className="icon" />
          <h3>Job Alerts</h3>
          <p>Get instant notifications for new job openings.</p>
          <button
            className="service-btn"
            onClick={() => navigate("/alerts")}
          >
            Learn More
          </button>
        </div>

        {/* Guidance */}
        <div className="service-card">
          <Users size={34} className="icon" />
          <h3>Career Guidance</h3>
          <p>Expert mentorship and career advice sessions.</p>
          <button
            className="service-btn"
            onClick={() => navigate("/guidance")}
          >
            Learn More
          </button>
        </div>

        {/* Interview */}
        <div className="service-card">
          <Briefcase size={34} className="icon" />
          <h3>Mock Interviews</h3>
          <p>Practice interviews with real industry experts.</p>
          <button
            className="service-btn"
            onClick={() => navigate("/interview")}
          >
            Learn More
          </button>
        </div>

      </div>
    </div>
  );
}
