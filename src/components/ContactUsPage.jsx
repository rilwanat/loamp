import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LoampHeader from "../navbar/LoampHeader.jsx";
import LoampFooter from "../navbar/LoampFooter.jsx";

import TitleLine from "../widgets/TitleLine.jsx";

import logo from "../assets/images/logo-512x512.png";



import charter from "../assets/images/home/charter.webp";
import president from "../assets/images/home/president.webp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope, 
  faPhone, 
  faLocationDot 
} from "@fortawesome/free-solid-svg-icons";

export default function ContactUsPage({ isMobile }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const gotoPage = (pageName) => {
    navigate("/" + pageName);
  };
  const navigateTo = (route) => {
    navigate(route);
  };

  return (
    <div>
      <LoampHeader isMobile={isMobile} gotoPage={gotoPage} showMarqees={true} />

      <div className="pt-20"></div>

      <div className="w-full">
        <div className="flex flex-col h-auto flex flex-col h-auto px-4 sm:px-16 md:px-8 lg:px-32 xl:px-32 2xl:px-64">
          <div className="w-full p-4 ">
            {/* Contact Us */}
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
                    Contact Us
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
                <div className="bg-theme p-3 sm:p-8 rounded-lg">
                  <div className="flex flex-col items-start justify-center h-full mb-4">
                    <div
                      className="flex"
                      onClick={() => {
                        window.location.href =
                          "mailto:info@africanambassadors.org";
                      }}
                    >
                      <div
                        className="mr-2 mb-4"
                        style={{
                          fontWeight: "600",
                          fontSize: "16px",
                          transition: "color 0.3s ease",
                          width: "100px"
                        }}
                      >
                        <FontAwesomeIcon
                                                icon={faEnvelope}
                                                className="text-white mr-2"
                                              />Email:
                      </div>
                      <div
                        className="text-description z-50"
                        style={{
                          fontSize: "16px",
                          transition: "color 0.9s ease",
                        }}
                      >
                        info@africanambassadors.org
                      </div>
                    </div>
                    <div
                      className="flex"
                      onClick={() => {
                        window.location.href = "tel:+26077044538";
                      }}
                    >
                      <div
                        className="mr-2 mb-4"
                        style={{
                          fontWeight: "600",
                          fontSize: "16px",
                          transition: "color 0.3s ease",
                          width: "100px"
                        }}
                      >
                        <FontAwesomeIcon
                                                icon={faPhone}
                                                className="text-white mr-2"
                                              />Phone:
                      </div>
                      <div
                        className="text-description z-50"
                        style={{
                          fontSize: "16px",
                          transition: "color 0.9s ease",
                        }}
                      >
                        +26077044538
                      </div>
                    </div>
                    <div className="flex">
                      <div
                        className="mr-2 mb-4"
                        style={{
                          fontWeight: "600",
                          fontSize: "16px",
                          transition: "color 0.3s ease",
                          width: "100px"
                        }}
                      >
                        <FontAwesomeIcon
                                                icon={faLocationDot}
                                                className="text-white mr-2"
                                              />Address:
                      </div>
                      <div
                        className="text-description z-50"
                        style={{
                          fontSize: "16px",
                          transition: "color 0.9s ease",
                        }}
                      >
                        Stand No. 35187, Pelican House, <br />
              Alick Nkhata Road, Opposite Mass Media, <br />
              P.O Box 50354 Ridgeway, Lusaka, Zambia.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 sm:p-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4">
                    {/* <div className="p-2 mb-4 rounded-md bg-theme flex items-center justify-center">
                      <MonetizationOnIcon className="text-white text-3xl" />
                    </div> */}
                    <h2 className="text-lg font-semibold text-black mb-4">
                      Connect with us
                    </h2>
                    {/* <p className="text-lg text-black mb-4">
                      #
                    </p> */}
                    <p className="text-lg text-black mb-4">
                      Your engagement and participation are essential in driving
                      positive change and fostering collaboration across the
                      continent. For information about the League and its
                      activities, kindly direct your inquiries to the League's
                      contact details or explore our social media channels.
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
