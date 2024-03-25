import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Sidebar({ user }) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="flex justify-center mb-10">
      {/* Sidebar backdrop (mobile only) */}
      {/* Sidebar */}
      <div id="sidebar">
        {/* Links */}
        <div>
          <div className="flex flex-col">
            <ul className="list-none mt-4 px-4">
              <li
                className={`my-2 py-2 px-4 mx-2 rounded-full  mb-0.5 last:mb-0 float-left hover:bg-slate-400 ${
                  pathname.includes("user") && "bg-slate-900 text-white"
                }`}
                key="user"
              >
                <NavLink
                  end
                  to="/user"
                  className={`rounded-lg  hover:text-white hover:bg-slate-400 truncate transition duration-150`}
                >
                  <div
                    className={`flex items-center rounded-lg  text-centers `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 h-6 w-6"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                      <path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727" />
                      <path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727" />
                    </svg>
                    <span className="text-sm font-medium ml-3 ">내정보</span>
                  </div>
                </NavLink>
              </li>

              <li
                className={`my-2 py-2 px-4 mx-2 rounded-full mb-0.5 last:mb-0 float-left hover:bg-slate-400 ${
                  pathname.includes("recharge") && "bg-slate-900"
                }`}
                key="recharge"
              >
                <NavLink
                  end
                  to="/recharge"
                  className={`rounded-lg  hover:text-white truncate transition duration-150 ${
                    pathname.includes("recharge") && "text-slate-200"
                  }`}
                >
                  <div
                    className={`flex items-center rounded-lg  text-centers `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-devices"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff"
                      fill="none"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <rect x="13" y="8" width="8" height="12" rx="1" />
                      <path d="M18 8v-3a1 1 0 0 0 -1 -1h-13a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h9" />
                      <line x1="16" y1="9" x2="18" y2="9" />
                    </svg>
                    <span className="text-sm font-medium ml-3 ">충전내역</span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`my-2 py-2 px-4 mx-2 rounded-full mb-0.5 last:mb-0 float-left hover:bg-slate-400 ${
                  pathname.includes("usagehistory") &&
                  "bg-slate-900 text-slate-200"
                }`}
                key="usagehistory"
              >
                <NavLink
                  end
                  to="/usagehistory"
                  className={`block hover:text-white truncate transition duration-150 ${
                    pathname.includes("usagehistory") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-users"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff"
                      fill="none"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                    </svg>
                    <span className="text-sm font-medium ml-3 ">사용내역</span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`my-2 py-2 px-4 mx-2 rounded-full mb-0.5 last:mb-0 float-left hover:bg-slate-400 ${
                  pathname.includes("inquiry") && "bg-slate-900"
                }`}
                key="inquiry"
              >
                <NavLink
                  end
                  to="/inquiry"
                  className={`block  hover:text-white truncate transition duration-150 ${
                    pathname.includes("inquiry") && "text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-users"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff"
                      fill="none"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                    </svg>
                    <span className="text-sm font-medium ml-3 ">1:1문의</span>
                  </div>
                </NavLink>
              </li>
            </ul>
            <ul className="list-none mt-4 px-4">
              {user.role === "admin" || user.role === "manager" ? (
                <>
                  <li
                    className={`my-2 py-2 px-4 mx-2 rounded-full mb-0.5 last:mb-0 float-left hover:bg-slate-400  ${
                      pathname.includes("salesTotal") &&
                      "bg-slate-900 text-slate-200"
                    }`}
                    key="salesTotal"
                  >
                    <NavLink
                      end
                      to="/salesTotal"
                      className={`block  hover:text-white truncate transition duration-150  ${
                        pathname.includes("salesTotal") && "text-slate-200"
                      }`}
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-users"
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#ffffff"
                          fill="none"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                        </svg>
                        <span className="text-sm font-medium ml-3 ">
                          매출집계
                        </span>
                      </div>
                    </NavLink>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
