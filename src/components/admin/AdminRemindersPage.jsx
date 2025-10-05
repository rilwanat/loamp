import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LoampHeader from "../../navbar/LoampHeader.jsx";
import LoampFooter from "../../navbar/LoampFooter.jsx";

import AdminSideNavbar from "../../navbar/admin/AdminSideNavbar.jsx";

import TitleLine from "../../widgets/TitleLine.jsx";
import FileUpload from "../../widgets/FileUpload.jsx";

import logo from "../../assets/images/logo-512x512.png";



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

export default function AdminRemindersPage({ isMobile }) {
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

  const currentPageName = "Reminders";

  const [isLoading, setIsLoading] = useState(false);
  const [isDataloading, setIsDataLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("active");

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
          <div className="bg-white p-4 rounded-lg pt-20 sm:pt-20">
              <div className="flex flex-row w-full justify-between mx-4 items-center">
                <div
                  className="cursor-pointer hover:text-theme hover:bg-black bg-theme rounded-md px-2 py-2"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
                </div>

                {/* <div className="invisible relative flex items-center mr-4 rounded-lg">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute left-8 h-4 w-4 object-scale-down text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search Ambassadors"
                    className="pl-14 border border-gray-300 rounded-lg py-1 px-2 mx-4 focus:outline-none focus:border-1 focus:border-theme"
                    // onChange={handleSearchChange}
                  />
                </div> */}

                

                               <>
                      <div
                        className="flex items-center"
                        style={{ height: "40px" }}
                      >
                        <div
                          onClick={() => {
                            // navigate("/create-membership");
                          }}
                          // style={{ width: "176px" }}
                          className="text-center shadow-lg  bg-theme rounded-lg py-2 px-4 mx-4  text-black text-sm cursor-pointer hover:text-theme hover:bg-black transition-colors duration-300 ease-in-out"
                        >
                          Send Broadcast Email
                        </div>
                      </div>
                    </>


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
                                                        <div className="flex flex-col md:flex-row  justify-start items-center mb-4">
                                                          <div className="flex flex-col items-start w-full  sm:mt-0 bg-white rounded-lg p-4 ">

                                                            <div className="flex w-full items-center justify-start  ">
                          <div className="font-semibold ">
                            Reminders
                          </div>
                        </div>


                                                            <div className="p-4 w-full">
                                                              <div className="flex space-x-6 mt-4 border-b ">
                                                                <button
                                                                  className={`pb-2 text-sm font-medium cursor-pointer ${
                                                                    activeTab === "active"
                                                                      ? "border-b-2 border-theme text-theme"
                                                                      : "text-gray-600"
                                                                  }`}
                                                                  onClick={() => setActiveTab("active")}
                                                                >
                                                                  Active
                                                                </button>
                                                                <button
                                                                  className={`pb-2 text-sm font-medium cursor-pointer ${
                                                                    activeTab === "inactive"
                                                                      ? "border-b-2 border-theme text-theme"
                                                                      : "text-gray-600"
                                                                  }`}
                                                                  onClick={() => setActiveTab("inactive")}
                                                                >
                                                                  Inactive
                                                                </button>
                                                              </div>
                                    
                                                              <div className="flex flex-col md:flex-row  w-full">
                                                                <div className="rounded-lg bg-softTheme p-4 mt-4  w-full">
                                                                {activeTab === "active" && (
                                                                  <div className="mt-0">
                                                                    <div className="bg-softTheme">
                                                                      <div className="flex w-full">
                                                                        <div className="w-full">
                                                                          <div
                                                                            className=""
                                                                            style={{ width: "100%" }}
                                                                          >
                                                                            <div className="flex flex-col overflow-x-auto">
                                                                              <div className="">
                                                                                <div className="inline-block min-w-full py-0">
                                                                                  <div className="overflow-x-auto mt-0">
                                                                                    {isDataloading ? (
                                                                                      <Loading />
                                                                                    ) : (
                                                                                      <div className="rounded-lg bg-softTheme w-full">
                                    <div className="rounded-lg shadow-lg px-4 mx-0 border-gray-300 border-1 bg-white ">
                                                      
                                                      <div>
                                                        {/* {upcomingAppointmentData.map((requestData, index) => ( */}
                                                          <div
                                                            // key={index}
                                                            className="flex justify-between rounded-lg my-2"
                                                            style={{
                                                              padding: "10px 10px",
                                                              // backgroundColor: "#FAF3E0",
                                                            }}
                                                            // onClick={(e) => navigateToAppointments()}
                                                          >
                                                            <div className="flex">
                                                              {/* <div
                                                                className="mr-2 bg-theme"
                                                                style={{
                                                                  width: "6px",
                                                                  height: "100%",
                                                                  // backgroundColor: "#FFB7F9",
                                                                }}
                                                              ></div> */}
                                                              <div className="flex-shrink-0 flex mr-4 items-center justify-center  bg-theme" style={{ borderRadius: '20px', width: '40px', height: '40px' }}>
                                                                        <img className="object-scale-down rounded-full" 
                                                                        // src={profile} 
                                                                        alt="" />
                                                                      </div>
                                    
                                                              <div className="flex flex-col">
                                                                <p className="font-semibold" style={{ fontSize: "14px",  }}>
                                                                  {/* {requestData.type} */}
                                                                  User updated profile.
                                                                </p>
                                                                <p style={{ fontSize: "12px" }}>
                                                                  59 minutes ago.
                                                                </p>
                                                              </div>
                                                            </div>
                                                            {/* <div className="flex flex-col items-end">
                                                              <p style={{ fontSize: "12px" }}>ValueSwap</p>
                                                              <p style={{ fontSize: "12px" }} className="">
                                                                {requestData.specialist}
                                                              </p>
                                                            </div> */}
                                                          </div>
                                                        {/* ))} */}
                                                      </div>
                                                      {/* <div
                                                        className="flex w-full justify-end my-4 "
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => {
                                                          // navigate("/manage-appointments");
                                                        }}
                                                      >
                                                        <div className="bg-theme rounded-lg px-4 py-1 text-white">
                                                          <p style={{ fontSize: "12px" }}>View All</p>
                                                        </div>
                                                      </div> */}
                                                    </div>
                                                              </div>
                                                                                    )}
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                )}
                                    
                                                                {activeTab === "inactive" && (
                                                                  <div className="mt-0">
                                                                    <div className="bg-softTheme">
                                                                      <div className="flex w-full">
                                                                        <div className="w-full">
                                                                          <div
                                                                            className=""
                                                                            style={{ width: "100%" }}
                                                                          >
                                                                            <div className="flex flex-col overflow-x-auto">
                                                                              <div className="">
                                                                                <div className="inline-block min-w-full py-0">
                                                                                  <div className="overflow-x-auto mt-0">
                                                                                    {isDataloading ? (
                                                                                      <Loading />
                                                                                    ) : (
                                                                                      <div className="rounded-lg bg-softTheme w-full">
                                    <div className="rounded-lg shadow-lg px-4 mx-0 border-gray-300 border-1 bg-white ">
                                                      
                                                      <div>
                                                        {/* {upcomingAppointmentData.map((requestData, index) => ( */}
                                                          <div
                                                            // key={index}
                                                            className="flex justify-between rounded-lg my-2"
                                                            style={{
                                                              padding: "10px 10px",
                                                              // backgroundColor: "#FAF3E0",
                                                            }}
                                                            // onClick={(e) => navigateToAppointments()}
                                                          >
                                                            <div className="flex">
                                                              {/* <div
                                                                className="mr-2 bg-theme"
                                                                style={{
                                                                  width: "6px",
                                                                  height: "100%",
                                                                  // backgroundColor: "#FFB7F9",
                                                                }}
                                                              ></div> */}
                                                              <div className="flex-shrink-0 flex mr-4 items-center justify-center  bg-theme" style={{ borderRadius: '20px', width: '40px', height: '40px' }}>
                                                                        <img className="object-scale-down rounded-full" 
                                                                        // src={profile} 
                                                                        alt="" />
                                                                      </div>
                                    
                                                              <div className="flex flex-col">
                                                                <p className="font-semibold" style={{ fontSize: "14px",  }}>
                                                                  {/* {requestData.type} */}
                                                                  User updated profile.
                                                                </p>
                                                                <p style={{ fontSize: "12px" }}>
                                                                  59 minutes ago.
                                                                </p>
                                                              </div>
                                                            </div>
                                                            {/* <div className="flex flex-col items-end">
                                                              <p style={{ fontSize: "12px" }}>ValueSwap</p>
                                                              <p style={{ fontSize: "12px" }} className="">
                                                                {requestData.specialist}
                                                              </p>
                                                            </div> */}
                                                          </div>
                                                        {/* ))} */}
                                                      </div>
                                                      {/* <div
                                                        className="flex w-full justify-end my-4 "
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => {
                                                          // navigate("/manage-appointments");
                                                        }}
                                                      >
                                                        <div className="bg-theme rounded-lg px-4 py-1 text-white">
                                                          <p style={{ fontSize: "12px" }}>View All</p>
                                                        </div>
                                                      </div> */}
                                                    </div>
                                                              </div>
                                                                                    )}
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                )}
                  
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
      </div>

      <LoampFooter gotoPage={gotoPage} />
    </div>
  );
}
