import React from 'react';
import { useState } from 'react';
import { FaBars, FaHome, FaUsers, FaHandHoldingMedical, FaClipboardList, FaBriefcaseMedical } from 'react-icons/fa';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { MdOutlinePayments } from "react-icons/md";
import { BsCapsule } from 'react-icons/bs';
import { TbReportAnalytics } from "react-icons/tb";
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
        <div className="h-full flex flex-col justify-between px-3 py-4 overflow-y-auto bg-[#1DE9B6]">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to={'/dashboardAdmin'} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-[#00B686] ">
                <FaHome />
                <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
              </Link>
            </li>
              <li>
                <Link to={'/dashboardAdmin/laporan'} className="flex items-center p-2 text-gray-900 rounded-lg  hover:text-white hover:bg-[#00B686] ">
                  <TbReportAnalytics />
                  <span className="flex-1 ms-3 whitespace-nowrap">Laporan</span>
                </Link>
              </li>
            <li>
              <Link to={'/dashboardAdmin/datapasien'} className="flex items-center p-2 text-gray-900 rounded-lg  hover:text-white hover:bg-[#00B686] ">
                <FaUsers />
                <span className="flex-1 ms-3 whitespace-nowrap">Data Pasien</span>
              </Link>
              <li>
                <Link to={'/dashboardAdmin/pendaftaran'} className="flex items-center p-2 text-gray-900 rounded-lg  hover:text-white hover:bg-[#00B686] ">
                  <FaClipboardList />
                  <span className="flex-1 ms-3 whitespace-nowrap">Data Pendaftaran</span>
                </Link>
              </li>
              <li>
                <Link to={'/dashboardAdmin/transaksi'} className="flex items-center p-2 text-gray-900 rounded-lg  hover:text-white hover:bg-[#00B686] ">
                  <MdOutlinePayments />
                  <span className="flex-1 ms-3 whitespace-nowrap">Transaksi Pasien</span>
                </Link>
              </li>
              <li>
                <Link to={'/dashboardAdmin/dokter'} className="flex items-center p-2 text-gray-900 rounded-lg  hover:text-white hover:bg-[#00B686] ">
                  <FaHandHoldingMedical />
                  <span className="flex-1 ms-3 whitespace-nowrap">Data Dokter</span>
                </Link>
              </li>
              <li>
                <Link to={'/dashboardAdmin/apoteker'} className="flex items-center p-2 text-gray-900 rounded-lg  hover:text-white hover:bg-[#00B686] ">
                  <FaBriefcaseMedical />
                  <span className="flex-1 ms-3 whitespace-nowrap">Data Apoteker</span>
                </Link>
              </li>
              <li>
                <Link to={'/dashboardAdmin/dataobat'} className="flex items-center p-2 text-gray-900 rounded-lg  hover:text-white hover:bg-[#00B686] ">
                  <BsCapsule />
                  <span className="flex-1 ms-3 whitespace-nowrap">Data Obat</span>
                </Link>
              </li>
                <li>
                <Link to={'/dashboardAdmin/datauser'} className="flex items-center p-2 text-gray-900 rounded-lg  hover:text-white hover:bg-[#00B686] ">
                  <FaUsers />
                  <span className="flex-1 ms-3 whitespace-nowrap">Data user</span>
                </Link>
              </li>
            </li>
          </ul>
          <div className=''>
                <button onClick={Logout} className="flex items-center p-2 w-full text-gray-900 rounded-lg  text-white bg-black hover:bg-gray-700">
                  <RiLogoutBoxLine className="text-lg" />
                  <span className="ms-3 whitespace-nowrap">Logout</span>
                </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Navdashboard;
