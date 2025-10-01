import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LoampHeader from "../../navbar/LoampHeader.jsx";
import LoampFooter from "../../navbar/LoampFooter.jsx";

import MemberSideNavbar from "../../navbar/member/MemberSideNavbar.jsx";

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

export default function UserVerificationStatusPage({ isMobile }) {
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

  const currentPageName = "Verification Status";

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
                  <div className=" flex flex-col justify-center sm:px-8 py-4">
                    {/* <div className='hidden sm:block'><img className="w-56  object-cover" src={logginImgTwo} alt="" /></div> */}
                    <form
                      className="bg-white max-w-[520px] w-full  mx-auto  p-8 px-8 rounded-lg  my-8 flex flex-col justify-center shadow-lg"
                      onSubmit={handleUpload}
                    >
                      <div>
                        <h2 className="text-xl text-black font-bold">
                          Select and upload your files below
                          {/* to complete your{" "}
                                                        <span className="text-theme">ambassadorial</span>{" "}
                                                        profile */}
                        </h2>
                        {/* <p className='text-l text-pcGrayText my-2'>Start your 30-day free trial</p> */}

                        <div className="mt-4"></div>
                        <FileUpload
                          label="Letter of Credence"
                          file={letter}
                          setFile={setLetter}
                        />

                        <FileUpload
                          label="Data page of Diplomatic Passport"
                          file={passportDataPage}
                          setFile={setPassportDataPage}
                        />

                        <FileUpload
                          label="International Passport"
                          file={intlPassport}
                          setFile={setIntlPassport}
                        />

                        <FileUpload
                          label="ID Card"
                          file={idCard}
                          setFile={setIdCard}
                        />

                        <FileUpload
                          label="Other Relevant Documents"
                          file={otherDocs}
                          setFile={setOtherDocs}
                        />

                        <div className="flex justify-between text-black py-2">
                          <p className="flex items-center text-xs">
                            <input className="mr-2" type="checkbox" />I Agree to
                            Terms of Service and Privacy Policy and to our User
                            Agreement and acknowledge reading our User Privacy
                            Notice.
                          </p>
                          {/* <p>Forgot Password</p> */}
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 w-full mt-2">
                          {/* <button
                                                          className="w-full md:w-auto flex-1 py-2 bg-gray-300 text-black font-semibold cursor-pointer"
                                                          type="button"
                                                          style={{ borderRadius: "8px" }}
                                                          onClick={handleSkip}
                                                        >
                                                          Skip
                                                        </button> */}
                          <button
                            className="w-full md:w-auto flex-1 py-2 bg-theme text-black font-semibold cursor-pointer  hover:text-theme hover:bg-black transition-colors duration-300 ease-in-out"
                            type="submit"
                            style={{ borderRadius: "8px" }}
                            disabled={isUploadLoading}
                          >
                            {isUploadLoading ? <LoadingScreen /> : "Submit"}
                          </button>
                        </div>

                        <div className="flex justify-center text-gray-400 py-2 text-center text-sm h-1">
                          <p>{serverResponse}</p>
                        </div>

                        <div className="flex justify-center text-black py-2">
                          <p className="mr-1">
                            Ask for referral from an existing member?
                          </p>
                          <p
                            className="cursor-pointer text-theme font-semibold"
                            onClick={() => {
                              // navigate("/create-membership");
                            }}
                          >
                            {" "}
                            Proceed Now
                          </p>
                        </div>
                      </div>
                    </form>
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
