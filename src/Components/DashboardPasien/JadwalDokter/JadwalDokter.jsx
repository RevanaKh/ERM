import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
import { FaUserDoctor } from 'react-icons/fa6';
const JadwalDokter = () => {
  const [jadwaldokter, setJadwaldokter] = useState([]);

  const fetchdokter = async () => {
    try {
      const res = await api.get('/jadwal/getjadwal');
      setJadwaldokter(res.data);
    } catch (err) {
      console.log(err.response?.data.message);
    }
  };

  useEffect(() => {
    fetchdokter();
  }, []);

  return (
    <div className="bg-white min-h-[100px] p-[20px] mt-[20px]">
      <h2 className="text-[#00B686] text-[26px] font-bold text-center mb-4">Jadwal Dokter</h2>
      {jadwaldokter.map((jadwal) => (
        <div key={jadwal.id} className="bg-white hover:bg-gray-200 shadow-md rounded-lg p-5 border hover:shadow-lg transition">
          <div className="flex justify-between items-center flex-col lg:flex-row">
            <div className="flex flex-col lg:flex-row gap-3 p-2">
              <div className="flex justify-center items-center">
                <FaUserDoctor className="text-[40px] text-[#00B686]" />
              </div>
              <div className=" p-2">
                <p className="text-[#00B686] text-[20px] font-bold">{jadwal.nama}</p>
                <div className=" text-center">
                  <p className="text-[16px]">
                    <span className="font-bold">poli : </span>
                    poli {jadwal.poli}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center bg-[#F4F4F4] rounded-lg h-[30px] px-5 w-[250px]">
              <p className="font-bold text-[15px]">{jadwal.hari} : </p>
              <div className="flex lg:gap-2 text-[15px]">
                <p className="text-[13px]">{jadwal.jam_mulai}</p>-<p className="text-[13px]">{jadwal.jam_selesai}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JadwalDokter;
