import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LoampHeader from "../navbar/LoampHeader.jsx";
import LoampFooter from "../navbar/LoampFooter.jsx";

import TitleLine from "../widgets/TitleLine.jsx";

import logo from "../assets/images/logo.png";
import fa1 from "../assets/images/home/fa-1.jpg";
import fa2 from "../assets/images/home/fa-2.jpg";
import fa3 from "../assets/images/home/fa-3.jpg";
import charter from "../assets/images/home/charter.webp";
import president from "../assets/images/home/president.webp";

import semicircle from "../assets/images/register-login/semicircle.png";
import semicircleflip from "../assets/images/register-login/semicircle-flip.png";
import africa from "../assets/images/register-login/africa.png";

export default function CreateMembershipPage({ isMobile }) {
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

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [country, setCountryOfResidence] = useState("");
  const [email, setEmail] = useState("email@africanambassadors.org");
  const [password, setPassword] = useState("12345678");
  const [confirmPassword, setConfirmPassword] = useState("12345678");

  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [isSigninLoading, setIsSigninLoading] = useState(false);

  const [serverResponse, setServerResponse] = useState("");


  const handleSignIn = async (e) => {
    e.preventDefault();
    navigate("/upload-documents");
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

      <div className="w-full">
        <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 ">
          <div className="w-full px-4 ">
            <div className="text-sm">
              {/* <div className="absolute inset-0 ">
        <img
          src={stars}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div> */}

              <div className="flex relative">
                <img
                  src={semicircle}
                  alt="orange semicircle"
                  className="absolute bottom-0 -left-50 w-[680px] md:w-[680px] h-auto  -z-10 opacity-30"
                />

                <img
                  src={semicircleflip}
                  alt="orange semicircle"
                  className="absolute top-0 left-90 w-[800px] md:w-[800px] h-auto  -z-10 opacity-30"
                />

                <div className="w-full rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 h-full sm:h-screen  w-full  mt-4">
                    <div className="hidden md:flex flex-col justify-center items-center h-screen">
                      <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden">
                        <h2 className="text-4xl text-black font-bold text-center mb-4">
                          Welcome Back!
                        </h2>
                        <img src={africa} className="w-full object-contain" />
                      </div>
                    </div>

                    <div className=" flex flex-col justify-center sm:px-8 py-4">
                      {/* <div className='hidden sm:block'><img className="w-56  object-cover" src={logginImgTwo} alt="" /></div> */}
                      <form
                        className="bg-white max-w-[520px] w-full  mx-auto  p-8 px-8 rounded-lg  my-8 flex flex-col justify-center shadow-lg"
                        onSubmit={handleSignIn}
                      >
                        <div>
                          <h2 className="text-xl text-black font-bold">
                            Login to the League of{" "}
                            <span className="text-theme">African</span>{" "}
                            Ambassadors!
                          </h2>
                          {/* <p className='text-l text-pcGrayText my-2'>Start your 30-day free trial</p> */}
                          <div className="flex flex-col py-2 mt-4">
                            <label className="text-black">Email Address</label>
                            <input
                              className=" bg-white border-1 border-gray-500 mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-theme"
                              style={{ borderRadius: "8px" }}
                              type="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col py-2">
                            <label className="text-black">Password</label>
                            <input
                              className="bg-white border-1 border-gray-500 mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-theme"
                              style={{ borderRadius: "8px" }}
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <div className="flex justify-between text-black py-2">
                            {/* <p className="flex items-center text-xs">
                              <input className="mr-2" type="checkbox" />I Agree
                              to Terms of Service and Privacy Policy and to our
                              User Agreement and acknowledge reading our User
                              Privacy Notice.
                            </p> */}
                            {/* <p>Forgot Password</p> */}
                          </div>
                          <button
                            className="w-full my-5 py-2 bg-theme  text-black font-semibold  cursor-pointer"
                            type="submit"
                            style={{ borderRadius: "8px" }}
                            disabled={isSigninLoading || isSignupLoading}
                            
                          >
                            {isSigninLoading ? <LoadingScreen /> : "Sign In"}
                          </button>

                          <div className="flex justify-center text-black py-2">
                            <p className="mr-1">Don't have an account?</p>
                            <p
                              className="cursor-pointer text-theme font-semibold"
                              onClick={() => {
                                navigate("/create-membership");
                              }}
                            >
                              {" "}
                              Create Membership
                            </p>
                          </div>

                          {/* <p className="text-l text-black my-2 text-center">
                            Or sign up with
                          </p>

                          <button
                            className="w-full  py-2 bg-white border-2 border-gray-500 my-1"
                            type="button"
                            style={{ borderRadius: "4px" }}
                            disabled={isSignupLoading || isSigninLoading}
                            // onClick={handleSignup}
                          >
                            {isSignupLoading ? (
                              <LoadingScreen />
                            ) : (
                              "Sign up with Google"
                            )}
                          </button>
                          <button
                            className="w-full  py-2 bg-white border-2 border-gray-500 my-1"
                            type="button"
                            style={{ borderRadius: "4px" }}
                            disabled={isSignupLoading || isSigninLoading}
                            // onClick={handleSignup}
                          >
                            {isSignupLoading ? (
                              <LoadingScreen />
                            ) : (
                              "Sign up with Apple"
                            )}
                          </button> */}

                          <div className="flex justify-center text-gray-400 py-2 text-center text-sm h-1">
                            <p>{serverResponse}</p>
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
      </div>
      <LoampFooter gotoPage={gotoPage} />
    </div>
  );
}
