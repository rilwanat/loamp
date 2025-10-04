import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LoampHeader from "../navbar/LoampHeader.jsx";
import LoampFooter from "../navbar/LoampFooter.jsx";

import TitleLine from "../widgets/TitleLine.jsx";
import FileUpload from "../widgets/FileUpload.jsx";

import Loading from "../widgets/Loading";
import MiniLoading from "../widgets/MiniLoading";

import logo from "../assets/images/logo.png";
import fa1 from "../assets/images/home/fa-1.jpg";
import fa2 from "../assets/images/home/fa-2.jpg";
import fa3 from "../assets/images/home/fa-3.jpg";
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

export default function AboutUsPage({ isMobile }) {
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

  const currentPageName = "About Us";

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

  const [executivesData, setExecutivesData] = useState([]);
  // useEffect(() => {
  //   handleDataExecutives();
  // }, []);
  const handleDataExecutives = async () => {
    setIsDataLoading(true);

    try {
      // API payment to get  count
      const executivesEndpoint =
        (import.meta.env.VITE_IS_LIVE === "true"
          ? import.meta.env.VITE_API_SERVER_URL
          : import.meta.env.VITE_API_DEMO_SERVER_URL) +
        import.meta.env.VITE_READ_ALL_EXECUTIVES;
      // alert(adminPaymentsEndpoint);
      const executivesResponse = await axiosInstance.get(executivesEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setExecutivesData(executivesResponse.data.data); // Update state with  count

      // openNotificationModal(true, currentPageName, "");
      // alert(JSON.stringify(executivesResponse.data.data), null, 2); // Update state with payments count

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

    const [trusteesData, setTrusteesData] = useState([]);
  // useEffect(() => {
  //   handleDataExecutives();
  // }, []);
  const handleDataTrustees = async () => {
    setIsDataLoading(true);

    try {
      // API payment to get  count
      const trusteesEndpoint =
        (import.meta.env.VITE_IS_LIVE === "true"
          ? import.meta.env.VITE_API_SERVER_URL
          : import.meta.env.VITE_API_DEMO_SERVER_URL) +
        import.meta.env.VITE_READ_ALL_TRUSTEES;
      // alert(adminPaymentsEndpoint);
      const trusteesResponse = await axiosInstance.get(trusteesEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTrusteesData(trusteesResponse.data.data); // Update state with  count

      // openNotificationModal(true, currentPageName, "");
      // alert(JSON.stringify(executivesResponse.data.data), null, 2); // Update state with payments count

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
    handleDataExecutives();
    handleDataTrustees();
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

      <div className="w-full">
        <div className="flex flex-col h-auto px-4 sm:px-16 md:px-8 ">
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
                      Shaping the Future of{" "}
                      <span className="text-theme">Diplomacy</span>
                    </h2>
                    <p className="text-lg text-black mb-4">
                      At the League of African Ambassadors, we stand at the
                      intersection of diplomacy, unity, and progress.
                    </p>

                    {/* <div
                      className="mb-8 flex border-2 border-theme items-center text-white bg-theme rounded-md px2 justify-center font-bold hover:text-white hover:bg-black cursor-pointer"
                      style={{ height: "40px", width: "160px" }}
                      // onClick={() => {navigateTo('/');}}
                    >
                      Learn More
                    </div> */}
                  </div>
                </div>

                <div className="bg-white relative">
                  <div className="flex w-full items-center justify-center">
                    <img
                      src={logo}
                      className=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        // userSelect: "none",
                        // pointerEvents: "none",
                      }}
                    />
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
                            className="mt-4 pt-2 text-justify"
                            style={{ fontSize: "18px" }}
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
                        width: "100%",
                        height: "auto",
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
                    <p className="text-lg text-black mb-4">
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

                    <div className="flex flex-col items-start gap-4 mt-2">
                      {/* Language Radios */}
                      <div className="flex gap-4 mb-2">
                        {[
                          "portuguese",
                          "english",
                          "french",
                          "arabic",
                          "swahili",
                        ].map((lang) => (
                          <label
                            key={lang}
                            className="flex items-center gap-1 text-sm font-medium cursor-pointer"
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

            {/* Our Executives */}
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
                    Our Executives
                  </p>
                  <TitleLine />
                </div>
              </motion.h1>

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
                              {executivesData.map((executive, index) => (
                                <div
                                  key={index}
                                  className="flex flex-col justify-between items-start rounded-lg my-0 p-0 w-full border-1 border-black bg-white cursor-pointer  transition-colors duration-300 ease-in-out hover:border-theme"
                                  // onClick={(e) => navigateToAppointments()}
                                >
                                  <div className="relative w-full">
                                    <img
                                      src={
                                        import.meta.env.VITE_API_URL +
                                        executive.cover_image
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
                                    {/* <div className="absolute bottom-3 left-3">
                                      <p className="mr-2 text-black mb-1 px-3 py-1 bg-theme rounded-md w-fit text-sm">
                                        {event.status == "Active"
                                          ? "Upcoming"
                                          : "Past"}
                                      </p>
                                    </div> */}
                                  </div>

                                  <div className="p-2 flex flex-col w-full ">
                                    <div className="flex flex-col ">
                                      <h3 className="text-sm font-semibold text-gray-500 mb-1">
                                        {executive.title}
                                      </h3>
                                      <h3 className="text-md font-bold text-black mb-1">
                                        {executive.name}
                                      </h3>
                                      <p className="text-sm text-darkTheme mb-1 line-clamp-3">
                                        {executive.region}
                                      </p>
                                    </div>
                                    <div className="flex flex-col ">
                                      <p className=" text-black mb-1">
                                        {executive.short_bio}
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
                                          className="text-center  py-2 px-4  font-semibold text-black text-xs cursor-pointer hover:text-theme  transition-colors duration-300 ease-in-out"
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

            {/* Board of Trustees */}
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
                    Board of Trustees
                  </p>
                  <TitleLine />
                </div>
              </motion.h1>

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
                              {trusteesData.map((trustee, index) => (
                                <div
                                  key={index}
                                  className="flex flex-col justify-between items-start rounded-lg my-0 p-0 w-full border-1 border-black bg-white cursor-pointer  transition-colors duration-300 ease-in-out hover:border-theme"
                                  // onClick={(e) => navigateToAppointments()}
                                >
                                  <div className="relative w-full">
                                    <img
                                      src={
                                        import.meta.env.VITE_API_URL +
                                        trustee.cover_image
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
                                    {/* <div className="absolute bottom-3 left-3">
                                      <p className="mr-2 text-black mb-1 px-3 py-1 bg-theme rounded-md w-fit text-sm">
                                        {event.status == "Active"
                                          ? "Upcoming"
                                          : "Past"}
                                      </p>
                                    </div> */}
                                  </div>

                                  <div className="p-2 flex flex-col w-full ">
                                    <div className="flex flex-col ">
                                      <h3 className="text-md font-semibold text-black mb-1">
                                        {trustee.country}
                                      </h3>
                                      <h3 className="text-md font-bold text-black mb-1">
                                        {trustee.name}
                                      </h3>
                                      <p className="text-sm text-darkTheme mb-1 line-clamp-3">
                                        {trustee.event_datetime}
                                      </p>
                                    </div>
                                    <div className="flex flex-col ">
                                      <p className=" text-black mb-1">
                                        {trustee.description}
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
                                          className="text-center  py-2 px-4  font-semibold text-black text-xs cursor-pointer hover:text-theme  transition-colors duration-300 ease-in-out"
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
          </div>
        </div>
      </div>
      <LoampFooter gotoPage={gotoPage} />
    </div>
  );
}
