import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';

const TransaksiSaya = () => {
  const [transaksi, setTransaksi] = useState([]);

  const fetchtransaksi = async () => {
    try {
      const res = await api.get('/pasien/pembayaranpasien');
      setTransaksi(res.data);
    } catch (err) {
      console.log(err.res.data.message);
    }
  };

  useEffect(() => {
    fetchtransaksi();
  }, []);
  return (
    <>
      <div className="min-h-screen w-full bg-[#FAF7F2] py-5">
        <div className="bg-white mb-2 shadow-lg mt-[20px] flex justify-center items-center to-red-500 w-full h-[100px] rounded-md">
          <p className="text-[#00B686] font-bold">Transaksi Saya</p>
        </div>
        <div className="bg-white shadow-lg flex justify-center items-center to-red-500 w-full min-h-[100px] p-5 ">
          <div className="relative overflow-x-auto shadow-lg w-full">
            <table className="w-full text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-[#00B686] ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID TRANSAKSI
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TANGGAL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NAMA PASIEN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    JENIS LAYANAN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TOTAL BIAYA
                  </th>
                  <th scope="col" className="px-6 py-3">
                    STATUS PEMBAYARAN
                  </th>
                </tr>
              </thead>
              <tbody>
                {transaksi.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      Tidak ada data Transaksi
                    </td>
                  </tr>
                ) : (
                  transaksi.map((data) => (
                    <tr key={data.id} className="bg-white border-b text-black hover:bg-gray-50 border-gray-200">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        ID-{data.id}
                      </th>
                      <td className="px-6 py-4">
                        {data.waktu_daftar
                          ? new Date(data.waktu_daftar).toLocaleString('id-ID', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                              hour12: false,
                            })
                          : 'Tidak tersedia'}
                      </td>
                      <td className="px-6 py-4">{data.nama_pasien}</td>
                      <td className="px-6 py-4">{data.metodePembayaran}</td>
                      <td className="px-6 py-4">Rp .{data.harga_jual}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold
      ${data.status_pembayaran === 'belum lunas' ? 'bg-yellow-100 text-yellow-800' : data.status_pembayaran === 'lunas' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
      `}
                        >
                          {data.status_pembayaran}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransaksiSaya;
