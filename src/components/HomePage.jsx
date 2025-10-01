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

export default function HomePage({ isMobile }) {
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

      <div className="w-full ">
        <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 ">
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
                      Welcome to the League of{" "}
                      <span className="text-theme">African</span> Ambassadors!
                    </h2>
                    <p className="text-lg text-black mb-4">
                      Step into a world of diplomacy and unity. At the League of
                      African Ambassadors, we extend a warm embrace to you,
                      visionary diplomats and global leaders.
                    </p>

                    <div
                      // onClick={() => { navigate('/'); }}
                      style={{ width: "176px", borderWidth: "1px" }}
                      className="text-center  border-theme bg-theme rounded-lg px-4 py-2 text-black text-sm cursor-pointer mx-1"
                    >
                      Learn More
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

            {/* Intro */}
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
                className="grid grid-cols-1 md:grid-cols-2  mb-8 mt-6"
              >
                <div className="bg-white relative">
                  <div className="absolute top-0 right-0 w-28 h-16 bg-theme"></div>
                  <div className="flex w-full items-center justify-center">
                    <img
                      src={president}
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
                  <div className="absolute bottom-0 left-0 w-28 h-24 bg-theme"></div>
                </div>

                <div className="bg-theme p-8 ">
                  <div className="flex flex-col items-start mb-4">
                    <motion.h1
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="text-2xl font-bold text-black mb-2"
                    >
                      <div className="flex flex-col items-start justify-center mt-16 mb-2 w-full">
                        <p
                          className="mb-2"
                          style={{
                            color: "",
                            fontWeight: "700",
                            fontSize: "24px",
                          }}
                        >
                          From the Desk of the President
                        </p>
                        <TitleLine />
                      </div>
                    </motion.h1>
                    <p className="text-lg text-black mb-4">
                      Welcome to the League of African Ambassadors, A body of
                      Ambassadors and High Commissioners of the African decent
                      world over. The surge of awareness of Pan-African unity
                      and momentum has been notably increased in recent years.
                      The recognition that our collective strength, resilience,
                      and unity are essential ingredients for accelerated
                      development is not merely a conceptual ideal, but a
                      tangible pathway towards realizing our shared aspirations
                      for a flourishing Africa. Various business bodies,
                      professionals, non-governmental organizations, and
                      religious groups have emerged as vanguards, actively
                      embracing an African-centric approach in both mindset and
                      operations. As the highest ranking officers in the
                      diplomatic community we are committed to uniting African
                      diplomacy, Join us! WE ARE LOUDER AND STRONGER TOGETHER.
                    </p>
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
                      // onClick={() => { navigate('/'); }}
                      style={{ width: "176px", borderWidth: "1px" }}
                      className="text-center  border-theme bg-theme rounded-lg px-4 py-2 text-black text-sm cursor-pointer font-semibold"
                    >
                      Download
                    </div>
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

            {/* Who We Are */}
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
                    Who We Are
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
                <div className="bg-softTheme p-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4">
                    <div className="p-4 mb-4 rounded-lg bg-theme flex items-center justify-center">
                      {/* <MonetizationOnIcon className="text-white text-3xl" /> */}
                    </div>
                    <h2 className="text-2xl font-semibold text-black">
                      Mission
                    </h2>
                  </div>
                  <p className="text-lg text-black">
                    Our mission is to catalyse the transformation of Africa into
                    a prosperous, healthy, and unified continent through the
                    principles of Pan-African Diplomacy. We are dedicated to
                    promoting economic advancement, facilitating equitable
                    access to high-quality Education and healthcare, and
                    cultivating a resilient and inclusive Africa. Our pledge
                    entails harnessing the power of diplomacy to attract
                    investments, facilitate trade and investment, champion
                    effective healthcare policies and peacful co-existence, and
                    fortify solidarity among African nations. In doing so, we
                    aspire to foster fellowship among the members of the league
                    and the collective well-being and prosperity of all
                    Africans.
                  </p>
                </div>

                <div className="bg-softTheme p-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4">
                    <div className="p-4 mb-4 rounded-lg bg-theme flex items-center justify-center">
                      {/* <VolunteerActivismIcon className="text-white text-3xl" /> */}
                    </div>
                    <h2 className="text-2xl font-semibold text-black">
                      Vision
                    </h2>
                  </div>
                  <p className="text-lg text-black">
                    We, envision a future where Africa's engagement on the
                    international stage shall be on equel respect , dignity and
                    mutual gain. Our vision is to leverage on diplomatic
                    relations to build partnerships, address continental
                    challenges, and promote sustainable development. We aim to
                    create a platform that uses diplomacy to foster peace,
                    unity, and growth, enhancing the quality of life in Africa
                    and strengthening its global standing. Through our efforts,
                    we aspire to significantly contribute to Africa’s holistic
                    development and prosperity, African content and model.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Featured Articles */}
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
                    Featured Articles
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
                      src={fa1}
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
                      ZAMBIA GOVERNMENT PLEDGES SUPPORT FOR LEAGUE OF AFRICAN
                      AMBASSADORS
                    </h2>
                    <p className="text-lg text-black mb-4">Lusaka, Zambia.</p>
                    <p className="text-lg text-black mb-4">
                      In a significant development, the planning committee for
                      the official launch of the League of African Ambassadors
                      (LAA) paid a courtesy. Patrick Kangwa...
                    </p>

                    <div
                      // onClick={() => { navigate('/'); }}
                      style={{ width: "176px", borderWidth: "1px" }}
                      className="text-center  border-theme bg-white text-theme rounded-lg px-4 py-2 text-sm cursor-pointer font-semibold"
                    >
                      Read More
                    </div>
                  </div>
                </div>
              </motion.div>

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
                      src={fa2}
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
                      REPORT ON COURTESY VISIT TO DEAN OF DIPLOMATIC CORPS
                    </h2>
                    {/* <p className="text-lg text-black mb-4">
                      Lusaka, Zambia.
                    </p> */}
                    <p className="text-lg text-black mb-4">
                      The President of the League of African Ambassadors (LAA),
                      Amb. Nwanne Ominyi, was in a courtesy visit to the Dean of
                      the Diplomatic Corps of the Republic of Zambia, His
                      Excellency Ambassador Dr. Walid Hassan, Ambassador of the
                      State of Palestine...
                    </p>

                    <div
                      // onClick={() => { navigate('/'); }}
                      style={{ width: "176px", borderWidth: "1px" }}
                      className="text-center  border-theme bg-white text-theme rounded-lg px-4 py-2 text-sm cursor-pointer font-semibold"
                    >
                      Read More
                    </div>
                  </div>
                </div>
              </motion.div>

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
                      src={fa3}
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
                      League of African Ambassadors Meeting at Republic of
                      Angola Embassy, Nigeria
                    </h2>
                    {/* <p className="text-lg text-black mb-4">
                      Lusaka, Zambia.
                    </p> */}
                    <p className="text-lg text-black mb-4">
                      In a remarkable display of unity and purpose, African
                      diplomatic representatives gathered at the Republic of
                      Angola Embassy in Nigeria on May 2, 2024,. This gathering,
                      attended by esteemed delegates including His Excellency
                      Jose Bamoquina Zau, the Angola Ambassador to Nigeria and
                      Dean of the SADC group, as...
                    </p>
                    <div
                      // onClick={() => { navigate('/'); }}
                      style={{ width: "176px", borderWidth: "1px" }}
                      className="text-center  border-theme bg-white text-theme rounded-lg px-4 py-2 text-sm cursor-pointer font-semibold"
                    >
                      Read More
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Latest Events */}
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
                    Latest Events
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
                <div className="bg-softTheme p-8 rounded-lg">
                  <p className="text-lg text-black">Our</p>
                </div>
              </motion.div>
            </div>

            {/* Flagship Projects */}
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
                    Flagship Projects
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
                <div className="bg-softTheme p-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4">
                    <div className="p-4 mb-4 rounded-lg bg-theme flex items-center justify-center">
                      {/* <MonetizationOnIcon className="text-white text-3xl" /> */}
                    </div>
                    <h2 className="text-lg font-semibold text-black">
                      League of African Ambassadors Trust Fund
                    </h2>
                  </div>
                </div>

                <div className="bg-softTheme p-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4">
                    <div className="p-4 mb-4 rounded-lg bg-theme flex items-center justify-center">
                      {/* <VolunteerActivismIcon className="text-white text-3xl" /> */}
                    </div>
                    <h2 className="text-lg font-semibold text-black">
                      Institute Of African Foreign Policy and Strategic Studies
                    </h2>
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
