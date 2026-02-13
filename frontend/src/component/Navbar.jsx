import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { User, LogOut, Settings, FileText } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import image from "../assets/image.png";
import "./Navbar.css";

export default function Navbar() {
  const { token, logout, user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">

        <div className="logo">
          <img src={image} alt="" />
          <Link to="/">JobSt@ack</Link>
        </div>

        <nav className="menu">
          <Link to="/jobs">Jobs</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/services">Services</Link>
        </nav>

        <div className="auth-buttons">
          {token ? (
            <div className="profile-box">

              <User
                className="profile-icon"
                size={24}
                onClick={() => setOpen(!open)}
              />

              {open && (
                <div className="profile-dropdown">

                  <div className="profile-info">
                    <p>{user?.username}</p>
                    <span>{user?.email}</span>
                  </div>

                  <Link to="/profile" className="drop-link">
                    <Settings size={16}/> Profile
                  </Link>

                  {/* ✅ HISTORY ONLY WHEN LOGIN */}
                  <Link to="/applications" className="drop-link">
                    <FileText size={16}/> My Applications
                  </Link>

                  <button onClick={logout} className="drop-link logout">
                    <LogOut size={16}/> Logout
                  </button>

                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
