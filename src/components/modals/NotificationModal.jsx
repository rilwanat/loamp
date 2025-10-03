import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck, // ✅ CheckCircle
  faCircleXmark, // ❌ Cancel
  faCircleInfo, // ℹ️ Info
} from "@fortawesome/free-solid-svg-icons";

const customModalStyles = {
  content: {
    maxHeight: "340px",
    maxWidth: "480px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "30px",
    zIndex: 5000,
  },
};

const NotificationModal = ({
  isOpen,
  onRequestClose,
  notificationType,
  notificationMessage,
  gotoPage,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Notification"
      style={customModalStyles}
      shouldCloseOnOverlayClick={false}
    >
      <div className="flex flex-col w-full px-4 pt-4 z-7000">
        <div className="flex justify-center mt-4">
          {notificationType === null ? (
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="text-theme"
              style={{ width: "64px", height: "64px" }}
            />
          ) : notificationType === true ? (
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-green"
              style={{ width: "64px", height: "64px" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="text-red-500"
              style={{ width: "64px", height: "64px" }}
            />
          )}
        </div>

        <div className="flex justify-center w-full my-4 text-center">
          {notificationMessage}
        </div>

        <div className="flex justify-center">
          <div
            onClick={() => {
              onRequestClose();

              // window.location.reload(true);
              // window.location.href = "/";

              if (notificationMessage == "Please check your mail for a verification code.") {
                gotoPage("login");
              }

              //
              if (notificationMessage == "Login successful.") {
                gotoPage("user-dashboard");
              }
              if (notificationMessage == "Login successful. Upload your documents.") {
                gotoPage("user-upload-documents");
              }
              if (notificationMessage == "Please verify your email to continue.") {
                gotoPage("user-verify-email");
              }
              //

              if (notificationMessage == "Email verification successful.") {
                gotoPage("user-upload-documents");
              }

              if (notificationMessage == "All documents uploaded successfully.") {
                gotoPage("user-dashboard");
              }




              if (notificationMessage == "Admin Login successful.") {
                gotoPage("admin-dashboard");
              }

              

              if (notificationMessage == "Publication created successfully.") {
                gotoPage("admin-news");
              }
              if (notificationMessage == "Event created successfully.") {
                gotoPage("admin-events");
              }
              
              
              
              
              
              if (notificationMessage == "Super-Admin Login successful.") {
                gotoPage("super-admin-dashboard");
              }
              
            }}
            style={{ width: "128px" }}
            className="text-center font-semibold  bg-theme hover:text-theme hover:bg-black rounded-lg px-4 py-2 text-black text-sm cursor-pointer mx-1"
          >
            Okay
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationModal;
