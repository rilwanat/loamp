import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LoampHeader from "../../navbar/LoampHeader.jsx";
import LoampFooter from "../../navbar/LoampFooter.jsx";

import TitleLine from "../../widgets/TitleLine.jsx";
import FileUpload from "../../widgets/FileUpload.jsx";
import LoadingScreen from "../../widgets/LoadingScreen.jsx";

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

import NotificationModal from "../modals/NotificationModal";

//
import axiosInstance from "../../auth/axiosConfig"; // Ensure the correct relative path
import { setCookie, isMemberAuthenticated } from "../../auth/authUtils"; // Ensure the correct relative path
import { jwtDecode } from "jwt-decode";
import { getCookie, deleteCookie } from "../../auth/authUtils"; // Import getCookie function
//

export default function UploadDocumentsPage({
  isMobile,
  memberDetails,
  refreshMemberDetails,
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
  //   if (memberDetails?.email_address) {
  //     refreshMemberDetails();
  //   }
  // }, [memberDetails?.email_address]);

  useEffect(() => {
    refreshMemberDetails();
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

  const [letterOfCredence, setLetterOfCredence] = useState(null);
  const [passportDataPage, setPassportDataPage] = useState(null);
  const [intlPassport, setIntlPassport] = useState(null);
  const [idCard, setIdCard] = useState(null);
  const [otherDocs, setOtherDocs] = useState(null);

  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const [serverResponse, setServerResponse] = useState("");

  const handleSkip = async (e) => {
    e.preventDefault();
    navigate("/user-dashboard");
    return;
  };

  // File validation before upload
  const validateAndAppendFiles = (formData) => {
    const requiredFiles = [
      {
        field: "letter_of_credence",
        value: letterOfCredence,
        label: "Letter Of Credence",
      },
      {
        field: "passport_data_page",
        value: passportDataPage,
        label: "Passport Data Page",
      },
      {
        field: "intl_passport",
        value: intlPassport,
        label: "International Passport",
      },
      { field: "id_card", value: idCard, label: "ID Card" },
      {
        field: "other_docs",
        value: otherDocs,
        label: "Other Supporting Documents",
      },
    ];

    for (let file of requiredFiles) {
      if (!file.value) {
        openNotificationModal(
          false,
          "Upload Documents",
          `Select a ${file.label} to upload`
        );
        return false; // Stop execution if missing
      }
      formData.append(file.field, file.value);
    }

    return true; // All files present
  };

  const [errorMessage, setErrorMessage] = useState("");
  const handleUpload = async (e) => {
    // alert("memberDetails: " + JSON.stringify(memberDetails, null, 2));
    // if (memberDetails === null) {
    //   openNotificationModal(false, "Upload Documents", `You are not logged in. Please register or login to send your help request.`);

    //   return;
    // }

    //    alert("here");

    e.preventDefault();
    setErrorMessage({ message: "" });

    try {
      const formData = new FormData();
      formData.append("email", memberDetails.email_address);

      //Documents validations
      if (!validateAndAppendFiles(formData)) return;

      setIsUploadLoading(true);

      //  alert("requestData: " + JSON.stringify(requestData, null, 2));

      const response = await axiosInstance.post(
        (import.meta.env.VITE_IS_LIVE === "true"
          ? import.meta.env.VITE_API_SERVER_URL
          : import.meta.env.VITE_API_DEMO_SERVER_URL) +
          import.meta.env.VITE_USER_UPLOAD_DOCS,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            //  'Content-Type': 'application/json',
          },
        }
      );

      setIsUploadLoading(false);
      // alert(memberDetails.email_address);
      //  alert(JSON.stringify(response.data, null, 2));
      // return;

      if (response.data.status) {
        // If login is successful
        setErrorMessage({ message: "" });

        setLetterOfCredence(null);
        setPassportDataPage(null);
        setIntlPassport(null);
        setIdCard(null);
        setOtherDocs(null);


        //
// const token = response.data.token;
//         const decodedToken = jwtDecode(token);
//         // alert(JSON.stringify(decodedToken), null, 2);

//         const expirationDays =
//           (decodedToken.exp - decodedToken.iat) / (24 * 60 * 60);
//         // alert(expirationDays * (24 * 60 * 60)); //seconds

//         setCookie("loamp-member-token", token, expirationDays);
        setCookie("loamp-member-details", JSON.stringify(response.data.memberData));
        //

        openNotificationModal(true, "Upload Documents", response.data.message);
      } else {
        const errors = response.data.errors.map((error) => error.msg);
        setErrorMessage({ message: response.data.message, errors });
        //alert("Failed1");
      }
    } catch (error) {
      setIsUploadLoading(false);

       alert(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setErrorMessage({ message: errorMessage });

        openNotificationModal(false, "Upload Documents", errorMessage);
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.errors
      ) {
        const { errors } = error.response.data;
        const errorMessages = errors.map((error) => error.msg);
        const errorMessage = errorMessages.join(", "); // Join all error messages
        setErrorMessage({ message: errorMessage });

        openNotificationModal(false, "Upload Documents", errorMessage);
      } else {
        setErrorMessage({
          message:
            "Upload Documents failed. Please check your data and try again.",
        });

        openNotificationModal(
          false,
          "Upload Documents",
          "Please check your data and try again."
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

                <div className="w-full rounded-lg ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 h-full sm:h-screen  w-full mt-4">
                    <div className="hidden md:flex flex-col justify-center items-center h-screen">
                      <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden">
                        <h2 className="text-4xl text-black font-bold text-center mt-12 mb-4">
                          Upload relevant Documents to complete your{" "}
                          <span className="text-theme">African</span>{" "}
                          Ambassadors membership!
                        </h2>
                        <img src={africa} className="w-full object-contain" />
                      </div>
                    </div>

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

<div className="mt-4 bg-softTheme p-4 border border-theme rounded-lg">
  <FileUpload
    label="Letter of Credence"
    file={letterOfCredence}
    setFile={setLetterOfCredence}
  />
  {letterOfCredence && (
    letterOfCredence.type === "application/pdf" ? (
      <embed
        src={URL.createObjectURL(letterOfCredence)}
        type="application/pdf"
        width="100%"
        height="500px"
        className="border border-theme rounded-md shadow-sm"
      />
    ) : (
      <img
        src={URL.createObjectURL(letterOfCredence)}
        alt="Letter of Credence Preview"
        className="sm:w-64 sm:h-64 w-full h-[100%] object-contain  p-1 rounded-md shadow-sm"
      />
    )
  )}
</div>

<div className="mt-4 bg-softTheme p-4 border border-theme rounded-lg">
  <FileUpload
    label="Data page of Diplomatic Passport"
    file={passportDataPage}
    setFile={setPassportDataPage}
  />
  {passportDataPage && (
    passportDataPage.type === "application/pdf" ? (
      <embed
        src={URL.createObjectURL(passportDataPage)}
        type="application/pdf"
        width="100%"
        height="500px"
        className="border border-theme rounded-md shadow-sm"
      />
    ) : (
      <img
        src={URL.createObjectURL(passportDataPage)}
        alt="Diplomatic Passport Preview"
        className="sm:w-64 sm:h-64 w-full h-[100%] object-contain  p-1 rounded-md shadow-sm"
      />
    )
  )}
</div>

<div className="mt-4 bg-softTheme p-4 border border-theme rounded-lg">
  <FileUpload
    label="International Passport"
    file={intlPassport}
    setFile={setIntlPassport}
  />
  {intlPassport && (
    intlPassport.type === "application/pdf" ? (
      <embed
        src={URL.createObjectURL(intlPassport)}
        type="application/pdf"
        width="100%"
        height="500px"
        className="border border-theme rounded-md shadow-sm"
      />
    ) : (
      <img
        src={URL.createObjectURL(intlPassport)}
        alt="International Passport Preview"
        className="sm:w-64 sm:h-64 w-full h-[100%] object-contain  p-1 rounded-md shadow-sm"
      />
    )
  )}
</div>

<div className="mt-4 bg-softTheme p-4 border border-theme rounded-lg">
  <FileUpload
    label="ID Card"
    file={idCard}
    setFile={setIdCard}
  />
  {idCard && (
    idCard.type === "application/pdf" ? (
      <embed
        src={URL.createObjectURL(idCard)}
        type="application/pdf"
        width="100%"
        height="500px"
        className="border border-theme rounded-md shadow-sm"
      />
    ) : (
      <img
        src={URL.createObjectURL(idCard)}
        alt="ID Card Preview"
        className="sm:w-64 sm:h-64 w-full h-[100%] object-contain  p-1 rounded-md shadow-sm"
      />
    )
  )}
</div>

<div className="mt-4 bg-softTheme p-4 border border-theme rounded-lg">
  <FileUpload
    label="Other Relevant Documents"
    file={otherDocs}
    setFile={setOtherDocs}
  />
  {otherDocs && (
    otherDocs.type === "application/pdf" ? (
      <embed
        src={URL.createObjectURL(otherDocs)}
        type="application/pdf"
        width="100%"
        height="500px"
        className="border border-theme rounded-md shadow-sm"
      />
    ) : (
      <img
        src={URL.createObjectURL(otherDocs)}
        alt="Other Docs Preview"
        className="sm:w-64 sm:h-64 w-full h-[100%] object-contain  p-1 rounded-md shadow-sm"
      />
    )
  )}
</div>



                          <div className="flex justify-between text-black py-2 mt-2">
                            <p className="flex items-center text-xs">
                              <input className="mr-2" type="checkbox" />I Agree
                              to Terms of Service and Privacy Policy and to our
                              User Agreement and acknowledge reading our User
                              Privacy Notice.
                            </p>
                            {/* <p>Forgot Password</p> */}
                          </div>
                          <div className="flex flex-col md:flex-row gap-4 w-full mt-2">
                            <button
                              className="w-full md:w-auto flex-1 py-2 bg-gray-300 text-black font-semibold cursor-pointer"
                              type="button"
                              style={{ borderRadius: "8px" }}
                              onClick={handleSkip}
                              disabled={isUploadLoading}
                            >
                              {isUploadLoading ? <LoadingScreen /> : "Skip"}
                            </button>
                            <button
                              className="w-full md:w-auto flex-1 py-2 bg-theme text-black font-semibold cursor-pointer"
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

                          <div className="flex justify-center text-black py-2 text-sm">
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
