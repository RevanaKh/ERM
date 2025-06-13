import { useState } from 'react';
import api from '../../../utils/api';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { FaPlus } from "react-icons/fa6";

function TambahApoteker() {
  const [openModal, setOpenModal] = useState(false);
  const [loading , setLoading] = useState(false)
  const [form, setForm] = useState({
    nama: '',
    email: '',
    nik: '',
    jenis_kelamin: '',
    alamat: '',
    tempat_lahir: '',
    tanggal_lahir: '',
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
setLoading(true)
    try {
      const response = await api.post('/apoteker', form);
      const data = response.data;
      setStatus({ type: 'success', message: data.message });
      setLoading(false)
      setForm({
        nama: '',
        email: '',
        nik: '',
        jenis_kelamin: '',
        alamat: '',
        tempat_lahir: '',
        tanggal_lahir: '',
      });
    } catch (err) {
      setLoading(false)  
      const errorMsg = err.response?.data?.message || 'Terjadi kesalahan saat mengirim data.';
      setStatus({ type: 'error', message: errorMsg });
    }
  };

  return (
    <>
      <button
  onClick={() => setOpenModal(true)}
  className="flex items-center gap-2 text-white bg-[#00B686] hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-150"
>
  <FaPlus className="text-[20px]" />
  Tambah Apoteker
</button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold mb-6 text-center text-teal-500">Tambah Apoteker Baru</h2>
        </ModalHeader>
        <ModalBody className="bg-white">
          <div className="space-y-6">
            {status && <div className={`mb-4 px-4 py-2 rounded text-sm ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{status.message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Apoteker</label>
                <input type="text" name="nama" value={form.nama} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">NIK</label>
<input
  type="text"
  name="nik"
  value={form.nik}
  onChange={handleChange}
  placeholder="NIK"
  maxLength="16"
  required
  pattern="\d{16}"
  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
/>              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Jenis Kelamin</label>
                <select name="jenis_kelamin" value={form.jenis_kelamin} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Alamat</label>
                <input type="text" name="alamat" value={form.alamat} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tempat Lahir</label>
                <input type="text" name="tempat_lahir" value={form.tempat_lahir} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tanggal Lahir</label>
                <input type="date" name="tanggal_lahir" value={form.tanggal_lahir} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>

              <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600">
                {loading ?'Menyimpan...':'Tambah Apoteker'}
              </button>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default TambahApoteker;
