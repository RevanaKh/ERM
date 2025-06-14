import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import api from '../../../utils/api';

const FormTambahObat = ({ fetchObat }) => {
  const [formModal, setFormModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama_obat: '',
    harga_jual: '',
    stok: '',
    kadaluarsa: '',
  });
  const { nama_obat, jenis_obat, harga_jual, stok, kadaluarsa } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/obat/createobat', formData);
      fetchObat();
      setLoading(false);
      setFormModal(false);
      setFormData({ nama_obat: '', jenis_obat: '', harga_jual: '', stok: '', kadaluarsa: '' });
    } catch (err) {
      setLoading(false);
      console.error(err.res?.data.message);
    }
  };
  return (
    <>
      <Button color="green" onClick={() => setFormModal(true)}>
        Tambah Obat
      </Button>
      <Modal show={formModal} onClose={() => setFormModal(false)}>
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold text-center text-teal-500">Tambah Obat</h2>
        </ModalHeader>
        <ModalBody className="bg-white">
          <form onSubmit={handelSubmit} className="space-y-4">
            <input type="text" name="nama_obat" placeholder="Nama Obat" value={nama_obat} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2 border-gray-300 focus:ring focus:ring-blue-200" required />
            <select name="jenis_obat" value={jenis_obat} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2 border-gray-300 focus:ring focus:ring-blue-200" required>
              <option value="">-- Pilih Jenis Obat --</option>
              <option value="kapsul">Kapsul</option>
              <option value="tablet">Tablet</option>
              <option value="sirup">Sirup</option>
            </select>
            <input type="number" name="harga_jual" placeholder="Harga Jual" value={harga_jual} onChange={handleChange} className="w-full border p-3 rounded-md border-gray-300 focus:ring focus:ring-blue-200" required />
            <input type="number" name="stok" placeholder="Stok" value={stok} onChange={handleChange} className="w-full border p-3 rounded border-gray-300 focus:ring focus:ring-blue-200" required />
            <div>
              <label className="block text-sm font-medium">Tanggal Kadaluarsa</label>
              <input type="date" name="kadaluarsa" value={kadaluarsa} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2 border-gray-300 focus:ring focus:ring-blue-200" required />
            </div>
            <button type="submit" className="w-full bg-[#1DE9B6] text-white py-3 rounded hover:bg-[#00B686]">
              {' '}
              {loading ? 'Menyimpan...' : 'Tambah Obat'}
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default FormTambahObat;
