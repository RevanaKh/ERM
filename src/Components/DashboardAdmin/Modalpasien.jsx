import React, { useState ,useEffect } from 'react';
import api from '../../utils/api';

const Modalpasien = ({ data, onClose, onUpdate, modalpasien }) => {
  const [formData, setFormData] = useState({ ...data });
useEffect(() => {
  setFormData({ ...data });
}, [data]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(data.id, formData);
  };

  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center ${modalpasien ? 'flex' : 'hidden'}`}
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">Edit Data Pasien</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Nama"
            required
            className="w-full p-3 border rounded"
          />
          <input
            type="text"
            name="nik"
            value={formData.nik}
            onChange={handleChange}
            placeholder="NIK"
            maxLength="16"
            required
            className="w-full p-3 border rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-3 border rounded"
          />

          <div className="space-x-4">
            <label>Jenis Kelamin:</label>
            <input
              type="radio"
              id="male"
              name="jenis_kelamin"
              value="laki-laki"
              checked={formData.jenis_kelamin === "laki-laki"}
              onChange={handleChange}
            />
            <label htmlFor="male">Laki-laki</label>

            <input
              type="radio"
              id="female"
              name="jenis_kelamin"
              value="perempuan"
              checked={formData.jenis_kelamin === "perempuan"}
              onChange={handleChange}
            />
            <label htmlFor="female">Perempuan</label>
          </div>

          <input
            type="text"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            placeholder="Alamat"
            required
            className="w-full p-3 border rounded"
          />
          <input
            type="text"
            name="tempat_lahir"
            value={formData.tempat_lahir}
            onChange={handleChange}
            placeholder="Tempat Lahir"
            required
            className="w-full p-3 border rounded"
          />
          <input
            type="date"
            name="tanggal_lahir"
            value={formData.tanggal_lahir}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />

          <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600">
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modalpasien;
