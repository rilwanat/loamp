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

import NotificationModal from "./modals/NotificationModal";

//
import axiosInstance from "../auth/axiosConfig"; // Ensure the correct relative path
import { setCookie, isMemberAuthenticated } from "../auth/authUtils"; // Ensure the correct relative path
import { jwtDecode } from "jwt-decode";
import { getCookie, deleteCookie } from "../auth/authUtils"; // Import getCookie function
//

export default function PublicationsPage({ isMobile }) {
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
  useEffect(() => {
    handleData();
  }, []);
  const handleData = async () => {
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

  return (
    <div>
      <LoampHeader isMobile={isMobile} gotoPage={gotoPage} showMarqees={true} />

      <div className="pt-10"></div>

      <div className="flex h-auto px-4 sm:px-16 md:px-8">
        {/* {isMobile ? (
                <div></div>
              ) : (
                <AdminSideNavbar currentPageName={currentPageName} />
              )} */}

        <div
          className="w-full rounded-lg "
          // style={{ borderRadius: '8px' }}
        >
          <div className="bg-gray-50 p-4 rounded-lg pt-20 sm:pt-20">
            <div className="flex flex-row w-full justify-between mx-4 items-center">
              <div
                className="cursor-pointer hover:text-theme hover:bg-black bg-theme rounded-md px-2 py-2 invisible"
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
                  placeholder="Search for an Article"
                  className="pl-14 border border-gray-300 rounded-lg py-1 px-2 mx-4 focus:outline-none focus:border-1 focus:border-theme"
                  // onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>

          <div className="flex w-full">
            <div className="w-full">
              <div className="flex w-full md:flex-row flex-col z-20">
                <div
                  className="flex flex-col flex-grow  rounded-lg   pb-4 mt-0 mb-12"
                  style={{ flexBasis: "50%" }}
                >
                  <div className="flex mt-4">
                    <div className="w-full">
                      <div className="mb-4">
                        <div className="flex flex-col items-start w-full  sm:mt-0 bg-white rounded-lg p-4">
                          <div className="flex w-full items-center justify-between  ">
                            {/* <div className="font-semibold ">Upcoming Events</div> */}
                            <div className="flex flex-col items-start justify-center mt-0 mb-2 w-full">
                              <p
                                className="mb-2"
                                style={{
                                  color: "",
                                  fontWeight: "700",
                                  fontSize: "24px",
                                }}
                              >
                                Featured Articles
                              </p>
                              <TitleLine />
                            </div>

                            {/* <>
                                    <div
                                      className="flex items-center"
                                      style={{ height: "40px" }}
                                    >
                                      <div
                                        onClick={() => {
                                          
                                        }}
                                        // style={{ width: "176px" }}
                                        className="text-center shadow-lg  bg-theme rounded-lg py-2 px-4 mx-4  text-black text-sm cursor-pointer hover:text-theme hover:bg-black transition-colors duration-300 ease-in-out"
                                      >
                                        Create New Event
                                      </div>
                                    </div>
                                  </> */}
                          </div>

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
                                              initial={{
                                                scale: 0.8,
                                                opacity: 0,
                                              }}
                                              animate={{ scale: 1, opacity: 1 }}
                                              transition={{
                                                delay: 0.6,
                                                duration: 0.5,
                                              }}
                                              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-6"
                                              key={index}
                                            >
                                              <div className="bg-white relative">
                                                <div className="absolute top-0 right-0 w-28 h-16 bg-white"></div>
                                                <div className="flex w-full items-center justify-center">
                                                  <img
                                                    src={
                                                      import.meta.env
                                                        .VITE_API_URL +
                                                      news.cover_image
                                                    }
                                                    alt="Cover Image"
                                                    className="h-60 w-full object-cover"
                                                    style={{
                                                      // width: "100%",
                                                      // height: "auto",
                                                      // objectFit: "contain",
                                                      // userSelect: "none",
                                                      // pointerEvents: "none",
                                                    }}
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
                                                  <p className="text-lg text-black mb-4">
                                                    {news.publication_content}
                                                  </p>

                                                  <div
                                                    // onClick={() => { navigate('/'); }}
                                                    style={{
                                                      width: "176px",
                                                      borderWidth: "1px",
                                                    }}
                                                    className="text-center  border-theme bg-white text-theme rounded-lg px-4 py-2 text-sm cursor-pointer font-semibold"
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
