import React, { useEffect, useState } from 'react';
import { FaBriefcaseMedical } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';

const LaporanDokter = () => {
  const [dataDokter, setDataDokter] = useState([]);
  const [totalDokter, setTotalDokter] = useState(0);
  const navigate = useNavigate();

  const fetchDokter = async () => {
    try {
      const res = await api.get('/dokter/getdokter');
      const dokterOnly = res.data.filter(user => user.role === 'dokter');
      setDataDokter(dokterOnly);
      setTotalDokter(dokterOnly.length);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchDokter();
  }, []);

  return (
    <div className="bg-white shadow-lg flex flex-col p-5 gap-4 w-full min-h-[100px] rounded-md">
      <div className='flex justify-start py-2 border-b-2 border-[#1DE9B6]'>
        <p className='font-bold text-[20px]'>Laporan Data Dokter</p>
      </div>

      <div className="flex bg-[#F0F0F0] shadow-lg flex-col p-4 rounded-lg items-center justify-center gap-2 w-full max-w-sm mx-auto sm:w-[80%]">
        <FaBriefcaseMedical className="text-4xl text-[#00B686]" />
        <p className="font-bold text-center text-base sm:text-lg md:text-xl">
          Total Dokter: {totalDokter}
        </p>
        <button
          onClick={() => navigate('/dashboardAdmin/jadwal-dokter')}
          type="button"
          className="w-full sm:w-2/3 bg-[#1DE9B6] text-white py-2 rounded hover:bg-[#00B686] transition duration-300"
        >
          Data Dokter
        </button>
      </div>

      <div className="relative overflow-x-auto rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-white uppercase bg-[#00B686]">
            <tr>
              <th scope="col" className="px-6 py-3">ID Dokter</th>
              <th scope="col" className="px-6 py-3">Nama</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Poli</th>
              <th scope="col" className="px-6 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {dataDokter.length > 0 ? (
              dataDokter.map((dokter) => (
                <tr key={dokter.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{`DK-${dokter.id}`}</td>
                  <td className="px-6 py-4">{dokter.nama}</td>
                  <td className="px-6 py-4">{dokter.email}</td>
                  <td className="px-6 py-4">{dokter.poli || '-'}</td>
                  <td className="px-6 py-4 capitalize">{dokter.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Tidak ada data dokter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaporanDokter;
