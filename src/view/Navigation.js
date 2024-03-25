import { useState, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Footer from "./Footer";
import useAuth from "../auth/useAuth";
import { useUser } from "../auth/useUser";
import SidebarLinkGroup from "../components/contents/SidebarLinkGroup";
import HeaderDrop from "../components/contents/headerdrop";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { useNavigate } from "react-router-dom";
import { ReactComponent as LOGO } from "../assets/images/GRINBIT_LOGO.svg";
import { ReactComponent as LOGO_TEXT } from "../assets/images/Grinbit_text.svg";

const Navigation = [
  { id: "#service", name: "서비스 소개", key: "1" },
  { id: "#plan", name: "요금제", key: "6" },
  { id: "#notice", name: "공지사항", key: "2" },
  { id: "#faq", name: "FAQ", key: "3" },
  { id: "#download", name: "다운로드", key: "4" },
  { id: "#contactus", name: "입점문의", key: "5" },
];

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const { user } = useUser();

  const Mynavigation = [
    { id: `user`, name: "내정보", key: "a1" },
    { id: "recharge", name: "충전내역", key: "a2" },
    { id: "usagehistory", name: "사용내역", key: "a3" },
    { id: "inquiry", name: "1:1문의", key: "a4" },
  ];

  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  useEffect(() => {}, [sidebarExpanded]);

  // const [sidebarExpanded, setSidebarExpanded] = useState(
  //   storedSidebarExpanded === null ? false : storedSidebarExpanded === true
  // );

  // useEffect(() => {
  //   localStorage.setItem("sidebar-expanded", sidebarExpanded);
  //   if (sidebarExpanded) {
  //     document.querySelector("body").classList.add("sidebar-expanded");
  //   } else {
  //     document.querySelector("body").classList.remove("sidebar-expanded");
  //   }
  // }, [location, sidebarExpanded]);
  const openHref = (ref) => {
    location.href(`/${ref}, ","`);
    return false;
  };

  return (
    <div className="flex flex-col">
      <nav className="w-screen bg-[#2d92bd] fixed shadow z-40">
        <div className="justify-between h-full mx-auto lg:max-w-7xl md:items-center md:flex px-4">
          <div>
            <div className="flex flex-row items-center justify-between px-0 py-5 md:block">
              <a href="/">
                <div className="flex gap-2">
                  <LOGO className="w-[56px] h-[50px] mr-1.5" />
                  <div>
                    <LOGO_TEXT className="w-[93px] h-[13px] my-1" />
                    <h2 className="md:text-3xl text-2xl font-bold text-[#003b55]">
                      CLOUD PC
                    </h2>
                  </div>
                </div>
              </a>

              <div className="md:hidden">
                <button
                  className="p-1 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3  md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul
                className={`items-center justify-center space-y-0 md:flex md:space-x-2 md:space-y-0 ${
                  sidebarExpanded ? "block" : "hidden"
                }
                `}
              >
                {Navigation.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="hover:bg-[#084d6b] rounded-full p-3"
                    >
                      <li
                        className="text-white text-lg font-bold text-center hover:text-[#2d92bd]"
                        key={item.key}
                      >
                        {location.pathname === "/" ? (
                          <a
                            href={"/" + item.id}
                            className="slnb_link transition duration-300"
                            onClick={() => setNavbar(!navbar)}
                          >
                            <span className="slnb_txt_box">
                              <span className="slnb_txt">{item.name}</span>
                            </span>
                          </a>
                        ) : (
                          <a
                            href={"/" + item.id}
                            className="slnb_link"
                            onClick={() => setNavbar(!navbar)}
                          >
                            <span className="slnb_txt_box transition duration-300">
                              <span className="slnb_txt">{item.name}</span>
                            </span>
                          </a>
                        )}
                      </li>
                    </div>
                  );
                })}

                {/* 데스크탑 */}
                {user ? (
                  <div className="hidden space-x-2 md:inline-block">
                    {/* <a
                      href={"/user/" + user?.mIdx}
                      className="px-4 py-2 text-white bg-fuchsia-900 rounded-md shadow hover:bg-gray-800"
                    >
                      {user?.name}
                    </a> */}
                    <HeaderDrop />
                  </div>
                ) : (
                  <div className="hidden space-x-2 md:inline-block p-3 rounded-full hover:bg-[#084d6b]">
                    <span className="slnb_txt_box transition duration-300">
                      <a
                        href="/signin"
                        // className="px-4 py-2 text-white bg-fuchsia-900 rounded-md shadow hover:bg-gray-800"
                        className="text-white text-lg font-bold text-center hover:text-[#2d92bd] "
                      >
                        로그인
                      </a>
                    </span>
                  </div>
                )}
              </ul>
              {/* 모바일 */}
              {user ? (
                <>
                  <div className="text-center space-x-2 md:hidden text-white font-bold p-3 rounded-full hover:bg-[#084d6b]">
                    <span className="slnb_txt_box transition duration-300">
                      <a href="user"> {user.email}</a>
                    </span>
                  </div>
                  <div className="text-center space-x-2 md:hidden text-white font-bold  p-3 rounded-full hover:bg-[#084d6b]">
                    <div>
                      <a
                        onClick={() => {
                          auth.signout();
                          setNavbar(false);
                        }}
                        href="/signin"
                      >
                        로그아웃
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center space-x-2 md:hidden p-3 rounded-full hover:bg-[#084d6b]">
                  <a
                    href="/signin"
                    // className="inline-block w-full px-4 py-2 text-center text-white bg-fuchsia-900 rounded-md shadow hover:bg-gray-800"
                    className="text-white text-lg font-bold text-center hover:text-[#2d92bd]"
                  >
                    로그인
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="w-full bg-[#e4f0f4] z-10 mt-10 sm:mt-10 xs:mt-10 md:mt-10 ">
        <Outlet />
      </main>
      <footer className="grow z-40">
        <Footer />
      </footer>
    </div>
  );
}
