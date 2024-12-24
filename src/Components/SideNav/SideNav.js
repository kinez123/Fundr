import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircle, faPeopleGroup, faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";

const SideNav = () => {
  const [activeMenu, setActiveMenu] = useState(null); // Track the active menu
  const location = useLocation(); // Get the current URL path

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      mini="false"
      className="ease-soft-in-out drop-shadow-xl z-990 max-w-64 fixed inset-y-0 left-0 my-4 xl:ml-4 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-gradient-to-tl from-gray-800 to-slate-800 p-0 shadow-none transition-all duration-200 xl:translate-x-0"
      id="sidenav-main"
    >
      {/* Header */}
      <div className="h-20">
        <Link
          className="flex -ml-4 justify-center items-center m-0 text-sm whitespace-nowrap text-slate-700"
          to="/dashboard"
        >
          <h4 className="font-bold ml-2 mt-2 leading-3 text-lg text-start mb-0">
            <span className=" mb-0 text-white text-lg">
              Dashboard
            </span>
          </h4>
        </Link>
      </div>

      <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

      {/* Menu */}

      
      <div className="items-center px-4 py-3 mt-5 block w-full h-auto grow basis-full" id="sidenav-collapse-main">
        <ul className="flex flex-col pl-0 mb-0 list-none">
          <li className="mt-0.5 w-full">
            <button
              onClick={() => toggleMenu("users")}
              className="bg-white w-full px-4 py-3 ease-soft-in-out text-sm active xl:shadow-soft-xl my-0 flex items-center whitespace-nowrap rounded-lg font-semibold text-slate-700 transition-all"
            >
              <div className="stroke-none shadow-soft-sm bg-gradient-to-tl from-gray-900 to-slate-800 mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
                <FontAwesomeIcon icon={faUser} className="text-white" />
              </div>
              <span className="ml-1 duration-300 font-bold opacity-100 pointer-events-none ease-soft text-slate-700">
                User Management
              </span>
            </button>
            {/* Submenu */}
            {activeMenu === "users" && (
              <div className="h-auto overflow-hidden mt-2 transition-all duration-200 ease-soft-in-out">
                <ul className="flex flex-wrap pl-2 mb-0 ml-3 list-none transition-all duration-200 ease-soft-in-out">
                  <li className="w-full mt-3">
                    <Link
                      className={`ease-soft-in-out font-semibold text-sm ${
                        isActive("/supplier-categories") ? "text-blue-500" : "text-white"
                      } shadow-none transition-colors`}
                      to="/supplier-categories"
                    >
                      <FontAwesomeIcon icon={faCircle} className="text-xs mr-2" />
                      Create User
                    </Link>
                  </li>
                  <li className="w-full mt-3">
                    <Link
                      className={`ease-soft-in-out font-semibold text-sm ${
                        isActive("/all-users") ? "text-blue-500" : "text-white"
                      } shadow-none transition-colors`}
                      to="/all-users"
                    >
                      <FontAwesomeIcon icon={faCircle} className="text-xs mr-2" />
                      All Users
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    
      <div className="items-center px-4 py-3 block w-full h-auto grow basis-full" id="sidenav-collapse-main">
        <ul className="flex flex-col pl-0 mb-0 list-none">
          <li className="mt-0.5 w-full">
            <button
              onClick={() => toggleMenu("campaings")}
              className="bg-white px-4 py-3 w-full ease-soft-in-out text-sm active xl:shadow-soft-xl my-0 flex items-center whitespace-nowrap rounded-lg font-semibold text-slate-700 transition-all"
            >
              <div className="stroke-none shadow-soft-sm bg-gradient-to-tl from-gray-900 to-slate-800 mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
                <FontAwesomeIcon icon={faPeopleGroup} className="text-white" />
              </div>
              <span className="ml-1 duration-300 font-bold opacity-100 pointer-events-none ease-soft text-slate-700">
                Campaigns
              </span>
            </button>
            {/* Submenu */}
            {activeMenu === "campaings" && (
              <div className="h-auto overflow-hidden mt-2 transition-all duration-200 ease-soft-in-out">
                <ul className="flex flex-wrap pl-2 mb-0 ml-3 list-none transition-all duration-200 ease-soft-in-out">
                  <li className="w-full mt-3">
                    <Link
                      className={`ease-soft-in-out font-semibold text-sm ${
                        isActive("/supplier-categories") ? "text-blue-500" : "text-white"
                      } shadow-none transition-colors`}
                      to="/supplier-categories"
                    >
                      <FontAwesomeIcon icon={faCircle} className="text-xs mr-2" />
                      Pending Campaings

                    </Link>
                  </li>
                  <li className="w-full mt-3">
                    <Link
                      className={`ease-soft-in-out font-semibold text-sm ${
                        isActive("/all-users") ? "text-blue-500" : "text-white"
                      } shadow-none transition-colors`}
                      to="/all-users"
                    >
                      <FontAwesomeIcon icon={faCircle} className="text-xs mr-2" />
                      Approved Campaings
                    </Link>
                  </li>
                  <li className="w-full mt-3">
                    <Link
                      className={`ease-soft-in-out font-semibold text-sm ${
                        isActive("/all-users") ? "text-blue-500" : "text-white"
                      } shadow-none transition-colors`}
                      to="/all-users"
                    >
                      <FontAwesomeIcon icon={faCircle} className="text-xs mr-2" />
                      Rejected Campaings
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>

      <div className="items-center px-4 py-3 block w-full h-auto grow basis-full" id="sidenav-collapse-main">
        <ul className="flex flex-col pl-0 mb-0 list-none">
          <li className="mt-0.5 w-full">
            <button
              onClick={() => toggleMenu("donation")}
              className="bg-white px-4 w-full py-3 ease-soft-in-out text-sm active xl:shadow-soft-xl my-0 flex items-center whitespace-nowrap rounded-lg font-semibold text-slate-700 transition-all"
            >
              <div className="stroke-none shadow-soft-sm bg-gradient-to-tl from-gray-900 to-slate-800 mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center fill-current p-2.5 text-center text-black">
                <FontAwesomeIcon icon={faHandHoldingDollar} className="text-white" />
              </div>
              <span className="ml-1 duration-300 font-bold opacity-100 pointer-events-none ease-soft text-slate-700">
                Donation Tracking
              </span>
            </button>
            {/* Submenu */}
            {activeMenu === "donation" && (
              <div className="h-auto overflow-hidden mt-2 transition-all duration-200 ease-soft-in-out">
                <ul className="flex flex-wrap pl-2 mb-0 ml-3 list-none transition-all duration-200 ease-soft-in-out">
                  <li className="w-full mt-3">
                    <Link
                      className={`ease-soft-in-out font-semibold text-sm ${
                        isActive("/supplier-categories") ? "text-blue-500" : "text-white"
                      } shadow-none transition-colors`}
                      to="/supplier-categories"
                    >
                      <FontAwesomeIcon icon={faCircle} className="text-xs mr-2" />

                      Pending Donations

                    </Link>
                  </li>
                  <li className="w-full mt-3">
                    <Link
                      className={`ease-soft-in-out font-semibold text-sm ${
                        isActive("/all-users") ? "text-blue-500" : "text-white"
                      } shadow-none transition-colors`}
                      to="/all-users"
                    >
                      <FontAwesomeIcon icon={faCircle} className="text-xs mr-2" />
                      Verified Donations
                    </Link>
                  </li>
                  <li className="w-full mt-3">
                    <Link
                      className={`ease-soft-in-out font-semibold text-sm ${
                        isActive("/all-users") ? "text-blue-500" : "text-white"
                      } shadow-none transition-colors`}
                      to="/all-users"
                    >
                      <FontAwesomeIcon icon={faCircle} className="text-xs mr-2" />
                        Financial Reports
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideNav;
