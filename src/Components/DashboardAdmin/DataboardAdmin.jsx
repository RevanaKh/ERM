import react, { useState, useEffect } from 'react';
import { FaUsers, FaClipboardList, FaBriefcaseMedical } from 'react-icons/fa';
import api from '../../utils/api';
import { FaUserDoctor } from 'react-icons/fa6';
import { BsCapsule } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const DataboardAdmin = () => {
  const [totalpasien, setTotalpasien] = useState(0);
  const [totalDataObat, setTotalDataObat] = useState(0);
  const [totalDokter, setTotalDokter] = useState(0);
  const [totalPendaftaran, setTotalPendaftaran] = useState(0);
  const [totalApoteker, setTotalApoteker] = useState(0);
  const navigate = useNavigate();

  const fetchpasien = async () => {
    try {
      const res = await api.get('/users');
      const pasienOnly = res.data.filter((user) => user.role === 'pasien');
      setTotalpasien(pasienOnly.length);
    } catch (err) {
      console.error(err.response?.data.message);
    }
  };
  const fetchObat = async () => {
    try {
      const res = await api.get('/obat/dataobat');
      setTotalDataObat(res.data.length);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchdokter = async () => {
    try {
      const res = await api.get('/dokter/getdokter');
      setTotalDokter(res.data.length);
    } catch (err) {
      console.log(err.res?.data.message);
    }
  };
  const fetchpendaftaran = async () => {
    try {
      const res = await api.get('/pasien/getdaftar');
      setTotalPendaftaran(res.data.length);
    } catch (err) {
      console.log(err.res?.data.message);
    }
  };
  const fetchApoteker = async () => {
    try {
      const res = await api.get('/apoteker/getapoteker');
      setTotalApoteker(res.data.length);
    } catch (err) {
      console.log(err.res?.data.message);
    }
  };
  useEffect(() => {
    fetchObat();
    fetchdokter();
    fetchpasien();
    fetchpendaftaran();
    fetchApoteker();
  }, []);
  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] py-5 ">
      <div className="bg-white shadow-lg mt-[20px] flex justify-center items-center to-red-500 w-full h-[100px] rounded-md">
        <p className="text-[#00B686] font-bold">Welcome Back Admin</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white hover:bg-gray-200 shadow-lg mt-[20px] flex justify-center items-center w-full h-[300px] rounded-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col items-center justify-center gap-[20px]">
            <FaUsers className="text-[40px] text-[#00B686]" />
            <p className="font-bold">Total Pasien {totalpasien}</p>
            <button onClick={() => navigate('/dashboardAdmin/datapasien')} type="submit" className="w-full bg-[#1DE9B6] text-white py-3 rounded hover:bg-[#00B686] transition duration-300">
              Data Pasien
            </button>
          </div>
        </div>
        <div className="bg-white hover:bg-gray-200 shadow-lg mt-[20px] flex justify-center items-center w-full h-[300px] rounded-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col items-center justify-center gap-[20px]">
            <FaUserDoctor className="text-[50px] text-[#00B686]" />

            <p className="text-[#00B686] font-bold">Total Dokter {totalDokter}</p>
            <button onClick={() => navigate('/dashboardAdmin/dokter')} type="submit" className="w-full bg-[#1DE9B6] text-white py-3 rounded hover:bg-[#00B686] transition duration-300">
              Data Dokter
            </button>
          </div>
        </div>
        <div className="bg-white hover:bg-gray-200 shadow-lg mt-[20px] flex justify-center items-center w-full h-[300px] rounded-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col items-center justify-center gap-[20px]">
            <BsCapsule className="text-[50px] text-[#00B686]" />
            <p className="text-[#00B686] font-bold">Total Obat {totalDataObat}</p>
            <button onClick={() => navigate('/dashboardAdmin/dataobat')} type="submit" className="w-full bg-[#1DE9B6] text-white py-3 rounded hover:bg-[#00B686] transition duration-300">
              Data Obat
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white hover:bg-gray-200 shadow-lg mt-[20px] flex justify-center items-center w-full h-[300px] rounded-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col items-center justify-center gap-[20px]">
            <FaClipboardList className="text-[50px] text-[#00B686]" />

            <p className="text-[#00B686] font-bold">Total Pendafataran {totalPendaftaran}</p>
            <button onClick={() => navigate('/dashboardAdmin/pendaftaran')} type="submit" className="w-full bg-[#1DE9B6] text-white py-3 rounded hover:bg-[#00B686] transition duration-300">
              Data Pendaftaran
            </button>
          </div>
        </div>
        <div className="bg-white hover:bg-gray-200 shadow-lg mt-[20px] flex justify-center items-center w-full h-[300px] rounded-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex flex-col items-center justify-center gap-[20px]">
            <FaBriefcaseMedical className="text-[50px] text-[#00B686]" />
            <p className="text-[#00B686] font-bold">Total Apoteker {totalApoteker}</p>
            <button onClick={() => navigate('/dashboardAdmin/apoteker')} type="submit" className="w-full bg-[#1DE9B6] text-white py-3 rounded hover:bg-[#00B686] transition duration-300">
              Data Apoteker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataboardAdmin;
