import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import { ClipLoader } from 'react-spinners';

// import logo from '../assets/images/logo-512x512.png';



function LoampButton({  }) {

    const navigate = useNavigate();

    return (
      <>
      <div
                  onClick={() => {
                    navigate("/create-membership");
                  }}
                  style={{ width: "176px", }}
                  className="text-center shadow-lg bg-softTheme rounded-lg px-4 py-2 text-black text-sm cursor-pointer mx-1 
                  hover:text-theme hover:bg-black"
                >
                  Create Membership
                </div>
    </>
         
    );
}

export default LoampButton;
