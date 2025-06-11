import api from '../../../utils/api';
import { useEffect, useState } from 'react';
import FormPemeriksaan from './FormPemeriksaan';
const Pemeriksaan = () => {
  const [pasienbypoli, setPasienbypoli] = useState([]);
  const [clickform, setClickform] = useState(false);
  const [selectedPasien, setselectedPasien] = useState(null);
  const [selectedId, setselectedId] = useState(null);
  const fetchpasien = async () => {
    try {
      const response = await api.get('/pasien/getpasien');
      setPasienbypoli(response.data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const handleClickPasien = (id) => {
    setselectedId(id);
    const pasien = pasienbypoli.find((p) => p.id === id);
    if (pasien) {
      setClickform(true);
      setselectedPasien(pasien);
    }
  };
  useEffect(() => {
    fetchpasien();
  }, []);
  return (
    <div className="bg-white shadow-lg flex flex-col p-4 justify-center items-center to-red-500 w-full min-h-[100px] rounded-md">
      <h1 className="text-2xl text-[#00B686] font-bold p-4">Pemeriksaan Pasien</h1>
      <div className="flex flex-col lg:flex-row gap-2 w-full">
        <div
          className={`bg-gray-200 rounded-lg p-4 shadow-lg flex flex-col border-2 border-gray-400 items-center 
  transition-all duration-500 ease-in-out 
  ${clickform ? 'w-full lg:w-[35%]' : 'w-full items-center'} gap-4 shadow-lg`}
        >
          <h1 className="text-xl text-[#00B686] font-bold">{pasienbypoli.length <= 0 ? 'Tidak ada Pasien' : 'Daftar pasien'}</h1>
          {pasienbypoli.map((pasien) => (
            <div
              key={pasien.id}
              onClick={() => handleClickPasien(pasien.id)}
              className={`w-full flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-lg border transition-all duration-200 cursor-pointer
            ${selectedId === pasien.id ? 'bg-[#1DE9B6] text-white border-[#1DE9B6]' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:shadow-md'}`}
            >
              <div className="flex flex-col ">
                <div className="mb-2 md:mb-0">
                  <p className="text-lg font-semibold text-gray-800">{pasien.nama_pasien}</p>
                </div>
                <div className={`text-sm text-gray-600 space-y-1 flex ${clickform ? 'flex-col' : 'flex-row '}`}>
                  <div className="">
                    <span className="mr-2">
                      No. Antrian: <strong>{pasien.no_antrian}</strong>
                    </span>
                    <span>
                      Poli: <strong>{pasien.poli}</strong>
                    </span>
                  </div>
                  <span className=" m-2">
                    Keluhan: <strong>{pasien.keluhan}</strong>
                  </span>
                </div>
              </div>

              <div>
                <span
                  className={`text-sm font-medium rounded-full px-4 py-1 inline-block text-center shadow-sm capitalize ${
                    pasien.status_pemeriksaan === 'menunggu'
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                      : pasien.status_pemeriksaan === 'dalam pemeriksaan'
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : pasien.status_pemeriksaan === 'selesai'
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-gray-200 text-gray-600 border border-gray-300'
                  }`}
                >
                  {pasien.status_pemeriksaan}
                </span>
              </div>
            </div>
          ))}
        </div>
        {clickform ? <FormPemeriksaan setClickform={setClickform} data={selectedPasien} setselectedPasien={setselectedPasien} fetchpasien={fetchpasien} /> : null}
      </div>
    </div>
  );
};

export default Pemeriksaan;
