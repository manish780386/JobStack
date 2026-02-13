import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Apply.css";

export default function Apply() {

  const { state: job } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
    resume: "",
    cover: ""
  });

  /* ===== CHECK ALL FIELDS FILLED ===== */
  const isValid =
    form.name &&
    form.email &&
    form.phone &&
    form.experience &&
    form.skills &&
    form.resume &&
    form.cover;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid) return;   // 🚀 prevent submit

    const old = JSON.parse(localStorage.getItem("applications")) || [];

    const newApplication = {
      ...form,
      jobTitle: job.title,
      company: job.company,
      date: new Date().toLocaleDateString(),
      status: "Applied"
    };

    const updated = [...old, newApplication];

    localStorage.setItem("applications", JSON.stringify(updated));

    alert("Application Submitted Successfully 🚀");

    navigate("/applications");
  };

  return (
    <div className="apply-page">

      <div className="apply-card">

        <h2>Apply for {job.title}</h2>
        <p className="company">{job.company}</p>

        <form onSubmit={handleSubmit}>

          <input required placeholder="Full Name"
            onChange={(e)=>setForm({...form,name:e.target.value})}/>

          <input required type="email" placeholder="Email"
            onChange={(e)=>setForm({...form,email:e.target.value})}/>

          <input required placeholder="Phone"
            onChange={(e)=>setForm({...form,phone:e.target.value})}/>

          <input required placeholder="Experience (2 years)"
            onChange={(e)=>setForm({...form,experience:e.target.value})}/>

          <input required placeholder="Skills (React, Django)"
            onChange={(e)=>setForm({...form,skills:e.target.value})}/>

          <input required type="file"
            onChange={(e)=>setForm({...form,resume:e.target.files[0]?.name})}/>

          <textarea required placeholder="Cover Letter"
            onChange={(e)=>setForm({...form,cover:e.target.value})}/>

          <button disabled={!isValid}>
            Submit Application
          </button>

        </form>
      </div>
    </div>
  );
}
