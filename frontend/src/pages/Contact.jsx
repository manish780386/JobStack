import React from "react";
import { Mail, Phone } from "lucide-react";
import "./Support.css";

export default function Contact() {
  return (
    <div className="support-page">
      <h1>Contact Us 📞</h1>

      <form className="contact-form">
        <input placeholder="Your Name" />
        <input placeholder="Your Email" />
        <textarea placeholder="Your Message" rows="4"></textarea>
        <button>Send Message</button>
      </form>

      <div className="contact-info">
        <p><Mail size={16}/> support@jobstack.com</p>
        <p><Phone size={16}/> +91 9876543210</p>
      </div>
    </div>
  );
}
