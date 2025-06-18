import react, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'flowbite-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const ModalEditUser = ({ data, EditUser, setEditUser, onUpdate, loading }) => {
  const [form, setForm] = useState({ ...data });

  const [cekDokter, setCekDokter] = useState(data?.role === 'dokter');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (name === 'role') {
      setCekDokter(value === 'dokter');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditUser(false);
    onUpdate(data.user_id, form);
  };
  useEffect(() => {
    setForm({ ...data });
    setCekDokter(data?.role === 'dokter');
  }, [data]);
  return (
    <Modal show={EditUser} onClose={() => setEditUser(false)}>
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold mb-6 text-center text-teal-500">Edit user</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="nama" className="block text-sm font-medium mb-1">
              Nama
            </label>
            <input type="text" id="nama" name="nama" value={form.nama} onChange={handleChange} placeholder="Nama" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label htmlFor="nik" className="block text-sm font-medium mb-1">
              NIK
            </label>
            <input
              type="text"
              id="nik"
              name="nik"
              value={form.nik}
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
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <span className="block text-sm font-medium mb-1">Jenis Kelamin</span>
            <div className="space-x-4">
              <input type="radio" id="male" name="jenis_kelamin" value="laki-laki" checked={form.jenis_kelamin === 'laki-laki'} onChange={handleChange} />
              <label htmlFor="male">Laki-laki</label>

              <input type="radio" id="female" name="jenis_kelamin" value="perempuan" checked={form.jenis_kelamin === 'perempuan'} onChange={handleChange} />
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
              value={form.status_pernikahan}
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
            <select id="golongan_darah" name="golongan_darah" value={form.golongan_darah} onChange={handleChange} required className="rounded-lg w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
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
            <select id="pekerjaan" name="pekerjaan" value={form.pekerjaan} onChange={handleChange} required className="rounded-lg w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
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
              value={form.alamat}
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
              value={form.tempat_lahir}
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
              value={form.tanggal_lahir}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Role
            </label>
            <select id="role" name="role" value={form.role} onChange={handleChange} required className="rounded-lg w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
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
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
};
export default ModalEditUser;
