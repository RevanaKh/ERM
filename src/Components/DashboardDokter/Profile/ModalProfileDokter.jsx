import React, { useEffect, useState } from 'react';

const ModalProfileDokter = ({ modalprofile, onClose, onUpdate, user }) => {
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    alamat: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
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
    <div tabIndex="-1" aria-hidden="true" className={`fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center ${modalprofile ? 'flex' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="">
          <h2 className="text-xl font-bold mb-4 text-center">Edit Profil</h2>

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

          <div className="flex justify-between">
            <button type="submit" className="bg-[#1DE9B6] text-white px-4 py-2 rounded hover:bg-[#00B686]">
              Simpan
            </button>
            <button type="button" onClick={onClose} className="text-gray-600 hover:text-black">
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProfileDokter;
