import React from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Linkedin,
  Github,
  Twitter,
  Mail
} from "lucide-react";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo */}
        <div className="footer-col">
          <div className="footer-brand">
            <Briefcase size={28} />
            <h2>JobSt@ack</h2>
          </div>

          <p>
            Find your dream job with top companies and grow your career faster.
          </p>
        </div>

        {/* Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/services">Services</Link>
        </div>

        {/* Support */}
        <div className="footer-col">
          <h3>Support</h3>
          <Link to="/help">Help Center</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms</Link>

        </div>

        {/* Social Icons */}
        <div className="footer-col">
          <h3>Follow Us</h3>

          <div className="socials">
            <a href="#"><Linkedin size={20} /></a>
            <a href="#"><Github size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Mail size={20} /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} JobSt@ack. All rights reserved.
      </div>
    </footer>
  );
}
