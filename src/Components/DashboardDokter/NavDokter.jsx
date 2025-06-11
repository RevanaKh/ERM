import React from 'react';
import { useState } from 'react';
import { FaBars, FaHome, FaUsers, FaUserCircle } from 'react-icons/fa';
import { IoNewspaperOutline } from 'react-icons/io5';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Navdashboard = ({ setIsAuthenticated, setUser }) => {
  const [open, setOpen] = useState(false);
  const Toggler = () => {
    setOpen(!open);
  };
  const Logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };
  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={Toggler}
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-[26px] text-gray-500 rounded-lg sm:hidden hover:bg-[#00B686] focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <FaBars />
        </button>
      </div>
      <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'} aria-label="Sidebar`}>
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#1DE9B6]">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to={'/dashboardDokter'} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-[#00B686] ">
                <FaHome />
                <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardDokter/profile'} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-[#00B686] ">
                <FaUserCircle />
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardDokter/pemeriksaan'} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-[#00B686] ">
                <IoNewspaperOutline />
                <span className="flex-1 ms-3 whitespace-nowrap">Pemeriksaan</span>
              </Link>
            </li>
            <li>
              <button onClick={Logout} className="flex items-center p-2 w-full text-gray-900 rounded-lg hover:text-white hover:bg-[#00B686]">
                <RiLogoutBoxLine className="text-lg" />
                <span className="ms-3 whitespace-nowrap">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Navdashboard;
