import react, { useState, useEffect } from 'react';
import NavDokter from './NavDokter';
import { Routes, Route } from 'react-router-dom';

import Pemeriksaan from './Pemeriksaan/Pemeriksaan';
import DataboardDokter from './DataboardDokter';
import ProfileDokter from './Profile/ProfileDokter';
const Dokter = ({ setIsAuthenticated, setUser }) => {
  return (
    <div className="min-h-screen w-full lg:p-5 bg-[#FAF7F2] ">
      <NavDokter setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
      <div>
        <div className="ml-[20px] mr-[20px] md:ml-[270px] md:mr-[20px]">
          <Routes>
            <Route index element={<DataboardDokter />} />
            <Route path="pemeriksaan" element={<Pemeriksaan />} />
            <Route path="profile" element={<ProfileDokter />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default Dokter;
