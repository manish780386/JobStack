import React, { useState, useContext, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login, token } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  /* ✅ already logged in -> redirect */
  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        form
      );

      /* ✅ save token + user */
      login(res.data.access, {
        username: form.username,
        email: form.username,
      });

      navigate("/");

    } catch {
      setError("Invalid username or password ❌");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-right">

        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          {/* Error Message */}
          {error && <div className="error-box">{error}</div>}

          {/* Username */}
          <div className="input-group">
            <Mail size={18} />
            <input
              placeholder="Username"
              required
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <Lock size={18} />

            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              required
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            {showPass ? (
              <EyeOff size={18} onClick={() => setShowPass(false)} />
            ) : (
              <Eye size={18} onClick={() => setShowPass(true)} />
            )}
          </div>

          {/* Button */}
          <button className="login-btn" disabled={loading}>
            {loading ? <Loader2 className="spin" size={18}/> : "Login"}
          </button>

          <p>
            Don’t have account? <Link to="/register">Register</Link>
          </p>
        </form>

      </div>
    </div>
  );
}
