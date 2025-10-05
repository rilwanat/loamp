import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LoampHeader from "../navbar/LoampHeader.jsx";
import LoampFooter from "../navbar/LoampFooter.jsx";

import TitleLine from "../widgets/TitleLine.jsx";
import FileUpload from "../widgets/FileUpload.jsx";

import Loading from "../widgets/Loading";
import MiniLoading from "../widgets/MiniLoading";

import logo from "../assets/images/logo-512x512.png";
import logoFull from "../assets/images/logo-full-h768.png";




import charter from "../assets/images/home/charter.webp";
import president from "../assets/images/home/president.webp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarAlt,
  faClock,
  faMapMarkerAlt,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faBullseye } from "@fortawesome/free-solid-svg-icons";

import NotificationModal from "./modals/NotificationModal";

//
import axiosInstance from "../auth/axiosConfig"; // Ensure the correct relative path
import { setCookie, isMemberAuthenticated } from "../auth/authUtils"; // Ensure the correct relative path
import { jwtDecode } from "jwt-decode";
import { getCookie, deleteCookie } from "../auth/authUtils"; // Import getCookie function
//

import { format } from "date-fns";


export default function HomePage({ isMobile }) {
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

  const currentPageName = "News";

  const [isDataloading, setIsDataLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const gotoPage = (pageName) => {
    navigate("/" + pageName);
  };
  const navigateTo = (route) => {
    navigate(route);
  };

  const [newsData, setNewsData] = useState([]);
  // useEffect(() => {
  //   handleDataNews();
  // }, []);
  const handleDataNews = async () => {
    setIsDataLoading(true);

    try {
      // API payment to get  count
      const newsEndpoint =
        (import.meta.env.VITE_IS_LIVE === "true"
          ? import.meta.env.VITE_API_SERVER_URL
          : import.meta.env.VITE_API_DEMO_SERVER_URL) +
        import.meta.env.VITE_READ_ALL_NEWS;
      // alert(adminPaymentsEndpoint);
      const newsResponse = await axiosInstance.get(newsEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setNewsData(newsResponse.data.data); // Update state with  count

      // openNotificationModal(true, currentPageName, "");
      // alert(JSON.stringify(newsResponse.data.data), null, 2); // Update state with payments count

      // Once all data is fetched, set loading to false
      setIsDataLoading(false);
    } catch (error) {
      setIsDataLoading(false);

      alert(error);
      // Handle errors
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        openNotificationModal(false, currentPageName + " Error", errorMessage);
      } else {
        openNotificationModal(
          false,
          currentPageName + " Error",
          "An unexpected error occurred."
        );
      }
    }
  };

  const [eventsData, setEventsData] = useState([]);
  // useEffect(() => {
  //   handleDataEvents();
  // }, []);
  const handleDataEvents = async () => {
    setIsDataLoading(true);

    try {
      // API payment to get  count
      const eventsEndpoint =
        (import.meta.env.VITE_IS_LIVE === "true"
          ? import.meta.env.VITE_API_SERVER_URL
          : import.meta.env.VITE_API_DEMO_SERVER_URL) +
        import.meta.env.VITE_READ_ALL_EVENTS;
      // alert(adminPaymentsEndpoint);
      const eventsResponse = await axiosInstance.get(eventsEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setEventsData(eventsResponse.data.data); // Update state with  count

      // openNotificationModal(true, currentPageName, "");
      // alert(JSON.stringify(eventsResponse.data.data), null, 2); // Update state with payments count

      // Once all data is fetched, set loading to false
      setIsDataLoading(false);
    } catch (error) {
      setIsDataLoading(false);

      alert(error);
      // Handle errors
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        openNotificationModal(false, currentPageName + " Error", errorMessage);
      } else {
        openNotificationModal(
          false,
          currentPageName + " Error",
          "An unexpected error occurred."
        );
      }
    }
  };

  useEffect(() => {
    handleDataNews();
    handleDataEvents();
  }, []);

  const [language, setLanguage] = useState("english");
  // Map language -> file path in assets
  const files = {
    portuguese: "/assets/files/The Charter - portuguese.pdf",
    english: "/assets/files/The Charter - english.pdf",
    french: "/assets/files/The Charter - french.pdf",
    arabic: "/assets/files/The Charter - arabic.pdf",
    swahili: "/assets/files/The Charter - swahili.pdf",
  };
  const handleDownload = () => {
    const filePath = files[language];
    const link = document.createElement("a");
    link.href = filePath;
    link.download = filePath.split("/").pop(); // get file name
    link.click();
  };

  return (
    <div>
      <LoampHeader isMobile={isMobile} gotoPage={gotoPage} showMarqees={true} />

      <div className="pt-20"></div>

      <div className="w-full ">
        <div className="flex flex-col h-auto px-4 sm:px-16 md:px-8 lg:px-32 xl:px-32 2xl:px-64">
          <div className="w-full p-4 ">
            {/* Welcome */}
            <div
              className=""
              // style={{
              //   backgroundImage: `url(${background})`,
              //   backgroundAttachment: 'fixed',
              //   backgroundSize: 'contain',
              //   backgroundPosition: 'center',
              // }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-6"
              >
                <div className="bg-white xs:p-8 py-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4">
                    <h2 className="text-4xl font-semibold text-black mb-4">
                      Welcome to the League of{" "}
                      <span className="text-theme">African</span> Ambassadors!
                    </h2>
                    <p className="text-lg text-black mb-4 ">
                      Step into a world of diplomacy and unity. At the League of
                      African Ambassadors, we extend a warm embrace to you,
                      visionary diplomats and global leaders.
                    </p>

                    <div
                      onClick={() => {
                        navigate("/about-us");
                      }}
                      style={{ width: "176px", borderWidth: "1px" }}
                      className="text-center  border-theme bg-theme rounded-lg px-4 py-2 text-black text-sm  mx-1 
                      cursor-pointer
                      hover:text-theme hover:bg-black
                      "
                    >
                      Learn More
                    </div>
                  </div>
                </div>

                <div className="bg-white relative">
                  <div className="flex w-full items-center justify-center">
                    <img
                      src={logoFull}
                      className="w-[300px] "
                      style={{
                        // width: "100%",
                        // height: "100%",
                        objectFit: "cover",
                        // userSelect: "none",
                        // pointerEvents: "none",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Intro */}
            <div
              className=""
              // style={{
              //   backgroundImage: `url(${background})`,
              //   backgroundAttachment: 'fixed',
              //   backgroundSize: 'contain',
              //   backgroundPosition: 'center',
              // }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2  mb-8 mt-6"
              >
                <div className="bg-white relative">
                  <div className="absolute top-0 right-0 w-28 h-16 bg-theme"></div>
                  <div className="flex w-full items-center justify-center">
                    <img
                      src={president}
                      // className="h-96"
                      className="h-[90%]"
                      
                      style={{
                        width: "100%",
                        // height: "auto",
                        objectFit: "contain",
                        // userSelect: "none",
                        // pointerEvents: "none",
                      }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-28 h-24 bg-theme"></div>
                </div>

                <div className="bg-theme p-8 ">
                  <div className="flex flex-col items-start mb-4">
                    <motion.h1
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="text-2xl font-bold text-black mb-2"
                    >
                      <div className="flex flex-col items-start justify-center mt-0 mb-2 w-full">
                        <p
                          className="mb-2"
                          style={{
                            color: "",
                            fontWeight: "700",
                            fontSize: "24px",
                          }}
                        >
                          From the Desk of the President
                        </p>
                        <TitleLine />
                      </div>
                    </motion.h1>
                    <p className="text-lg text-black mb-4 text-justify">
                      Welcome to the League of African Ambassadors, a body of
                      Ambassadors and High Commissioners of African descent
                      worldwide. The surge of Pan-African unity and momentum has
                      notably increased in recent years. Recognizing that our
                      collective strength, resilience, and unity are essential
                      for accelerated development is not merely a concept, but a
                      tangible pathway toward our shared aspirations for a
                      flourishing Africa. Business bodies, professionals, NGOs,
                      and religious groups have become vanguards, embracing an
                      African-centric mindset and operations. As senior members
                      of the diplomatic community, we are committed to uniting
                      African diplomacy. Join us — <strong>WE ARE LOUDER AND STRONGER
                      TOGETHER.</strong>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* The Charter */}
            <div
              className=""
              // style={{
              //   backgroundImage: `url(${background})`,
              //   backgroundAttachment: 'fixed',
              //   backgroundSize: 'contain',
              //   backgroundPosition: 'center',
              // }}
            >
              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl font-bold text-black mb-2"
              >
                <div className="flex flex-col items-start justify-center mt-16 mb-2  w-full">
                  <p
                    className="mb-2"
                    style={{ color: "", fontWeight: "700", fontSize: "24px" }}
                  >
                    The Charter
                  </p>
                  <TitleLine />
                </div>
              </motion.h1>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2  mb-8 mt-6"
              >
                <div className="bg-white relative">
                  <div className="absolute top-0 right-0 w-28 h-16 bg-white"></div>
                  <div className="flex w-full items-center justify-center">
                    <img
                      src={charter}
                      className=""
                      style={{
                        // width: "100%",
                        // height: "auto",
                        objectFit: "contain",
                        // userSelect: "none",
                        // pointerEvents: "none",
                      }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-28 h-24 bg-white"></div>
                </div>

                <div className="bg-white sm:p-8 pb-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4">
                    {/* <div className="p-2 mb-4 rounded-md bg-theme flex items-center justify-center">
                      <MonetizationOnIcon className="text-white text-3xl" />
                    </div> */}
                    <h2 className="text-lg font-semibold text-black mb-4">
                      Adopted on the 17th of October, 2023
                    </h2>
                    {/* <p className="text-lg text-black mb-4">
                      #
                    </p> */}
                    <p className="text-lg text-black mb-4 text-justify">
                      Our mission is to transform Africa into a prosperous,
                      healthy, and united continent through Pan-African
                      Diplomacy. We aim to foster economic growth, ensure access
                      to quality healthcare, and build a resilient and diverse
                      Africa. Our commitment is to leverage diplomacy to attract
                      investments, stimulate trade, advocate for effective
                      health policies, and strengthen unity among African
                      nations, thereby contributing to the well-being and
                      prosperity of all Africans. Our mission is to transform
                      Africa into a prosperous, healthy, and united continent
                      through Pan-African Diplomacy.
                    </p>

                    {/* <div
                      // onClick={() => { navigate('/'); }}
                      style={{ width: "176px", borderWidth: "1px" }}
                      className="text-center  border-theme bg-theme rounded-lg px-4 py-2 text-black text-sm cursor-pointer font-semibold 
                      cursor-pointer
                      hover:text-theme hover:bg-black"
                    >
                      Download
                    </div> */}

                    <div className="flex flex-col items-start gap-4 mt-2 w-full">
                      {/* Language Radios */}
                      <div className="flex flex-wrap gap-4 mb-2 w-sull">
                        {[
                          "portuguese",
                          "english",
                          "french",
                          "arabic",
                          "swahili",
                        ].map((lang) => (
                          <label
                            key={lang}
                            className="flex items-center gap-2 mb-2  font-medium cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="language"
                              value={lang}
                              checked={language === lang}
                              onChange={() => setLanguage(lang)}
                              className="text-theme focus:ring-theme accent-theme"
                            />
                            {lang.charAt(0).toUpperCase() + lang.slice(1)}
                          </label>
                        ))}
                      </div>

                      {/* Download Button */}
                      <div
                        onClick={handleDownload}
                        style={{ width: "176px", borderWidth: "1px" }}
                        className="text-center border-theme bg-theme rounded-lg px-4 py-2 text-black text-sm font-semibold cursor-pointer hover:text-theme hover:bg-black"
                      >
                        Download
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Our History */}
            <div
              className=""
              // style={{
              //   backgroundImage: `url(${background})`,
              //   backgroundAttachment: 'fixed',
              //   backgroundSize: 'contain',
              //   backgroundPosition: 'center',
              // }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className=" flex items-center justify-center "
              >
                <div className="mx-auto">
                  <div
                    className="mb-12"
                    // style={{
                    // backgroundImage: `url(${background})`,
                    // backgroundAttachment: 'fixed',
                    // backgroundSize: 'contain',
                    // backgroundPosition: 'center',
                    // }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 50 }} // Start faded and below
                      animate={{ opacity: 1, y: 0 }} // Fade in and move up
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 1.0,
                      }} // Smooth animation
                      className="flex flex-col w-full h-full items-center justify-center mt-4"
                    >
                      <div className="flex flex-col items-start justify-center mt-0 mb-2  w-full">
                        <p
                          className="mb-2"
                          style={{
                            color: "",
                            fontWeight: "700",
                            fontSize: "24px",
                          }}
                        >
                          Our History
                        </p>
                        <TitleLine />
                      </div>

                      <div className="flex flex-col sm:flex-row ">
                        <div className="">
                          <p
                            className="text-lg mt-4 pt-2 text-justify"
                            style={{  }}
                          >
                            The League of African Ambassadors was established
                            following a webinar conference organized by the
                            Conference of Ambassadors and High Commissioners of
                            Nigeria in August 2022. Dr. Arikana Chihombori-Quao,
                            a prominent pan-Africanist, emphasized the need for
                            African ambassadors to unite and speak with one
                            voice on African issues. A Concept Note titled
                            "Formation of the League of African Ambassadors" was
                            circulated among African ambassadors globally,
                            garnering widespread support. A planning committee,
                            led by Julius Adebowale Adesina, was formed to
                            organize further discussions involving ambassadors
                            from various African countries. Subsequently, a
                            Board of Conveners was established to oversee the
                            league's activities. Membership quickly grew to 140
                            ambassadors from across Africa and the world. The
                            league's charter was ratified in October 2023, and
                            an interim Executive Committee was formed to manage
                            its affairs until official elections could be held.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Who We Are */}
            <div
              className=""
              // style={{
              //   backgroundImage: `url(${background})`,
              //   backgroundAttachment: 'fixed',
              //   backgroundSize: 'contain',
              //   backgroundPosition: 'center',
              // }}
            >
              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl font-bold text-black mb-2"
              >
                <div className="flex flex-col items-start justify-center mt-16 mb-2  w-full">
                  <p
                    className="mb-2"
                    style={{ color: "", fontWeight: "700", fontSize: "24px" }}
                  >
                    Who We Are
                  </p>
                  <TitleLine />
                </div>
              </motion.h1>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-6"
              >
                <div className="bg-softTheme p-3 sm:p-8  rounded-lg">
                  <div className="flex flex-col items-start mb-4 rounded-t-lg bg-theme">
                    <div className="p-4  rounded-lg bg-theme flex items-center justify-center">
                      <div className="flex items-center gap-3">
                        <FontAwesomeIcon
                          icon={faBullseye}
                          className="text-softTheme text-2xl"
                        />
                        <h2 className="text-2xl font-semibold text-black">
                          Our Mission
                        </h2>
                      </div>
                    </div>
                    {/* <h2 className="text-2xl font-semibold text-black">
                      Vision
                    </h2> */}
                  </div>
                  <p className="text-lg text-black text-justify">
                    Our mission is to catalyse the transformation of Africa into
                    a prosperous, healthy, and unified continent through the
                    principles of Pan-African Diplomacy. We are dedicated to
                    promoting economic advancement, facilitating equitable
                    access to high-quality Education and healthcare, and
                    cultivating a resilient and inclusive Africa. Our pledge
                    entails harnessing the power of diplomacy to attract
                    investments, facilitate trade and investment, champion
                    effective healthcare policies and peacful co-existence, and
                    fortify solidarity among African nations. In doing so, we
                    aspire to foster fellowship among the members of the league
                    and the collective well-being and prosperity of all
                    Africans.
                  </p>
                </div>

                <div className="bg-softTheme p-3 sm:p-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4 rounded-t-lg bg-theme ">
                    <div className="p-4  rounded-lg bg-theme flex items-center justify-center">
                      <div className="flex items-center gap-3">
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-softTheme text-2xl"
                        />
                        <h2 className="text-2xl font-semibold text-black">
                          Our Vision
                        </h2>
                      </div>
                    </div>
                    {/* <h2 className="text-2xl font-semibold text-black">
                      Vision
                    </h2> */}
                  </div>
                  <p className="text-lg text-black  text-justify">
                    We, envision a future where Africa's engagement on the
                    international stage shall be on equel respect , dignity and
                    mutual gain. Our vision is to leverage on diplomatic
                    relations to build partnerships, address continental
                    challenges, and promote sustainable development. We aim to
                    create a platform that uses diplomacy to foster peace,
                    unity, and growth, enhancing the quality of life in Africa
                    and strengthening its global standing. Through our efforts,
                    we aspire to significantly contribute to Africa’s holistic
                    development and prosperity, African content and model.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Featured Articles */}
            <div
              className=""
              // style={{
              //   backgroundImage: `url(${background})`,
              //   backgroundAttachment: 'fixed',
              //   backgroundSize: 'contain',
              //   backgroundPosition: 'center',
              // }}
            >
              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl font-bold text-black mb-2"
              >
                <div className="flex flex-col items-start justify-center mt-16 mb-2  w-full">
                  <p
                    className="mb-2"
                    style={{ color: "", fontWeight: "700", fontSize: "24px" }}
                  >
                    Featured Articles
                  </p>
                  <TitleLine />
                </div>
              </motion.h1>

              <div className="flex flex-col md:flex-row  w-full">
                <div className="rounded-lg my-4  w-full">
                  <div className="mt-0">
                    <div className="">
                      <div className="flex w-full">
                        <div className="" style={{ width: "100%" }}>
                          {isDataloading ? (
                            <Loading />
                          ) : (
                            <div className="grid gap-4 grid-cols-1 ">
                              {newsData.map((news, index) => (
                                <motion.div
                                  // initial={{
                                  //   scale: 0.8,
                                  //   opacity: 0,
                                  // }}
                                  // animate={{ scale: 1, opacity: 1 }}
                                  // transition={{
                                  //   delay: 0.6,
                                  //   duration: 0.5,
                                  // }}
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: 0.6, duration: 0.5 }}
                                  className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-6"
                                  key={index}
                                >
                                  <div className="bg-white relative">
                                    <div className="absolute top-0 right-0 w-28 h-16 bg-white"></div>
                                    <div className="flex w-full items-center justify-center">
                                      <img
                                        src={
                                          import.meta.env.VITE_API_URL +
                                          news.cover_image
                                        }
                                        alt="Cover Image"
                                        className="h-60 w-full object-cover"
                                        style={
                                          {
                                            // width: "100%",
                                            // height: "auto",
                                            // objectFit: "contain",
                                            // userSelect: "none",
                                            // pointerEvents: "none",
                                          }
                                        }
                                      />
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-28 h-24 bg-white"></div>
                                  </div>

                                  <div className="bg-white p-0 rounded-lg">
                                    <div className="flex flex-col items-start mb-4">
                                      {/* <div className="p-2 mb-4 rounded-md bg-theme flex items-center justify-center">
                                                                  <MonetizationOnIcon className="text-white text-3xl" />
                                                                </div> */}
                                      <h2 className="text-lg font-semibold text-black mb-4">
                                        {news.publication_name}
                                      </h2>
                                      <p className="text-lg text-black mb-4 text-justify">
                                        {news.publication_content}
                                      </p>

                                      <div
                                        // onClick={() => { navigate('/'); }}
                                        style={{
                                          width: "176px",
                                          borderWidth: "1px",
                                        }}
                                        className="text-center  border-theme bg-white text-theme rounded-lg px-4 py-2 text-sm  font-semibold 
                                                    cursor-pointer
                      hover:text-theme hover:bg-black
                      "
                                      >
                                        Read More
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Events */}
            <div
              className=""
              // style={{
              //   backgroundImage: `url(${background})`,
              //   backgroundAttachment: 'fixed',
              //   backgroundSize: 'contain',
              //   backgroundPosition: 'center',
              // }}
            >
              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl font-bold text-black mb-2"
              >
                <div className="flex flex-col items-start justify-center mt-16 mb-2  w-full">
                  <p
                    className="mb-2"
                    style={{ color: "", fontWeight: "700", fontSize: "24px" }}
                  >
                    Latest Events
                  </p>
                  <TitleLine />
                </div>
              </motion.h1>

              {/* <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-6"
              >
                <div className="bg-softTheme p-8 rounded-lg">
                  <p className="text-lg text-black">Our</p>
                </div>
              </motion.div> */}

              <div className="flex flex-col md:flex-row  w-full">
                <div className="rounded-lg my-4  w-full">
                  <div className="mt-0">
                    <div className="bg-white">
                      <div className="flex w-full">
                        <div className="" style={{ width: "100%" }}>
                          {isDataloading ? (
                            <Loading />
                          ) : (
                            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                              {eventsData.map((event, index) => (
                                <div
                                  key={index}
                                  className="flex flex-col justify-between items-start rounded-lg my-0 p-2 w-full border-1 border-black bg-white cursor-pointer  transition-colors duration-300 ease-in-out hover:border-theme"
                                  // onClick={(e) => navigateToAppointments()}
                                >
                                  <div className="relative w-full">
                                    <img
                                      src={
                                        import.meta.env.VITE_API_URL +
                                        event.cover_image
                                      }
                                      alt="Cover Image"
                                      className="w-full h-50 object-cover rounded-lg p-1 cursor-pointer"
                                      // onClick={() =>
                                      //   setPreviewSrc(
                                      //     import.meta.env.VITE_API_URL + event.cover_image
                                      //   )
                                      // }
                                    />

                                    {/* Status badge at bottom-left */}
                                    <div className="absolute bottom-3 left-3">
                                      <p className="mr-2 text-black mb-1 px-3 py-1 bg-theme rounded-md w-fit text-sm">
                                        {event.status == "Active"
                                          ? "Current"
                                          : "Previous"}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="p-2 flex flex-col w-full ">
                                    {/* New: Time, Calendar, Location */}
                                    <div className="flex flex-col gap-1 my-2">
                                      <div className="flex">
                                        <p className="text-sm text-gray-600 flex items-center mr-4">
                                          <FontAwesomeIcon
                                            icon={faClock}
                                            className="text-theme mr-2"
                                          />
                                          {event?.event_datetime
                                                                                                  ? format(
                                                                                                      new Date(
                                                                                                        event.event_datetime
                                                                                                      ),
                                                                                                      "h:mm a"
                                                                                                    )
                                                                                                  : "N/A"}
                                        </p>
                                        <p className="text-sm text-gray-600 flex items-center">
                                          <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                            className="text-theme mr-2"
                                          />
                                          {/* {event.event_datetime} */}
                                          {event?.event_datetime
                                                                                                  ? format(
                                                                                                      new Date(
                                                                                                        event.event_datetime
                                                                                                      ),
                                                                                                      "MMMM d, yyyy"
                                                                                                    )
                                                                                                  : "N/A"}
                                        </p>
                                      </div>
                                      <p className="text-sm text-gray-600 flex items-center overflow-hidden truncate max-w-[200px] ml-1">
                                        <FontAwesomeIcon
                                          icon={faMapMarkerAlt}
                                          className="text-theme mr-2"
                                        />
                                        {event.location || "No location set"}
                                      </p>
                                    </div>

                                    <div className="flex flex-col ">
                                      <h3 className="text-lg font-bold text-black mb-1">
                                        {event.name}
                                      </h3>
                                      {/* <p className="text-sm text-darkTheme mb-1 line-clamp-2">
                                                                  {event.event_datetime}
                                                                </p> */}
                                    </div>
                                    <div className="flex flex-col ">
                                      <p className=" text-black mb-1">
                                        {event.description}
                                      </p>
                                    </div>

                                    <div className="w-full flex justify-end ">
                                      {/* <div className="flex flex-col mt-2">
                                                                  <h3 className=" font-bold text-black mb-1">
                                                                    {"No of RSVP"}
                                                                  </h3>
                                                                  <p className="text-sm text-darkTheme mb-1 line-clamp-2">
                                                                    {"# People"}
                                                                  </p>
                                                                </div> */}
                                      <div
                                        className="flex items-center"
                                        style={{ height: "40px" }}
                                      >
                                        <div
                                          onClick={() => {
                                            // navigate("/admin-create-events");
                                          }}
                                          // style={{ width: "176px" }}
                                          className="text-center  py-2 px-4  font-bold text-black text-sm cursor-pointer hover:text-theme  transition-colors duration-300 ease-in-out"
                                        >
                                          View More
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flagship Projects */}
            <div
              className=""
              // style={{
              //   backgroundImage: `url(${background})`,
              //   backgroundAttachment: 'fixed',
              //   backgroundSize: 'contain',
              //   backgroundPosition: 'center',
              // }}
            >
              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl font-bold text-black mb-2"
              >
                <div className="flex flex-col items-start justify-center mt-16 mb-2  w-full">
                  <p
                    className="mb-2"
                    style={{ color: "", fontWeight: "700", fontSize: "24px" }}
                  >
                    Flagship Projects
                  </p>
                  <TitleLine />
                </div>
              </motion.h1>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-6"
              >
                <div className="bg-softTheme p-3 sm:p-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4">
                    <div className="p-4 mb-4 rounded-lg bg-theme flex items-center justify-center">
                      {/* <MonetizationOnIcon className="text-white text-3xl" /> */}
                    </div>
                    <h2 className="text-lg font-semibold text-black mb-4">
                      League of African Ambassadors Trust Fund
                    </h2>
                    <p className="text-lg text-black">
                      To ameliorate the post-service living standards of former
                      ambassadors, the League of African Ambassadors envisions
                      the establishment of TRUST FUNDS aimed at empowering
                      subscribed members of the league to ensure that they
                      access quality health care services, school fees for their
                      wards, and solutions for housing challenges or any other
                      areas of preffered need while also utilizing the expertise
                      and resources of these former ambassadors for the
                      betterment of society long after their diplomatic service
                      has ended.
                    </p>
                  </div>
                </div>

                <div className="bg-softTheme p-3 sm:p-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4">
                    <div className="p-4 mb-4 rounded-lg bg-theme flex items-center justify-center">
                      {/* <VolunteerActivismIcon className="text-white text-3xl" /> */}
                    </div>
                    <h2 className="text-lg font-semibold text-black mb-4">
                      Institute of African Foreign Policy & Strategic Studies
                    </h2>
                    <p className="text-lg text-black">
                      Pursuant to the vision of the league of African
                      Ambassadors, as enshrined in the CHARTER, to establish an
                      Africentric knowledge bank, the league aims to establish
                      the INSTITUTE OF AFRICAN FOREIGN POLICY AND STRATEGIC
                      STUDIES to offer Executive Courses, Seminars, Retreats,
                      Conferences, Trainings and Retraining for African Foreign
                      Policy Framers and Practicioners with peculiar African
                      approach to diplomatic engagements and international
                      relations.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <LoampFooter gotoPage={gotoPage} />
    </div>
  );
}
