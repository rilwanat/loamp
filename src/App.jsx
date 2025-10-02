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


import UserVerifyEmailPage from './components/member/UserVerifyEmailPage.jsx';
import UploadDocumentsPage from './components/member/UploadDocumentsPage.jsx';
import UserDashboardPage from './components/member/UserDashboardPage.jsx';
import UserMembershipPage from './components/member/UserMembershipPage.jsx';
import UserVerificationStatusPage from './components/member/UserVerificationStatusPage.jsx';
import UserChangePasswordPage from './components/member/UserChangePasswordPage.jsx';
import UserPaymentPage from './components/member/UserPaymentPage.jsx';

import LoginPageAdmin from './components/LoginPageAdmin.jsx';
import AdminDashboardPage from './components/admin/AdminDashboardPage.jsx';
import AdminUploadsPage from './components/admin/AdminUploadsPage.jsx';
import AdminNewsPage from './components/admin/AdminNewsPage.jsx';
import AdminMembershipPage from './components/admin/AdminMembershipPage.jsx';
import AdminRemindersPage from './components/admin/AdminRemindersPage.jsx';
import AdminEventsPage from './components/admin/AdminEventsPage.jsx';
import AdminSupportPage from './components/admin/AdminSupportPage.jsx';

import LoginPageSuperAdmin from './components/LoginPageSuperAdmin.jsx';


//
import axiosInstance from './auth/axiosConfig'; // Ensure the correct relative path
import { setCookie } from './auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
import { getCookie, deleteCookie } from './auth/authUtils'; // Import getCookie function
//

import ProtectedMemberRoute from './auth/protectedMemberRoute';
import ProtectedAdminRoute from './auth/ProtectedAdminRoute';
import ProtectedSuperAdminRoute from './auth/ProtectedSuperAdminRoute';




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



  //MEMBER DETAILS
      const [memberDetails, setMemberDetails] = useState(null);
          const refreshMemberDetails = async () => {
              // setIsLoading(true);
              // setError(null);              
              try {
                  // Option 1: If you only need to refresh from cookies
                  const storedMemberDetails = getCookie('loamp-member-details');
                  const parsedMemberDetails = storedMemberDetails ? JSON.parse(storedMemberDetails) : null;
                  setMemberDetails(parsedMemberDetails);
                  // alert(JSON.stringify(parsedMemberDetails), null, 2);
              } catch (err) {
                  // setError('Failed to refresh user details');
                  alert('Refresh Member error:', err);
              } finally {
                  // setIsLoading(false);
              }
          };
          // Initial load
          useEffect(() => {
              refreshMemberDetails();
          }, []);
      //MEMBER DETAILS


      //ADMIN DETAILS
      const [adminDetails, setAdminDetails] = useState(null);
          const refreshAdminDetails = async () => {
              // setIsLoading(true);
              // setError(null);              
              try {
                  // Option 1: If you only need to refresh from cookies
                  const storedAdminDetails = getCookie('loamp-admin-details');
                  const parsedAdminDetails = storedAdminDetails ? JSON.parse(storedAdminDetails) : null;
                  setAdminDetails(parsedAdminDetails);
                  // alert(JSON.stringify(parsedAdminDetails), null, 2);
              } catch (err) {
                  // setError('Failed to refresh user details');
                  alert('Refresh Admin error:', err);
              } finally {
                  // setIsLoading(false);
              }
          };
          // Initial load
          useEffect(() => {
              refreshAdminDetails();
          }, []);
      //ADMIN DETAILS


      

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


            <Route path="/user-verify-email" element={<ProtectedMemberRoute><UserVerifyEmailPage isMobile={isMobile} memberDetails={memberDetails} refreshMemberDetails={refreshMemberDetails}/></ProtectedMemberRoute>} />
            <Route path="/user-upload-documents" element={<ProtectedMemberRoute><UploadDocumentsPage isMobile={isMobile} memberDetails={memberDetails} refreshMemberDetails={refreshMemberDetails}/></ProtectedMemberRoute>} />
            <Route path="/user-dashboard" element={<ProtectedMemberRoute><UserDashboardPage isMobile={isMobile} memberDetails={memberDetails} refreshMemberDetails={refreshMemberDetails}/></ProtectedMemberRoute>} />
            <Route path="/user-membership" element={<ProtectedMemberRoute><UserMembershipPage isMobile={isMobile} memberDetails={memberDetails} refreshMemberDetails={refreshMemberDetails}/></ProtectedMemberRoute>} />
            <Route path="/user-verification-status" element={<ProtectedMemberRoute><UserVerificationStatusPage isMobile={isMobile} memberDetails={memberDetails} refreshMemberDetails={refreshMemberDetails}/></ProtectedMemberRoute>} />
            <Route path="/user-change-password" element={<ProtectedMemberRoute><UserChangePasswordPage isMobile={isMobile} memberDetails={memberDetails} refreshMemberDetails={refreshMemberDetails}/></ProtectedMemberRoute>} />
            <Route path="/user-payment" element={<ProtectedMemberRoute><UserPaymentPage isMobile={isMobile} memberDetails={memberDetails} refreshMemberDetails={refreshMemberDetails}/></ProtectedMemberRoute>} />
            
            
            <Route path="/admin-login" element={<LoginPageAdmin isMobile={isMobile} />} />
            <Route path="/admin-dashboard" element={<ProtectedAdminRoute><AdminDashboardPage isMobile={isMobile} adminDetails={adminDetails} refreshAdminDetails={refreshAdminDetails} /></ProtectedAdminRoute>} />
            <Route path="/admin-uploads" element={<ProtectedAdminRoute><AdminUploadsPage isMobile={isMobile} adminDetails={adminDetails} refreshAdminDetails={refreshAdminDetails} /></ProtectedAdminRoute>} />
            <Route path="/admin-news" element={<ProtectedAdminRoute><AdminNewsPage isMobile={isMobile} adminDetails={adminDetails} refreshAdminDetails={refreshAdminDetails} /></ProtectedAdminRoute>} />
            <Route path="/admin-membership" element={<ProtectedAdminRoute><AdminMembershipPage isMobile={isMobile} adminDetails={adminDetails} refreshAdminDetails={refreshAdminDetails} /></ProtectedAdminRoute>} />
            <Route path="/admin-reminders" element={<ProtectedAdminRoute><AdminRemindersPage isMobile={isMobile} adminDetails={adminDetails} refreshAdminDetails={refreshAdminDetails} /></ProtectedAdminRoute>} />
            <Route path="/admin-events" element={<ProtectedAdminRoute><AdminEventsPage isMobile={isMobile} adminDetails={adminDetails} refreshAdminDetails={refreshAdminDetails} /></ProtectedAdminRoute>} />
            <Route path="/admin-support" element={<ProtectedAdminRoute><AdminSupportPage isMobile={isMobile} adminDetails={adminDetails} refreshAdminDetails={refreshAdminDetails} /></ProtectedAdminRoute>} />
            
             
            

            <Route path="/*" element={<div>NOT FOUND</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
