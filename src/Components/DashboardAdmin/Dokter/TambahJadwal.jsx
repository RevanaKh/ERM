import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
const TambahJadwal = ({ data }) => {
  const [modaltambah, setModalTambah] = useState(false);
  const [Datadokter, SetdataDokter] = useState([]);
  const fetchdokter = async () => {
    try {
      const response = await api.get('/dokter/getdokter');
      SetdataDokter(response.data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  useEffect(() => {
    fetchdokter();
  }, []);
  const [fromData, setFromdata] = useState({
    id_dokter: Datadokter.id,
    hari: '',
    jam_mulai: '08:00',
    jam_selesai: '17:00',
    status: '',
  });
  const { id_dokter, hari, status } = fromData;
  const handleChange = (e) => {
    setFromdata({ ...fromData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/jadwal/create', fromData);
      setModalTambah(false);
      await data();
    } catch (err) {
      console.log(err.response?.data.message);
      setModalTambah(false);
    }
  };
  return (
    <>
      <button type="button" onClick={() => setModalTambah(true)} class="focus:outline-none text-white  bg-[#00B686] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">
        Tambah Jadwal{' '}
      </button>
      <div tabIndex="-1" aria-hidden="true" className={`fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center ${modaltambah ? 'flex' : 'hidden'}`}>
        <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h3 className="text-xl font-semibold text-black">Tambah jadwal Dokter</h3>
            <button onClick={() => setModalTambah(false)} className="text-gray-500 hover:text-black">
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 flex flex-col text-black">
            <select name="id_dokter" value={id_dokter} onChange={handleChange} className="border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">-- Pilih Dokter --</option>
              {Datadokter.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>

            <select name="hari" value={hari} className="rounded-lg border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={handleChange}>
              <option value="">-- Pilih Hari --</option>
              <option value="senin">Senin</option>
              <option value="selasa">Selasa</option>
              <option value="rabu">Rabu</option>
              <option value="kamis">Kamis</option>
              <option value="jumat">Jumat</option>
              <option value="sabtu">Sabtu</option>
              <option value="minggu">Minggu</option>
            </select>
            <label>Jam Mulai:</label>
            <input type="time" name="jam_mulai" className="border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" value={fromData.jam_mulai} onChange={handleChange} />

            <label>Jam Selesai:</label>
            <input type="time" name="jam_selesai" className="border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" value={fromData.jam_selesai} onChange={handleChange} />

            <label>Status:</label>
            <select name="status" className="border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" value={status} onChange={handleChange}>
              <option value="">-- Pilih Status --</option>
              <option value="aktif">Aktif</option>
              <option value="tidak aktif">Nonaktif</option>
            </select>

            <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600">
              Tambah Jadwal
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TambahJadwal;
