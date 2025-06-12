import React, { useEffect, useState } from 'react';
import { FaUserShield, FaUserMd, FaUser, FaPills } from 'react-icons/fa';
import api from '../../../utils/api';

const LaporanPengguna = () => {
  const [users, setUsers] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    admin: 0,
    dokter: 0,
    pasien: 0,
    apoteker: 0,
  });

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users/');
      const data = res.data;

      const countByRole = (role) =>
        data.filter((user) => user.role === role).length;

      setUsers(data);
      setCounts({
        total: data.length,
        admin: countByRole('admin'),
        dokter: countByRole('dokter'),
        pasien: countByRole('pasien'),
        apoteker: countByRole('apoteker'),
      });
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-white shadow-lg flex flex-col p-5 gap-4 w-full min-h-[100px] rounded-md">
      <div className="flex justify-start py-2 border-b-2 border-[#1DE9B6]">
        <p className="font-bold text-[20px]">Laporan Pengguna Sistem</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <InfoCard icon={<FaUser className="text-blue-500" />} label="Total" value={counts.total} />
        <InfoCard icon={<FaUserShield className="text-indigo-500" />} label="Admin" value={counts.admin} />
        <InfoCard icon={<FaUserMd className="text-green-600" />} label="Dokter" value={counts.dokter} />
        <InfoCard icon={<FaUser className="text-cyan-600" />} label="Pasien" value={counts.pasien} />
        <InfoCard icon={<FaPills className="text-pink-500" />} label="Apoteker" value={counts.apoteker} />
      </div>

      <div className="relative overflow-x-auto rounded-lg shadow mt-4">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-white uppercase bg-[#00B686]">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{`USR-${user.id}`}</td>
                  <td className="px-6 py-4">{user.nama}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Tidak ada data pengguna.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="flex flex-col items-center bg-[#F0F0F0] p-4 rounded-lg shadow">
    <div className="text-2xl mb-1">{icon}</div>
    <p className="font-semibold">{label}: {value}</p>
  </div>
);

export default LaporanPengguna;
