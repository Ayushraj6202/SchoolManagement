import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storelogin, storelogout } from "../Store/adminSlice";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const URL_BASIC = import.meta.env.VITE_URL_BASIC;
  const status = useSelector((state) => state.admin.status);
  const role = useSelector((state) => state.admin.role);
  const NavItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Add Students", slug: "/add-student", active: (role === 'SuperAdmin') },
    { name: "All Students", slug: "/view", active: true },
    { name: "Login", slug: "/login", active: (status === false) },
    { name: "Add Admin", slug: "/signup", active: (role === 'SuperAdmin') },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL_BASIC}/admin/logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('logout ',response);
      if(response.ok)
      {
        dispatch(storelogout());
        navigate('/')
      }
    } catch (error) {
      console.error("Logout failed: ", error);
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return (
      <>Loading .... </>
    )
  }
  return (
    <>
      <header className="shadow py-4 bg-blue-600">
        <div className="mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img
                src="https://i.pinimg.com/474x/f6/81/c7/f681c776279f3f2a0d775eba95efc9c9.jpg"
                height={80}
                width={80}
                alt="logo"
              />
            </Link>
            <h1 className="text-white text-xl font-semibold">School</h1>
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
                        `inline-block px-6 py-2 duration-200 rounded-full ${isActive ? "bg-slate-200 text-gray-800" : "text-white"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {
              status && (
                <button
                  onClick={handleLogout}
                  className="inline-block px-6 py-2 duration-200 rounded-full text-gray-800 text-white bg-red-500"
                >
                  Logout
                </button>
              )
            }
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
                        `block w-full text-center px-6 py-2 duration-200 rounded-full ${isActive ? "bg-slate-200 text-gray-800" : "text-white"
                        }`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {
              status && (
                <button
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )
            }
          </ul>
        )}
      </header>
    </>
  );
}
