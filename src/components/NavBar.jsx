import React from "react";
import { FiSearch } from "react-icons/fi"; // install: npm i react-icons

const NavBar = () => {
  return (
    <nav className="flex items-center bg-[#253849] px-6 h-20">
        <div className="container mx-auto flex items-center justify-between">
            <div className="text-white text-xl font-semibold">MyLogo</div>
            {/* Search bar */}
            <div class="relative">
            <input
                placeholder="Search..."
                class="input shadow-lg focus:border-none border-gray-300 pl-5 pr-10 py-3 rounded-xl w-56 transition-all sm:focus:w-64 outline-none"
                name="search"
                type="search"
            />
            <svg
                class="size-6 absolute top-3 right-3 text-gray-500"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                stroke-linejoin="round"
                stroke-linecap="round"
                ></path>
            </svg>
            </div>
        </div>
    </nav>
  );
};

export default NavBar;
