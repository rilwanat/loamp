import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import SearchIcon from '@mui/icons-material/Search';
// import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

// import scrappLogo from '../../../assets/images/scrapp-logo.png';
// import scrappLogo2 from '../../../assets/images/scrapp-logo-2.png';
// import scrappLogo3 from '../../../assets/images/scrapp-logo-3.png';
import logo from "../assets/images/logo.png";

// import TwitterIcon from '@mui/icons-material/Twitter';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';

// import appstore from '../../../assets/icons/app-store.png';
// import googleplay from '../../../assets/icons/google-play.png';

// import axios from 'axios';
// import axiosInstance from '../../../axiosConfig';

function LoampFooter({ gotoPage }) {
  const navigate = useNavigate();


  const [email, setEmail] = useState("");

  useEffect(() => {}, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex flex-col bg-black text-white">
      <div className="flex flex-col h-auto px-8 sm:px-16 md:px-8 py-4 pb-8">
        <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between ">
          <div className="flex flex-col md:items-start md:w-1/3 my-4 md:h-40">
            <div className="flex items-center mb-2">
              <img
                className="block h-20 w-auto max-w-none"
                src={logo}
                alt="Logo"
                onClick={() => {
                  gotoPage("");
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
            {/* <p className="text-white" style={{ color: "", fontSize: "32px" }}>
              League of{" "}
            </p> */}
            <p className="text-white text-sm">
              We aim to create a platform that uses diplomacy to foster peace,
              unity, and growth, enhancing the quality of life in Africa and
              strengthening its global standing.
            </p>
            <div className="flex mt-4">
              <div className="relative z-20">
                <ul className="flex">
                  <li className="mr-4">
                    <a href="https://www.facebook.com/" target="_blank">
                      {/* <FacebookIcon style={{cursor: "pointer", color: "#055D4F" }}/> */}
                    </a>
                  </li>
                  <li className="mr-4">
                    <a href="https://www.twitter.com/" target="_blank">
                      {/* <TwitterIcon style={{cursor: "pointer", color: "#055D4F" }}/> */}
                    </a>
                  </li>
                  <li className="mr-4">
                    <a href="https://www.instagram.com" target="_blank">
                      {/* <InstagramIcon style={{cursor: "pointer", color: "#055D4F" }}/> */}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col">
            <span
              className="text-white text-sm cursor-pointer block mb-2"
              onClick={() => {
                window.location.href = "tel:+26077044538";
              }}
            >
              Phone: +26077044538
            </span>
            <span
              className="text-white text-sm cursor-pointer block mb-2"
              onClick={() => {
                window.location.href = "mailto:info@africanambassadors.org";
              }}
            >
              Email: info@africanambassadors.org
            </span>
            <span
              className="text-white text-sm cursor-pointer block mb-2"
              onClick={() => {
                /* Handle navigation */
              }}
            >
              Address: 
              Stand No. 35187, Pelican House, <br />
              Alick Nkhata Road, Opposite Mass Media, <br />
              P.O Box 50354 Ridgeway, Lusaka, Zambia.
            </span>
          </div>
          </div>

          <div className="flex flex-col md:items-start md:w-1/3  my-4 md:h-40">
            <p
              onClick={() => {}}
              className="text-white mb-2 "
              style={{ color: "", fontSize: "20px" }}
            >
              Company Info
            </p>
            <p
              onClick={() => {
                navigate("/");
              }}
              className="text-white text-sm mb-2 cursor-pointer hover:text-theme"
              style={{ color: "", }}
            >
              Home
            </p>
            <p
              onClick={() => {
                navigate("/about-us");
              }}
              className="text-white text-sm mb-2 cursor-pointer hover:text-theme"
              style={{ color: "",  }}
            >
              About Us
            </p>
            <p
              onClick={() => {
                navigate("/members");
              }}
              className="text-white text-sm mb-2 cursor-pointer hover:text-theme"
              style={{ color: "",  }}
            >
              Membership
            </p>
            <p
              onClick={() => {
                navigate("/events");
              }}
              className="text-white text-sm mb-2 cursor-pointer hover:text-theme"
              style={{ color: "",  }}
            >
              Events
            </p>
            <p
              onClick={() => {
                navigate("/publications");
              }}
              className="text-white text-sm mb-2 cursor-pointer hover:text-theme"
              style={{ color: "",  }}
            >
              Publications
            </p>
            <p
              onClick={() => {
                navigate("/support");
              }}
              className="text-white text-sm mb-2 cursor-pointer hover:text-theme"
              style={{ color: "",  }}
            >
              Support
            </p>
            <p
              onClick={() => {
                navigate("/contact-us");
              }}
              className="text-white text-sm mb-2 cursor-pointer hover:text-theme"
              style={{ color: "",  }}
            >
              Contact Us
            </p>
          </div>

          
        </div>

        <div className="flex justify-between items-start sm:mt-16 ">
          <div></div>
          <span
            className="text-white text-sm cursor-pointer block my-2"
            // onClick={() => { gotoPage("privacy-policy"); }}
          >
            {/* Need Help ? */}
            Privacy Policy
          </span>
        </div>
      </div>

      <div className="mt-auto ">
        <div className="bottom-0 w-full text-center">
          <p className="text-xs py-4">
            &copy; 2025 League of African Ambassadors. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoampFooter;
