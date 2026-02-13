import React, { useState, useEffect, useContext } from "react";
import "./Profile.css";
import { User, Upload } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {

  const { user, token } = useContext(AuthContext);

  const [data, setData] = useState({
    photo: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    skills: "",
    experience: "",
    education: "",
    bio: "",
    resume: ""
  });

  /* ================= LOAD USER PROFILE ================= */
  useEffect(() => {
    if (!user) return;

    const saved = JSON.parse(
      localStorage.getItem(`profile_${user.username}`)
    );

    if (saved) {
      setData(saved);
    } else {
      /* first time auto fill basic info */
      setData((prev) => ({
        ...prev,
        name: user.username,
        email: user.email
      }));
    }
  }, [user]);

  /* ================= SAVE PROFILE ================= */
  const handleSave = () => {
    if (!token) {
      alert("Login first ❌");
      return;
    }

    localStorage.setItem(
      `profile_${user.username}`,
      JSON.stringify(data)
    );

    alert("Profile Saved Successfully ✅");
  };

  /* ================= PHOTO PREVIEW ================= */
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () =>
      setData({ ...data, photo: reader.result });

    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">

        {/* LEFT SIDE */}
        <div className="profile-left">

          <div className="photo-box">
            {data.photo ? (
              <img src={data.photo} alt="profile" />
            ) : (
              <User size={50} />
            )}

            <label className="upload-btn">
              <Upload size={16}/> Change Photo
              <input type="file" hidden onChange={handlePhoto} />
            </label>
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Profile
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="profile-right">

          <h2>Profile Details</h2>

          <div className="grid">

            <input
              placeholder="Full Name"
              value={data.name}
              onChange={(e)=>setData({...data,name:e.target.value})}
            />

            <input
              placeholder="Email"
              value={data.email}
              onChange={(e)=>setData({...data,email:e.target.value})}
            />

            <input
              placeholder="Phone"
              value={data.phone}
              onChange={(e)=>setData({...data,phone:e.target.value})}
            />

            <input
              placeholder="City"
              value={data.city}
              onChange={(e)=>setData({...data,city:e.target.value})}
            />
          </div>

          <textarea
            placeholder="Skills"
            value={data.skills}
            onChange={(e)=>setData({...data,skills:e.target.value})}
          />

          <textarea
            placeholder="Work Experience"
            value={data.experience}
            onChange={(e)=>setData({...data,experience:e.target.value})}
          />

          <textarea
            placeholder="Education"
            value={data.education}
            onChange={(e)=>setData({...data,education:e.target.value})}
          />

          <textarea
            placeholder="About Yourself"
            value={data.bio}
            onChange={(e)=>setData({...data,bio:e.target.value})}
          />

          <div className="resume-box">
            <label>
              Upload Resume
              <input
                type="file"
                onChange={(e)=>setData({...data,resume:e.target.files[0]?.name})}
              />
            </label>

            {data.resume && <p>📄 {data.resume}</p>}
          </div>

        </div>
      </div>
    </div>
  );
}
