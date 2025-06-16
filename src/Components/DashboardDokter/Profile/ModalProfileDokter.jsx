import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';

const ModalProfile = ({ modalprofile, onClose, onUpdate, user }) => {
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    alamat: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    status_pernikahan: '',
    golongan_darah: '',
    pekerjaan: '',
  });
  useEffect(() => {
    if (user) {
      setFormData({
        nama: user.nama || '',
        nik: user.nik || '',
        alamat: user.alamat || '',
        tempat_lahir: user.tempat_lahir || '',
        tanggal_lahir: user.tanggal_lahir || '',
        jenis_kelamin: user.jenis_kelamin || '',
        status_pernikahan: user.status_pernikahan || '',
        golongan_darah: user.golongan_darah || '',
        pekerjaan: user.pekerjaan || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      console.error('User belum tersedia');
      return;
    }
    onUpdate(user?.id, formData);
  };
  return (
    <Modal show={modalprofile} onClose={() => onClose(false)}>
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-black text-center">Edit User</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <form onSubmit={handleSubmit} className="">
          <label className="block mb-2">Nama</label>
          <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="w-full border rounded p-2 mb-4" />

          <label className="block mb-2">NIK</label>
          <input type="text" name="nik" value={formData.nik} onChange={handleChange} className="w-full border rounded p-2 mb-4" />

          <label className="block mb-2">Tempat Lahir</label>
          <input type="text" name="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} className="w-full border rounded p-2 mb-4" />

          <label className="block mb-2">Tanggal Lahir</label>
          <input type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} className="w-full border rounded p-2 mb-4" />

          <label className="block mb-2">Jenis Kelamin</label>
          <select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange} className="w-full border rounded p-2 mb-4">
            <option value="">Pilih</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
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

          <div className="flex justify-between">
            <button type="submit" className="bg-[#1DE9B6] text-white px-4 py-2 rounded hover:bg-[#00B686]">
              Simpan
            </button>
            <button type="button" onClick={onClose} className="text-gray-600 hover:text-black">
              Batal
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalProfile;
