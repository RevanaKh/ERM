import react, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaBriefcaseMedical, FaTicketAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const DataboardPasien = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] py-8">
      <div className="bg-white shadow-lg flex justify-center items-center to-red-500 w-full h-[100px] rounded-md">
        <p className="text-[#00B686] font-bold">Welcome Back </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white shadow-lg mt-[20px] flex justify-center items-center to-red-500 w-full h-[300px] rounded-md">
          <div className="flex flex-col items-center justify-center gap-[20px]">
            <FaCalendarAlt className="text-[40px] text-[#00B686]" />
            <p className=" font-bold">Pendaftaran Online </p>
            <p className=" text-center">Daftar Janji Temu dengan dokter Piihan Anda secara online dan mudah</p>
            <button onClick={() => navigate('/dashboardPasien/pendaftaran')} type="submit" className="w-[40%] bg-[#1DE9B6] text-white py-3 rounded hover:bg-[#00B686]">
              Daftar Sekarang
            </button>
          </div>
        </div>
        <div className="bg-white shadow-lg mt-[20px] flex justify-center items-center to-red-500 w-full h-[300px] rounded-md">
          <div className="flex flex-col items-center justify-center gap-[20px]">
            <FaTicketAlt className="text-[40px] text-[#00B686]" />
            <p className=" font-bold">Cek antrian </p>
            <p className=" text-center">Pantau Status Antrian anda secara realtime</p>
            <button onClick={() => navigate('/dashboardPasien/antrian')} type="submit" className="w-[40%] bg-[#1DE9B6] text-white py-3 rounded hover:bg-[#00B686]">
              Cek antrian
            </button>
          </div>
        </div>{' '}
        <div className="bg-white shadow-lg mt-[20px] flex justify-center items-center to-red-500 w-full h-[300px] rounded-md">
          <div className="flex flex-col items-center justify-center gap-[20px]">
            <FaBriefcaseMedical className="text-[40px] text-[#00B686]" />
            <p className=" font-bold">Riwayat Medis </p>
            <p className=" text-center">Akses Riwayat Medis dan rekam jejak pemeriksaan anda </p>
            <button type="submit" onClick={() => navigate('/dashboardPasien/riwayatmedis')} className="w-[40%] bg-[#1DE9B6] text-white py-3 rounded hover:bg-[#00B686]">
              Lihat Riwayat
            </button>
          </div>
        </div>
        <div className="bg-white shadow-lg mt-[20px] flex justify-center items-center to-red-500 w-full h-[300px] rounded-md">
          <div className="flex flex-col items-center justify-center gap-[20px]">
            <FaCalendarAlt className="text-[40px] text-[#00B686]" />
            <p className="font-bold">Jadwal Dokter</p>
            <p className="text-center">Lihat jadwal dokter untuk konsultasi anda</p>
            <button onClick={() => navigate('/dashboardPasien/jadwalDokter')} type="submit" className="w-[40%] bg-[#1DE9B6] text-white py-3 rounded hover:bg-[#00B686]">
              Lihat Jadwal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataboardPasien;
