import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const URL_BASIC = import.meta.env.VITE_URL_BASIC;
  const NavItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Add Students", slug: "/add-student", active: true },
    { name: "All Students", slug: "/view", active: true },
  ];

  return (
    <>
      <header className="shadow py-4 bg-blue-600">
        <div className="mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img
                src="https://lh3.googleusercontent.com/p/AF1QipOlzxSsMysyPCpbaqy7InFZxJ7UoHXACp8TqEY=s1360-w1360-h1020"
                height={80}
                width={80}
                alt="logo"
              />
            </Link>
            <h1 className="text-white text-xl font-semibold">IITS National</h1>
          </div>

          <button
            className="block lg:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          <ul className="hidden lg:flex space-x-6 items-center">
            {NavItems.map(
              (item) =>
                item.active && (
                  <li key={item.slug}>
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `inline-block px-6 py-2 duration-200 rounded-full ${
                          isActive ? "bg-slate-200 text-gray-800" : "text-white"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        </div>
        {menuOpen && (
          <ul className="lg:hidden px-4 mt-4 flex flex-col space-y-2">
            {NavItems.map(
              (item) =>
                item.active && (
                  <li key={item.slug}>
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `block w-full text-center px-6 py-2 duration-200 rounded-full ${
                          isActive ? "bg-slate-200 text-gray-800" : "text-white"
                        }`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        )}
      </header>
    </>
  );
}