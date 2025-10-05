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
  faUsers, 
  faGift, 
  faHandHoldingHeart, 
  faCalendarAlt, 
  faFileInvoiceDollar, 
  faHandshake, 
} from "@fortawesome/free-solid-svg-icons";

export default function SupportPage({ isMobile }) {
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
                      Sources of Funding for the{" "}
                      <span className="text-theme">League</span>
                    </h2>
                    <p className="text-lg text-black mb-4">
                      A distinguished organization comprising African
                      Ambassadors, stands as a beacon of diplomatic unity and
                      collaboration across the continent. The league, committed
                      to fostering camaraderie and advancing diplomatic
                      excellence, relies on a diverse set of funding sources to
                      support its impactful initiatives and programs.
                    </p>

                    <div
                      className="mb-8 flex border-2 border-theme items-center text-white bg-theme rounded-md px2 justify-center font-bold hover:text-white hover:bg-black cursor-pointer"
                      style={{ height: "40px", width: "160px" }}
                      // onClick={() => {navigateTo('/');}}
                    >
                      Support Now
                    </div>
                  </div>
                </div>

                <div className="bg-white relative">
                  <div className="flex w-full items-center justify-center">
                    <img
                      src={logo}
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

            {/* Our Funding Sources */}
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
                    Our Funding Sources
                  </p>
                  <TitleLine />
                </div>
              </motion.h1>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-6"
              >
                <div className="bg-softTheme p-3 sm:p-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4">
                    <div className="p-4 mb-4 rounded-lg bg-theme flex items-center justify-center">
                      <FontAwesomeIcon icon={faUsers} className="text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-black">
                      Membership Contributions
                    </h2>
                  </div>
                  <p className="text-lg text-black">
                    Regular fees from committed members sustain the league's
                    operations and development.
                  </p>
                </div>

                <div className="bg-softTheme p-3 sm:p-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4">
                    <div className="p-4 mb-4 rounded-lg bg-theme flex items-center justify-center">
                      <FontAwesomeIcon icon={faGift} className="text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-black">
                      Gifts and Donations
                    </h2>
                  </div>
                  <p className="text-lg text-black">
                    Generous contributions from individuals and entities bolster
                    the league's capacity for impactful projects.
                  </p>
                </div>

                <div className="bg-softTheme p-3 sm:p-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4">
                    <div className="p-4 mb-4 rounded-lg bg-theme flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faHandHoldingHeart}
                        className="text-white"
                      />
                    </div>
                    <h2 className="text-xl font-semibold text-black">
                      Endowments
                    </h2>
                  </div>
                  <p className="text-lg text-black">
                    The resulting investment income from endowment is earmarked
                    for supporting and bringing to fruition, the League's
                    mission and vision.
                  </p>
                </div>

                <div className="bg-softTheme p-3 sm:p-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4">
                    <div className="p-4 mb-4 rounded-lg bg-theme flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="text-white"
                      />
                    </div>
                    <h2 className="text-xl font-semibold text-black">
                      Special Programs
                    </h2>
                  </div>
                  <p className="text-lg text-black">
                    Royalties and proceeds from special programs of the League,
                    facilitate the actualization of impactful projects and
                    initiatives.
                  </p>
                </div>

                <div className="bg-softTheme p-3 sm:p-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4">
                    <div className="p-4 mb-4 rounded-lg bg-theme flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faFileInvoiceDollar}
                        className="text-white"
                      />
                    </div>
                    <h2 className="text-xl font-semibold text-black">
                      Special Levies and Subscriptions
                    </h2>
                  </div>
                  <p className="text-lg text-black">
                    These are additional fees or charges proposed and approved
                    to fund specific projects, upgrades, or improvements within
                    the organisation.
                  </p>
                </div>

                <div className="bg-softTheme p-3 sm:p-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4">
                    <div className="p-4 mb-4 rounded-lg bg-theme flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faHandshake}
                        className="text-white"
                      />
                    </div>
                    <h2 className="text-xl font-semibold text-black">Grant</h2>
                  </div>
                  <p className="text-lg text-black">
                    Advocacy for sponsorship and grants within Africa allows the
                    league to broaden its impact towards diplomatic excellence.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Past Sponsors and Partners */}
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
                    Past Sponsors and Partners
                  </p>
                  <TitleLine />
                </div>
              </motion.h1>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-6"
              >
                <div className="bg-softTheme p-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4">
                    <div className="p-4 mb-4 rounded-lg bg-theme flex items-center justify-center">
                      {/* <MonetizationOnIcon className="text-white text-3xl" /> */}
                    </div>
                    <h2 className="text-2xl font-semibold text-black">
                      Mission
                    </h2>
                  </div>
                  <p className="text-lg text-black">Our</p>
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
