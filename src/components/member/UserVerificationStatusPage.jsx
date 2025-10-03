import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LoampHeader from "../../navbar/LoampHeader.jsx";
import LoampFooter from "../../navbar/LoampFooter.jsx";

import MemberSideNavbar from "../../navbar/member/MemberSideNavbar.jsx";

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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";

import NotificationModal from "../modals/NotificationModal";

//
import axiosInstance from "../../auth/axiosConfig"; // Ensure the correct relative path
import { setCookie, isMemberAuthenticated } from "../../auth/authUtils"; // Ensure the correct relative path
import { jwtDecode } from "jwt-decode";
import { getCookie, deleteCookie } from "../../auth/authUtils"; // Import getCookie function
//

export default function UserVerificationStatusPage({
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

  const currentPageName = "Verification Status";

  const [previewSrc, setPreviewSrc] = useState(null);

  const handleSkip = async (e) => {
    e.preventDefault();
    navigate("/user-dashboard");
    return;
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
                      className="bg-white  w-full  mx-auto  p-8 px-8 rounded-lg  my-8 flex flex-col justify-center shadow-lg"
                      // onSubmit={handleUpload}
                    >
                      <div>
                        <h2 className="text-xl text-black font-bold">
                          Select or preview your files below
                          {/* to complete your{" "}
                                                        <span className="text-theme">ambassadorial</span>{" "}
                                                        profile */}
                        </h2>
                        {/* <p className='text-l text-pcGrayText my-2'>Start your 30-day free trial</p> */}

                        {/* Modal */}
                        <AnimatePresence>
                          {previewSrc && (
                            <motion.div
                              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                              onClick={() => setPreviewSrc(null)}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <motion.div
                                className="relative"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                                onClick={(e) => e.stopPropagation()} // prevent background click
                              >
                                <img
                                  src={previewSrc}
                                  alt="Document Preview"
                                  className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => setPreviewSrc(null)}
                                  className="absolute top-2 right-2 bg-black text-white py-1 px-2 cursor-pointer rounded mt-4 hover:bg-theme hover:text-black"
                                >
                                  ✕
                                </button>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-0">
                        {/* Letter of Credence */}
                        <div className="mt-4">
                          {memberDetails && memberDetails.letter_of_credence ? (
                            <div className="flex flex-col items-start space-y-2">
                              <label className="text-black">
                                {"Letter of Credence:"}
                              </label>
                              {memberDetails.letter_of_credence.endsWith(
                                ".pdf"
                              ) ? (
                                <a
                                  href={
                                    import.meta.env.VITE_API_URL +
                                    memberDetails.letter_of_credence
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-theme underline text-sm"
                                >
                                  📄 View PDF
                                </a>
                              ) : (
                                <img
                                  src={
                                    import.meta.env.VITE_API_URL +
                                    memberDetails.letter_of_credence
                                  }
                                  alt="Letter of Credence"
                                  className="sm:w-64 sm:h-64 w-full h-[100%] object-contain border border-theme p-1 rounded-md shadow-sm cursor-pointer"
                                  onClick={() =>
                                    setPreviewSrc(
                                      import.meta.env.VITE_API_URL +
                                        memberDetails.letter_of_credence
                                    )
                                  }
                                />
                              )}
                            </div>
                          ) : (
                            <FileUpload
                              label="Letter of Credence"
                              file={letterOfCredence}
                              setFile={setLetterOfCredence}
                            />
                          )}
                        </div>

                        {/* Data page of Diplomatic Passport */}
                        <div className="mt-4">
                          {memberDetails && memberDetails.passport_data_page ? (
                            <div className="flex flex-col items-start space-y-2">
                              <label className="text-black">
                                {"Data page of Diplomatic Passport:"}
                              </label>
                              {memberDetails.passport_data_page.endsWith(
                                ".pdf"
                              ) ? (
                                <a
                                  href={
                                    import.meta.env.VITE_API_URL +
                                    memberDetails.passport_data_page
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-theme underline text-sm"
                                >
                                  📄 View PDF
                                </a>
                              ) : (
                                <img
                                  src={
                                    import.meta.env.VITE_API_URL +
                                    memberDetails.passport_data_page
                                  }
                                  alt="Data page of Diplomatic Passport"
                                  className="sm:w-64 sm:h-64 w-full h-[100%] object-contain border border-theme p-1  rounded-md shadow-sm cursor-pointer"
                                  onClick={() =>
                                    setPreviewSrc(
                                      import.meta.env.VITE_API_URL +
                                        memberDetails.passport_data_page
                                    )
                                  }
                                />
                              )}
                            </div>
                          ) : (
                            <FileUpload
                              label="Data page of Diplomatic Passport"
                              file={passportDataPage}
                              setFile={setPassportDataPage}
                            />
                          )}
                        </div>

                        {/* International Passport */}
                        <div className="mt-4">
                          {memberDetails && memberDetails.intl_passport ? (
                            <div className="flex flex-col items-start space-y-2">
                              <label className="text-black">
                                {"International Passport:"}
                              </label>
                              {memberDetails.intl_passport.endsWith(".pdf") ? (
                                <a
                                  href={
                                    import.meta.env.VITE_API_URL +
                                    memberDetails.intl_passport
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-theme underline text-sm"
                                >
                                  📄 View PDF
                                </a>
                              ) : (
                                <img
                                  src={
                                    import.meta.env.VITE_API_URL +
                                    memberDetails.intl_passport
                                  }
                                  alt="International Passport"
                                  className="sm:w-64 sm:h-64 w-full h-[100%] object-contain border border-theme p-1  rounded-md shadow-sm cursor-pointer"
                                  onClick={() =>
                                    setPreviewSrc(
                                      import.meta.env.VITE_API_URL +
                                        memberDetails.intl_passport
                                    )
                                  }
                                />
                              )}
                            </div>
                          ) : (
                            <FileUpload
                              label="International Passport"
                              file={intlPassport}
                              setFile={setIntlPassport}
                            />
                          )}
                        </div>

                        {/* ID Card */}
                        <div className="mt-4">
                          {memberDetails && memberDetails.id_card ? (
                            <div className="flex flex-col items-start space-y-2">
                              <label className="text-black">{"ID Card:"}</label>
                              {memberDetails.id_card.endsWith(".pdf") ? (
                                <a
                                  href={
                                    import.meta.env.VITE_API_URL +
                                    memberDetails.id_card
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-theme underline text-sm"
                                >
                                  📄 View PDF
                                </a>
                              ) : (
                                <img
                                  src={
                                    import.meta.env.VITE_API_URL +
                                    memberDetails.id_card
                                  }
                                  alt="ID Card"
                                  className="sm:w-64 sm:h-64 w-full h-[100%] object-contain border border-theme p-1  rounded-md shadow-sm cursor-pointer"
                                  onClick={() =>
                                    setPreviewSrc(
                                      import.meta.env.VITE_API_URL +
                                        memberDetails.id_card
                                    )
                                  }
                                />
                              )}
                            </div>
                          ) : (
                            <FileUpload
                              label="ID Card"
                              file={idCard}
                              setFile={setIdCard}
                            />
                          )}
                        </div>

                        {/* Other Relevant Documents */}
                        <div className="mt-4">
                          {memberDetails && memberDetails.other_docs ? (
                            <div className="flex flex-col items-start space-y-2">
                              <label className="text-black">
                                {"Other Relevant Documents:"}
                              </label>
                              {memberDetails.other_docs.endsWith(".pdf") ? (
                                <a
                                  href={
                                    import.meta.env.VITE_API_URL +
                                    memberDetails.other_docs
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-theme underline text-sm"
                                >
                                  📄 View PDF
                                </a>
                              ) : (
                                <img
                                  src={
                                    import.meta.env.VITE_API_URL +
                                    memberDetails.other_docs
                                  }
                                  alt="Other Relevant Documents"
                                  className="sm:w-64 sm:h-64 w-full h-[100%] object-contain border border-theme p-1  rounded-md shadow-sm cursor-pointer"
                                  onClick={() =>
                                    setPreviewSrc(
                                      import.meta.env.VITE_API_URL +
                                        memberDetails.other_docs
                                    )
                                  }
                                />
                              )}
                            </div>
                          ) : (
                            <FileUpload
                              label="Other Relevant Documents"
                              file={otherDocs}
                              setFile={setOtherDocs}
                            />
                          )}
                        </div>

</div>


                        <div className="flex justify-between text-black py-2 mt-2">
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
