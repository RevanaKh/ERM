import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { FaTrash ,FaClipboardList } from 'react-icons/fa';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'flowbite-react';
import { IoIosAlert } from 'react-icons/io';
import { FaFileExcel ,FaFilePdf} from "react-icons/fa6";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const TabelPendaftaran = () => {
  const [pendaftaran, setPendaftaran] = useState([]);
  const [openModalDelete, setModalDelete] = useState(false);
  const [selectDaftar, setSelectDaftar] = useState(null);
const [searchTerm, setSearchTerm] = useState('');

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const fetchPendaftaran = async () => {
    try {
      const res = await api.get('/pasien/getdaftar');
      setPendaftaran(res.data);
    } catch (err) {
      console.log(err.res?.data.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/pasien/${id}`);
      setModalDelete(false);
      await fetchPendaftaran();
      setMessage('Berhasil menghapus data Pendaftran');
      setError('');
    } catch (error) {
      console.error(error.response?.data?.message || 'Gagal menghapus data Pendaftaram');
      setError(`Gagal menghapus data Pendaftaram`);
    }
  };
  const handleDeleteClick = (data) => {
    setSelectDaftar(data);
    setModalDelete(true);
  };
  useEffect(() => {
    fetchPendaftaran();
  }, []);

  const exportPDF = () => {
  const doc = new jsPDF();

  const tableColumn = [
    "ID PENDAFTARAN", 
    "ID DOKTER", 
    "DOKTER", 
    "NAMA PASIEN", 
    "POLI", 
    "STATUS PEMERIKSAAN"
  ];
  
  const tableRows = [];

  pendaftaran.forEach(item => {
    const rowData = [
      item.pendaftaran_id,
      item.dokter_id,
      item.nama,
      item.nama_pasien,
      item.poli,
      item.status_pemeriksaan
    ];
    tableRows.push(rowData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 182, 134] }, // Hijau
    margin: { top: 20 },
  });

  doc.save("data-pendaftaran.pdf");
};

const exportToExcel = () => {
  const worksheetData = pendaftaran.map(item => ({
    'ID PENDAFTARAN': item.pendaftaran_id,
    'ID DOKTER': item.dokter_id,
    'DOKTER': item.nama,
    'NAMA PASIEN': item.nama_pasien,
    'POLI': item.poli,
    'STATUS PEMERIKSAAN': item.status_pemeriksaan
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Pendaftaran');

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });

  const data = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  saveAs(data, 'data-pendaftaran.xlsx');
};


  return (
    <>
      <div className="min-h-screen w-full bg-[#FAF7F2] py-5">
        <div className="bg-white mb-2 shadow-lg mt-[20px] flex justify-center items-center to-red-500 w-full h-[100px] rounded-md">
          <p className="text-[#00B686] font-bold">Data Pendaftaran</p>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 bg-black mt-4 rounded-t-lg px-6 py-4">

  <div className="flex items-center gap-3 text-white">
    <FaClipboardList className="text-[30px]" />
    <p className="font-bold text-[20px]">Data Pendaftaran</p>
  </div>

  <div className="flex flex-col sm:flex-row gap-3">

    <button
      type="button"
       onClick={exportPDF}
      className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150"
    >
      <FaFilePdf className="text-[18px]" />
      Unduh PDF
    </button>

    <button
      type="button"
       onClick={exportToExcel}
      className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150"
    >
      <FaFileExcel className="text-[18px]" />
      Unduh Excel
    </button>
  </div>
</div>

        <div className="bg-white shadow-lg flex flex-col gap-2 justify-center items-center to-red-500 w-full min-h-[100px] p-5 ">
    <input
       type="text"
  placeholder="Cari Nama Pasien..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
      className="border border-gray-300 rounded-lg  px-4 py-2 w-full "
    />
  
          <div className="relative overflow-x-auto shadow-lg w-full">
            <table className="w-full text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-[#00B686] ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID PENDAFTARAN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ID DOKTER
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DOKTER
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NAMA-PASIEN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    POLI
                  </th>
                  <th scope="col" className="px-6 py-3">
                    STATUS_PEMERIKSAAN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    AKSI
                  </th>
                </tr>
              </thead>
            <tbody>
  {pendaftaran.length === 0 ? (
    <tr>
      <td colSpan="7" className="text-center py-4 text-gray-500">
        Tidak ada data Pendaftaran
      </td>
    </tr>
  ) : pendaftaran.filter((data) =>
      data.nama_pasien.toLowerCase().includes(searchTerm.toLowerCase())
    ).length === 0 ? (
    <tr>
      <td colSpan="7" className="text-center py-4 text-gray-500">
        Data tidak ditemukan
      </td>
    </tr>
  ) : (
    pendaftaran
      .filter((data) =>
        data.nama_pasien.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((data) => (
        <tr key={data.id} className="bg-white border-b text-black hover:bg-gray-50 border-gray-200">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {data.pendaftaran_id}
          </th>
          <td className="px-6 py-4">{data.dokter_id}</td>
          <td className="px-6 py-4">{data.nama}</td>
          <td className="px-6 py-4">{data.nama_pasien}</td>
          <td className="px-6 py-4">{data.poli}</td>
          <td className="px-6 py-4">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                data.status_pemeriksaan === 'menunggu'
                  ? 'bg-yellow-100 text-yellow-800'
                  : data.status_pemeriksaan === 'dalam pemeriksaan'
                  ? 'bg-blue-100 text-blue-800'
                  : data.status_pemeriksaan === 'selesai'
                  ? 'bg-green-100 text-green-800'
                  : ''
              }`}
            >
              {data.status_pemeriksaan}
            </span>
          </td>
          <td className="px-6 py-4 flex">
            <button
              onClick={() => handleDeleteClick(data)}
              type="button"
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
      </div>
      <Modal show={openModalDelete} onClose={() => setModalDelete(false)}>
        <ModalHeader className="bg-white ">
          <p className="text-black">Hapus Pendaftaran</p>
        </ModalHeader>
        <ModalBody className="bg-white flex flex-col justify-center items-center">
          <IoIosAlert className="text-red-500 text-[100px]" />
          <p>
            Yakin Anda ingin Menghapus dengan id pendaftaran <span className="font-bold">{selectDaftar?.pendaftaran_id} </span>
          </p>
          {error && <p className="text-red-400">{error}</p>}
        </ModalBody>
        <ModalFooter className="bg-white">
          <button
            onClick={() => handleDelete(selectDaftar?.pendaftaran_id)}
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            Hapus
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TabelPendaftaran;
