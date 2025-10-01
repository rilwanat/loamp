import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/images/logo.png";
import logo2 from "../assets/images/logo-2.png";

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
              <div
                onClick={() => {
                navigate("/create-membership");
              }}
                style={{ width: "176px", borderWidth: "1px" }}
                className="text-center shadow-lg border-black bg-softTheme rounded-lg px-4 py-2 text-black text-sm cursor-pointer mx-1 "
              >
                Create Membership
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
