import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import LoampFooter from "../LoampFooter";

import styles from "./SuperAdminMobileNavbar.module.css";
import { NavLink } from "react-router-dom";
import { navData } from "./SuperAdminNavData";

import logo from "../../assets/images/logo.png";
import logo2 from "../../assets/images/logo-2.png";

// import PersonIcon from '@mui/icons-material/Person';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import { getCookie, deleteCookie } from "../../auth/authUtils"; // Import getCookie function
// import CloseIcon from '@mui/icons-material/Close';
import styled from "@emotion/styled";
import { motion } from "framer-motion";
// import { Logout } from '@mui/icons-material';

// import LogoutIcon from "@mui/icons-material/Logout";
// //

const SlideInMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 1000; /* Ensure the menu is on top of other content */
  overflow-x: hidden;
`;
const MenuContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;
const menuItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
};

const SlideInAccount = styled(motion.div)`
  position: fixed;
  top: 0rem;
  right: 0;
  width: calc(100% - 2rem);
  height: 70vh;
  /*background-color: rgba(0, 0, 0, 0.5);  Semi-transparent background */
  z-index: 1000; /* Ensure the menu is on top of other content */
  overflow-x: hidden;

  @media (min-width: 960px) {
    width: 40%;
  }
`;
const AccountContent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f3ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;
const AccountContentInner = styled.div`
  height: 100%; /* Ensure the inner content fills the container */
  max-height: 100%; /* Limit the height to the container's height */
  overflow-y: auto; /* Enable vertical scrolling if content overflows */
`;
const accountItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
};
//

export default function SuperAdminMobileNavbar({
  isLive,
  parsedAdminData,
  gotoPage,
}) {
  const navigate = useNavigate();

  const [isMenuOpen, setMenuOpen] = useState(false);

  const MenuNavData = navData.filter((item) => item.id >= 1 && item.id <= 11);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  return (
    <div className="bg-theme shadow-lg px-4" style={{ height: "80px" }}>
      <div className="flex justify-between items-center relative h-[80px]">
        {/* Logo (absolute on left) */}
        <div className="absolute top-2  flex items-center bg-white p-2 rounded-full">
          <img
            className="block h-20 w-auto max-w-none"
            src={logo2}
            alt="Logo"
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* Hamburger (absolute on right) */}
        <div className="absolute top-6 right-4 flex gap-2">
          {/* < LoampButton /> */}

          {/* Hamburger (absolute on right) */}
          <div
            className="flex justify-end p-2 rounded-md 
                        bg-softTheme cursor-pointer
                        hover:text-theme hover:bg-black z-20
                        "
          >
            <FontAwesomeIcon
              icon={faBars}
              size="lg"
              className=""
              onClick={toggleMenu}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {/* Slide-in menu */}
      <SlideInMenu
        initial={{ x: "-100%" }}
        animate={{ x: isMenuOpen ? 0 : "-100%" }}
        transition={{ duration: 0.4 }}
        className=""
      >
        <MenuContent className="">
          <div className="">
            <div className="flex justify-between items-center pl-4 pr-8  bg-gradient-to-r from-theme to-theme shadow-lg h-[80px]">
              <div className=" mt-8 flex items-center bg-white p-2 rounded-full">
                <img
                  className="block h-20 w-auto max-w-none"
                  src={logo2}
                  alt="Logo"
                  onClick={() => {
                    navigate("/");
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <FontAwesomeIcon
                icon={faTimes}
                className="text-black cursor-pointer  p-2"
                onClick={toggleMenu}
              />
            </div>
            {/* <hr /> */}
            {/* Apply variants to each menu item */}
            <div className="mt-8 pb-2 mx-6">
              <motion.span
                variants={menuItemVariants}
                initial="hidden"
                animate={isMenuOpen ? "visible" : "hidden"}
                className="text-md text-red-500 cursor-pointer block py-4 px-8 hover:bg-theme"
                onClick={() => {
                  deleteCookie("super-admin");
                  // toggleMenu();
                  window.location.href = "/";
                }}
              >
                Logout
              </motion.span>

              <hr className=" border-gray-300" />
            </div>
          </div>
          {/* Fixed div at the bottom */}
          <div className="fixed bottom-0 left-0 w-full py-4">
            <div className="mx-8">
              {/* <hr className='my-2'/> */}
              {/* <div className='flex justify-between items-center'>
  <a
    className="text-gray-900 text-sm font-bold cursor-pointer block my-2"
    onClick={() => { }}
  >
    CONNECT TO YOUR ACCOUNT
  </a>
  <AccountCircleOutlinedIcon onClick={toggleMenu} style={{ cursor: 'pointer' }}/>
</div> */}
            </div>

            {/* <LoampFooter /> */}
          </div>
        </MenuContent>
      </SlideInMenu>
    </div>
  );
}
