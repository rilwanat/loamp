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

import countries from "world-countries";

import NotificationModal from "./modals/NotificationModal";

//
import axiosInstance from "../auth/axiosConfig"; // Ensure the correct relative path
import { setCookie, isMemberAuthenticated } from "../auth/authUtils"; // Ensure the correct relative path
import { jwtDecode } from "jwt-decode";
import { getCookie, deleteCookie } from "../auth/authUtils"; // Import getCookie function
//

export default function CreateMembershipPage({ isMobile }) {
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

  const [firstname, setFirstname] = useState("Rilwan");
  const [lastname, setLastname] = useState("Adedeji");
  const [countryOfResidence, setCountryOfResidence] = useState("Nigeria");
  const [email, setEmail] = useState("rilwan.at@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [confirmPassword, setConfirmPassword] = useState("12345678");

  const [selected, setSelected] = useState("");
  // Prepare data (just country name + code)
  const countryOptions = countries.map((c) => ({
    name: c.name.common,
    code: c.cca2,
  }));

  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const [serverResponse, setServerResponse] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage({ message: "" });

    // if (!isTermsChecked) {
    //   setErrorMessage({ message: 'Please accept A.S.K Terms & Conditions.' });
    //   return;
    // }

    if (
      firstname === "" ||
      lastname === "" ||
      countryOfResidence === "" ||
      countryOfResidence === ""
    ) {
      setErrorMessage({
        message:
          "Registration Error: Please enter your Firstname, Lastname and Country of Residence.",
      });
      openNotificationModal(
        false,
        "Registration Error",
        "Registration Error: Please enter your Firstname, Lastname and Country of Residence."
      );
      // setRegistrationStatus("Failed");
      setIsSignupLoading(false);

      //alert("");
      return;
    }

    if (
      email === "Enter your email" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setErrorMessage({
        message: "Registration Error: Please enter valid credentials",
      });
      openNotificationModal(
        false,
        "Registration Error",
        "Registration Error: Please enter valid credentials."
      );
      // setRegistrationStatus("Failed");
      setIsSignupLoading(false);

      //alert("");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage({ message: "Please, enter a valid email." });
      openNotificationModal(
        false,
        "Registration Error",
        "Please, enter a valid email."
      );
      return;
    }

    if (!isValidPassword(password)) {
      setErrorMessage({ message: "Password must be at least 8 characters." });
      openNotificationModal(
        false,
        "Registration Error",
        "Password must be at least 8 characters."
      );
      return;
    }

    if (!passwordsMatch(password, confirmPassword)) {
      setErrorMessage({ message: "Passwords must match." });
      openNotificationModal(
        false,
        "Registration Error",
        "Passwords must match."
      );
      return;
    }

    // alert("User: " + email + " " + firstname + " " + lastname);
    setIsSignupLoading(true);

    try {
      const requestData = {
        first_name: firstname.trim(),
        last_name: lastname.trim(),
        country_of_residence: countryOfResidence.trim(),
        email: email.trim(),
        password: password.trim(),
        confirmPassword: confirmPassword.trim(),
      };

      // alert(JSON.stringify(requestData, null, 2));
      // alert((import.meta.env.VITE_IS_LIVE === "true"
      //     ? import.meta.env.VITE_API_SERVER_URL
      //     : import.meta.env.VITE_API_DEMO_SERVER_URL) +
      //     import.meta.env.VITE_USER_REGISTER);

      const response = await axiosInstance.post(
        (import.meta.env.VITE_IS_LIVE === "true"
          ? import.meta.env.VITE_API_SERVER_URL
          : import.meta.env.VITE_API_DEMO_SERVER_URL) +
          import.meta.env.VITE_USER_REGISTER,
        requestData,
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            "Content-Type": "application/json",
          },
        }
      );

      setIsSignupLoading(false);
      // alert(JSON.stringify(response.data, null, 2));
      // return;

      if (response.data.status) {
        // If registration is successful
        setErrorMessage({ message: "" });

        setFirstname("");
        setLastname("");
        setCountryOfResidence("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        openNotificationModal(
          true,
          "Registration Successful",
          response.data.message
        );

        // toggleAccountForSignIn();
      } else {
        // If there are errors in the response
        const errors = response.data.errors.map((error) => error.msg);
        const errorMessage = errors.join(", ");
        setErrorMessage({ message: errorMessage });
        // alert("Registration Failed");

        openNotificationModal(
          false,
          "Registration Error",
          "Registration Failed"
        );
      }
    } catch (error) {
      setIsSignupLoading(false);
      // alert(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setErrorMessage({ message: errorMessage });
        openNotificationModal(false, "Registration Error", errorMessage);
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.errors
      ) {
        const { errors } = error.response.data;
        const errorMessages = errors.map((error) => error.msg);
        const errorMessage = errorMessages.join(", "); // Join all error messages
        setErrorMessage({ message: errorMessage });
        openNotificationModal(false, "Registration Error", errorMessage);
      } else {
        setErrorMessage({
          message:
            "Registration failed. Please check your credentials and try again.",
        });
        openNotificationModal(
          false,
          "Registration Error",
          "Registration failed. Please check your credentials and try again."
        );
      }
    }
  };

  return (
    <div>
      <LoampHeader isMobile={isMobile} gotoPage={gotoPage} showMarqees={true} />

      <div className="pt-10"></div>

      <div className="w-full">
        <div className="flex flex-col h-auto px-4 sm:px-16 md:px-8 ">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 h-full sm:h-screen  w-full mt-4">
                    <div className="hidden md:flex flex-col justify-center items-center h-screen">
                      <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden">
                        <h2 className="text-4xl text-black font-bold text-center mt-12 mb-4">
                          Join the League of{" "}
                          <span className="text-theme">African</span>{" "}
                          Ambassadors!
                        </h2>
                        <img src={africa} className="w-full object-contain" />
                      </div>
                    </div>

                    <div className=" flex flex-col justify-center sm:px-8 py-4">
                      {/* <div className='hidden sm:block'><img className="w-56  object-cover" src={logginImgTwo} alt="" /></div> */}
                      <form
                        className="bg-white max-w-[520px] w-full  mx-auto  p-8 px-8 rounded-lg  my-8 flex flex-col justify-center shadow-lg"
                        onSubmit={handleSignup}
                      >
                        <div>
                          <h2 className="text-xl text-black font-bold">
                            Complete the quick registration process to create
                            your{" "}
                            <span className="text-theme">ambassadorial</span>{" "}
                            profile
                          </h2>
                          {/* <p className='text-l text-pcGrayText my-2'>Start your 30-day free trial</p> */}
                          <div className="flex flex-col mt-4 py-2">
                            <label className="text-black">First name</label>
                            <input
                              className=" bg-white border-1 border-gray-500 mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-theme"
                              style={{ borderRadius: "8px" }}
                              type="text"
                              value={firstname}
                              onChange={(e) => setFirstname(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col py-2">
                            <label className="text-black">Last name</label>
                            <input
                              className=" bg-white border-1 border-gray-500 mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-theme"
                              style={{ borderRadius: "8px" }}
                              type="text"
                              value={lastname}
                              onChange={(e) => setLastname(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col py-2">
                            <label className="text-black">
                              Country of Residence
                            </label>
                            <select
                              value={countryOfResidence}
                              onChange={(e) =>
                                setCountryOfResidence(e.target.value)
                              }
                              className="bg-white border-1 border-gray-500 mt-2 p-2 pr-8 focus:outline-none focus:ring-2 focus:ring-theme"
                              style={{ borderRadius: "8px" }}
                            >
                              <option value="">Select a country</option>
                              {countryOptions.map((c) => (
                                <option key={c.code} value={c.code}>
                                  {c.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col py-2">
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
                          <div className="flex flex-col py-2">
                            <label className="text-black">Password</label>
                            <input
                              className="bg-white border-1 border-gray-500 mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-theme"
                              style={{ borderRadius: "8px" }}
                              type="password"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </div>
                          <div className="flex justify-between text-black py-2">
                            <p className="flex items-center text-xs">
                              <input className="mr-2" type="checkbox" />I Agree
                              to Terms of Service and Privacy Policy and to our
                              User Agreement and acknowledge reading our User
                              Privacy Notice.
                            </p>
                            {/* <p>Forgot Password</p> */}
                          </div>
                          <button
                            className="w-full my-5 py-2 bg-theme  text-black font-semibold  cursor-pointer"
                            type="submit"
                            style={{ borderRadius: "8px" }}
                            disabled={isSignupLoading}
                          >
                            {isSignupLoading ? <LoadingScreen /> : "Sign Up"}
                          </button>

                          <div className="flex justify-center text-black py-2">
                            <p className="mr-1">Already a member?</p>
                            <p
                              className="cursor-pointer text-theme font-semibold"
                              onClick={() => {
                                navigate("/login");
                              }}
                            >
                              {" "}
                              Sign in
                            </p>
                          </div>

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
