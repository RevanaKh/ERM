import { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa';
import api from '../../../utils/api';

export default function CreateUser({ onSuccess }) {
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(null);
  const [cekDokter, setcekDokter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nama: '',
    nik: '',
    email: '',
    password: '',
    jenis_kelamin: '',
    alamat: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    poli: '',
    role: '',
    status_pernikahan: '',
    golongan_darah: '',
    pekerjaan: '',
  });
  const { nama, nik, email, password, jenis_kelamin, alamat, tempat_lahir, tanggal_lahir, poli, role, status_pernikahan, golongan_darah, pekerjaan } = form;
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'role') {
      setcekDokter(e.target.value === 'dokter');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/users/createuser', form);
      setStatus({ type: 'success', message: 'User berhasil ditambahkan!' });
      await onSuccess();
      setLoading(false);
      setTimeout(() => {
        setOpenModal(false);
        setStatus(null);
        setForm({
          nama: '',
          nik: '',
          email: '',
          password: '',
          jenis_kelamin: '',
          alamat: '',
          tempat_lahir: '',
          tanggal_lahir: '',
          poli: '',
          role: '',
          status_pernikahan: '',
          golongan_darah: '',
          pekerjaan: '',
        });
      }, 1500);
    } catch (error) {
      setLoading(false);
      setStatus({ type: 'error', message: 'Gagal menambahkan dokter.' });
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center gap-2 text-white bg-[#00B686] hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-150"
      >
        <FaPlus className="text-[20px]" />
        Tambah Users
      </button>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold mb-6 text-center text-teal-500">Tambah User Baru</h2>
        </ModalHeader>
        <ModalBody className="bg-white">
          <div className="space-y-6">
            {status && <div className={`mb-4 px-4 py-2 rounded text-sm ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{status.message}</div>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="nama" className="block text-sm font-medium mb-1">
                  Nama
                </label>
                <input type="text" id="nama" name="nama" value={nama} onChange={handleChange} placeholder="Nama" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>

              <div>
                <label htmlFor="nik" className="block text-sm font-medium mb-1">
                  NIK
                </label>
                <input
                  type="text"
                  id="nik"
                  name="nik"
                  value={nik}
                  onChange={handleChange}
                  placeholder="NIK"
                  maxLength="16"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input type="email" id="email" name="email" value={email} onChange={handleChange} placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="*****"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <span className="block text-sm font-medium mb-1">Jenis Kelamin</span>
                <div className="space-x-4">
                  <input type="radio" id="male" name="jenis_kelamin" value="laki-laki" checked={jenis_kelamin === 'laki-laki'} onChange={handleChange} />
                  <label htmlFor="male">Laki-laki</label>

                  <input type="radio" id="female" name="jenis_kelamin" value="perempuan" checked={jenis_kelamin === 'perempuan'} onChange={handleChange} />
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
                  value={status_pernikahan}
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
                <select id="golongan_darah" name="golongan_darah" value={golongan_darah} onChange={handleChange} required className="rounded-lg w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
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
                <select id="pekerjaan" name="pekerjaan" value={pekerjaan} onChange={handleChange} required className="rounded-lg w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="">Pilih Pekerjaan</option>
                  <option value="mahasiswa">Mahasiswa</option>
                  <option value="bekerja">Bekerja</option>
                  <option value="belum bekerja">Belum Bekerja</option>
                  <option value="pelajar">Pelajar</option>
                </select>
              </div>

              <div>
                <label htmlFor="alamat" className="block text-sm font-medium mb-1">
                  Alamat
                </label>
                <input
                  type="text"
                  id="alamat"
                  name="alamat"
                  value={alamat}
                  onChange={handleChange}
                  placeholder="Alamat"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="tempat_lahir" className="block text-sm font-medium mb-1">
                  Tempat Lahir
                </label>
                <input
                  type="text"
                  id="tempat_lahir"
                  name="tempat_lahir"
                  value={tempat_lahir}
                  onChange={handleChange}
                  placeholder="Tempat Lahir"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="tanggal_lahir" className="block text-sm font-medium mb-1">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  id="tanggal_lahir"
                  name="tanggal_lahir"
                  value={tanggal_lahir}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium mb-1">
                  Role
                </label>
                <select id="role" name="role" value={role} onChange={handleChange} required className="rounded-lg w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="">Pilih Role</option>
                  <option value="admin">Admin</option>
                  <option value="dokter">Dokter</option>
                  <option value="pasien">Pasien</option>
                  <option value="apoteker">Apoteker</option>
                </select>
              </div>

              {cekDokter && (
                <div>
                  <label htmlFor="poli" className="block text-sm font-medium mb-1">
                    Poli
                  </label>
                  <select id="poli" name="poli" value={form.poli} onChange={handleChange} required className="rounded-lg w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="">Pilih Poli</option>
                    <option value="umum">Umum</option>
                    <option value="gigi">Gigi</option>
                    <option value="anak">Anak</option>
                    <option value="mata">Mata</option>
                    <option value="THT">THT</option>
                  </select>
                </div>
              )}

              <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded-md hover:bg-teal-600">
                {loading ? 'menyimpan...' : 'Tambah users'}
              </button>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
