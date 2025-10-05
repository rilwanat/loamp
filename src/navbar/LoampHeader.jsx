import React, { useState, useEffect } from "react";

import LoampHeaderHead from "./LoampHeaderHead";

import GuestMobileNavbar from "./guest/GuestMobileNavbar";
import MemberMobileNavbar from "./member/MemberMobileNavbar";
import AdminMobileNavbar from "./admin/AdminMobileNavbar";
import SuperAdminMobileNavbar from './super-admin/SuperAdminMobileNavbar';


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

import MarqueeTextContainer from "./MarqueeTextContainer";

export default function LoampHeader({ isMobile, gotoPage, showMarqees }) {
  return (
    <div className="fixed w-full  z-[9999]">
      { showMarqees ? <MarqueeTextContainer isMobile={isMobile} /> : <div></div> }
      <div>
        {isMobile ? (
          isMemberAuthenticated() ? (
            <MemberMobileNavbar gotoPage={gotoPage} />
          ) : isAdminAuthenticated() ? (
            <AdminMobileNavbar gotoPage={gotoPage} />
          ) : isSuperAdminAuthenticated() ? (
            <SuperAdminMobileNavbar gotoPage={gotoPage} />
          ) : (
            <GuestMobileNavbar gotoPage={gotoPage} />
          )
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex w-full">
        <div className="w-full">
          {isMobile ? <div></div> : <LoampHeaderHead gotoPage={gotoPage} />}
        </div>
      </div>
    </div>
  );
}
