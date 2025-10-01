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

export default function EventsPage({ isMobile }) {
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
        <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 ">
          <div className="w-full p-4 "></div>
        </div>
      </div>
      <LoampFooter gotoPage={gotoPage} />
    </div>
  );
}
