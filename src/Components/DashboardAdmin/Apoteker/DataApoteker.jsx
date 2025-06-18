import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { FaEdit, FaTrash, FaClinicMedical, FaEye } from 'react-icons/fa';
import TambahApoteker from './TambahApoteker';
import ModalEditApotker from './ModalEditApotker';
import ModalDeleteApoteker from './ModalDeleteApoteker';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa6';
import ModalDetailApoteker from './ModalDetailApoteker';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
const DataApoteker = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [selectedApotek, setselectedApotek] = useState(null);
  const [OpenEdit, setOpenEdit] = useState(false);
  const [OpenDelete, setOpenDelete] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
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
    setLoading(true);
    try {
      const res = await api.put(`/apoteker/${id}`, updatedData);
      setData(data.map((p) => (p.id === id ? res.data : p)));
      await fetchApoteker();
      setLoading(false);
      setMessage('Berhasil mengubah data Apoteker');
      setError('');
    } catch (err) {
      console.error(err.response?.data?.message || 'Gagal memperbarui data');
      setError(`Gagal Memperbarui Data Apoteker `);
      setLoading(false);
      setMessage('');
    }
  };
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/apoteker/${id}`);
      setData(data.filter((data) => data.id !== id));
      await fetchApoteker();
      setLoading(false);
      setOpenDelete(false);
    } catch (err) {
      setLoading(false);
      console.log(err.response?.data?.message || 'Failed to delete user');
    }
  };
  const handleEditClick = (datas) => {
    setOpenEdit(true);

    setselectedApotek(datas);
  };
  const handleDeleteClick = (datas) => {
    setOpenDelete(true);
    setselectedApotek(datas);
  };
  const handleDetailClick = (datas) => {
    setselectedApotek(datas);
    setModalDetail(true);
  };
  const exportApotekerToPDF = () => {
    const doc = new jsPDF();

    const columns = ['Nama', 'Email', 'Role'];
    const rows = data.map((item) => [item.nama, item.email, item.role]);

    doc.text('Data Apoteker', 14, 15);
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [0, 182, 134] },
    });

    doc.save('data-apoteker.pdf');
  };

  const exportApotekerToExcel = () => {
    const worksheetData = data.map((item) => ({
      Nama: item.nama,
      Email: item.email,
      Role: item.role,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Apoteker');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(blob, 'data-apoteker.xlsx');
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col gap-3 ">
        <div className="bg-white shadow-lg mt-[20px] flex justify-center items-center to-red-500 w-full h-[100px] rounded-md">
          <p className="text-[#00B686] font-bold">Data Apoteker</p>
        </div>
        <div className="bg-black rounded-t-lg shadow-lg mt-5 w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4 px-6 text-white">
            <div className="flex items-center gap-3">
              <FaClinicMedical className="text-[30px]" />
              <p className="font-bold text-[20px]">Daftar Apoteker</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <TambahApoteker datas={selectedApotek} />

              <button
                type="button"
                onClick={exportApotekerToPDF}
                className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1 transition duration-150"
              >
                <FaFilePdf className="text-[18px]" />
                Unduh PDF
              </button>

              <button
                type="button"
                onClick={exportApotekerToExcel}
                className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1 transition duration-150"
              >
                <FaFileExcel className="text-[18px]" />
                Unduh Excel
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg flex flex-col px-5 justify-center items-center rounded-b-lg w-full min-h-[100px] ">
          <input type="text" placeholder="Cari Nama Apoteker..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded-lg mt-3 px-4 py-2 w-full " />
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
                ) : data.filter((datas) => datas.nama.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      Data tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  data
                    .filter((datas) => datas.nama.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((datas) => (
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
                          <button type="button" onClick={() => handleDetailClick(datas)} className="focus:outline-none text-blue-400 hover:text-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            <FaEye />
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
      <ModalDetailApoteker show={modalDetail} setModalDetail={setModalDetail} data={selectedApotek} />
      <ModalEditApotker onUpdate={handleUpdate} loading={loading} datas={selectedApotek} setOpenEdit={setOpenEdit} OpenEdit={OpenEdit} />
      <ModalDeleteApoteker onDelete={handleDelete} loading={loading} datas={selectedApotek} setOpenDelete={setOpenDelete} OpenDelete={OpenDelete} />
    </>
  );
};

export default DataApoteker;
