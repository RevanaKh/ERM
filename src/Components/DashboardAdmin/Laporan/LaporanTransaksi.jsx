import React, { useEffect, useState } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';

const LaporanTransaksi = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [totalTransaksi, setTotalTransaksi] = useState(0);
  const [lunasCount, setLunasCount] = useState(0);
  const [belumLunasCount, setBelumLunasCount] = useState(0);

  const navigate = useNavigate();

  const fetchTransaksi = async () => {
    try {
      const res = await api.get('/pasien/getpembayaran');
      const data = res.data;

      const lunas = data.filter(item => item.status_pembayaran?.toLowerCase() === 'lunas');
      const belumLunas = data.filter(item => item.status_pembayaran?.toLowerCase() !== 'lunas');

      setTransaksi(data);
      setTotalTransaksi(data.length);
      setLunasCount(lunas.length);
      setBelumLunasCount(belumLunas.length);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchTransaksi();
  }, []);

  return (
    <div className="bg-white shadow-lg flex flex-col p-5 gap-4 w-full min-h-[100px] rounded-md">
      <div className='flex justify-start py-2 border-b-2 border-[#1DE9B6]'>
        <p className='font-bold text-[20px]'>Laporan Transaksi Pasien</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex flex-col items-center bg-[#F0F0F0] p-4 rounded-lg shadow">
          <FaClipboardList className="text-3xl text-[#00B686]" />
          <p className="font-semibold">Total Transaksi: {totalTransaksi}</p>
        </div>
        <div className="flex flex-col items-center bg-green-100 p-4 rounded-lg shadow">
          <FaClipboardList className="text-3xl text-green-600" />
          <p className="font-semibold">Lunas: {lunasCount}</p>
        </div>
        <div className="flex flex-col items-center bg-red-100 p-4 rounded-lg shadow">
          <FaClipboardList className="text-3xl text-red-600" />
          <p className="font-semibold">Belum Lunas: {belumLunasCount}</p>
        </div>
      </div>

      <div className="relative overflow-x-auto rounded-lg shadow mt-4">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-white uppercase bg-[#00B686]">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Tanggal</th>
              <th className="px-6 py-3">Nama Pasien</th>
              <th className="px-6 py-3">Jenis Layanan</th>
              <th className="px-6 py-3">Harga Obat</th>
              <th className="px-6 py-3">Status Pembayaran</th>
            </tr>
          </thead>
          <tbody>
            {transaksi.length > 0 ? (
              transaksi.map((trx, idx) => (
                <tr key={idx} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">ID-{trx.id}</td>
                  <td className="px-6 py-4">
                    {trx.waktu_daftar
                      ? new Date(trx.waktu_daftar).toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })
                      : 'Tidak tersedia'}
                  </td>
                  <td className="px-6 py-4">{trx.nama_pasien}</td>
                  <td className="px-6 py-4">{trx.metodePembayaran}</td>
                  <td className="px-6 py-4">Rp {trx.harga_jual?.toLocaleString('id-ID')}</td>
                  <td className={`px-6 py-4 font-semibold ${trx.status_pembayaran?.toLowerCase() === 'lunas' ? 'text-green-600' : 'text-red-500'}`}>
                    {trx.status_pembayaran || 'Tidak tersedia'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Tidak ada data transaksi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaporanTransaksi;
