import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LoampHeader from "../../navbar/LoampHeader.jsx";
import LoampFooter from "../../navbar/LoampFooter.jsx";

import AdminSideNavbar from "../../navbar/admin/AdminSideNavbar.jsx";

import TitleLine from "../../widgets/TitleLine.jsx";
import FileUpload from "../../widgets/FileUpload.jsx";
import LoadingScreen from "../../widgets/LoadingScreen.jsx";

import logo from "../../assets/images/logo-512x512.png";



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
import axiosAdminInstance from "../../auth/axiosAdminConfig.js"; // Ensure the correct relative path
import { setCookie, isAdminAuthenticated } from "../../auth/authUtils.jsx"; // Ensure the correct relative path
import { jwtDecode } from "jwt-decode";
import { getCookie, deleteCookie } from "../../auth/authUtils.jsx"; // Import getCookie function
//



export default function AdminCreateEventsPage({
  isMobile,
  adminDetails,
  refreshAdminDetails,
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
  //   if (adminDetails?.email_address) {
  //     refreshAdminDetails();
  //   }
  // }, [adminDetails?.email_address]);

  useEffect(() => {
    refreshAdminDetails();
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

  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const [serverResponse, setServerResponse] = useState("");

  const currentPageName = "Create New Event";

    const [coverImage, setCoverImage] = useState(null);
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [ticketType, setTicketType] = useState("");
    
    
  // File validation before upload
  const validateAndAppendFiles = (formData) => {
    const requiredFiles = [
      {
        field: "cover_image",
        value: coverImage,
        label: "Cover Image",
      }
    ];

    for (let file of requiredFiles) {
      if (!file.value) {
        openNotificationModal(
          false,
          "Upload Cover Image",
          `Select a ${file.label} to upload`
        );
        return false; // Stop execution if missing
      }
      formData.append(file.field, file.value);
    }

    return true; // All files present
  };

  const [errorMessage, setErrorMessage] = useState("");
  const handleCreatePublication = async (e) => {
    e.preventDefault();
    setErrorMessage({ message: "" });

    if (coverImage && coverImage.size > 2 * 1024 * 1024) {
  openNotificationModal(false, "Upload Error", "File size cannot exceed 2MB");
  return;
}





    if (eventName  === "" 
      || eventDescription === ""
      || eventTime === ""
      || eventDate === ""
      || eventLocation === ""
      || ticketType === ""
    ) {
      setErrorMessage({
        message: "Create Event Failed: Please enter valid details",
      });
      openNotificationModal(
        false,
        "Create Event",
        "Create Event Failed: Please enter valid details."
      );
      // setRegistrationStatus("Failed");
      setIsCreateLoading(false);

      //alert("");
      return;
    }


    // alert("User: " + email + " " + firstname + " " + lastname);
    setIsCreateLoading(true);

    try {
      const formData = new FormData();
      formData.append("event_name", eventName);
      formData.append("event_description", eventDescription);
      formData.append("event_time", eventTime);
      formData.append("event_date", eventDate);
      formData.append("event_location", eventLocation);
      formData.append("ticket_type", ticketType);
      formData.append("created_by", adminDetails.first_name + " " + adminDetails.last_name);
      formData.append("last_updated_by", adminDetails.first_name + " " + adminDetails.last_name);

      //Documents validations
      if (!validateAndAppendFiles(formData)) return;

      // alert(JSON.stringify(requestData, null, 2));
      // alert((import.meta.env.VITE_IS_LIVE === "true"
      //     ? import.meta.env.VITE_API_SERVER_URL
      //     : import.meta.env.VITE_API_DEMO_SERVER_URL) +
      //     import.meta.env.VITE_ADMIN_CREATE_PUBLICATION);

      const response = await axiosAdminInstance.post(
        (import.meta.env.VITE_IS_LIVE === "true"
          ? import.meta.env.VITE_API_SERVER_URL
          : import.meta.env.VITE_API_DEMO_SERVER_URL) +
          import.meta.env.VITE_ADMIN_CREATE_EVENT,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            // "Content-Type": "application/json",
          },
        }
      );

      setIsCreateLoading(false);
      // alert(JSON.stringify(response.data, null, 2));
      // return;

      if (response.data.status) {
        // If registration is successful
        setErrorMessage({ message: "" });

        setCoverImage(null);
        setEventName("");
        setEventDescription("");
        setEventTime("");
        setEventDate("");
        setEventLocation("");
        setTicketType("");


openNotificationModal(
              true,
              "Creation Successful",
              response.data.message
            );


        // toggleAccountForSignIn();
      } else {
        // If there are errors in the response
        const errors = response.data.errors.map((error) => error.msg);
        const errorMessage = errors.join(", ");
        setErrorMessage({ message: errorMessage });
        // alert("Registration Failed");

        openNotificationModal(false, "Create Event Error", "Create Event Failed");
      }
    } catch (error) {
      setIsCreateLoading(false);
      alert(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setErrorMessage({ message: errorMessage });
        openNotificationModal(false, "Create Event Error", errorMessage);
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.errors
      ) {
        const { errors } = error.response.data;
        const errorMessages = errors.map((error) => error.msg);
        const errorMessage = errorMessages.join(", "); // Join all error messages
        setErrorMessage({ message: errorMessage });
        openNotificationModal(false, "Create Event Error", errorMessage);
      } else {
        setErrorMessage({
          message: "Create Event failed. Please check your credentials and try again.",
        });
        openNotificationModal(
          false,
          "Create Event Error",
          "Create Event failed. Please check your credentials and try again."
        );
      }
    }
  };

  return (
    <div>
      <LoampHeader isMobile={isMobile} gotoPage={gotoPage} showMarqees={true} />

      <div className="pt-10"></div>

      <div className="flex">
        {isMobile ? (
          <div></div>
        ) : (
          <AdminSideNavbar currentPageName={currentPageName} />
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
                  <div className="flex mt-4">
  <div className="w-full">
    <div className="mb-4">
    <div className="flex flex-col items-start w-full  sm:mt-0 bg-white rounded-lg p-4">

<div className="flex w-full items-center justify-between  ">
                          <div className="flex flex-col">
                            <div className="font-semibold ">
                            Create a new Event
                          </div>
                          <div className=" text-sm">
                            Create awesome events for your ambassadors
                          </div>
                          </div>
                          
                          

                          <>
                      <div
                        className="flex items-center invisible"
                        style={{ height: "40px" }}
                      >
                        <div
                          onClick={() => {
                            navigate("/admin-create-news");
                          }}
                          // style={{ width: "176px" }}
                          className="text-center shadow-lg  bg-theme rounded-lg py-2 px-4 mx-4  text-black text-sm cursor-pointer hover:text-theme hover:bg-black transition-colors duration-300 ease-in-out"
                        >
                          #
                        </div>
                      </div>
                    </>
                        </div>









    </div>
  </div>
  </div>
</div>


                  

                  <div className="flex flex-col mt-2">
                    <div className="flex flex-wrap ">
                      <div className="w-full md:w-1/1 px-2 mb-4">
                        {/* <label
                          htmlFor="first_name"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Cover Image:
                        </label> */}
                        <div className="mt-0 bg-softTheme p-4 border border-theme rounded-lg">
  <FileUpload
    label="Cover Image"
    file={coverImage}
    setFile={setCoverImage}
  />
  {coverImage && (
    coverImage.type === "application/pdf" ? (
      <embed
        src={URL.createObjectURL(coverImage)}
        type="application/pdf"
        width="100%"
        height="500px"
        className="border border-theme rounded-md shadow-sm"
      />
    ) : (
      <img
        src={URL.createObjectURL(coverImage)}
        alt="Cover Image Preview"
        className="sm:w-64 sm:h-64 w-full h-[100%] object-contain  p-1 rounded-md shadow-sm"
      />
    )
  )}
</div>                       
                        
                      </div>

                      {/* <div className="w-full md:w-1/2 px-2 mb-4">
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
                          className={`bg-gray-50 border-1 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:border-1 focus:border-theme block w-full p-2.5`}
                          placeholder="Lastname"
                          // readOnly={!editable}
                          // value={adminDetails && adminDetails.last_name}
                          // onChange={(e) => setProductData({ ...productData, productItemName: e.target.value })}
                        />
                      </div> */}
                    </div>
                  </div>

                  <div className="flex flex-col mt-2 ">
                    <div className="flex flex-wrap ">
                      <div className="w-full md:w-1/2 px-2 mb-4">
                        <label
                          htmlFor="event_name"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Event Name:
                        </label>
                        <input
                          type="text"
                          id="event_name"
                          name="event_name"
                          className={`bg-white border-1 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:border-1 focus:border-theme block w-full p-2.5`}
                          placeholder="Event Name"
                          // readOnly={true}
                          value={eventName}
                              onChange={(e) => setEventName(e.target.value)}
                        />
                      </div>

                      <div className="w-full md:w-1/2 px-2 mb-4">
                        <label
                          htmlFor="event_description"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Event Description:
                        </label>
                        <input
                          type="text"
                          id="event_description"
                          name="event_description"
                          className={`bg-white border-1 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:border-1 focus:border-theme block w-full p-2.5`}
                          placeholder="Event Description"
                          // readOnly={!editable}
                          value={eventDescription}
                              onChange={(e) => setEventDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col mt-2 ">
                    <div className="flex flex-wrap ">
                      <div className="w-full md:w-1/4 px-2 mb-4">
                        <label
                          htmlFor="event_time"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Event Time:
                        </label>
                        <input
                          type="text"
                          id="event_time"
                          name="event_time"
                          className={`bg-white border-1 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:border-1 focus:border-theme block w-full p-2.5`}
                          placeholder="Event Time"
                          // readOnly={true}
                          value={eventTime}
                              onChange={(e) => setEventTime(e.target.value)}
                        />
                      </div>

                      <div className="w-full md:w-1/4 px-2 mb-4">
                        <label
                          htmlFor="event_date"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Event Date:
                        </label>
                        <input
                          type="date"
                          id="event_date"
                          name="event_date"
                          className={` bg-white border-1 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:border-1 focus:border-theme block w-full p-2.5`}
                          placeholder="dd/mm/yyyy"
                          // readOnly={!editable}
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                        />
                      </div>

                      <div className="w-full md:w-1/4 px-2 mb-4">
                        <label
                          htmlFor="event_location"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Event Location:
                        </label>
                        <input
                          type="text"
                          id="event_location"
                          name="event_location"
                          className={`bg-white border-1 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:border-1 focus:border-theme block w-full p-2.5`}
                          placeholder="Event Location"
                          // readOnly={true}
                          value={eventLocation}
                              onChange={(e) => setEventLocation(e.target.value)}
                        />
                      </div>

                      <div className="w-full md:w-1/4 px-2 mb-4">
                        <label
                          htmlFor="ticket_type"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Ticket Type:
                        </label>
                        {/* <input
                          type="text"
                          id="ticket_type"
                          name="ticket_type"
                          className={`bg-white border-1 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:border-1 focus:border-theme block w-full p-2.5`}
                          placeholder="Ticket Type"
                          // readOnly={!editable}
                          value={ticketType}
                              onChange={(e) => setTicketType(e.target.value)}
                        /> */}
                        <select
                          id="ticket_type"
                          name="ticket_type"
                          className={` bg-white border-1 border-gray-300 text-black text-sm rounded-lg focus:outline-none focus:border-theme block w-full p-2.5`}
                          // disabled={!editable}
                          value={ticketType}
                          onChange={(e) => setTicketType(e.target.value)}
                        >
                          <option value="">Select Ticket Type</option>
                          <option value="Member">Member</option>
                          <option value="Non-Member">Non-Member</option>
                        </select>
                      </div>
                    </div>
                  </div>



                  <div className="flex justify-end items-center mt-2">
                    
                    <button
  onClick={() => navigate("/admin-news")}
  className="w-44 shadow-lg bg-gray-100 rounded-lg px-4 py-2 text-red-800 text-sm mx-1 hover:text-theme hover:bg-black transition-colors cursor-pointer"
>
  Cancel
</button>

<button
  onClick={handleCreatePublication}
  className="w-44 shadow-lg bg-theme rounded-lg px-4 py-2 text-black text-sm mx-1 hover:text-theme hover:bg-black transition-colors cursor-pointer"
>
  {isCreateLoading ? <LoadingScreen /> : "Submit"}
</button>

                    
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
