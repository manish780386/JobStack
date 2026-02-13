import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./JobAlerts.css";
import { AuthContext } from "../context/AuthContext";

export default function JobAlerts() {
  const { token, user } = useContext(AuthContext);

  const [alertData, setAlertData] = useState({
    role: "",
    location: "",
    type: "",
  });

  const [savedAlert, setSavedAlert] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [matched, setMatched] = useState([]);

  /* ================= LOAD JOBS ================= */
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/jobs/")
      .then((res) => setJobs(res.data));
  }, []);

  /* ================= LOAD SAVED ALERT ================= */
  useEffect(() => {
    if (user) {
      const saved =
        JSON.parse(localStorage.getItem(`alert_${user.username}`));
      if (saved) {
        setSavedAlert(saved);
        filterJobs(saved);
      }
    }
  }, [user, jobs]);

  /* ================= SAVE ALERT ================= */
  const saveAlert = () => {
    if (!token) {
      alert("Login first ❌");
      return;
    }

    localStorage.setItem(
      `alert_${user.username}`,
      JSON.stringify(alertData)
    );

    setSavedAlert(alertData);

    filterJobs(alertData);

    alert("Job Alert Saved Successfully 🔔");
  };

  /* ================= FILTER JOBS ================= */
  const filterJobs = (data) => {
    const result = jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(data.role.toLowerCase()) &&
        j.location.toLowerCase().includes(data.location.toLowerCase())
    );

    setMatched(result);
  };

  return (
    <div className="alerts-page">

      <h1>Job Alerts 🔔</h1>
      <p className="subtitle">
        Get notified instantly when matching jobs appear
      </p>

      {/* ===== ALERT FORM ===== */}
      <div className="alert-form">

        <input
          placeholder="Job Role (React, Python...)"
          value={alertData.role}
          onChange={(e) =>
            setAlertData({ ...alertData, role: e.target.value })
          }
        />

        <input
          placeholder="Location"
          value={alertData.location}
          onChange={(e) =>
            setAlertData({ ...alertData, location: e.target.value })
          }
        />

        <select
          value={alertData.type}
          onChange={(e) =>
            setAlertData({ ...alertData, type: e.target.value })
          }
        >
          <option value="">Job Type</option>
          <option>Full Time</option>
          <option>Remote</option>
          <option>Part Time</option>
        </select>

        <button onClick={saveAlert}>
          Save Alert
        </button>
      </div>

      {/* ===== MATCHED JOBS ===== */}
      {savedAlert && (
        <>
          <h2 className="match-title">Matching Jobs 🎯</h2>

          <div className="match-grid">

            {matched.length === 0 && (
              <p>No matching jobs yet. New jobs will appear here.</p>
            )}

            {matched.map((job) => (
              <div key={job.id} className="match-card">
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <span>{job.location}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
