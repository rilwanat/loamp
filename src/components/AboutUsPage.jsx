import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LoampHeader from "../navbar/LoampHeader.jsx";
import LoampFooter from "../navbar/LoampFooter.jsx";

import TitleLine from "../widgets/TitleLine.jsx";

import logo from "../assets/images/logo.png";
import fa1 from "../assets/images/home/fa-1.jpg";
import fa2 from "../assets/images/home/fa-2.jpg";
import fa3 from "../assets/images/home/fa-3.jpg";
import charter from "../assets/images/home/charter.webp";
import president from "../assets/images/home/president.webp";

export default function AboutUsPage({ isMobile }) {
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
                <div className="bg-white p-8 rounded-lg">
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
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-6"
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

                <div className="bg-white p-8 rounded-lg">
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

                    <div
                      className="mb-8 flex border-2 border-theme items-center text-black bg-theme rounded-md px2 justify-center font-bold hover:text-white hover:bg-black cursor-pointer"
                      style={{ height: "40px", width: "160px" }}
                      // onClick={() => {navigateTo('/');}}
                    >
                      Download
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
