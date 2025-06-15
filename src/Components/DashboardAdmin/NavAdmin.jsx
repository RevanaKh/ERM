import React from 'react';
import { useState } from 'react';
import { FaBars, FaHome, FaUsers, FaHandHoldingMedical, FaClipboardList, FaBriefcaseMedical } from 'react-icons/fa';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { MdOutlinePayments } from 'react-icons/md';
import { BsCapsule } from 'react-icons/bs';
import { TbReportAnalytics } from 'react-icons/tb';
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
      <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`} aria-label="Sidebar">
        <div className="h-full flex flex-col px-3 py-4 overflow-y-auto bg-[#1DE9B6]">
          <ul className="space-y-2 font-medium flex-1">
            <li>
              <Link to={'/dashboardAdmin'} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-[#00B686]">
                <FaHome />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardAdmin/laporan'} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-[#00B686]">
                <TbReportAnalytics />
                <span className="ms-3">Laporan</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardAdmin/datapasien'} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-[#00B686]">
                <FaUsers />
                <span className="ms-3">Data Pasien</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardAdmin/pendaftaran'} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-[#00B686]">
                <FaClipboardList />
                <span className="ms-3">Data Pendaftaran</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardAdmin/transaksi'} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-[#00B686]">
                <MdOutlinePayments />
                <span className="ms-3">Transaksi Pasien</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardAdmin/dokter'} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-[#00B686]">
                <FaHandHoldingMedical />
                <span className="ms-3">Data Dokter</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardAdmin/apoteker'} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-[#00B686]">
                <FaBriefcaseMedical />
                <span className="ms-3">Data Apoteker</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardAdmin/dataobat'} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-[#00B686]">
                <BsCapsule />
                <span className="ms-3">Data Obat</span>
              </Link>
            </li>
            <li>
              <Link to={`/dashboardAdmin/report`} className="flex items-center p-2 text-gray-900 rounded-lg  hover:text-white hover:bg-[#00B686] ">
                <TiMessages />
                <span className="flex-1 ms-3 whitespace-nowrap">Pesan dari User</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardAdmin/datauser'} className="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-[#00B686]">
                <FaUsers />
                <span className="ms-3">Data User</span>
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
