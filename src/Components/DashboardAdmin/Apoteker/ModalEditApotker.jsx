import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';

const ModalEditApotker = ({ onUpdate, datas, OpenEdit, setOpenEdit ,loading}) => {
  const [formData, setFormData] = useState({ ...datas });

  useEffect(() => {
    setFormData({ ...datas });
  }, [datas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(datas.id, formData);
    setOpenEdit(false);
  };

  return (
    <Modal show={OpenEdit} onClose={() => setOpenEdit(false)}>
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-center text-teal-500">Edit Apoteker</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nama</label>
            <input type="text" name="nama" value={formData.nama || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">NIK</label>
            <input type="number" name="nik" value={formData.nik || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
            <select name="jenis_kelamin" value={formData.jenis_kelamin || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">Pilih</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tempat Lahir</label>
            <input type="text" name="tempat_lahir" value={formData.tempat_lahir || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
            <input type="date" name="tanggal_lahir" value={formData.tanggal_lahir || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Alamat</label>
            <textarea name="alamat" value={formData.alamat || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600">
            {loading ? 'Menyimpan':'Simpan Perubahan'}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalEditApotker;
