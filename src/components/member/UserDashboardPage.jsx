import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LoampHeader from "../../navbar/LoampHeader.jsx";
import LoampFooter from "../../navbar/LoampFooter.jsx";

import MemberSideNavbar from "../../navbar/member/MemberSideNavbar.jsx";

import TitleLine from "../../widgets/TitleLine.jsx";
import FileUpload from "../../widgets/FileUpload.jsx";
import LoadingScreen from "../../widgets/LoadingScreen.jsx";

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

import NotificationModal from "../modals/NotificationModal.jsx";

//
import axiosInstance from "../../auth/axiosConfig.js"; // Ensure the correct relative path
import { setCookie, isMemberAuthenticated } from "../../auth/authUtils.jsx"; // Ensure the correct relative path
import { jwtDecode } from "jwt-decode";
import { getCookie, deleteCookie } from "../../auth/authUtils.jsx"; // Import getCookie function
//



export default function UserDashboardPage({
  isMobile,
  memberDetails,
  refreshMemberDetails,
}) {
  const navigate = useNavigate();

  //notification modal
  const [notificationType, setNotificationType] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const openNotificationModal = (type, title, message) => {
    setNotificationType(type);
    setNotificationTitle(title);
    setNotificationMessage(message);

    setIsNotificationModalOpen(true);
  };
  const closeNotificationModal = () => {
    setIsNotificationModalOpen(false);
  };
  //notification modal

  // useEffect(() => {
  //   if (memberDetails?.email_address) {
  //     refreshMemberDetails();
  //   }
  // }, [memberDetails?.email_address]);

  useEffect(() => {
    refreshMemberDetails();
  }, []);
  

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

  const currentPageName = "My Profile";

  const [editable, setEditable] = useState(false);

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
          <MemberSideNavbar currentPageName={currentPageName} />
        )}

        <div
          className="w-full rounded-lg "
          // style={{ borderRadius: '8px' }}
        >
          <div className="bg-gray-50 p-4 rounded-lg pt-20 sm:pt-20">
            <div className="flex flex-row w-full justify-between mx-4 items-center">
              <div
                className="cursor-pointer hover:text-theme hover:bg-black bg-theme rounded-md px-2 py-2"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
              </div>

              <div className="invisible relative flex items-center mr-4 rounded-lg">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-8 h-4 w-4 object-scale-down text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search"
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
                  <div className="flex mt-4 ">
                    <div className="relative w-full rounded-lg ">
                      <div className="absolute w-full bg-theme rounded-tl-lg rounded-tr-lg h-[100px]"></div>

                      <div className="flex flex-col md:flex-row justify-between items-center mb-0 md:flex  p-4">
                        <div className="flex items-center w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mx-1  rounded-lg p-4 z-[100]">
                          <div
                            className="flex-shrink-0 flex mr-2 items-center justify-center bg-black border-2 border-white"
                            style={{
                              borderRadius: "44px",
                              width: "88px",
                              height: "88px",
                            }}
                          >
                            <img
                              className="object-scale-down"
                              // src={senderImage}
                              alt=""
                            />
                          </div>
                        </div>

                        <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 mx-1  rounded-lg p-4 flex sm:justify-end z-[100] sm:mt-20 ">
                          <div
                            onClick={(e) => setEditable((prev) => !prev)}
                            style={{ width: "30%" }}
                            className=" text-center  rounded-lg px-2 py-2  text-xs cursor-pointer 
                                border-1 border-theme bg-white text-theme  hover:text-theme hover:bg-black transition-colors duration-300 ease-in-out"
                          >
                            Edit Profile
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col mt-2">
                    <div className="flex flex-wrap ">
                      <div className="w-full md:w-1/2 px-2 mb-4">
                        <label
                          htmlFor="first_name"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          First name:
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          name="first_name"
                          className={`${
                            editable ? "bg-gray-50" : "bg-gray-200"
                          } border-1 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:border-1 focus:border-theme block w-full p-2.5`}
                          placeholder="Firstname"
                          readOnly={!editable}
                          value={memberDetails && memberDetails.first_name}
                          // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                        />
                      </div>

                      <div className="w-full md:w-1/2 px-2 mb-4">
                        <label
                          htmlFor="last_name"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Last name:
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          className={`${
                            editable ? "bg-gray-50" : "bg-gray-200"
                          } border-1 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:border-1 focus:border-theme block w-full p-2.5`}
                          placeholder="Lastname"
                          readOnly={!editable}
                          value={memberDetails && memberDetails.last_name}
                          // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col mt-2 ">
                    <div className="flex flex-wrap ">
                      <div className="w-full md:w-1/2 px-2 mb-4">
                        <label
                          htmlFor="email_address"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Email Address:
                        </label>
                        <input
                          type="text"
                          id="email_address"
                          name="email_address"
                          className={`bg-gray-200 border-1 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:border-1 focus:border-theme block w-full p-2.5`}
                          placeholder="Email Address"
                          readOnly={true}
                          value={memberDetails && memberDetails.email_address}
                          // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                        />
                      </div>

                      <div className="w-full md:w-1/2 px-2 mb-4">
                        <label
                          htmlFor="phone_number"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Phone Number:
                        </label>
                        <input
                          type="text"
                          id="phone_number"
                          name="phone_number"
                          className={`${
                            editable ? "bg-gray-50" : "bg-gray-200"
                          } border-1 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:border-1 focus:border-theme block w-full p-2.5`}
                          placeholder="Phone Number"
                          readOnly={!editable}
                          value={memberDetails && memberDetails.phone_number}
                          // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col mt-2 ">
                    <div className="flex flex-wrap ">
                      <div className="w-full md:w-1/2 px-2 mb-4">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Country of Residence:
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          className={`${
                            editable ? "bg-gray-50" : "bg-gray-200"
                          } border-1 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:border-1 focus:border-theme block w-full p-2.5`}
                          placeholder="Country"
                          value={memberDetails && memberDetails.country_of_residence}
                          // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                        />
                      </div>

                      {/* <div className="w-full md:w-1/2 px-2 mb-4">
                        <label
                          htmlFor="email_address"
                          className="block text-sm font-medium text-theme mb-2"
                        >
                          Phone:
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          className="bg-gray-50 border-1 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:border-1 focus:border-theme block w-full p-2.5"
                          placeholder="Phone"
                          // value={memberDetails.phoneNumber}
                          // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                        />
                      </div> */}
                    </div>
                  </div>

                  <div className="flex justify-end items-center mt-2">
                    <>
                      <div
                        className="flex items-center"
                        style={{ height: "40px" }}
                      >
                        <div
                          onClick={() => {
                            // navigate("/create-membership");
                          }}
                          style={{ width: "176px" }}
                          className="text-center shadow-lg  bg-theme rounded-lg px-4 py-2 text-black text-sm cursor-pointer mx-1 hover:text-theme hover:bg-black transition-colors duration-300 ease-in-out"
                        >
                          Save
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onRequestClose={closeNotificationModal}
        notificationType={notificationType}
        notificationTitle={notificationTitle}
        notificationMessage={notificationMessage}
        gotoPage={gotoPage}
      />

      <LoampFooter gotoPage={gotoPage} />
    </div>
  );
}
