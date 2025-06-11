import React from 'react';
import TambahDokter from './TambahDokter';
import api from '../../../utils/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'flowbite-react';
import { IoIosAlert } from 'react-icons/io';
import { useEffect, useState } from 'react';
const TabelDokter = () => {
  const [Datadokter, SetdataDokter] = useState([]);
  const [openModalEdit, setModalEdit] = useState(false);
  const [openModalDelete, setModalDelete] = useState(false);
  const [selectDokter, setSelectDokter] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    poli: '',
    role: '',
  });
  const fetchdokter = async () => {
    try {
      const response = await api.get('/dokter/getdokter');
      SetdataDokter(response.data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e, id, updatedData) => {
    e.preventDefault();
    try {
      const res = await api.put(`/dokter/${id}`, updatedData);
      SetdataDokter(Datadokter.map((p) => (p.id === id ? res.data : p)));
      setModalEdit(false);
      await fetchdokter();
      setMessage('Berhasil mengubah data pasien');
      setError('');
    } catch (err) {
      console.error(err.response?.data?.message || 'Gagal memperbarui data');
      setError(`Gagal Memperbarui Data pasien ${err.response?.data?.message}`);
      setMessage('');
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/dokter/${id}`);
      setModalDelete(false);
      await fetchdokter();
      setMessage('Berhasil menghapus data dokter');
      setError('');
    } catch (error) {
      console.error(error.response?.data?.message || 'Gagal menghapus data pasien');
      setError(`Gagal Menghapus Data pasien`);
    }
  };

  const handleEditClick = (dokter) => {
    setSelectDokter(dokter);
    setModalEdit(true);
  };
  const handleDeleteClick = (dokter) => {
    setSelectDokter(dokter);
    setModalDelete(true);
  };
  useEffect(() => {
    fetchdokter();
    if (selectDokter) {
      setFormData({
        nama: selectDokter.nama || '',
        email: selectDokter.email || '',
        poli: selectDokter.poli || '',
        role: selectDokter.role || '',
      });
    }
  }, [selectDokter]);
  return (
    <>
      {message ? (
        <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-300" role="alert">
          <span class="font-medium">{message}</span>
        </div>
      ) : error ? (
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-300" role="alert">
          <span class="font-medium">{error}</span>
        </div>
      ) : null}
      <div className="bg-[#6C757D] shadow-lg mt-[20px] flex justify-center items-center to-red-500 w-full h-[50px] ">
        <div className="flex justify-between text-white h-[100px] items-center rounded-lg w-[70%] ">
          <p className=" font-bold">Daftar Dokter</p>
          <TambahDokter fetchdokter={fetchdokter} />
        </div>
      </div>

      <div className="bg-white shadow-lg flex justify-center items-center to-red-500 w-full min-h-[100px] ">
        <div class="relative overflow-x-auto shadow-lg my-[20px] w-full mx-[10px]">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-white  uppercase bg-gray-50 ">
              <tr className="bg-[#00B686]">
                <th scope="col" class="px-6 py-3">
                  id
                </th>
                <th scope="col" class="px-6 py-3">
                  Nama dokter
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3">
                  poli
                </th>
                <th scope="col" class="px-6 py-3">
                  role
                </th>
                <th scope="col" class="px-6 py-3  text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {Datadokter.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-500">
                    Tidak ada Data Dokter
                  </td>
                </tr>
              ) : (
                Datadokter.map((dokter) => (
                  <tr key={dokter.id} class=" border-b bg-white hover:bg-gray-50 text-black border-gray-200">
                    <td class="px-6 py-4">{dokter.id}</td>
                    <td class="px-6 py-4">{dokter.nama}</td>
                    <td class="px-6 py-4">{dokter.email}</td>
                    <td class="px-6 py-4">{dokter.poli}</td>
                    <td class="px-6 py-4">{dokter.role}</td>
                    <td className="px-6 py-4 flex justify-center">
                      <button onClick={() => handleEditClick(dokter)} type="button" className="focus:outline-none text-[#00B686]  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                        <FaEdit />
                      </button>
                      <button type="button" onClick={() => handleDeleteClick(dokter)} className="focus:outline-none text-red-400  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={openModalEdit} onClose={() => setModalEdit(false)}>
        <ModalHeader className="bg-white ">
          <p className="text-black">Edit Dokter</p>
        </ModalHeader>
        <ModalBody className="bg-white">
          <form onSubmit={(e) => handleUpdate(e, selectDokter.user_id, formData)} className="space-y-4">
            <div>
              <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input type="text" name="nama" id="nama" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 " value={formData.nama} onChange={handleChange} required />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 ">
                Email
              </label>
              <input type="email" name="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 " value={formData.email} onChange={handleChange} required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Poli</label>
              <select name="poli" value={formData.poli} onChange={handleChange} required className="rounded-lg w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">Pilih Poli</option>
                <option value="umum">Umum</option>
                <option value="gigi">Gigi</option>
                <option value="anak">Anak</option>
                <option value="mata">Mata</option>
                <option value="THT">THT</option>
              </select>
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                role
              </label>
              <input type="text" name="role" id="role" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 " value={formData.role || 'dokter'} onChange={handleChange} readOnly />
            </div>

            <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600">
              Simpan Perubahan
            </button>
          </form>
        </ModalBody>
      </Modal>
      <Modal show={openModalDelete} onClose={() => setModalDelete(false)}>
        <ModalHeader className="bg-white ">
          <p className="text-black">Hapus Dokter</p>
        </ModalHeader>
        <ModalBody className="bg-white flex flex-col justify-center items-center">
          <IoIosAlert className="text-red-500 text-[100px]" />
          <p>
            Yakin Anda ingin Menghapus Dokter <span className="font-bold">{selectDokter?.nama}</span>
          </p>
          {error && <p className="text-red-400">{error}</p>}
        </ModalBody>
        <ModalFooter className="bg-white">
          <button onClick={() => handleDelete(selectDokter?.user_id)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">
            Hapus
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TabelDokter;
