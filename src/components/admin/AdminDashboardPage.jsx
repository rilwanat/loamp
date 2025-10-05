import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LoampHeader from "../../navbar/LoampHeader.jsx";
import LoampFooter from "../../navbar/LoampFooter.jsx";

import AdminSideNavbar from "../../navbar/admin/AdminSideNavbar.jsx";

import TitleLine from "../../widgets/TitleLine.jsx";
import FileUpload from "../../widgets/FileUpload.jsx";

import logo from "../../assets/images/logo-512x512.png";



import charter from "../../assets/images/home/charter.webp";
import president from "../../assets/images/home/president.webp";

import semicircle from "../../assets/images/register-login/semicircle.png";
import semicircleflip from "../../assets/images/register-login/semicircle-flip.png";
import africa from "../../assets/images/register-login/africa.png";

import countries from "world-countries";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  faArrowUpRightFromSquare,  // for “NorthEast” style
  // faArrowDownRight,           // downward right arrow
  // faArrowDown,                 // simple down arrow
  // faArrowLeft,                 // simple left arrow
  faUsers, // People
  faNewspaper, // FiberNew
  faArrowsRotate, // PublishedWithChanges
  faCreditCard, // Payments
} from "@fortawesome/free-solid-svg-icons";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

import Loading from "../../widgets/Loading";
import MiniLoading from "../../widgets/MiniLoading";

