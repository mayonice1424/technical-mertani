/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import "./sidebar.css";
import { ImProfile } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { HiHome } from "react-icons/hi";
import { TiDeviceDesktop } from "react-icons/ti";
import { useState, useEffect } from "react";
import IconRendered from "../icon/icon";
const Sidebar = ({ open, data, setOpen }) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("");
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const checkToken = async () => {
    const token = await localStorage.getItem("token");
    if (!token) {
    }
  };
  const isMobile = useMediaQuery({ minWidth: 768, maxWidth: 991 });
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
  useEffect(() => {
    // checkToken()
    const storedActivePage = localStorage.getItem("activePage");
    const active = storedActivePage
      ? capitalizeFirstLetter(storedActivePage.replace(/[/0-9]/g, "").slice())
      : "";
    setActiveButton(active);
    console.log(active);
    if (isMobile) {
      setOpen(false);
    }
  }, [data, navigate, isMobile]);
  useEffect(() => {
    // checkToken()
    const handleBeforeUnload = (event) => {
      localStorage.removeItem("activePage");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    console.log(data);
    // checkToken()
    const currentPathname = window.location.pathname;
    const pathSegments = currentPathname.split("/");
    const firstSegment = pathSegments[1];
    const newActivePage = firstSegment || "dashboard";
    localStorage.setItem("activePage", newActivePage);
    setActiveButton(capitalizeFirstLetter(firstSegment) || "");
    console.log(capitalizeFirstLetter(firstSegment));
  }, [localStorage.getItem("activePage"), navigate]);

  useEffect(() => {
    console.log("ini data", data);
  }, [data]);
  return (
    <>
      <div
        className={`${
          open ? "md:w-[20vw]" : "md:w-24"
        } hidden flex-col duration-500 rounded-tr-md rounded-br-md  md:flex min-h-screen pb-10 bg-[background-color:var(--color-primary)]`}
      >
        <div className="w-[100%] items-start  rounded-tr-md rounded-br-md content-center justify-evenly pt-10 bg-[background-color:var(--color-primary)] flex">
          <div className="w-56 h-24 content-center items-center flex">
            <div className="flex w-full  justify-center items-center">
              <img
                src={open ? "/logo.png" : "/logo.png"}
                className={open ? "w-1/2" : "w-1/2"}
              />
            </div>
          </div>
        </div>
        <ul
          className={`menu flex flex-col w-[100%]  ${
            open ? "items-end relative px-2" : "items-center"
          }  content-center justify-between md:mt-10 lg:mt-8`}
        >
          {data &&
            data.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  handleButtonClick(`${item.path}`);
                  const route = item.name.toLowerCase();
                  navigate(`/${route}`);
                }}
                className={`flex flex-row ${
                  open
                    ? "md:w-[100%] lg:pl-8 pl-5 relative rounded-[10px]"
                    : "md:w-[60%]"
                } content-center  items-center ${
                  open
                    ? "md:py-9 justify-evenly"
                    : "md:py-6  rounded-full mt-3 justify-center"
                } md:h-6  ${
                  activeButton === item.name &&
                  activeButton !== "Profile" &&
                  open
                    ? "bg-[#06ABAA]  "
                    : activeButton === item.name &&
                      activeButton !== "Profile" &&
                      !open
                    ? "bg-[#06ABAA]"
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
                <div
                  className={`w-full pl-5 ${open ? "md:flex" : "md:hidden"}`}
                >
                  <h1 className={`text-2xl z-[1] text-white `}>{item.name}</h1>
                </div>
              </li>
            ))}
          <li
            onClick={() => {
              handleButtonClick(`/dashboard`);
              const route = "dashboard";
              navigate(`/${route}`);
            }}
            className={`flex flex-row ${
              open
                ? "md:w-[100%] lg:pl-8 pl-5 relative rounded-[10px]"
                : "md:w-[60%]"
            } content-center  items-center ${
              open
                ? "md:py-9 justify-evenly"
                : "md:py-6  rounded-full mt-3 justify-center"
            } md:h-6  ${
              activeButton === "Dashboard" && activeButton !== "Profile" && open
                ? "bg-[#06ABAA]"
                : activeButton === "Dashboard" &&
                  activeButton !== "Profile" &&
                  !open
                ? "bg-[#06ABAA]"
                : ""
            } cursor-pointer`}
          >
            <div
              className={`text-3xl ${
                activeButton === "Dashboard" ? "text-white" : "text-[#cbcbcb]"
              }`}
            >
              <HiHome />
            </div>
            <div className={`w-full pl-5 ${open ? "md:flex" : "md:hidden"}`}>
              <h1
                className={`text-2xl z-[1]  ${
                  activeButton === "Dashboard" ? "text-white" : "text-[#cbcbcb]"
                } `}
              >
                {"Dashboard"}
              </h1>
            </div>
          </li>
          <li
            onClick={() => {
              handleButtonClick(`/table`);
              const route = "table";
              navigate(`/${route}`);
            }}
            className={`flex flex-row ${
              open
                ? "md:w-[100%] lg:pl-8 pl-5 relative rounded-[10px]"
                : "md:w-[60%]"
            } content-center  items-center ${
              open
                ? "md:py-9 justify-evenly"
                : "md:py-6  rounded-full mt-3 justify-center"
            } md:h-6  ${
              activeButton === "Table" &&
              activeButton !== "Profile" &&
              open
                ? "bg-[#06ABAA]"
                : activeButton === "Table" &&
                  activeButton !== "Profile" &&
                  !open
                ? "bg-[#06ABAA]"
                : ""
            } cursor-pointer`}
          >
            <div
              className={`text-3xl ${
                activeButton === "Table"
                  ? "text-[#ffffff]"
                  : "text-[#cbcbcb]"
              }`}
            >
              <TiDeviceDesktop />
            </div>
            <div className={`w-full pl-5 ${open ? "md:flex" : "md:hidden"}`}>
              <h1
                className={`text-2xl z-[1] ${
                  activeButton === "Table"
                    ? "text-[#ffffff]"
                    : "text-[#cbcbcb]"
                } `}
              >
                {"Table"}
              </h1>
            </div>
          </li>
           <li
            onClick={() => {
              handleButtonClick(`/grafik`);
              const route = "grafik";
              navigate(`/${route}`);
            }}
            className={`flex flex-row ${
              open
                ? "md:w-[100%] lg:pl-8 pl-5 relative rounded-[10px]"
                : "md:w-[60%]"
            } content-center  items-center ${
              open
                ? "md:py-9 justify-evenly"
                : "md:py-6  rounded-full mt-3 justify-center"
            } md:h-6  ${
              activeButton === "Grafik" &&
              activeButton !== "Profile" &&
              open
                ? "bg-[#06ABAA]"
                : activeButton === "Grafik" &&
                  activeButton !== "Profile" &&
                  !open
                ? "bg-[#06ABAA]"
                : ""
            } cursor-pointer`}
          >
            <div
              className={`text-3xl ${
                activeButton === "Grafik"
                  ? "text-[#ffffff]"
                  : "text-[#cbcbcb]"
              }`}
            >
              <TiDeviceDesktop />
            </div>
            <div className={`w-full pl-5 ${open ? "md:flex" : "md:hidden"}`}>
              <h1
                className={`text-2xl z-[1] ${
                  activeButton === "Grafik"
                    ? "text-[#ffffff]"
                    : "text-[#cbcbcb]"
                } `}
              >
                {"Grafik"}
              </h1>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Sidebar;
