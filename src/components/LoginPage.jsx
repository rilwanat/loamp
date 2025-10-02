import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LoampHeader from "../navbar/LoampHeader.jsx";
import LoampFooter from "../navbar/LoampFooter.jsx";

import TitleLine from "../widgets/TitleLine.jsx";
import LoadingScreen from "../widgets/LoadingScreen.jsx";

import logo from "../assets/images/logo.png";
import fa1 from "../assets/images/home/fa-1.jpg";
import fa2 from "../assets/images/home/fa-2.jpg";
import fa3 from "../assets/images/home/fa-3.jpg";
import charter from "../assets/images/home/charter.webp";
import president from "../assets/images/home/president.webp";

import semicircle from "../assets/images/register-login/semicircle.png";
import semicircleflip from "../assets/images/register-login/semicircle-flip.png";
import africa from "../assets/images/register-login/africa.png";

import NotificationModal from "./modals/NotificationModal";

//
import axiosInstance from "../auth/axiosConfig"; // Ensure the correct relative path
import { setCookie, isMemberAuthenticated } from "../auth/authUtils"; // Ensure the correct relative path
import { jwtDecode } from "jwt-decode";
import { getCookie, deleteCookie } from "../auth/authUtils"; // Import getCookie function
//

export default function LoginPage({ isMobile }) {
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const gotoPage = (pageName) => {
    navigate("/" + pageName);
  };
  const navigateTo = (route) => {
    navigate(route);
  };

  const [email, setEmail] = useState("rilwan.at@gmail.com");
  const [password, setPassword] = useState("12345678");

  const [isSigninLoading, setIsSigninLoading] = useState(false);

  const [serverResponse, setServerResponse] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleSignin = async (e) => {
    e.preventDefault();
    setErrorMessage({ message: "" });

    // if (!isTermsChecked) {
    //   setErrorMessage({ message: 'Please accept A.S.K Terms & Conditions.' });
    //   return;
    // }

    if (email === "Enter your email" || email === "" || password === "") {
      setErrorMessage({
        message: "Login Failed: Please enter valid credentials",
      });
      openNotificationModal(
        false,
        "Login",
        "Login Failed: Please enter valid credentials."
      );
      // setRegistrationStatus("Failed");
      setIsSigninLoading(false);

      //alert("");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage({ message: "Please, enter a valid email." });
      openNotificationModal(false, "Login", "Please, enter a valid email.");
      return;
    }

    if (!isValidPassword(password)) {
      setErrorMessage({ message: "Password must be at least 8 characters." });
      openNotificationModal(
        false,
        "Login",
        "Password must be at least 8 characters."
      );
      return;
    }

    // alert("User: " + email + " " + firstname + " " + lastname);
    setIsSigninLoading(true);

    try {
      const requestData = {
        email: email.trim(),
        password: password.trim(),
      };

      // alert(JSON.stringify(requestData, null, 2));
      // alert((import.meta.env.VITE_IS_LIVE === "true"
      //     ? import.meta.env.VITE_API_SERVER_URL
      //     : import.meta.env.VITE_API_DEMO_SERVER_URL) +
      //     import.meta.env.VITE_USER_LOGIN);

      const response = await axiosInstance.post(
        (import.meta.env.VITE_IS_LIVE === "true"
          ? import.meta.env.VITE_API_SERVER_URL
          : import.meta.env.VITE_API_DEMO_SERVER_URL) +
          import.meta.env.VITE_USER_LOGIN,
        requestData,
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            "Content-Type": "application/json",
          },
        }
      );

      setIsSigninLoading(false);
      // alert(JSON.stringify(response.data, null, 2));
      // return;

      if (response.data.status) {
        // If registration is successful
        setErrorMessage({ message: "" });

        setEmail("");
        setPassword("");

        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        // alert(JSON.stringify(decodedToken), null, 2);

        const expirationDays =
          (decodedToken.exp - decodedToken.iat) / (24 * 60 * 60);
        // alert(expirationDays * (24 * 60 * 60)); //seconds

        setCookie("loamp-member-token", token, expirationDays);
        setCookie("loamp-member-details", JSON.stringify(response.data.userData));

        // refreshMemberDetails();

        //toggleAccount();
        // alert("Login Successful: " + response.data.message);

        if (response.data.userData.email_verified !== "Yes") {
          openNotificationModal(
            true,
            "Login Successful",
            "Please verify your email to continue."
          );
        } else {
          // alert(response.data.message);
          if (response.data.userData.document_upload_status !== "Ok") {
            // upload documnents
            openNotificationModal(
              true,
              "Login Successful",
              response.data.message + " Upload your documents."
            );
          } else {
            // login
            openNotificationModal(
              true,
              "Login Successful",
              response.data.message
            );
          }
        }

        // toggleAccountForSignIn();
      } else {
        // If there are errors in the response
        const errors = response.data.errors.map((error) => error.msg);
        const errorMessage = errors.join(", ");
        setErrorMessage({ message: errorMessage });
        // alert("Registration Failed");

        openNotificationModal(false, "Login Error", "Login Failed");
      }
    } catch (error) {
      setIsSigninLoading(false);
      // alert(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setErrorMessage({ message: errorMessage });
        openNotificationModal(false, "Login Error", errorMessage);
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.errors
      ) {
        const { errors } = error.response.data;
        const errorMessages = errors.map((error) => error.msg);
        const errorMessage = errorMessages.join(", "); // Join all error messages
        setErrorMessage({ message: errorMessage });
        openNotificationModal(false, "Login Error", errorMessage);
      } else {
        setErrorMessage({
          message: "Login failed. Please check your credentials and try again.",
        });
        openNotificationModal(
          false,
          "Login Error",
          "Login failed. Please check your credentials and try again."
        );
      }
    }
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
                        onSubmit={handleSignin}
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
                            disabled={isSigninLoading}
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
