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
import { faCalendarAlt, faGlobe } from "@fortawesome/free-solid-svg-icons";

import NotificationModal from "./modals/NotificationModal";

//
import axiosInstance from "../auth/axiosConfig"; // Ensure the correct relative path
import { setCookie, isMemberAuthenticated } from "../auth/authUtils"; // Ensure the correct relative path
import { jwtDecode } from "jwt-decode";
import { getCookie, deleteCookie } from "../auth/authUtils"; // Import getCookie function
//

export default function MembersPage({ isMobile }) {
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

  const currentPageName = "Members";

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

  const [membersData, setMembersData] = useState([]);
  useEffect(() => {
    handleData();
  }, []);
  const handleData = async () => {
    setIsDataLoading(true);

    try {
      // API payment to get  count
      const eventsEndpoint =
        (import.meta.env.VITE_IS_LIVE === "true"
          ? import.meta.env.VITE_API_SERVER_URL
          : import.meta.env.VITE_API_DEMO_SERVER_URL) +
        import.meta.env.VITE_READ_ALL_MEMBERS_ALPHABETIC;
      // alert(adminPaymentsEndpoint);
      const eventsResponse = await axiosInstance.get(eventsEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMembersData(eventsResponse.data.data); // Update state with  count

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
                  placeholder="Search for a Member"
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
                  className="flex flex-col flex-grow  rounded-lg   pb-4 mt-0 mb-12  "
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
                                Our Members
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
                                <div className="bg-softTheme">
                                  <div className="flex w-full">
                                    <div className="" style={{ width: "100%" }}>
                                      {isDataloading ? (
                                        <Loading />
                                      ) : (
                                        <div className="flex flex-col gap-8">
                                          {Object.keys(membersData)
                                            .sort()
                                            .map((letter) => (
                                              <div
                                                key={letter}
                                                className="flex flex-col  rounded-lg"
                                              >
                                                {/* Alphabet Header */}
                                                <div className=" px-2 pt-2 mb-4">
                                                <h2 className="text-lg font-bold text-black mb-0">
                                                  {letter}
                                                </h2>
                                                </div> 

                                                {/* Members Grid */}
                                                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                                  {membersData[letter].map(
                                                    (member, index) => (
                                                      <div
                                                        key={index}
                                                        className="flex justify-between items-center rounded-lg p-3 border border-gray-300 bg-white cursor-pointer transition-colors duration-300 ease-in-out hover:border-theme"
                                                      >
                                                        {/* Left: Name & Role */}
                                                        <div className="flex flex-col">
                                                          <p className="font-semibold text-sm mb-2">
                                                            {member.last_name}{" "}
                                                            {member.first_name}
                                                          </p>
                                                          <p className="text-sm text-gray-600 mb-2">
                                                            <FontAwesomeIcon
                                                              icon={faGlobe}
                                                              className="text-theme mr-2"
                                                            />
                                                            {member.region}
                                                          </p>
                                                          <p className="text-sm text-gray-600">
                                                            <FontAwesomeIcon
                                                              icon={
                                                                faCalendarAlt
                                                              }
                                                              className="text-theme mr-2"
                                                            />
                                                            {
                                                              member.registration_date
                                                            }
                                                          </p>
                                                        </div>

                                                        {/* Right: enrolment type */}
                                                        {/* <div className="text-sm bg-red-600 text-white px-3 py-1 rounded-md">
                {member.enrolment_type}
              </div> */}
                                                      </div>
                                                    )
                                                  )}
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
