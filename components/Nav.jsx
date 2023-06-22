// #437FC7
// #6DAFFE
// #EDF6FF



'use client'
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";

const Nav = ({ user, handleSignOut }) => {
  const [nav, setNav] = useState(true);
  const navRef = useRef(null);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNav(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="text-black flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4">
      <h1 className="w-full text-3xl font-bold text-[#437FC7] cursor-pointer">
        DailyBlog
      </h1>
      
      <div className="flex items-center space-x-4">
        {user && (
          <div className="flex items-center">
            {/* <p className="text-white ">{user.displayName}</p> */}
            <Image
              src={user.photoURL}
              alt="Profile"
              className="rounded-full"
              width={56}
              height={56}
            />
          </div>
        )}
        <button onClick={handleSignOut} className="hidden md:block text-white w-32 drop-shadow-md h-10 rounded-full bg-[#437FC7]">
          Sign Out
        </button>
      </div>
      <div onClick={handleNav} className="block md:hidden cursor-pointer">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          !nav
            ? "left-0 top-0 fixed w-[60%] h-[1000px] border-r border-r-gray-900 bg-[#0003009e] backdrop-blur ease-in-out duration-500"
            : "left-[-100%] top-0 fixed w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
        }
        ref={navRef}
      >
        <h1 className="w-full text-3xl font-bold m-7 text-[#00df9a]">
          GAURAV.
        </h1>
        <ul className="uppercase m-4">
          <li className="p-4 border-b border-b-gray-700">Home</li>
          <li className="p-4 border-b border-b-gray-700">
            <Link href="/static/GauravResume.pdf" download>
              Resume
            </Link>
          </li>
          <li className="p-4 border-b border-b-gray-700">
            <ScrollLink to="about" smooth={true} duration={500} offset={-70}>
              About
            </ScrollLink>
          </li>
          <li className="p-4">
            <ScrollLink to="contact" smooth={true} duration={500} offset={-70}>
              Contact
            </ScrollLink>
          </li>
          <li className="p-4">
            <button className="text-white px-4 py-2 rounded-lg bg-red-500">
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