export default function UserDashboardPage({ isMobile }) {
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

  const [letter, setLetter] = useState(null);
  const [passportDataPage, setPassportDataPage] = useState(null);
  const [intlPassport, setIntlPassport] = useState(null);
  const [idCard, setIdCard] = useState(null);
  const [otherDocs, setOtherDocs] = useState(null);

  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const [isDataLoading, setIsDataLoading] = useState(false);

  const [serverResponse, setServerResponse] = useState("");

  const currentPageName = "Admin Dashboard";

  const [editable, setEditable] = useState(false);


  // const [dashboardSummary, setDashboardSummary] = useState([]);
  const dashboardSummary = {
  transactionAnalytics: [
    { month: "Jan", totalAmount: 12000, membersCount: 320, eventsCount: 4500, publicationsCount: 3000 },
    { month: "Feb", totalAmount: 15000, membersCount: 400, eventsCount: 5200, publicationsCount: 3500 },
    { month: "Mar", totalAmount: 18000, membersCount: 450, eventsCount: 6000, publicationsCount: 4100 },
    { month: "Apr", totalAmount: 14000, membersCount: 380, eventsCount: 4900, publicationsCount: 2900 },
    { month: "May", totalAmount: 20000, membersCount: 500, eventsCount: 7200, publicationsCount: 4700 },
    { month: "Jun", totalAmount: 22000, membersCount: 550, eventsCount: 8000, publicationsCount: 5100 },
    { month: "Jul", totalAmount: 25000, membersCount: 620, eventsCount: 8900, publicationsCount: 5600 },
    { month: "Aug", totalAmount: 23000, membersCount: 590, eventsCount: 7700, publicationsCount: 5300 },
    { month: "Sep", totalAmount: 27000, membersCount: 650, eventsCount: 9500, publicationsCount: 6000 },
    { month: "Oct", totalAmount: 30000, membersCount: 700, eventsCount: 10200, publicationsCount: 6700 },
    { month: "Nov", totalAmount: 28000, membersCount: 680, eventsCount: 9800, publicationsCount: 6400 },
    { month: "Dec", totalAmount: 32000, membersCount: 750, eventsCount: 11000, publicationsCount: 7200 }
  ]
};

  
    const fetchAllDataAndMessages = async () => {
      handleData();
      // fetchChats();
    };
  
    useEffect(() => {
      fetchAllDataAndMessages();
    }, []);
    const handleData = async () => {
      return;
      setIsDataLoading(true);
  
      try {
        // API request to get  count
        const adminDashboardSummaryEndpoint =
          (import.meta.env.VITE_IS_LIVE === "true"
            ? import.meta.env.VITE_API_SERVER_URL
            : import.meta.env.VITE_API_DEMO_SERVER_URL) +
          import.meta.env.VITE_ADMIN_DASHBOARD_SUMMARY;
        // alert(adminUsersEndpoint);
  
        const adminDashboardSummaryResponse = await axiosAdminInstance.get(
          adminDashboardSummaryEndpoint,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // alert(JSON.stringify(adminDashboardSummaryResponse.data), null, 2);
        setDashboardSummary(adminDashboardSummaryResponse.data); // Update state with  count
  
        // openNotificationModal(true, currentPageName, "");
        // alert(JSON.stringify(adminRequestsResponse.data.data), null, 2);  // Update state with requests count
        //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}
  
        // Once all data is fetched, set loading to false
        setIsDataLoading(false);
      } catch (error) {
        setIsDataLoading(false);
  
        // alert(error);
        // Handle errors
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          openNotificationModal(
            false,
            currentPageName + " Error",
            error + " -> " + errorMessage
          );
        } else {
          openNotificationModal(
            false,
            currentPageName + " Error",
            "An unexpected error occurred."
          );
        }
      }
    };



  const handleSkip = async (e) => {
    e.preventDefault();
    navigate("/admin-dashboard");
    return;
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    navigate("/admin-dashboard");
    return;

    // setIsSignupLoading(true);
    // setServerResponse('');

    // const response = await fetch('http://127.0.0.1:8080/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, password }),
    // });

    // if (response.ok) {
    //   const data = await response.json();

    //   // Handle successful sign-in, e.g., store token in local storage
    //   //console.log(data);

    //   //localStorage.setItem('uid', data.uid);
    //   //console.log("Signed up as: " + data.message);

    //   // Redirect to home page
    //   navigate('/home');
    // } else {
    //   const errorData = await response.json();

    //   // Handle sign-in error, e.g., display error message
    //   console.log(errorData.error);
    //   setServerResponse(errorData.error);
    // }

    // setIsSignupLoading(false);
  };

  return (
    <div>
      <LoampHeader isMobile={isMobile} gotoPage={gotoPage} showMarqees={true} />

      <div className="pt-10"></div>

      <div className="flex">
        {isMobile ? (
          <div></div>
        ) : (
          <AdminSideNavbar currentPageName={currentPageName} />
        )}

        <div
          className="w-full rounded-lg "
          // style={{ borderRadius: '8px' }}
        >
          <div className="bg-white p-4 rounded-lg pt-20 sm:pt-20">
              <div className="flex flex-row w-full justify-between mx-4 items-center">
                <div
                  className="cursor-pointer hover:text-theme hover:bg-black bg-theme rounded-md px-2 py-2"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
                </div>

                <div className="invisible relative flex items-center mr-4 rounded-lg">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute left-8 h-4 w-4 object-scale-down text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-14 border border-gray-300 rounded-lg py-1 px-2 mx-4 focus:outline-none focus:border-1 focus:border-theme"
                    // onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>

          <div className="flex flex-col w-full bg-white p-4">
            <div className="w-full  rounded-lg  px-8 md:mx-2 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div
                            className="rounded-lg shadow-lg p-4 flex my-2 mx-1 text-black  bg-white cursor-pointer border-1 border-gray-300 hover:text-theme transition-colors duration-300 ease-in-out hover:border-theme"
                            // onClick={() => gotoPage("manage-users")}
                          >
                            <div className="flex flex-row items-center w-full justify-between">
                              <div className="flex flex-col py-2 ml-2">
                                <p
                                  // className=""
                                  style={{
                                    fontSize: "14px",
                                    fontweight: "500",
                                    // color: "#A3AED0",
                                  }}
                                >
                                  Total Members
                                </p>
                                <p
                                  className="font-bold"
                                  style={{
                                    fontSize: "30px",
                                    fontweight: "500",
                                    // color: "#A3AED0",
                                  }}
                                >
                                  {dashboardSummary?.totalUsers ?? 0}
                                </p>
                                {isDataLoading ? (
                                  <div className="">
                                    <MiniLoading />
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex justify-end items-center">
                                      <div className="p-1 rounded-full bg-white flex items-center justify-center">
                                        {/* <SouthWest
                                          className="text-white"
                                          style={{ width: "16px", height: "16px" }}
                                        /> */}
                                        <FontAwesomeIcon
    // icon={faArrowDownLeft}
    // className="text-red"
    // style={{ width: "16px", height: "16px" }}
  />
                                      </div>
                                      <p
                                        className="text-white ml-1"
                                        style={{
                                          fontSize: "16px",
                                          fontWeight: "600",
                                          // color: "#E63D46",
                                        }}
                                      >
                                        0
                                      </p>
                                    </div>
                                  </>
                                )}
                              </div>
            
                              <div className="flex flex-col py-2 mr-2">
                                <div className="py-2 mr-0">
                                  <div
                                    className=" rounded-3xl flex items-center justify-center"
                                    style={{ height: "48px", width: "48px" }}
                                  >
                                    {/* <PeopleIcon /> */}
                                    <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />

                                  </div>
                                </div>
                                <div className="p-1 flex items-center justify-center">
                                  <p
                                    className=" text-theme font-semibold"
                                    style={{
                                      fontSize: "12px",
                                      // fontweight: "500",
                                      // color: "#A3AED0",
                                    }}
                                  >
                                    Preview
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
            
                          <div
                            className="rounded-lg shadow-lg p-4 flex my-2 mx-1 text-black  bg-white cursor-pointer border-1 border-gray-300 hover:text-theme transition-colors duration-300 ease-in-out hover:border-theme"
                            // onClick={() => gotoPage("manage-users")}
                          >
                            <div className="flex flex-row items-center w-full justify-between">
                              <div className="flex flex-col py-2 ml-2">
                                <p
                                  // className="font-bold"
                                  style={{
                                    fontSize: "14px",
                                    fontweight: "500",
                                    // color: "#A3AED0",
                                  }}
                                >
                                  New Members
                                </p>
                                <p
                                  className="font-bold"
                                  style={{
                                    fontSize: "30px",
                                    fontweight: "500",
                                    // color: "#A3AED0",
                                  }}
                                >
                                  {dashboardSummary?.newUsers?.count ?? 0}
                                </p>
                                {isDataLoading ? (
                                  <div className="">
                                    <MiniLoading />
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex justify-end items-center">
                                      <div
                                        className={`p-1 rounded-full ${
                                          dashboardSummary?.newUsers?.change > 0
                                            ? "bg-lightGreen"
                                            : "bg-lightRed"
                                        } flex items-center justify-center`}
                                      >
                                        {dashboardSummary?.newUsers?.change > 0 ? (
                                          <FontAwesomeIcon
    icon={faArrowUpRightFromSquare}
    className="text-green"
    style={{ width: "16px", height: "16px" }}
  />
) : (
  <FontAwesomeIcon
    // icon={faArrowDownLeft}
    // className="text-red"
    // style={{ width: "16px", height: "16px" }}
  />
                                        )}
                                      </div>
                                      <p
                                        className="text-red ml-1"
                                        style={{
                                          fontSize: "16px",
                                          fontWeight: "600",
                                          // color: "#E63D46",
                                        }}
                                      >
                                        {`${
                                          dashboardSummary?.newUsers?.change >= 0 ? "+" : ""
                                        }${dashboardSummary?.newUsers?.change ?? 0}%`}
                                      </p>
                                    </div>
                                  </>
                                )}
                              </div>
            
                              <div className="flex flex-col py-2 mr-2">
                                <div className="py-2 mr-0">
                                  <div
                                    className=" rounded-3xl flex items-center justify-center"
                                    style={{ height: "48px", width: "48px" }}
                                  >
                                    {/* <img
                                      className="w-12 h-12 object-scale-down "
                                      // src={profile2user}
                                      alt=""
                                    /> */}
                                    {/* <FiberNewIcon /> */}
                                    <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />

                                  </div>
                                </div>
                                <div className="p-1 flex items-center justify-center">
                                  <p
                                    className=" text-theme font-semibold"
                                    style={{
                                      fontSize: "12px",
                                      // fontweight: "500",
                                      // color: "#A3AED0",
                                    }}
                                  >
                                    Preview
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
            
                          
            
                          <div
                            className="rounded-lg shadow-lg p-4 flex my-2 mx-1 text-black  bg-white cursor-pointer border-1 border-gray-300 hover:text-theme transition-colors duration-300 ease-in-out hover:border-theme"
                            // onClick={() => gotoPage("manage-transactions")}
                          >
                            <div className="flex flex-row items-center w-full justify-between">
                              <div className="flex flex-col py-2 ml-2">
                                <p
                                  // className="font-bold"
                                  style={{
                                    fontSize: "14px",
                                    fontweight: "500",
                                    // color: "#A3AED0",
                                  }}
                                >
                                  Payments
                                </p>
                                <p
                                  className="font-bold"
                                  style={{
                                    fontSize: "30px",
                                    fontweight: "500",
                                    // color: "#A3AED0",
                                  }}
                                >
                                  {"₦" + (dashboardSummary?.cash?.amount ?? 0)}
                                </p>
                                {isDataLoading ? (
                                  <div className="">
                                    <MiniLoading />
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex justify-end items-center">
                                      <div
                                        className={`p-1 rounded-full ${
                                          dashboardSummary?.cash?.change > 0
                                            ? "bg-lightGreen"
                                            : "bg-lightRed"
                                        } flex items-center justify-center`}
                                      >
                                        {dashboardSummary?.cash?.change > 0 ? (
                                          <FontAwesomeIcon
    icon={faArrowUpRightFromSquare}
    className="text-green"
    style={{ width: "16px", height: "16px" }}
  />
) : (
  <FontAwesomeIcon
    // icon={faArrowDownLeft}
    // className="text-red"
    // style={{ width: "16px", height: "16px" }}
  />
                                        )}
                                      </div>
                                      <p
                                        className="text-green ml-1"
                                        style={{
                                          fontSize: "16px",
                                          fontWeight: "600",
                                          // color: "#E63D46",
                                        }}
                                      >
                                        {`${
                                          dashboardSummary?.cash?.change >= 0 ? "+" : ""
                                        }${dashboardSummary?.cash?.change ?? 0}%`}
                                      </p>
                                    </div>
                                  </>
                                )}
                              </div>
            
                              <div className="flex flex-col py-2 mr-2">
                                <div className="py-2 mr-0">
                                  <div
                                    className=" rounded-3xl flex items-center justify-center"
                                    style={{ height: "48px", width: "48px" }}
                                  >
                                    {/* <img
                                      className="w-12 h-12 object-scale-down "
                                      // src={profile2user}
                                      alt=""
                                    /> */}
                                    {/* <PaymentsIcon /> */}
                                    <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4" />

                                  </div>
                                </div>
                                <div className="p-1 flex items-center justify-center">
                                  <p
                                    className=" text-theme font-semibold"
                                    style={{
                                      fontSize: "12px",
                                      // fontweight: "500",
                                      // color: "#A3AED0",
                                    }}
                                  >
                                    Preview
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
            
                      <div className="bg-gray-50 py-4 pr-4 rounded-lg ">
                        {" "}
                        <div
                          className="flex flex-col md:flex-row p-4 bg-white rounded-lg w-full"
                          style={{}}
                        >
                          <div className="w-full md:w-2/3 lg:w-3/4 xl:w-[70%] rounded-lg  md:px-4 md:mx-2 bg-white">
                            {/* Recharts LineChart */}
                            <div className="flex flex-col w-full  pb-4 ">
                              <div
                                className="flex justify-between my-2 pb-2 -mt-4 "
                                style={{}}
                              >
                                <div className="flex w-full items-center justify-start  ">
                          <div className="font-semibold ">
                            Analytics
                          </div>
                        </div>
                              </div>
                              <div className="w-full md:w-4/4 lg:w-1/1  border-gray-300 border-1  bg-white shadow-lg rounded-lg p-8">
                                <div className="bg-gray-50 p-4 rounded-lg mb-2">
                                  <div className="flex flex-col md:flex-row">
                                    {/* <div className="flex flex-row w-full">
                                      <div className="w-full md:w-2/6 mb-4 mr-4 h-full flex items-center relative">
                                        <select
                                          id="statusSelect"
                                          name="statusSelect"
                                          className="bg-white border border-gray-300 text-theme text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2 pl-4 pr-8 appearance-none"
                                          onChange={(e) => {
                                            // handleChange for month
                                          }}
                                        >
                                          <option value="">Month</option>
                                          Map categories here
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                          <KeyboardArrowDownIcon
                                            style={{
                                              color: "#254EDB",
                                              width: "20px",
                                              height: "20px",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div> */}
            
                                    <div className="flex flex-row w-full justify-end">
                                      {/* <div className="w-full md:w-2/6 mb-4 mr-4 h-full flex items-center relative">
                                        <select
                                          id="patientsSelect"
                                          name="patientsSelect"
                                          className="bg-white border border-gray-300 text-theme text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2 pl-4 pr-8 appearance-none"
                                          onChange={(e) => {
                                            // handleChange for patients
                                          }}
                                        >
                                          <option value="">Patients</option>
                                          Map categories here
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                          <KeyboardArrowDownIcon
                                            style={{
                                              color: "#254EDB",
                                              width: "20px",
                                              height: "20px",
                                            }}
                                          />
                                        </div>
                                      </div> */}
            
                                      {/* <div className="w-full md:w-3/6 mb-4 mr-4 h-full flex items-center">
                                        <div className="relative w-full">
                                          <FileDownloadOutlinedIcon
                                            style={{ color: "#254EDB" }}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                          />
                                          <select
                                            id="statusSelect"
                                            name="statusSelect"
                                            className="bg-white border border-gray-300 text-theme text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 
                                                          block w-full pl-10 p-2 appearance-none"
                                            onChange={(e) => {
                                              // handleChange for status
                                            }}
                                          >
                                            <option value="">Save Report</option>
                                            Map categories here
                                          </select>
                                        </div>
                                      </div> */}
                                    </div>
                                  </div>
                                </div>
            
                                <ResponsiveContainer width="100%" height={240}>
                                  <LineChart
                                    data={dashboardSummary.transactionAnalytics}
                                    barSize={8}
                                  >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    {/* <Legend /> */}
                                    {/* <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={3}/> */}
                                    <Line
                                      type="natural"
                                      dataKey="totalAmount"
                                      stroke="#F42643"
                                      strokeWidth={3}
                                      dot={{ r: 0 }}
                                    />
                                    <Line
                                      type="natural"
                                      dataKey="membersCount"
                                      stroke="#2F1155"
                                      strokeWidth={3}
                                      dot={{ r: 0 }}
                                    />
                                    <Line
                                      type="natural"
                                      dataKey="eventsCount"
                                      stroke="#29B474"
                                      strokeWidth={3}
                                      dot={{ r: 0 }}
                                    />
                                    <Line
                                      type="natural"
                                      dataKey="publicationsCount"
                                      stroke="#FF9F1C"
                                      strokeWidth={3}
                                      dot={{ r: 0 }}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </div>
                          </div>
            
                          <div className="w-full md:w-1/3 lg:w-1/4 xl:w-[30%] ">
                            <div
                              className="flex justify-between sm:-mt-4 mt-4 mb-2 pb-2 "
                              style={{}}
                            >
                              <div className="flex w-full items-center justify-start  ">
                          <div className="font-semibold ">
                            Recent Activities
                          </div>
                        </div>
                            </div>



                            <div className="rounded-lg shadow-lg px-4 mx-0 border-gray-300 border-1 bg-white ">
                              {/* <div>
                                {upcomingAppointmentData.map((requestData, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between rounded-lg my-2"
                                    style={{
                                      padding: "10px 10px",
                                      // backgroundColor: "#FAF3E0",
                                    }}
                                    // onClick={(e) => navigateToAppointments()}
                                  >
                                    <div className="flex">
            
                                      <div
                                        className="flex-shrink-0 flex mr-4 items-center justify-center  bg-theme"
                                        style={{
                                          borderRadius: "20px",
                                          width: "40px",
                                          height: "40px",
                                        }}
                                      >
                                        <img
                                          className="object-scale-down rounded-full"
                                          // src={profile}
                                          alt=""
                                        />
                                      </div>
            
                                      <div className="flex flex-col">
                                        <p
                                          className="font-semibold"
                                          style={{ fontSize: "14px" }}
                                        >
                                          New user registered.
                                        </p>
                                        <p style={{ fontSize: "12px" }}>59 minutes ago.</p>
                                      </div>
                                    </div>
            
                                  </div>
                                ))}
                              </div> */}
                              <div
                                className="flex w-full justify-end my-4 "
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  // navigate("/manage-appointments");
                                }}
                              >
                                <div className="bg-theme rounded-lg px-4 py-1 text-white hover:text-theme hover:bg-black">
                                  <p style={{ fontSize: "12px" }}>View All</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
            
                      <div className="bg-gray-50 py-4 pr-4 rounded-lg ">
                        {" "}
                        <div
                          className="flex flex-col md:flex-row p-4 bg-white rounded-lg w-full"
                          style={{}}
                        >
                          <div className="w-full rounded-lg  md:px-4 md:mx-2 bg-white">
                            {/* Recharts LineChart */}
                            <div className="flex flex-col w-full  pb-4 ">
                              <div
                                className="flex justify-between my-2 pb-2 -mt-4 "
                                style={{}}
                              >
                                <div className="flex w-full items-center justify-start  ">
                          <div className="font-semibold ">
                            Recent Payments
                          </div>
                        </div>
                              </div>
                              <div className="w-full md:w-4/4 lg:w-1/1  border-gray-300 border-1  white shadow-lg rounded-lg p-8">
                                <div className="overflow-x-auto mt-2">
                                  <table className="min-w-full bg-white border border-gray-200">
                                    <thead className="text-xs" >
                                      <tr className="w-full bg-gray-100">
                                        <th className="py-2 px-4  text-left text-black">
                                          Service
                                        </th>
                                        <th className="py-2 px-4  text-left text-black">
                                          Sender Name
                                        </th>
                                        <th className="py-2 px-4  text-left text-black">
                                          Date
                                        </th>
                                        <th className="py-2 px-4  text-left text-black">
                                          Amount
                                        </th>
                                        <th className="py-2 px-4  text-left text-black">
                                          Status
                                        </th>
                                      </tr>
                                    </thead>
            
                                    {
                                      <tbody className="text-xs">
                                        {dashboardSummary?.recentTransactions?.map(
                                          (transaction, index) => (
                                            <tr
                                              key={transaction.id}
                                              className={
                                                index % 2 === 0
                                                  ? "bg-white"
                                                  : "bg-lightPurple"
                                              }
                                              onClick={(e) => handleRowClick(transaction, e)}
                                              style={{ cursor: "pointer" }}
                                            >
                                              <td
                                                className="py-2 px-4 border-b border-gray  text-gray"
                                                style={{ fontSize: "14px" }}
                                              >
                                                {transaction.transactionType}
                                              </td>
                                              <td
                                                className="py-2 px-4 border-b border-gray  text-gray"
                                                style={{ fontSize: "14px" }}
                                              >
                                                {transaction.sender.firstName} {transaction.sender.lastName}
                                              </td>
                                              <td
                                                className="py-2 px-4 border-b border-gray  text-gray"
                                                style={{ fontSize: "14px" }}
                                              >
                                                {transaction.transactionDate}
                                              </td>
                                              <td
                                                className="py-2 px-4 border-b border-gray  text-gray"
                                                style={{ fontSize: "14px" }}
                                              >
                                                {transaction.amount}
                                              </td>
                                              <td
                                                className="py-2 px-4 border-b border-gray  text-gray"
                                                style={{ fontSize: "14px" }}
                                              >
                                                {transaction.status}
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    }
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
            
                          
                          
                        </div>
                      </div>
          </div>
        </div>
      </div>

      <LoampFooter gotoPage={gotoPage} />
    </div>
  );
}
