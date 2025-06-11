import react, { useState, useEffect } from 'react';
import NavAdmin from './NavAdmin';
import DataboardAdmin from './DataboardAdmin';
import { Routes, Route } from 'react-router-dom';
import Datapasien from './Pasien/Datapasien';
import DataDokter from './Dokter/DataDokter';
import DataObat from './Obat/DataObat';
import TabelPendaftaran from './Pendaftaran/TabelPendaftaran';
import DataApoteker from './Apoteker/DataApoteker';
import TransaksiPasien from './Pasien/TransaksiPasien';
const Admin = ({ setIsAuthenticated, setUser }) => {
  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] ">
      <NavAdmin setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
      <div>
        <div className="ml-[20px] mr-[20px] md:ml-[270px] md:mr-[20px]">
          <Routes>
            <Route index element={<DataboardAdmin />} />
            <Route path="datapasien" element={<Datapasien />} />
            <Route path="dokter" element={<DataDokter />} />
            <Route path="dataobat" element={<DataObat />} />
            <Route path="pendaftaran" element={<TabelPendaftaran />} />
            <Route path="apoteker" element={<DataApoteker />} />
            <Route path="transaksi" element={<TransaksiPasien />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default Admin;
