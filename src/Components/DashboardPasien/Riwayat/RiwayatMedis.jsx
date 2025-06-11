import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';

const RiwayatMedis = () => {
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRiwayat = async () => {
    try {
      const res = await api.get('/pasien/getpemeriksaan');
      setRiwayat(res.data.data);
    } catch (err) {
      console.error('Gagal mengambil data riwayat medis:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiwayat();
  }, []);

  if (loading) {
    return <p className="text-center mt-8 text-gray-500">Memuat data riwayat medis...</p>;
  }

  return (
    <div className="mt-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg flex justify-center items-center to-red-500 w-full h-[100px] rounded-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Riwayat Medis</h2>
      </div>
      <div className="overflow-x-auto rounded-lg shadow ring-1 ring-gray-200 mt-[20px]">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-[#00B686] text-white text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Tanggal</th>
              <th className="px-4 py-3 text-left">Dokter</th>
              <th className="px-4 py-3 text-left">Diagnosa</th>
              <th className="px-4 py-3 text-left">Tindakan</th>
              <th className="px-4 py-3 text-left">Obat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {riwayat.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  Tidak ada data Medis
                </td>
              </tr>
            ) : (
              riwayat.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(item.tanggal_pemeriksaan).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-3">Dr. {item.nama_dokter}</td>
                  <td className="px-4 py-3">{item.diagnosa}</td>
                  <td className="px-4 py-3">{item.tindakan}</td>
                  <td className="px-4 py-3">{item.obat}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiwayatMedis;
