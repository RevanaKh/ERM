import react, { useEffect, useState } from 'react';
import api from '../../../utils/api';
import Modalpasien from './Modalpasien';
import { FaEdit, FaTrash, FaUsers } from 'react-icons/fa';
import Modaldelete from './Modaldelete';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa6';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Tambahpasien from './Tambahpasien';

const Datapasien = () => {
  const [modalpasien, setModalpasien] = useState(false);
  const [modaldelete, setModaldelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [datapasien, setDatapasien] = useState([]);
  const [selectedPasien, setSelectedPasien] = useState(null);
  const [fromData, setFromdata] = useState({
    nama: '',
    nik: '',
    email: '',
    jenis_kelamin: '',
    alamat: '',
    tempat_lahir: '',
    tanggal_lahir: '',
  });
  const fetchpasien = async () => {
    try {
      const res = await api.get('/users');
      setDatapasien(res.data);
    } catch (err) {
      console.error(err.res?.data.message);
    }
  };
  useEffect(() => {
    fetchpasien();
  }, []);
  const handleSearch = async () => {
    if (!fromData.nik) {
      alert('Masukkan NIK untuk mencari');
      return;
    }
    try {
      const res = await api.get(`/users/search?nik=${fromData.nik}`);
      setMessage('Berhasil mencari NIK');
      setDatapasien(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || 'Terjadi kesalahan');
      setError('Gagal Mencari NIK');
      setDatapasien([]);
    }
  };

  const handleEditClick = (data) => {
    setSelectedPasien(data);
    setModalpasien(true);
  };

  const handleCloseModal = () => {
    setModalpasien(false);
    setModaldelete(false);
    setSelectedPasien(null);
  };
  const handleUpdate = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await api.put(`/users/${id}`, updatedData);
      setDatapasien(datapasien.map((p) => (p.id === id ? res.data : p)));
      setLoading(false);
      await fetchpasien();
      handleCloseModal();
      setMessage('Berhasil mengubah data pasien');
      setError('');
    } catch (err) {
      console.error(err.response?.data?.message || 'Gagal memperbarui data');
      setLoading(false);
      setError(`Gagal Memperbarui Data pasien ${err.response?.data?.message}`);
      setMessage('');
    }
  };
  const handleDeleteClick = (data) => {
    setSelectedPasien(data);
    setModaldelete(true);
  };
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/users/${id}`);
      setDatapasien(datapasien.filter((data) => data.id !== id));
      await fetchpasien();
      setLoading(false);

      setModaldelete(false);
      setMessage('Berhasil menghapus data pasien');
      setError('');
    } catch (err) {
      console.log(err.response?.data?.message || 'Failed to delete user');
      setModaldelete(false);
      setLoading(false);
      setError(`Gagal Menghapus Data Pasien ${err.response?.data?.message}`);
      setMessage('');
    }
  };

  const exportPasienToExcel = () => {
    const dataPasienFiltered = datapasien.filter((data) => data.role === 'pasien');

    const worksheetData = dataPasienFiltered.map((data) => ({
      'ID PASIEN': `RM-${data.id}`,
      'NAMA PASIEN': data.nama,
      NIK: data.nik,
      GENDER: data.jenis_kelamin,
      'TEMPAT LAHIR': data.tempat_lahir,
      'TANGGAL LAHIR': data.tanggal_lahir,
      ALAMAT: data.alamat,
      EMAIL: data.email,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Pasien');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const data = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(data, 'data-pasien.xlsx');
  };

  const exportPasienToPDF = () => {
    const doc = new jsPDF();

    const dataPasienFiltered = datapasien.filter((data) => data.role === 'pasien');

    const tableColumn = ['ID PASIEN', 'NAMA', 'NIK', 'GENDER', 'TEMPAT LAHIR', 'TGL LAHIR', 'ALAMAT', 'EMAIL'];

    const tableRows = dataPasienFiltered.map((data) => [`RM-${data.id}`, data.nama, data.nik, data.jenis_kelamin, data.tempat_lahir, data.tanggal_lahir, data.alamat, data.email]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [0, 182, 134] },
      startY: 20,
    });

    doc.text('Data Pasien', 14, 15);
    doc.save('data-pasien.pdf');
  };

  return (
    <>
      <div className="min-h-screen w-full bg-[#FAF7F2] ">
        <div className="bg-white shadow-lg mt-[20px] mb-2 flex justify-center items-center to-red-500 w-full h-[100px] rounded-md">
          <p className="text-[#00B686] font-bold text-[25px]">Data Pasien</p>
        </div>

        {message ? (
          <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-300" role="alert">
            <span class="font-medium">{message}</span>
          </div>
        ) : error ? (
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-300" role="alert">
            <span class="font-medium">{error}</span>
          </div>
        ) : null}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 bg-black mt-4 rounded-t-lg px-6 py-4">
          <div className="flex items-center gap-3 text-white">
            <FaUsers className="text-[30px]" />
            <p className="font-bold text-[20px]">Data Pasien</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Tambahpasien onSuccess={fetchpasien} setMessage={setMessage} setError={setError} />

            <button
              type="button"
              onClick={exportPasienToPDF}
              className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150"
            >
              <FaFilePdf className="text-[18px]" />
              Unduh PDF
            </button>

            <button
              type="button"
              onClick={exportPasienToExcel}
              className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150"
            >
              <FaFileExcel className="text-[18px]" />
              Unduh Excel
            </button>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg w-full p-6 space-y-6">
          <div className="flex flex-col  justify-between md:flex-row gap-4 items-center w-full">
            <input type="text" placeholder="Cari berdasarkan NIK" value={fromData.nik} onChange={(e) => setFromdata((prev) => ({ ...prev, nik: e.target.value }))} className="border border-gray-300 rounded-lg px-4 py-2 w-full " />
            <button onClick={handleSearch} className="bg-[#00B686] hover:bg-[#166534] text-white rounded-lg px-6 py-2 transition-all">
              Cari
            </button>
          </div>

          <div className="relative overflow-x-auto rounded-lg shadow">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-white uppercase bg-[#00B686]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID PASIEN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NAMA PASIEN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NIK
                  </th>
                  <th scope="col" className="px-6 py-3">
                    GENDER
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TEMPAT LAHIR
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TANGGAL LAHIR
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ALAMAT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    EMAIL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody>
                {datapasien?.filter((data) => data.role === 'pasien').length > 0 ? (
                  datapasien
                    .filter((data) => data.role === 'pasien')
                    .map((data) => (
                      <tr key={data.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{`RM-${data.id}`}</td>
                        <td className="px-6 py-4">{data.nama}</td>
                        <td className="px-6 py-4">{data.nik}</td>
                        <td className="px-6 py-4">{data.jenis_kelamin}</td>
                        <td className="px-6 py-4">{data.tempat_lahir}</td>
                        <td className="px-6 py-4">
                          {' '}
                          {data.tanggal_lahir
                            ? new Date(data.tanggal_lahir).toLocaleString('id-ID', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                                hour12: false,
                              })
                            : 'Tidak tersedia'}
                        </td>
                        <td className="px-6 py-4">{data.alamat}</td>
                        <td className="px-6 py-4">{data.email}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <button onClick={() => handleEditClick(data)} className="text-[#00B686] hover:text-[#007f5f] text-lg">
                            <FaEdit />
                          </button>
                          <button onClick={() => handleDeleteClick(data)} className="text-red-500 hover:text-red-700 text-lg">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      Tidak ada data pasien.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${modalpasien && 'fixed  inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 '} `}>
          <Modalpasien modalpasien={modalpasien} setModalpasien={setModalpasien} loading={loading} data={selectedPasien} onClose={handleCloseModal} onUpdate={handleUpdate} />
        </div>
        <Modaldelete modaldelete={modaldelete} setModaldelete={setModaldelete} loading={loading} data={selectedPasien} onClose={handleCloseModal} onDelete={handleDelete} />
      </div>
    </>
  );
};
export default Datapasien;
