import react, { useState } from 'react';
import api from '../../../utils/api';
        import { TbUsersPlus } from "react-icons/tb";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';

const Tambahpasien = ({ onSuccess, setMessage, setError }) => {
  const [modaltambah, setModalTambah] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fromData, setFromdata] = useState({
    nama: '',
    nik: '',
    email: '',
    jenis_kelamin: '',
    alamat: '',
    tempat_lahir: '',
    tanggal_lahir: '',
  });
  const { nama, nik, email, jenis_kelamin, alamat, tempat_lahir, tanggal_lahir } = fromData;
  const handleChange = (e) => {
    setFromdata({ ...fromData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/users/createpasien', fromData);
      setLoading(false);
      onSuccess();
      setModalTambah(false);
      setMessage('Berhasil Menambahkan Pasien');
      setError('');
    } catch (err) {
      setLoading(false);
      console.log(err.response?.data.message);
      setModalTambah(false);
      setError(`Gagal Menambahakan pasien ${err.response?.data.message}`);
      setMessage('');
    }
  };
  return (
    <>
      <button type="button" onClick={() => setModalTambah(true)} className="flex items-center gap-2 text-white bg-[#00B686] hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-150">
       <TbUsersPlus className="text-[20px]"/>
        Tambah pasien
      </button>
 <Modal show={modaltambah} onClose={() => setModalTambah(false)}>
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-black text-center">Tambah Pasien</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <form onSubmit={handleSubmit} className="space-y-3">
  <div>
    <label htmlFor="nama" className="block mb-1 font-medium">Nama:</label>
    <input
      type="text"
      id="nama"
      name="nama"
      value={nama}
      onChange={handleChange}
      placeholder="Nama"
      required
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  <div>
    <label htmlFor="nik" className="block mb-1 font-medium">NIK (16 digit):</label>
    <input
      type="text"
      id="nik"
      name="nik"
      value={nik}
      onChange={handleChange}
      placeholder="NIK"
      maxLength="16"
      required
      pattern="\d{16}"
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  <div>
    <label htmlFor="email" className="block mb-1 font-medium">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      value={email}
      onChange={handleChange}
      placeholder="Email"
      required
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  <div>
    <span className="block mb-1 font-medium">Jenis Kelamin:</span>
    <div className="space-x-4">
      <input
        type="radio"
        id="male"
        name="jenis_kelamin"
        value="laki-laki"
        checked={jenis_kelamin === 'laki-laki'}
        onChange={handleChange}
      />
      <label htmlFor="male">Laki-laki</label>

      <input
        type="radio"
        id="female"
        name="jenis_kelamin"
        value="perempuan"
        checked={jenis_kelamin === 'perempuan'}
        onChange={handleChange}
      />
      <label htmlFor="female">Perempuan</label>
    </div>
  </div>

  <div>
    <label htmlFor="alamat" className="block mb-1 font-medium">Alamat:</label>
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
    <label htmlFor="tempat_lahir" className="block mb-1 font-medium">Tempat Lahir:</label>
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
    <label htmlFor="tanggal_lahir" className="block mb-1 font-medium">Tanggal Lahir:</label>
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

  <button
    type="submit"
    className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600"
  >
    {loading ? 'Menyimpan..' : 'Tambah Pasien'}
  </button>
</form>
      </ModalBody>
      
    </Modal>
     
    </>
  );
};
export default Tambahpasien;
