import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import TambahApoteker from './TambahApoteker';
import ModalEditApotker from './ModalEditApotker';
import ModalDeleteApoteker from './ModalDeleteApoteker';

const DataApoteker = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [selectedApotek, setselectedApotek] = useState(null);
  const [OpenEdit, setOpenEdit] = useState(false);
  const [OpenDelete, setOpenDelete] = useState(false);
  const fetchApoteker = async () => {
    try {
      const res = await api.get('/apoteker/getapoteker');
      setData(res.data);
    } catch (err) {
      console.log(err.res.data.message);
    }
  };
  useEffect(() => {
    fetchApoteker();
  }, []);
  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await api.put(`/apoteker/${id}`, updatedData);
      setData(data.map((p) => (p.id === id ? res.data : p)));
      await fetchApoteker();
      setMessage('Berhasil mengubah data Apoteker');
      setError('');
    } catch (err) {
      console.error(err.response?.data?.message || 'Gagal memperbarui data');
      setError(`Gagal Memperbarui Data Apoteker `);
      setMessage('');
    }
  };
  const handleDelete = async (id) => {
    try {
      await api.delete(`/apoteker/${id}`);
      setData(data.filter((data) => data.id !== id));
      await fetchApoteker();
      setOpenDelete(false);
    } catch (err) {
      console.log(err.response?.data?.message || 'Failed to delete user');
    }
  };
  const handleEditClick = (datas) => {
    setOpenEdit(true);
    console.log(selectedApotek);
    setselectedApotek(datas);
  };
  const handleDeleteClick = (datas) => {
    setOpenDelete(true);
    setselectedApotek(datas);
  };
  return (
    <>
      <div className="min-h-screen w-full flex flex-col gap-3 ">
        <div className="bg-white shadow-lg mt-[20px] flex justify-center items-center to-red-500 w-full h-[100px] rounded-md">
          <p className="text-[#00B686] font-bold">Data Apoteker</p>
        </div>
        <TambahApoteker datas={selectedApotek} />

        <div className="bg-white shadow-lg flex justify-center items-center to-red-500 w-full min-h-[100px] ">
          <div class="relative overflow-x-auto shadow-lg my-[20px] w-full mx-[10px]">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-white  uppercase bg-gray-50 ">
                <tr className="bg-[#00B686]">
                  <th scope="col" class="px-6 py-3">
                    Nama
                  </th>
                  <th scope="col" class="px-6 py-3">
                    email
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      Tidak ada data Apoteker
                    </td>
                  </tr>
                ) : (
                  data.map((datas) => (
                    <tr key={datas.id} class=" border-b bg-white hover:bg-gray-50 text-black border-gray-200">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {datas.nama}
                      </th>
                      <td class="px-6 py-4">{datas.email}</td>
                      <td class="px-6 py-4">{datas.role}</td>
                      <td className="px-6 py-4 flex">
                        <button type="button" onClick={() => handleEditClick(datas)} className="focus:outline-none text-[#00B686]  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                          <FaEdit />
                        </button>
                        <button type="button" onClick={() => handleDeleteClick(datas)} className="focus:outline-none text-red-400  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
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
      </div>
      <ModalEditApotker onUpdate={handleUpdate} datas={selectedApotek} setOpenEdit={setOpenEdit} OpenEdit={OpenEdit} />
      <ModalDeleteApoteker onDelete={handleDelete} datas={selectedApotek} setOpenDelete={setOpenDelete} OpenDelete={OpenDelete} />
    </>
  );
};

export default DataApoteker;
