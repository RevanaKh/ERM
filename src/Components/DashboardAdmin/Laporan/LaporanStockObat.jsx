import React, { useEffect, useState } from 'react';
import { FaCapsules } from 'react-icons/fa';
import api from '../../../utils/api';

const LaporanStokObat = () => {
  const [obat, setObat] = useState([]);
  const [totalObat, setTotalObat] = useState(0);
  const [obatKritis, setObatKritis] = useState(0);

  const fetchObat = async () => {
    try {
      const res = await api.get('/obat/dataobat');
      const data = res.data;

      const kritis = data.filter(item => item.stok < 10);
      setObat(data);
      setTotalObat(data.length);
      setObatKritis(kritis.length);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchObat();
  }, []);

  return (
    <div className="bg-white shadow-lg flex flex-col p-5 gap-4 w-full min-h-[100px] rounded-md">
      <div className='flex justify-start py-2 border-b-2 border-[#1DE9B6]'>
        <p className='font-bold text-[20px]'>Laporan Stok Obat</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <div className="flex flex-col items-center bg-[#F0F0F0] p-4 rounded-lg shadow">
          <FaCapsules className="text-3xl text-[#00B686]" />
          <p className="font-semibold">Total Jenis Obat: {totalObat}</p>
        </div>
        <div className="flex flex-col items-center bg-red-100 p-4 rounded-lg shadow">
          <FaCapsules className="text-3xl text-red-600" />
          <p className="font-semibold">Stok Kritis: {obatKritis}</p>
        </div>
      </div>

      <div className="relative overflow-x-auto rounded-lg shadow mt-4">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-white uppercase bg-[#00B686]">
            <tr>
              <th className="px-6 py-3">ID Obat</th>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Jenis</th>
              <th className="px-6 py-3">Harga</th>
              <th className="px-6 py-3">Stok</th>
              <th className="px-6 py-3">Kadaluarsa</th>
            </tr>
          </thead>
          <tbody>
            {obat.length > 0 ? (
              obat.map((item, idx) => (
                <tr key={idx} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{`OBT-${item.id}`}</td>
                  <td className="px-6 py-4">{item.nama_obat}</td>
                  <td className="px-6 py-4 capitalize">{item.jenis_obat}</td>
                  <td className="px-6 py-4">Rp {item.harga_jual.toLocaleString('id-ID')}</td>
                  <td className={`px-6 py-4 font-semibold ${item.stok < 10 ? 'text-red-600' : 'text-gray-800'}`}>
                    {item.stok}
                  </td>
                  <td className="px-6 py-4">
                    {item.kadaluarsa
                      ? new Date(item.kadaluarsa).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })
                      : 'Tidak tersedia'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Tidak ada data obat.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaporanStokObat;
