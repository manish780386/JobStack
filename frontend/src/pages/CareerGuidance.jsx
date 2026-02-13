import React, { useState, useEffect, useContext } from "react";
import "./CareerGuidance.css";
import { AuthContext } from "../context/AuthContext";

export default function CareerGuidance() {
  const { user, token } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);

  const mentors = [
    { name: "Rahul Sharma", role: "Frontend Expert", exp: "5+ Years" },
    { name: "Priya Verma", role: "Backend Django Dev", exp: "6+ Years" },
    { name: "Aman Singh", role: "Data Scientist", exp: "4+ Years" },
  ];

  /* load bookings */
  useEffect(() => {
    if (user) {
      const saved =
        JSON.parse(localStorage.getItem(`guidance_${user.username}`)) || [];
      setBookings(saved);
    }
  }, [user]);

  /* book mentor */
  const bookSession = (mentor) => {
    if (!token) {
      alert("Login first ❌");
      return;
    }

    const newBooking = {
      ...mentor,
      date: new Date().toLocaleDateString(),
    };

    const updated = [...bookings, newBooking];

    setBookings(updated);
    localStorage.setItem(
      `guidance_${user.username}`,
      JSON.stringify(updated)
    );

    alert("Session Booked Successfully ✅");
  };

  return (
    <div className="guidance-page">

      <h1>Career Guidance & Mentorship 🚀</h1>

      {/* ===== MENTORS ===== */}
      <div className="mentor-grid">
        {mentors.map((m, i) => (
          <div key={i} className="mentor-card">
            <h3>{m.name}</h3>
            <p>{m.role}</p>
            <span>{m.exp}</span>

            <button onClick={() => bookSession(m)}>
              Book Session
            </button>
          </div>
        ))}
      </div>

      {/* ===== HISTORY ===== */}
      {token && (
        <>
          <h2 className="history-title">My Bookings 📅</h2>

          <div className="history-box">
            {bookings.length === 0 && <p>No sessions booked yet</p>}

            {bookings.map((b, i) => (
              <div key={i} className="history-item">
                <strong>{b.name}</strong> — {b.role}
                <span>{b.date}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
