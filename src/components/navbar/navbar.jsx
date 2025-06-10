/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
// import { Outlet } from "react-router-dom"
import { IoIosNotifications } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { ImProfile } from "react-icons/im";
import { useNav } from "./navContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { notification } from "../utils/api";

import { useModal } from "../modal/modalContext";
import Modal from "../modal/modal";
import IconRendered from "../icon/icon";
const Navbar = ({ open, setOpen, data }) => {
  const { visible, setVisible } = useModal();
  const navigate = useNavigate();
  const { nav, setNav } = useNav();
  const [activeButton, setActiveButton] = useState("");
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const checkToken = async () => {
    const token = await localStorage.getItem("token");
    if (token == null) {
      // navigate("/login")
    }
  };
  const handleButtonClick = (index) => {
    setActiveButton((prevActiveButton) => {
      let nextActiveButton;
      if (index === "Profile") {
        const profileRoute = "/profile";
        const currentRoute = window.location.pathname;
        const currentRouteSegments = currentRoute.split("/");
        const firstSegment = currentRouteSegments[1];
        if (firstSegment.toLowerCase() === "profile") {
          localStorage.setItem("activePage", firstSegment);
          nextActiveButton = capitalizeFirstLetter(
            firstSegment.replace(/[/0-9]/g, "").slice()
          );
        } else {
          // Jika bukan halaman profil, arahkan ke halaman profil
          navigate(profileRoute);
          localStorage.setItem("activePage", profileRoute.slice(1));
          nextActiveButton = capitalizeFirstLetter(
            profileRoute.replace(/[/0-9]/g, "").slice()
          );
        }
      } else {
        const route = index.toLowerCase();
        nextActiveButton = capitalizeFirstLetter(route);
        localStorage.setItem("activePage", route);
        navigate(route);
      }
      return nextActiveButton;
    });
  };
  const [count, setCount] = useState("");
  // const getNotifCount = async() => {
  //   await axios.get(notification.count,{
  //     headers:{
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     },
  //   }).then((response) => {
  //     setCount(response.data)
  //     console.log(response.data)
  //   }).catch((error)=>{
  //     console.log(error)
  //   })
  // }

  // const pollNotificationCount = async () => {
  //   await getNotifCount();
  //   await new Promise(resolve => setTimeout(resolve, 10000));
  //   pollNotificationCount();
  // };

  useEffect(() => {
    const storedActivePage = localStorage.getItem("activePage");
    const active = storedActivePage
      ? capitalizeFirstLetter(storedActivePage.replace(/[/0-9]/g, "").slice())
      : "";
    setActiveButton(active);
    // checkToken()
    // pollNotificationCount()
    console.log(active);
  }, [data, navigate]);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      localStorage.removeItem("activePage");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    const currentPathname = window.location.pathname;
    const pathSegments = currentPathname.split("/");
    const firstSegment = pathSegments[1];
    const newActivePage = firstSegment || "dashboard";
    localStorage.setItem("activePage", newActivePage);
    setActiveButton(capitalizeFirstLetter(firstSegment) || "");
    console.log(capitalizeFirstLetter(firstSegment));
    // checkToken()
  }, [localStorage.getItem("activePage")]);

  return (
    <>
      <div className="p-7 bg-[background-color:var(--color-secondary)] sm:ml-0 flex  h-[10vh] sm:w-full md:w-[100%] ">
        <div className="w-[90%] md:w-[84%] lg:w-[90%] flex-row flex relative  items-center ">
          <div
            onClick={() => setOpen(!open)}
            className={`absolute z-10 justify-center content-center flex-wrap items-center px-4 py-4 ml-[-10] hidden ${
              !open && "hidden"
            } lg:flex cursor-pointer rounded-full border-2 `}
          >
            <RxHamburgerMenu
              className={`${!open && "rotate-180"} absolute w-4 h-4`}
              src={"/control.png"}
              alt="control"
            />
          </div>
          <div
            onClick={() => setNav(true)}
            className={`absolute justify-center content-center flex-wrap items-center px-4 py-4 ml-[-10] flex md:hidden bg-white cursor-pointer rounded-full border-2 `}
          >
            <RxHamburgerMenu
              className={`${!open} absolute w-4 h-4`}
              src={"/control.png"}
              alt="control"
            />
          </div>
          <div className="ml-16">
            <h1 className="text-2xl font-semibold text-[#737373]">
              {activeButton}
            </h1>
          </div>
        </div>
      </div>
      <div
        className={`${
          nav ? "translate-x-0" : "-translate-x-full"
        } duration-500 md:hidden flex-row flex  absolute w-full h-full bottom-0`}
      >
        <div className="w-3/4 h-full bg-[background-color:var(--color-primary)] ">
          <div className="px-2">
            <div className="flex justify-around">
              <div className="w-[100%] items-start content-start  flex">
                <div className="w-full h-32  content-center items-center justify-center flex">
                  <img
                    src="/assets/images/logo_white.png"
                    className={`w-60 h-16 `}
                  />
                </div>
              </div>
              <div onClick={() => setNav(false)} className="pt-8 pr-5">
                <IoMdClose className="text-white w-7 h-7 " />
              </div>
            </div>
            <div className="flex  flex-col w-[100%] content-center justify-between h-10 pt-5   ">
              {data &&
                data.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      handleButtonClick(`${item.name}`);
                      const route = item.name.toLowerCase();
                      navigate(`/${route}`);
                    }}
                    className={`flex flex-row content-center justify-evenly items-center h-11 pl-6 py-9 ${
                      activeButton === item.name && activeButton !== "Profile"
                        ? "bg-[#06ABAA]  rounded-full"
                        : ""
                    } cursor-pointer`}
                  >
                    <div
                      className={`text-3xl ${
                        activeButton === item.name ? "text-white" : "text-white"
                      }`}
                    >
                      <IconRendered iconSet="fa" iconName={item.icon} />
                    </div>
                    <div className="w-full pl-5">
                      <h1 className={`text-2xl text-white`}>{item.name}</h1>
                    </div>
                  </div>
                ))}
              <div
                onClick={() => {
                  localStorage.removeItem("activePage");
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className={`flex pl-6 flex-row content-center justify-evenly items-center h-11 py-9 cursor-pointer`}
              >
                <CiLogout className="text-white w-6 h-6" />
                <div className="w-full pl-5">
                  <h1 className={`text-2xl text-white`}>Log Out</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="w-1/4 h-full bg-zinc-700 opacity-75 "
          onClick={() => setNav(false)}
        ></div>
      </div>
    </>
  );
};
export default Navbar;
