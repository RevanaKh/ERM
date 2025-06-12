import React, { useEffect, useState } from 'react';
const Modaldokter = ({ modalDokter, jadwal, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({ ...jadwal });
  useEffect(() => {
    setFormData({ ...jadwal });
  }, [jadwal]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(jadwal.id, formData);
  };
  return (
    <div tabIndex="-1" aria-hidden="true" className={`fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center ${modalDokter ? 'flex' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">Edit Jadwal Dokter</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 flex  flex-col ">
          <select name="hari" value={formData.hari} className='border border-gray-300 rounded-lg' onChange={handleChange}>
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
          <input type="time" name="jam_mulai" className='border border-gray-300 rounded-lg' value={formData.jam_mulai} onChange={handleChange} />

          <label>Jam Selesai:</label>
          <input type="time" name="jam_selesai" className='border border-gray-300 rounded-lg' value={formData.jam_selesai} onChange={handleChange} />

          <label>Status:</label>
          <select name="status" value={formData.status} className='border border-gray-300 rounded-lg' onChange={handleChange}>
            <option value="">-- Pilih Status --</option>
            <option value="aktif">Aktif</option>
            <option value="tidak aktif">Nonaktif</option>
          </select>
          <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modaldokter;
