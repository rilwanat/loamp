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
            }}
            style={{ width: "128px", borderWidth: "1px" }}
            className="text-center border-theme bg-theme rounded-lg px-4 py-2 text-white text-sm cursor-pointer mx-1"
          >
            Okay
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationModal;
