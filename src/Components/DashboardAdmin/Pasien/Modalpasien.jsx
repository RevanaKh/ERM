import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';

const Modalpasien = ({ data, onClose, onUpdate, modalpasien, loading, setModalpasien }) => {
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
    onUpdate(data.user_id, formData);
  };

  return (
    <Modal show={modalpasien} onClose={() => setModalpasien(false)}>
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-black text-center">Tambah Pasien</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="nama" className="block mb-1 font-medium">
              Nama:
            </label>
            <input type="text" id="nama" name="nama" value={formData.nama} onChange={handleChange} placeholder="Nama" required className="w-full p-3 border border-gray-300 rounded" />
          </div>

          <div>
            <label htmlFor="nik" className="block mb-1 font-medium">
              NIK (16 digit):
            </label>
            <input type="text" id="nik" name="nik" value={formData.nik} onChange={handleChange} placeholder="NIK" maxLength="16" required className="w-full p-3 border border-gray-300 rounded" />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email:
            </label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-3 border border-gray-300 rounded" />
          </div>

          <div>
            <span className="block mb-1 font-medium">Jenis Kelamin:</span>
            <div className="space-x-4">
              <input type="radio" id="male" name="jenis_kelamin" value="laki-laki" checked={formData.jenis_kelamin === 'laki-laki'} onChange={handleChange} />
              <label htmlFor="male">Laki-laki</label>

              <input type="radio" id="female" name="jenis_kelamin" value="perempuan" checked={formData.jenis_kelamin === 'perempuan'} onChange={handleChange} />
              <label htmlFor="female">Perempuan</label>
            </div>
          </div>
          <div>
            <label htmlFor="status_pernikahan" className="block text-sm font-medium mb-1">
              Status Pernikahan
            </label>
            <select
              id="status_pernikahan"
              name="status_pernikahan"
              value={formData.status_pernikahan}
              onChange={handleChange}
              required
              className="rounded-lg w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Pilih Status Pernikahan</option>
              <option value="belum menikah">Belum Menikah</option>
              <option value="menikah">Menikah</option>
              <option value="cerai">Cerai</option>
            </select>
          </div>

          <div>
            <label htmlFor="golongan_darah" className="block text-sm font-medium mb-1">
              Golongan Darah
            </label>
            <select
              id="golongan_darah"
              name="golongan_darah"
              value={formData.golongan_darah}
              onChange={handleChange}
              required
              className="rounded-lg w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Pilih Golongan Darah</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
            </select>
          </div>

          <div>
            <label htmlFor="pekerjaan" className="block text-sm font-medium mb-1">
              Pekerjaan
            </label>
            <select id="pekerjaan" name="pekerjaan" value={formData.pekerjaan} onChange={handleChange} required className="rounded-lg w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Pilih Pekerjaan</option>
              <option value="mahasiswa">Mahasiswa</option>
              <option value="bekerja">Bekerja</option>
              <option value="belum bekerja">Belum Bekerja</option>
              <option value="pelajar">Pelajar</option>
            </select>
          </div>
          <div>
            <label htmlFor="alamat" className="block mb-1 font-medium">
              Alamat:
            </label>
            <input type="text" id="alamat" name="alamat" value={formData.alamat} onChange={handleChange} placeholder="Alamat" required className="w-full p-3 border border-gray-300 rounded" />
          </div>

          <div>
            <label htmlFor="tempat_lahir" className="block mb-1 font-medium">
              Tempat Lahir:
            </label>
            <input type="text" id="tempat_lahir" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} placeholder="Tempat Lahir" required className="w-full p-3 border border-gray-300 rounded" />
          </div>

          <div>
            <label htmlFor="tanggal_lahir" className="block mb-1 font-medium">
              Tanggal Lahir:
            </label>
            <input type="date" id="tanggal_lahir" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded" />
          </div>

          <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600">
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default Modalpasien;
