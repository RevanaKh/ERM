import React, { useEffect, useState } from 'react';

import api from '../../../utils/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import FormTambahObat from './FormTambahObat';
import ModalEditObat from './ModalEditObat';
import Modaldelete from './Modaldelete';
const DataObat = () => {
  const [dataObat, setDataObat] = useState([]);
  const [selectedObat, setSelectedObat] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const fetchObat = async () => {
    try {
      const res = await api.get('/obat/dataobat');
      setDataObat(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchObat();
  }, []);

  const handleUpdate = async (id, updatedObat) => {
    setLoading(true);
    try {
      await api.put(`/obat/${id}`, updatedObat);
      setLoading(false);
      await fetchObat();
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);

    try {
      await api.delete(`/obat/${id}`);
      setLoading(false);

      await fetchObat();
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg mt-[20px] flex flex-col p-2  to-red-500 w-full min-h-[100px] rounded-md">
        <div className="flex w-full justify-end">
          <FormTambahObat fetchObat={fetchObat} />
        </div>
        <div className="relative overflow-x-auto shadow-lg ">
          <h1 className="text-2xl w-full font-semibold mb-4">Data Obat</h1>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-lg dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-[#00B686]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3">
                  Jenis
                </th>
                <th scope="col" className="px-6 py-3">
                  Harga
                </th>
                <th scope="col" className="px-6 py-3">
                  Stok
                </th>
                <th scope="col" className="px-6 py-3">
                  Tanggal kadaluarsa
                </th>
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {dataObat.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-500">
                    Tidak ada Obat
                  </td>
                </tr>
              ) : (
                dataObat.map((obat) => (
                  <tr key={obat.id} className="bg-white border-b hover:bg-gray-50 text-black border-gray-200">
                    <td className="px-6 py-4">{obat.id}</td>
                    <td className="px-6 py-4">{obat.nama_obat}</td>
                    <td className="px-6 py-4">{obat.jenis_obat}</td>
                    <td className="px-6 py-4">Rp. {obat.harga_jual}</td>
                    <td className="px-6 py-4">{obat.stok}</td>
                    <td className="px-6 py-4">
                      {obat.kadaluarsa
                        ? new Date(obat.kadaluarsa).toLocaleString('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            hour12: false,
                          })
                        : 'Tidak tersedia'}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedObat(obat);
                          setShowEditModal(true);
                        }}
                        className="focus:outline-none  text-[#00B686] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedObat(obat);
                          setShowDeleteModal(true);
                        }}
                        className="focus:outline-none text-red-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                      >
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
      <ModalEditObat loading={loading} show={showEditModal} onUpdate={handleUpdate} setShow={setShowEditModal} obat={selectedObat} />
      <Modaldelete loading={loading} show={showDeleteModal} onDelete={handleDelete} setShow={setShowDeleteModal} obat={selectedObat} />
    </>
  );
};

export default DataObat;
