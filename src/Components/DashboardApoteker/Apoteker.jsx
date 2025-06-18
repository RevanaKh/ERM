import react, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DataboardApoteker from './DataboardApoteker';
import NavApoteker from './NavApoteker';
import PendaftaranSelesai from './Pendaftaran/PendaftaranSelesai';
import ProfileApoteker from './Profile/ProfileApoteker';
import DataObat from './Obat/DataObatApoteker';
const Dokter = ({ setIsAuthenticated, setUser }) => {
  return (
    <div className="min-h-screen w-full lg:p-5 bg-[#FAF7F2] ">
      <NavApoteker setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
      <div>
        <div className="ml-[20px] mr-[20px] md:ml-[270px] md:mr-[20px]">
          <Routes>
            <Route index element={<DataboardApoteker />} />
            <Route path={'pendaftaran'} element={<PendaftaranSelesai />} />
            <Route path={'profile'} element={<ProfileApoteker />} />
            <Route path={'dataobat'} element={<DataObat />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default Dokter;
