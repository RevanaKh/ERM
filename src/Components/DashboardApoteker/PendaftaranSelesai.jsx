import React, { useEffect, useState } from 'react';
import { FaClipboardCheck } from 'react-icons/fa';
import api from '../../utils/api';

const PendaftaranSelesai = () => {
  const [pendaftaran, setPendaftaran] = useState([]);

  const fetchPendaftaran = async () => {
    try {
      const response = await api.get('/apoteker/selesai');
      setPendaftaran(response.data.data);
    } catch (err) {
      console.log(err.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  useEffect(() => {
    fetchPendaftaran();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <FaClipboardCheck className="text-green-600" />
        Pendaftaran Selesai
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-md shadow-sm bg-white">
          <thead className="bg-[#1DE9B6] text-gray-700 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Nama Pasien</th>
              <th className="px-4 py-3 text-left">Nama Dokter</th>
              <th className="px-4 py-3 text-left">Keluhan</th>
              <th className="px-4 py-3 text-left">Diagnosa</th>
              <th className="px-4 py-3 text-left">Tindakan</th>
              <th className="px-4 py-3 text-left">Obat</th>
            </tr>
          </thead>
          <tbody>
            {pendaftaran.length > 0 ? (
              pendaftaran.map((item, index) => (
                <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{item.nama_pasien}</td>
                  <td className="px-4 py-3">{item.nama}</td>
                  <td className="px-4 py-3">{item.keluhan}</td>
                  <td className="px-4 py-3">{item.diagnosa}</td>
                  <td className="px-4 py-3">{item.tindakan}</td>
                  <td className="px-4 py-3">{item.obat}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-5 text-gray-500">
                  Tidak ada data pendaftaran selesai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendaftaranSelesai;
