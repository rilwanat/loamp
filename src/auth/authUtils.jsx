// authUtils.js
import { jwtDecode } from 'jwt-decode';

export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; Secure; SameSite=None";
};

export const deleteCookie = (name) => {
  // alert(name);
  switch(name) {
    case ("member"):
      document.cookie = "loamp-member-token" + '=; Max-Age=-99999999;';
      document.cookie = "loamp-member-details" + '=; Max-Age=-99999999;';
      break;
    case ("admin"):
      document.cookie = "loamp-admin-token" + '=; Max-Age=-99999999;';
      document.cookie = "loamp-admin-details" + '=; Max-Age=-99999999;';
    break;
    case ("super-admin"):
      document.cookie = "loamp-super-admin-token" + '=; Max-Age=-99999999;';
      document.cookie = "loamp-super-admin-details" + '=; Max-Age=-99999999;';
    break;
  }

};

// Updated function to check if the user is authenticated
export const isMemberAuthenticated = () => {
  const token = getCookie('loamp-member-token');
  const memberDetails = getCookie('loamp-member-details');

  if (token && memberDetails) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        return true;
      }
    } catch (error) {
      console.error("Failed to decode user token:", error);
    }
  }
  return false;
};

// Updated function to check if the admin is authenticated
export const isAdminAuthenticated = () => {
  const token = getCookie('loamp-admin-token');
  const memberDetails = getCookie('loamp-admin-details');

  if (token && memberDetails) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        return true;
      }
    } catch (error) {
      console.error("Failed to decode admin token:", error);
    }
  }
  return false;
};

// Updated function to check if the super-admin is authenticated
export const isSuperAdminAuthenticated = () => {
  const token = getCookie('loamp-super-admin-token');
  const memberDetails = getCookie('loamp-super-admin-details');

  if (token && memberDetails) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        return true;
      }
    } catch (error) {
      console.error("Failed to decode super admin token:", error);
    }
  }
  return false;
};

