import React, { useState } from "react";
import axios from "axios";
import { User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/register/",
        form
      );

      alert("Account Created ✅");
      navigate("/login");

    } catch {
      alert("User already exists ❌");
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className="input-group">
          <User size={18} />
          <input
            placeholder="Username"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />
        </div>

        <div className="input-group">
          <Mail size={18} />
          <input
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        <div className="input-group">
          <Lock size={18} />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <button className="register-btn">Register</button>
      </form>
    </div>
  );
}
