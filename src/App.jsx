import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import logo from "./assets/images/logo.png";

import HomePage from "./components/HomePage.jsx";
import AboutUsPage from './components/AboutUsPage.jsx';
import MembersPage from './components/MembersPage.jsx';
import EventsPage from './components/EventsPage.jsx';
import PublicationsPage from './components/PublicationsPage.jsx';
import SupportPage from './components/SupportPage.jsx';
import ContactUsPage from './components/ContactUsPage.jsx';

import CreateMembershipPage from './components/CreateMembershipPage.jsx';
import LoginPage from './components/LoginPage.jsx';

import UploadDocumentsPage from './components/member/UploadDocumentsPage.jsx';
import UserDashboardPage from './components/member/UserDashboardPage.jsx';
import UserMembershipPage from './components/member/UserMembershipPage.jsx';
import UserVerificationStatusPage from './components/member/UserVerificationStatusPage.jsx';
import UserChangePasswordPage from './components/member/UserChangePasswordPage.jsx';
import UserPaymentPage from './components/member/UserPaymentPage.jsx';

import AdminDashboardPage from './components/admin/AdminDashboardPage.jsx';
import AdminUploadsPage from './components/admin/AdminUploadsPage.jsx';
import AdminNewsPage from './components/admin/AdminNewsPage.jsx';
import AdminMembershipPage from './components/admin/AdminMembershipPage.jsx';
import AdminRemindersPage from './components/admin/AdminRemindersPage.jsx';
import AdminEventsPage from './components/admin/AdminEventsPage.jsx';
import AdminSupportPage from './components/admin/AdminSupportPage.jsx';







function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Router>
      <div>
        <div>
          <Routes>
            <Route path="/" element={<HomePage isMobile={isMobile} />} />
            <Route path="/about-us" element={<AboutUsPage isMobile={isMobile} />} />
            <Route path="/members" element={<MembersPage isMobile={isMobile} />} />
            <Route path="/events" element={<EventsPage isMobile={isMobile} />} />
            <Route path="/publications" element={<PublicationsPage isMobile={isMobile} />} />
            <Route path="/support" element={<SupportPage isMobile={isMobile} />} />
            <Route path="/contact-us" element={<ContactUsPage isMobile={isMobile} />} />
            
            <Route path="/create-membership" element={<CreateMembershipPage isMobile={isMobile} />} />
            <Route path="/login" element={<LoginPage isMobile={isMobile} />} />


            <Route path="/user-upload-documents" element={<UploadDocumentsPage isMobile={isMobile} />} />
            <Route path="/user-dashboard" element={<UserDashboardPage isMobile={isMobile} />} />
            <Route path="/user-membership" element={<UserMembershipPage isMobile={isMobile} />} />
            <Route path="/user-verification-status" element={<UserVerificationStatusPage isMobile={isMobile} />} />
            <Route path="/user-change-password" element={<UserChangePasswordPage isMobile={isMobile} />} />
            <Route path="/user-payment" element={<UserPaymentPage isMobile={isMobile} />} />


            <Route path="/admin-dashboard" element={<AdminDashboardPage isMobile={isMobile} />} />
            <Route path="/admin-uploads" element={<AdminUploadsPage isMobile={isMobile} />} />
            <Route path="/admin-news" element={<AdminNewsPage isMobile={isMobile} />} />
            <Route path="/admin-membership" element={<AdminMembershipPage isMobile={isMobile} />} />
            <Route path="/admin-reminders" element={<AdminRemindersPage isMobile={isMobile} />} />
            <Route path="/admin-events" element={<AdminEventsPage isMobile={isMobile} />} />
            <Route path="/admin-support" element={<AdminSupportPage isMobile={isMobile} />} />
            
             
            

            <Route path="/*" element={<div>NOT FOUND</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
