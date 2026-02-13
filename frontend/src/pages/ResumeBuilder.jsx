import React, { useState, useRef } from "react";
import "./ResumeBuilder.css";
import html2pdf from "html2pdf.js";

export default function ResumeBuilder() {

  const resumeRef = useRef();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    skills: "",
    education: "",
    experience: "",
    about: ""
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });


  /* ===== DOWNLOAD PDF ===== */
  const downloadPDF = () => {
    html2pdf().from(resumeRef.current).save("resume.pdf");
  };


  /* ===== SHARE ===== */
  const shareResume = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Resume link copied ✅");
  };


  return (
    <div className="resume-page">

      {/* ===== LEFT FORM ===== */}
      <div className="resume-form">

        <h2>Build Your Resume 🚀</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />

        <textarea name="about" placeholder="Professional Summary" onChange={handleChange} />
        <textarea name="skills" placeholder="Skills (React, Python...)" onChange={handleChange} />
        <textarea name="education" placeholder="Education" onChange={handleChange} />
        <textarea name="experience" placeholder="Experience" onChange={handleChange} />

        <div className="btns">
          <button onClick={downloadPDF}>Download PDF</button>
          <button onClick={shareResume}>Share</button>
        </div>
      </div>


      {/* ===== RIGHT PREVIEW ===== */}
      <div className="resume-preview" ref={resumeRef}>

        <h1>{data.name || "Your Name"}</h1>
        <p>{data.email} | {data.phone} | {data.city}</p>

        <hr />

        <h3>About</h3>
        <p>{data.about}</p>

        <h3>Skills</h3>
        <p>{data.skills}</p>

        <h3>Education</h3>
        <p>{data.education}</p>

        <h3>Experience</h3>
        <p>{data.experience}</p>

      </div>

    </div>
  );
}
