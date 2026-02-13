import React, { useState, useEffect, useContext } from "react";
import "./MockInterview.css";
import { AuthContext } from "../context/AuthContext";

export default function MockInterview() {
  const { token, user } = useContext(AuthContext);

  const [history, setHistory] = useState([]);

  /* Interview types */
  const interviews = [
    { title: "Frontend Interview", tech: "React / JS", duration: "45 min" },
    { title: "Backend Interview", tech: "Django / Node", duration: "60 min" },
    { title: "HR Round", tech: "Behavioral", duration: "30 min" },
    { title: "DSA Coding Round", tech: "Problem Solving", duration: "60 min" },
  ];

  /* load history */
  useEffect(() => {
    if (user) {
      const saved =
        JSON.parse(localStorage.getItem(`interview_${user.username}`)) || [];
      setHistory(saved);
    }
  }, [user]);

  /* book slot */
  const bookInterview = (item) => {
    if (!token) {
      alert("Login first ❌");
      return;
    }

    const booking = {
      ...item,
      date: new Date().toLocaleDateString(),
    };

    const updated = [...history, booking];

    setHistory(updated);
    localStorage.setItem(
      `interview_${user.username}`,
      JSON.stringify(updated)
    );

    alert("Interview Booked Successfully ✅");
  };

  return (
    <div className="interview-page">

      <h1>Mock Interviews 🎯</h1>
      <p className="subtitle">
        Practice with experts & crack your dream job
      </p>

      {/* ===== INTERVIEW CARDS ===== */}
      <div className="interview-grid">
        {interviews.map((item, i) => (
          <div key={i} className="interview-card">
            <h3>{item.title}</h3>
            <p>{item.tech}</p>
            <span>{item.duration}</span>

            <button onClick={() => bookInterview(item)}>
              Book Slot
            </button>
          </div>
        ))}
      </div>

      {/* ===== HISTORY ===== */}
      {token && (
        <>
          <h2 className="history-title">My Interview History 📅</h2>

          <div className="history-box">
            {history.length === 0 && <p>No interviews booked yet</p>}

            {history.map((h, i) => (
              <div key={i} className="history-item">
                <strong>{h.title}</strong>
                <span>{h.date}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
