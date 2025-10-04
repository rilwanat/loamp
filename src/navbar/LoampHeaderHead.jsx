import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/images/logo.png";
import logo2 from "../assets/images/logo-2.png";

//
import axiosInstance from "../auth/axiosConfig"; // Ensure the correct relative path
import {
  setCookie,
  isMemberAuthenticated,
  isAdminAuthenticated,
  isSuperAdminAuthenticated,
} from "../auth/authUtils"; // Ensure the correct relative path
import { jwtDecode } from "jwt-decode";
import { getCookie, deleteCookie } from "../auth/authUtils"; // Import getCookie function
//

import LoampButton from "../widgets/LoampButton";

export default function LoampHeaderHead({}) {
  const navigate = useNavigate();

  useEffect(() => {
    // Initial useEffect logic if needed
  }, []);

  return (
    <div className="flex flex-col h-auto px-4 sm:px-16 md:px-16 py-2 pb-2 bg-theme shadow-lg">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="absolute top-2 flex items-center mr-8 bg-white p-2 rounded-full">
          <img
            className=" block h-20 w-auto max-w-none"
            src={logo2}
            alt="Logo"
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="text-center w-full">
          <div className="flex items-center z-50" style={{ height: "40px" }}>
            <div
              className="cursor-pointer ml-28 mx-4"
              onClick={() => {
                navigate("/");
              }}
            >
              <p className="text-sm cursor-pointer font-semibold">Home</p>
            </div>

            <div
              className="cursor-pointer mx-4"
              onClick={() => {
                navigate("/about-us");
              }}
            >
              <p className="text-sm cursor-pointer font-semibold">About Us</p>
            </div>

            <div
              className="cursor-pointer mx-4"
              onClick={() => {
                navigate("/members");
              }}
            >
              <p className="text-sm cursor-pointer font-semibold">Membership</p>
            </div>
            <div
              className="cursor-pointer mx-4"
              onClick={() => {
                navigate("/events");
              }}
            >
              <p className="text-sm cursor-pointer font-semibold">Events</p>
            </div>
            <div
              className="cursor-pointer mx-4"
              onClick={() => {
                navigate("/publications");
              }}
            >
              <p className="text-sm cursor-pointer font-semibold">
                Publications
              </p>
            </div>
            <div
              className="cursor-pointer mx-4"
              onClick={() => {
                navigate("/support");
              }}
            >
              <p className="text-sm cursor-pointer font-semibold">Support</p>
            </div>
            <div
              className="cursor-pointer mx-6"
              onClick={() => {
                navigate("/contact-us");
              }}
            >
              <p className="text-sm cursor-pointer font-semibold">Contact Us</p>
            </div>
          </div>
        </div>

        {/* <div className="flex items-center" style={{  }}>
                    <img
                        className="block h-12 w-auto max-w-none"
                        src={scrappLogo}
                        alt="Logo"
                        onClick={() => {
                            navigate('/');
                        }}
                        style={{ cursor: 'pointer' }}
                    />
                </div> */}

        <div className="flex items-center">
          <>
            <div className="flex items-center" style={{ height: "40px" }}>
              {isMemberAuthenticated() ? (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    deleteCookie("member");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </div>
              ) : isAdminAuthenticated() ? (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    deleteCookie("admin");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </div>
              ) : isSuperAdminAuthenticated() ? (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    deleteCookie("super-admin");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </div>
              ) : (
                < LoampButton />
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
