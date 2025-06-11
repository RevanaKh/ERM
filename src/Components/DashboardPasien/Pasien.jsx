import React, { use, useState } from 'react';
import Navpasien from './Navpasien';
import { Routes, Route } from 'react-router-dom';
import Pendaftaran from './Pendaftaran/Pendaftaran';
import Antrian from './Antrian/Antrian';
import Modal from './Modal';
import DataboardPasien from './DataboardPasien';
import JadwalDokter from './JadwalDokter/JadwalDokter';
import Profile from './Profile/Profile';
import RiwayatMedis from './Riwayat/RiwayatMedis';
import TransaksiSaya from './transaksi/TransaksiSaya';
const Pasien = ({ setIsAuthenticated, setUser }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] ">
      <Navpasien setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
      <div className="ml-[20px] mr-[20px] md:ml-[270px] md:mr-[20px]">
        <Routes>
          <Route index element={<DataboardPasien />} />
          <Route path="pendaftaran" element={<Pendaftaran setError={setError} setMessage={setMessage} setOpen={setOpen} />} />
          <Route path="antrian" element={<Antrian />} />
          <Route path="jadwaldokter" element={<JadwalDokter />} />
          <Route path="profile" element={<Profile />} />
          <Route path="riwayatmedis" element={<RiwayatMedis />} />
          <Route path="transaksisaya" element={<TransaksiSaya />} />
        </Routes>
      </div>
      <Modal error={error} message={message} open={open} setOpen={setOpen} />
    </div>
  );
};

export default Pasien;
