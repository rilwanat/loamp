import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LoampHeader from "../../navbar/LoampHeader.jsx";
import LoampFooter from "../../navbar/LoampFooter.jsx";

import MemberSideNavbar from "../../navbar/member/MemberSideNavbar.jsx";

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

export default function UserChangePasswordPage({ isMobile }) {
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

  const currentPageName = "Change Password";

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
                  <div className="flex flex-col mt-8">
                    <div className="flex flex-wrap ">
                      <div className="w-full md:w-1/2 px-2 mb-4">
                        <label
                          htmlFor="first_name"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Old Password:{" "}
                          <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          id="old_password"
                          name="old_password"
                          className={`bg-white border-1 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:border-1 focus:border-theme block w-full p-2.5`}
                          placeholder="Old Password"
                          // readOnly={!editable}
                          // value={memberDetails.email}
                          // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col mt-2">
                    <div className="flex flex-wrap ">
                      <div className="w-full md:w-1/2 px-2 mb-4">
                        <label
                          htmlFor="new_password"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          New Password:{" "}
                          <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          id="new_password"
                          name="new_password"
                          className={`bg-white border-1 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:border-1 focus:border-theme block w-full p-2.5`}
                          placeholder="New Password"
                          // readOnly={!editable}
                          // value={memberDetails.email}
                          // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col mt-2">
                    <div className="flex flex-wrap ">
                      <div className="w-full md:w-1/2 px-2 mb-4">
                        <label
                          htmlFor="retype_new_password"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Retype new password:{" "}
                          <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          id="retype_new_password"
                          name="retype_new_password"
                          className={`bg-white border-1 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:border-1 focus:border-theme block w-full p-2.5`}
                          placeholder="Retype New Password"
                          // readOnly={!editable}
                          // value={memberDetails.email}
                          // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                        />
                      </div>
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
                          Change Password
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

      <LoampFooter gotoPage={gotoPage} />
    </div>
  );
}
