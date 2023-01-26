import { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "../../layouts/Layout";
import { logout } from "../../services/redux/features/auth";

export default function Header() {
  const { setSidebarVisibility } = useContext(DashboardContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [tabVisible, toggleTab] = useState(false);
  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 border-b border-b-gray-700">
      <div className="px-2">
        <div className="relative flex items-center justify-between h-16">
          <div className="inset-y-0 left-0 flex items-center [md:hidden]">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setSidebarVisibility((prev) => !prev)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 md:ml-6 flex items-center justify-center md:items-stretch md:justify-start">
            <div className="flex-shrink-0 left flex items-center">
              <div className="flex my-auto">
                {/* <span className="rounded-full flex border-2 mr-2 border-gray-600 my-auto h-8 w-8 shadow">
                  <i className="fa-solid text-gray-400 fa-fw fa-building-columns m-auto"></i> //LOGO//
                </span> */}
                {/* sm-->md-->lg-->xl-->2xl */}
                <span className="text-white text-xl font-light tracking-widest">
                  การติดตามอุปกรณ์การแพทย์
                </span> 
              </div>
            </div>
          </div>
          <div className=" absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
            {/* <div className="hidden md:block md:ml-6">
              <div className="flex ml-auto space-x-4">
                <button className={getLinkClass('/logout')} onClick={onLogout}>Logout</button>
              </div>
            </div> */}
            <button
              type="button"
              className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">View notifications</span>
              {/* Heroicon name: outline/bell */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {/* Profile dropdown */}
            <div className="ml-3 relative">
              <div>
                <button
                  id="profile-btn"
                  onClick={() => toggleTab((prev) => !prev)}
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  {/* {auth.isLoggedIn ? ( */}
                  <div className="flex flex-col">
                    <span className="my-auto text-white ml-3 hidden md:inline">
                      วิริยาภรณ์ ไชย
                    </span>
                    <span className="my-auto text-slate-400 ml-3 hidden md:inline">
                     (เจ้าหน้าที่)
                    </span>
                  </div>
                  {/* ) : <span className="sr-only">open user menu</span>} */}
                </button>
              </div>

              {/*
                Dropdown menu, show/hide based on menu state.
                Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
              */}
              <div
                className={`${
                  tabVisible ? "block" : "hidden"
                } z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                {/* Active: "bg-gray-100", Not Active: "" */}
                {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1">Sign out</a> */}
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Profile
                </a>
                <a
                  href="/change-password"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Change Password
                </a>
                <a
                  href="/"
                  onClick={onLogout}
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {/* <div className={`${tabVisible ? "" : "hidden"} transition delay-150 duration-300 md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 absolute bg-gray-800 w-full">
          <Link to="/" className={getLinkClass('/')} data-aria-current="page">Home</Link>
          {auth.isLoggedIn ? (
            <button className={getLinkClass('/logout')} onClick={onLogout}>Logout</button>
          ) : (
            <Link to="/login" className={getLinkClass('/login')}>Login</Link>
          )}
        </div>
      </div> */}
    </nav>
  );
}
