import React, { useEffect, useState } from "react";
import "./Applications.css";

export default function Applications() {

  const [apps, setApps] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("applications")) || [];
    setApps(saved);
  }, []);

  return (
    <div className="apps-page">

      <h1>My Applications 📄</h1>

      {apps.map((app, i) => (
        <div key={i} className="app-card">
          <h3>{app.jobTitle}</h3>
          <p>{app.company}</p>
          <span>{app.date}</span>
          <span className="status">{app.status}</span>
        </div>
      ))}

    </div>
  );
}
