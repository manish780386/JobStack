import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home.jsx';
import Job from './pages/Job.jsx'
import Company from './pages/Company.jsx'
import Services from './pages/Services.jsx'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from "./pages/Profile.jsx";
import ResumeBuilder from "./pages/ResumeBuilder.jsx";
import Admin from "./pages/Admin.jsx";



import Navbar from './component/Navbar.jsx'
import Footer from './component/Footer.jsx'
import HelpCenter from './pages/HelpCenter.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import Apply from "./pages/Apply";
import Applications from "./pages/Applications";
import CareerGuidance from "./pages/CareerGuidance.jsx";
import MockInterview from "./pages/MockInterview.jsx";
import JobAlerts from "./pages/JobAlerts.jsx";
import Premium from "./pages/Premium.jsx";










export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/jobs' element={<Job />} />
        <Route path='/companies' element={<Company />} />
        <Route path='/services' element={<Services />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/profile" element={<Profile />} />
      

<Route path="/resume-builder" element={<ResumeBuilder />} />


<Route path="/apply" element={<Apply />} />
<Route path="/applications" element={<Applications />} />
<Route path="/admin" element={<Admin />} />


<Route path="/guidance" element={<CareerGuidance />} />

<Route path="/interview" element={<MockInterview />} />
<Route path="/alerts" element={<JobAlerts />} />
<Route path="/premium" element={<Premium />} />






      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
