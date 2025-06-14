import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';

const ModalEditObat = ({ obat, onUpdate, loading, setShow, show }) => {
  const [formData, setFormData] = useState({ ...obat });

  useEffect(() => {
    setFormData({ ...obat });
  }, [obat]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(obat.id, formData);
  };

  return (
    <Modal show={show} onClose={() => setShow(false)}>
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-black text-center">Edit Data Obat</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="nama_obat" className="block text-sm font-medium mb-1">
              Nama Obat
            </label>
            <input type="text" id="nama_obat" name="nama_obat" value={formData.nama_obat} onChange={handleChange} placeholder="Nama Obat" className="w-full border border-gray-300 p-3 rounded-lg" required />
          </div>

          <div>
            <label htmlFor="jenis_obat" className="block text-sm font-medium mb-1">
              Jenis Obat
            </label>
            <select id="jenis_obat" name="jenis_obat" value={formData.jenis_obat} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg" required>
              <option value="">-- Pilih Jenis --</option>
              <option value="kapsul">Kapsul</option>
              <option value="tablet">Tablet</option>
              <option value="sirup">Sirup</option>
            </select>
          </div>

          <div>
            <label htmlFor="harga_jual" className="block text-sm font-medium mb-1">
              Harga Jual
            </label>
            <input type="number" id="harga_jual" name="harga_jual" value={formData.harga_jual} onChange={handleChange} placeholder="Harga Jual" className="w-full border border-gray-300 p-3 rounded-lg" required />
          </div>

          <div>
            <label htmlFor="stok" className="block text-sm font-medium mb-1">
              Stok
            </label>
            <input type="number" id="stok" name="stok" value={formData.stok} onChange={handleChange} placeholder="Stok" className="w-full border border-gray-300 p-3 rounded-lg" required />
          </div>

          <button type="submit" className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700">
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalEditObat;
