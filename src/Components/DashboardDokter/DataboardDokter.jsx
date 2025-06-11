import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import JadwalSaya from './JadwalSaya';

const DataboardDokter = () => {
  const [pasienbypoli, setPasienbypoli] = useState([]);

  const fetchpasien = async () => {
    try {
      const response = await api.get('/dokter/getpasien');
      setPasienbypoli(response.data.length);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  useEffect(() => {
    fetchpasien();
  }, []);
  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] ">
      <div className="bg-white shadow-lg mt-[20px] flex justify-center items-center to-red-500 w-full h-[100px] rounded-md">
        <p className="text-[#00B686] font-bold">Welcome Back Dokter</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white shadow-lg mt-[20px] flex gap-[100px] justify-center items-center to-red-500 w-full h-[100px] rounded-md">
          {/* <FaUsers className="text-[50px] text-[#00B686]" /> */}
          <div>
            <p className="text-[#00B686] font-bold">Total Pasien</p>
            <div className="w-full flex justify-center">{pasienbypoli}</div>
          </div>
        </div>
        <div className="bg-white shadow-lg mt-[20px] flex gap-[100px] justify-center items-center to-red-500 w-full h-[100px] rounded-md">
          <div>
            <p className="text-[#00B686] font-bold">Total Dokter</p>
            <div className="w-full flex justify-center"></div>
          </div>
        </div>
        <div className="bg-white shadow-lg mt-[20px] flex gap-[100px] justify-center items-center to-red-500 w-full h-[100px] rounded-md">
          <div>
            <p className="text-[#00B686] font-bold">Total Obat</p>
            <div className="w-full flex justify-center"></div>
          </div>
        </div>
      </div>
      <JadwalSaya />
    </div>
  );
};

export default DataboardDokter;
