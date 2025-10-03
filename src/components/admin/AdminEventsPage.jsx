import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LoampHeader from "../../navbar/LoampHeader.jsx";
import LoampFooter from "../../navbar/LoampFooter.jsx";

import AdminSideNavbar from "../../navbar/admin/AdminSideNavbar.jsx";

import TitleLine from "../../widgets/TitleLine.jsx";
import FileUpload from "../../widgets/FileUpload.jsx";

import logo from "../../assets/images/logo.png";
import fa1 from "../../assets/images/home/fa-1.jpg";
import fa2 from "../../assets/images/home/fa-2.jpg";
import fa3 from "../../assets/images/home/fa-3.jpg";
import charter from "../../assets/images/home/charter.webp";
import president from "../../assets/images/home/president.webp";

import semicircle from "../../assets/images/register-login/semicircle.png";
import semicircleflip from "../../assets/images/register-login/semicircle-flip.png";
import africa from "../../assets/images/register-login/africa.png";

import countries from "world-countries";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";

// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

export default function UserMembershipPage({ isMobile }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const gotoPage = (pageName) => {
    navigate("/" + pageName);
  };
  const navigateTo = (route) => {
    navigate(route);
  };

  const [letter, setLetter] = useState(null);
  const [passportDataPage, setPassportDataPage] = useState(null);
  const [intlPassport, setIntlPassport] = useState(null);
  const [idCard, setIdCard] = useState(null);
  const [otherDocs, setOtherDocs] = useState(null);

  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const [serverResponse, setServerResponse] = useState("");

  const currentPageName = "Events";

  const [editable, setEditable] = useState(false);

  const [bio, setBio] = useState("");
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // B I U S
      [{ list: "ordered" }, { list: "bullet" }], // Lists
    ],
  };

  const handleSkip = async (e) => {
    e.preventDefault();
    navigate("/user-dashboard");
    return;
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    navigate("/user-dashboard");
    return;

    // setIsSignupLoading(true);
    // setServerResponse('');

    // const response = await fetch('http://127.0.0.1:8080/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, password }),
    // });

    // if (response.ok) {
    //   const data = await response.json();

    //   // Handle successful sign-in, e.g., store token in local storage
    //   //console.log(data);

    //   //localStorage.setItem('uid', data.uid);
    //   //console.log("Signed up as: " + data.message);

    //   // Redirect to home page
    //   navigate('/home');
    // } else {
    //   const errorData = await response.json();

    //   // Handle sign-in error, e.g., display error message
    //   console.log(errorData.error);
    //   setServerResponse(errorData.error);
    // }

    // setIsSignupLoading(false);
  };

  return (
    <div>
      <LoampHeader isMobile={isMobile} gotoPage={gotoPage} showMarqees={true} />

      <div className="pt-10"></div>

      <div className="flex">
        {isMobile ? (
          <div></div>
        ) : (
          <AdminSideNavbar currentPageName={currentPageName} />
        )}

        <div
          className="w-full rounded-lg "
          // style={{ borderRadius: '8px' }}
        >
          <div className="bg-gray-50 p-4 rounded-lg pt-20 sm:pt-12">
              <div className="flex flex-row w-full justify-between mx-4 items-center">
                <div
                  className="cursor-pointer hover:text-theme hover:bg-black bg-theme rounded-md px-2 py-2"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
                </div>

                <div className="relative flex items-center mr-4 rounded-lg">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute left-8 h-4 w-4 object-scale-down text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search Events"
                    className="pl-14 border border-gray-300 rounded-lg py-1 px-2 mx-4 focus:outline-none focus:border-1 focus:border-theme"
                    // onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>

          <div className="flex w-full bg-white p-4">
            <div className="w-full">
              <div className="flex w-full md:flex-row flex-col z-20">
                <div
                  className="flex flex-col flex-grow  border-1  bg-softTheme rounded-lg   pb-4 mt-0 mb-12 px-4 "
                  style={{ flexBasis: "50%" }}
                >
                  <div className="flex mt-4">
  <div className="w-full">
    <div className="mb-4">
    <div className="flex flex-col items-start w-full  sm:mt-0 bg-white rounded-lg p-4">

<div className="flex w-full items-center justify-between  ">
                          <div className="font-semibold ">
                            Events
                          </div>

                          <>
                      <div
                        className="flex items-center"
                        style={{ height: "40px" }}
                      >
                        <div
                          onClick={() => {
                            navigate("/admin-create-events");
                          }}
                          // style={{ width: "176px" }}
                          className="text-center shadow-lg  bg-theme rounded-lg py-2 px-4 mx-4  text-black text-sm cursor-pointer hover:text-theme hover:bg-black transition-colors duration-300 ease-in-out"
                        >
                          Create New Event
                        </div>
                      </div>
                    </>
                        </div>

                        <div className="w-full ">
                        <div className="overflow-x-auto mt-2">
                          
                            
                        </div>
                      </div>

    </div>
  </div>
  </div>
</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoampFooter gotoPage={gotoPage} />
    </div>
  );
}
