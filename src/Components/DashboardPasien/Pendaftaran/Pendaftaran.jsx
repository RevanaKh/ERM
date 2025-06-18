import React, { useState } from 'react';
import api from '../../../utils/api';
const Pendaftaran = ({ setAntrian, setError, setMessage, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [formData, setFormData] = useState({
    nik: '',
    nama_pasien: '',
    poli: '',
    tanggalLahir: '',
    jenisKelamin: '',
     status_pernikahan: '',
    golongan_darah: '',
    pekerjaan: '',
    keluhan: '',
    alamat: '',
    metodePembayaran: '',
  });
  const formkosong = () => {
    setFormData({
      nik: '',
      nama_pasien: '',
      poli: '',
      tanggalLahir: '',
      jenisKelamin: '',
      keluhan: '',
      alamat: '',
      metodePembayaran: '',
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/pasien/daftar', formData);
      console.log(res.data);
      setMessage('Anda Berhasil Mendaftar Cek Ke halaman Antrian');
      setLoading(false);
      setError('');
      setOpen(true);
      formkosong();
    } catch (err) {
      const message = err.response?.data?.message || 'Terjadi kesalahan pada server';
      setError(message || 'Terjadi kesalahan pada server');
      setMessage('');
      setLoading(false);
      setOpen(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] ">
      <div className="max-w-xl mx-auto p-6 bg-white mb-10 shadow-md rounded-md mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">Form Pendaftaran Pasien</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between ">
           <div>
  <label className="block text-sm font-medium">NIK</label>
  <input
    type="text"
    name="nik"
    maxLength={16}
    pattern="\d{16}"
    value={formData.nik}
    onChange={handleChange}
    className="mt-1 block w-full border rounded-md p-2 border-gray-300 focus:ring focus:ring-blue-200"
    required
    placeholder="Masukkan 16 digit NIK"
  />
</div>


            <div>
              <label className="block text-sm font-medium">Nama</label>
              <input type="text" name="nama_pasien" value={formData.nama_pasien} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2 border-gray-300 focus:ring focus:ring-blue-200" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Pilih Poli</label>
            <select name="poli" value={formData.poli} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2 border-gray-300 focus:ring focus:ring-blue-200" required>
              <option value="">-- Pilih Poli --</option>
              <option value="umum">Poli Umum</option>
              <option value="gigi">Poli Gigi</option>
              <option value="anak">Poli Anak</option>
              <option value="mata">Poli Mata</option>
              <option value="THT">Poli THT</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row justify-between ">
            <div>
              <label className="block text-sm font-medium">Tanggal Lahir</label>
              <input type="date" name="tanggalLahir" value={formData.tanggalLahir} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2 border-gray-300 focus:ring focus:ring-blue-200" required />
            </div>

            <div className="md:w-[37%]">
              <label className="block text-sm font-medium mb-1">Jenis Kelamin</label>
              <div className="flex md:flex-col gap-4">
                <label className="inline-flex items-center">
                  <input type="radio" name="jenisKelamin" value="Laki-laki" onChange={handleChange} className="mr-2 border-2 border-gray-500" />
                  Laki-laki
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name="jenisKelamin" value="Perempuan" onChange={handleChange} className="mr-2 border-2 border-gray-500" />
                  Perempuan
                </label>
              </div>
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
            <label className="block text-sm font-medium">Keluhan</label>
            <input type="text" name="keluhan" value={formData.keluhan} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2 border-gray-300 focus:ring focus:ring-blue-200" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Alamat</label>
            <textarea name="alamat" value={formData.alamat} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2 border-gray-300 focus:ring focus:ring-blue-200" required></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Metode Pembayaran</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input type="radio" name="metodePembayaran" value="BPJS" onChange={handleChange} className="mr-2" />
                BPJS
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="metodePembayaran" value="Umum" onChange={handleChange} className="mr-2" />
                Umum
              </label>
            </div>
          </div>

          {/* Tombol Submit */}
          <div>
            <button type="submit" className="w-full bg-[#1DE9B6] text-white px-4 py-2 rounded hover:bg-[#00B686] transition-colors">
              {loading ? 'Mendaftar...' : 'DAFTAR'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pendaftaran;
