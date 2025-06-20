import React, { useEffect, useState } from 'react';
import ModalEditObat from './ModalEditObat';
import ModalDeleteObat from './ModalDeleteObat';
import api from '../../../utils/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import FormTambahObat from './Formtambahobat';
const DataObat = () => {
  const [dataObat, setDataObat] = useState([]);
  const [selectedObat, setSelectedObat] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading , setLoading] = useState(false)
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
    setLoading(true)
    try {
      await api.put(`/obat/${id}`, updatedObat);
      await fetchObat();
      setLoading(false)
      setShowEditModal(false);
    } catch (err) {
      setLoading(false)
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true)
    try {
      await api.delete(`/obat/${id}`);
      await fetchObat();
      setLoading(false)
      setShowDeleteModal(false);
    } catch (err) {
      setLoading(false)
      console.error(err);
    }
  };

  return (
    <>
     <div className="bg-white shadow-lg mt-[20px] mb-2 flex justify-center items-center to-red-500 w-full h-[100px] rounded-md">
          <p className="text-[#00B686] font-bold text-[25px]">Manajemen Data Obat</p>
        </div>
    <div className="bg-white shadow-lg mt-[20px] flex justify-between px-7 items-center w-full min-h-[70px] rounded-t-md border-b-2  border-[#1DE9B6]">
  <h1 className="text-2xl font-semibold">Daftar Obat</h1>
  <FormTambahObat onSuccess={fetchObat} />
</div>

       <div className="bg-white flex flex-col shadow-lg rounded-b-lg w-full p-6 space-y-6">
    <input
       type="text"
  placeholder="Cari Nama Obat..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
      className="border border-gray-300 rounded-lg  px-4 py-2 w-full "
    />
    <div className="overflow-x-auto w-full">
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
            ) : dataObat.filter((data) =>
      data.nama_obat.toLowerCase().includes(searchTerm.toLowerCase())
    ).length === 0 ? (
    <tr>
      <td colSpan="7" className="text-center py-4 text-gray-500">
        Data tidak ditemukan
      </td>
    </tr>
  ) : (
               dataObat
      .filter((data) =>
        data.nama_obat.toLowerCase().includes(searchTerm.toLowerCase())
      ).map((obat) => (
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
        {/* Modal */}
        <ModalEditObat show={showEditModal} loading={loading} obat={selectedObat} onUpdate={handleUpdate} onClose={() => setShowEditModal(false)} />
        <ModalDeleteObat show={showDeleteModal} loading={loading} obat={selectedObat} onDelete={handleDelete} onClose={() => setShowDeleteModal(false)} />
      </div>
    </>
  );
};

export default DataObat;
