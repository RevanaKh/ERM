import React, { useState } from 'react';
import api from '../../../utils/api';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';

const FormTambahObat = ({ onSuccess }) => {
  const [Openmodal , setOpenModal] = useState(false)
  const [formData, setFormData] = useState({
    nama_obat: '',
    jenis_obat: '',
    harga_jual: '',
    stok: '',
    kadaluarsa: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { nama_obat, jenis_obat, harga_jual, stok, kadaluarsa } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/obat/createobat', formData);
      setFormData({ nama_obat: '', jenis_obat: '', harga_jual: '', stok: '', kadaluarsa: '' });
      onSuccess();
    } catch (err) {
      console.error(err.response?.data.message);

      setError('Gagal menambahkan obat.');
    }

    setLoading(false);
  };

  return (
    <>
      <Button color="green" onClick={() => setOpenModal(true)}>
            Tambah Obat
          </Button>
           <Modal show={Openmodal} onClose={() => setOpenModal(false)}>
                  <ModalHeader className="bg-white">
                    <h2 className="text-xl font-bold text-center text-teal-500">Tambah Obat</h2>
                  </ModalHeader>
                  <ModalBody className="bg-white">
          <h2 className="text-lg font-semibold mb-4">Tambah Data Obat</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label htmlFor="nama_obat" className="block text-sm font-medium mb-1">Nama Obat</label>
    <input
      type="text"
      id="nama_obat"
      name="nama_obat"
      placeholder="Nama Obat"
      value={nama_obat}
      onChange={handleChange}
      className="mt-1 block w-full border rounded-lg p-2 border-gray-300 focus:ring focus:ring-blue-200"
      required
    />
  </div>

  <div>
    <label htmlFor="jenis_obat" className="block text-sm font-medium mb-1">Jenis Obat</label>
    <select
      id="jenis_obat"
      name="jenis_obat"
      value={jenis_obat}
      onChange={handleChange}
      className="mt-1 block w-full border rounded-lg p-2 border-gray-300 focus:ring focus:ring-blue-200"
      required
    >
      <option value="">-- Pilih Jenis Obat --</option>
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
      placeholder="Harga Jual"
      value={harga_jual}
      onChange={handleChange}
      className="w-full border p-3 rounded-lg border-gray-300 focus:ring focus:ring-blue-200"
      required
    />
  </div>

  <div>
    <label htmlFor="stok" className="block text-sm font-medium mb-1">Stok</label>
    <input
      type="number"
      id="stok"
      name="stok"
      placeholder="Stok"
      value={stok}
      onChange={handleChange}
      className="w-full border p-3 rounded-lg border-gray-300 focus:ring focus:ring-blue-200"
      required
    />
  </div>

  <div>
    <label htmlFor="kadaluarsa" className="block text-sm font-medium mb-1">Tanggal Kadaluarsa</label>
    <input
      type="date"
      id="kadaluarsa"
      name="kadaluarsa"
      value={kadaluarsa}
      onChange={handleChange}
      className="mt-1 block w-full border rounded-lg p-2 border-gray-300 focus:ring focus:ring-blue-200"
      required
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-[#1DE9B6] text-white py-3 rounded-lg hover:bg-[#00B686]"
  >
    {loading ? 'Menyimpan...' : 'Tambah Obat'}
  </button>
</form>

                  </ModalBody>
                </Modal>

    </>
  );
};

export default FormTambahObat;
