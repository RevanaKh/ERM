import React from 'react';
import { useState } from 'react';
import { FaBars, FaHome, FaUsers, FaUserCircle, FaBriefcaseMedical } from 'react-icons/fa';
import { CiCreditCard1 } from 'react-icons/ci';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { FaUserDoctor } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { LuTicket } from 'react-icons/lu';
import { TiMessages } from 'react-icons/ti';
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
        <div className="h-full flex flex-col px-3 py-4 overflow-y-auto bg-[#1DE9B6]">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to={'/dashboardPasien'} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-[#00B686] ">
                <FaHome />
                <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardPasien/profile'} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-[#00B686] ">
                <FaUserCircle />
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardPasien/pendaftaran'} className="flex items-center p-2 text-gray-900 rounded-lg  hover:text-white hover:bg-[#00B686] ">
                <FaUsers />
                <span className="flex-1 ms-3 whitespace-nowrap">Pendaftaran</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardPasien/jadwaldokter'} className="flex items-center p-2 text-gray-900 rounded-lg  hover:text-white hover:bg-[#00B686] ">
                <FaUserDoctor />
                <span className="flex-1 ms-3 whitespace-nowrap">Jadwal Dokter</span>
              </Link>
            </li>
            <li>
              <Link to={`/dashboardPasien/antrian`} className="flex items-center p-2 text-gray-900 rounded-lg  hover:text-white hover:bg-[#00B686] ">
                <LuTicket />
                <span className="flex-1 ms-3 whitespace-nowrap">Antrian</span>
              </Link>
            </li>
            <li>
              <Link to={`/dashboardPasien/riwayatmedis`} className="flex items-center p-2 text-gray-900 rounded-lg  hover:text-white hover:bg-[#00B686] ">
                <FaBriefcaseMedical />
                <span className="flex-1 ms-3 whitespace-nowrap">Riwayat Medis</span>
              </Link>
            </li>
            <li>
              <Link to={`/dashboardPasien/transaksisaya`} className="flex items-center p-2 text-gray-900 rounded-lg  hover:text-white hover:bg-[#00B686] ">
                <CiCreditCard1 />
                <span className="flex-1 ms-3 whitespace-nowrap">Transaksi</span>
              </Link>
            </li>
            <li>
              <Link to={`/dashboardPasien/report`} className="flex items-center p-2 text-gray-900 rounded-lg  hover:text-white hover:bg-[#00B686] ">
                <TiMessages />
                <span className="flex-1 ms-3 whitespace-nowrap">Kirimi Pesan Admin</span>
              </Link>
            </li>
          </ul>
          <div className="mt-auto">
            <button onClick={Logout} className="flex items-center p-2 w-full text-white bg-black rounded-lg hover:bg-gray-700">
              <RiLogoutBoxLine className="text-lg" />
              <span className="ms-3">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Navdashboard;
