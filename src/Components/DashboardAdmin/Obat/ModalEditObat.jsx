import React, { useEffect, useState } from 'react';

const ModalEditObat = ({ show, obat, onUpdate, onClose ,loading }) => {
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
    <div tabIndex="-1" aria-hidden="true" className={`fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center ${show ? 'flex' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg w-full max-w-xl">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">Edit Data Obat</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>
       <form onSubmit={handleSubmit} className="space-y-3">
  <div>
    <label htmlFor="nama_obat" className="block text-sm font-medium mb-1">Nama Obat</label>
    <input
      type="text"
      id="nama_obat"
      name="nama_obat"
      value={formData.nama_obat}
      onChange={handleChange}
      placeholder="Nama Obat"
      className="w-full border border-gray-300 p-3 rounded-lg"
      required
    />
  </div>

  <div>
    <label htmlFor="jenis_obat" className="block text-sm font-medium mb-1">Jenis Obat</label>
    <select
      id="jenis_obat"
      name="jenis_obat"
      value={formData.jenis_obat}
      onChange={handleChange}
      className="w-full border border-gray-300 p-3 rounded-lg"
      required
    >
      <option value="">-- Pilih Jenis --</option>
      <option value="kapsul">Kapsul</option>
      <option value="tablet">Tablet</option>
      <option value="sirup">Sirup</option>
    </select>
  </div>

  <div>
    <label htmlFor="harga_jual" className="block text-sm font-medium mb-1">Harga Jual</label>
    <input
      type="number"
      id="harga_jual"
      name="harga_jual"
      value={formData.harga_jual}
      onChange={handleChange}
      placeholder="Harga Jual"
      className="w-full border border-gray-300 p-3 rounded-lg"
      required
    />
  </div>

  <div>
    <label htmlFor="stok" className="block text-sm font-medium mb-1">Stok</label>
    <input
      type="number"
      id="stok"
      name="stok"
      value={formData.stok}
      onChange={handleChange}
      placeholder="Stok"
      className="w-full border border-gray-300 p-3 rounded-lg"
      required
    />
  </div>

  <button
    type="submit"
    className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700"
  >
    {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
  </button>
</form>

      </div>
    </div>
  );
};

export default ModalEditObat;
