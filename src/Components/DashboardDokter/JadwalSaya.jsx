import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const JadwalSaya = () => {
  const [jadwalsaya, setJadwal] = useState([]);
  const fetchjadwal = async () => {
    try {
      const response = await api.get('/jadwal/getjadwalid');
      setJadwal(response.data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  useEffect(() => {
    fetchjadwal();
  }, []);
  return (
    <div>
      <div className="bg-white shadow-lg flex justify-center items-center to-red-500 w-full min-h-[100px] ">
        <div class="relative overflow-x-auto shadow-lg my-[20px] w-full mx-[10px]">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-white  uppercase bg-gray-50 ">
              <tr className="bg-[#00B686]">
                <th scope="col" class="px-6 py-3">
                  Hari Praktek
                </th>
                <th scope="col" class="px-6 py-3">
                  Jam Mulai
                </th>
                <th scope="col" class="px-6 py-3">
                  Jam Selesai
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>{' '}
              </tr>
            </thead>
            <tbody>
              {jadwalsaya.map((jadwal) => (
                <tr key={jadwal.id} class=" border-b bg-white hover:bg-gray-50 text-black border-gray-200">
                  <td class="px-6 py-4">{jadwal.hari}</td>
                  <td class="px-6 py-4">{jadwal.jam_mulai}</td>
                  <td class="px-6 py-4">{jadwal.jam_selesai}</td>
                  <td class="px-6 py-4">{jadwal.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JadwalSaya;
