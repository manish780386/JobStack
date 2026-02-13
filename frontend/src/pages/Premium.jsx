import React, { useContext, useEffect, useState } from "react";
import "./Premium.css";
import { Crown, Check } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Premium() {
  const { user, token } = useContext(AuthContext);

  const [plan, setPlan] = useState("Free");

  /* ================= LOAD USER PLAN ================= */
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`premium_${user.username}`);
      if (saved) setPlan(saved);
    }
  }, [user]);

  /* ================= BUY PLAN ================= */
  const buyPlan = (type) => {
    if (!token) {
      alert("Login first ❌");
      return;
    }

    localStorage.setItem(`premium_${user.username}`, type);
    setPlan(type);

    alert(`${type} Plan Activated 👑`);
  };

  return (
    <div className="premium-page">

      <h1><Crown size={32}/> Premium Membership</h1>
      <p className="subtitle">
        Boost your career with exclusive benefits
      </p>

      <div className="plan-grid">

        {/* ===== FREE ===== */}
        <div className={`plan-card ${plan==="Free" && "active"}`}>
          <h2>Free</h2>
          <h3>₹0 / month</h3>

          <ul>
            <li><Check size={16}/> Limited Apply</li>
            <li><Check size={16}/> Basic Resume</li>
            <li><Check size={16}/> Normal Visibility</li>
          </ul>

          <button disabled>
            Current Plan
          </button>
        </div>


        {/* ===== PRO ===== */}
        <div className={`plan-card pro ${plan==="Pro" && "active"}`}>
          <h2>Pro ⭐</h2>
          <h3>₹199 / month</h3>

          <ul>
            <li><Check size={16}/> Unlimited Apply</li>
            <li><Check size={16}/> Resume Highlight</li>
            <li><Check size={16}/> Priority Support</li>
            <li><Check size={16}/> Job Alerts</li>
          </ul>

          <button onClick={() => buyPlan("Pro")}>
            Upgrade Now
          </button>
        </div>


        {/* ===== ELITE ===== */}
        <div className={`plan-card elite ${plan==="Elite" && "active"}`}>
          <h2>Elite 👑</h2>
          <h3>₹499 / month</h3>

          <ul>
            <li><Check size={16}/> Everything in Pro</li>
            <li><Check size={16}/> Top Recruiter Visibility</li>
            <li><Check size={16}/> Mock Interviews</li>
            <li><Check size={16}/> Career Mentorship</li>
          </ul>

          <button onClick={() => buyPlan("Elite")}>
            Go Elite
          </button>
        </div>

      </div>

      {/* CURRENT STATUS */}
      <div className="current-plan">
        Current Plan : <span>{plan}</span>
      </div>

    </div>
  );
}
