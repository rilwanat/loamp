import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,          // Profile
  faIdCard,        // Membership
  faShieldAlt,   // Verification (from pro or substitute faShieldAlt/free)
  faKey,           // Change Password
  faCreditCard,    // Payment
  faRightFromBracket, // Logout
} from "@fortawesome/free-solid-svg-icons";

export const navData = [
  {
    id: 1,
    icon: <FontAwesomeIcon icon={faUser} className="w-4 h-4" />,
    text: "My Profile",
    link: "user-dashboard",//"my-profile",
  },
  {
    id: 2,
    icon: <FontAwesomeIcon icon={faIdCard} className="w-4 h-4" />,
    text: "Membership",
    link: "user-membership",
  },
  {
    id: 3,
    icon: <FontAwesomeIcon icon={faShieldAlt} className="w-4 h-4" />,
    text: "Verification Status",
    link: "user-verification-status",
  },
  {
    id: 4,
    icon: <FontAwesomeIcon icon={faKey} className="w-4 h-4" />,
    text: "Change Password",
    link: "user-change-password",
  },
  {
    id: 5,
    icon: <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4" />,
    text: "Payment",
    link: "user-payment",
  },
  // {
  //   id: 6,
  //   icon: <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />,
  //   text: "Logout",
  //   link: "user-logout",
  // },
];


