
import React from 'react';
import { useState } from 'react';
import { FaBars, FaHome, FaAddressBook, FaMoneyCheckAlt } from 'react-icons/fa';
import { FaUserDoctor } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Navdashboard = () => {
  const [open, setOpen] = useState(false);
  const Toggler = () => {
    setOpen(!open);
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
              <Link to={'/dashboardAdmin'} className="flex items-center p-2 text-gray-900 rounded-lg text-white hover:bg-[#00B686] ">
                <FaHome />
                <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardAdmin/datapasien'} className="flex items-center p-2 text-gray-900 rounded-lg  text-white hover:bg-[#00B686] ">
                <svg
                  className="shrink-0 w-5 h-5 text-gray-500 transition duration-75  text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Data Pasien</span>
              </Link>
              <li>
                  <Link to={'/dashboardAdmin/jadwaldokter'} className="flex items-center p-2 text-gray-900 rounded-lg  text-white hover:bg-[#00B686] ">
   <FaUserDoctor/>
                <span className="flex-1 ms-3 whitespace-nowrap">jadwal dokter</span>
              </Link>
              </li>
              <li>
                <Link to={'/dashboardAdmin/DataPayments'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#00B686] dark:hover:bg-gray-700 group">
                  <FaMoneyCheckAlt />
                  <span className="flex-1 ms-3 whitespace-nowrap">Data Payments</span>
                </Link>
              </li>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Navdashboard;
