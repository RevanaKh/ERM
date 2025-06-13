import React from 'react';
import TambahDokter from './TambahDokter';
import api from '../../../utils/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'flowbite-react';
import { IoIosAlert } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { FaUserDoctor ,FaFileExcel ,FaFilePdf} from "react-icons/fa6";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
const TabelDokter = () => {
  const [Datadokter, SetdataDokter] = useState([]);
  const [openModalEdit, setModalEdit] = useState(false);
  const [openModalDelete, setModalDelete] = useState(false);
  const [selectDokter, setSelectDokter] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
const [searchTerm, setSearchTerm] = useState('');

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
      setMessage('Berhasil mengubah data Dokter');
      setError('');
    } catch (err) {
      console.error(err.response?.data?.message || 'Gagal memperbarui data');
      setError(`Gagal Memperbarui Data Dokter ${err.response?.data?.message}`);
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

const exportDokterToPDF = () => {
  const doc = new jsPDF();

  const columns = ['ID', 'Nama Dokter', 'Email', 'Poli', 'Role'];
  const rows = Datadokter.map(dokter => [
    dokter.id,
    dokter.nama,
    dokter.email,
    dokter.poli,
    dokter.role,
  ]);

  doc.text('Data Dokter', 14, 15);
  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 20,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 182, 134] },
  });

  doc.save('data-dokter.pdf');
};

const exportDokterToExcel = () => {
  const worksheetData = Datadokter.map(dokter => ({
    ID: dokter.id,
    'Nama Dokter': dokter.nama,
    Email: dokter.email,
    Poli: dokter.poli,
    Role: dokter.role,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dokter');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/octet-stream' });

  saveAs(data, 'data-dokter.xlsx');
};

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
    <div className="bg-black rounded-t-lg shadow-lg mt-5 w-full">
  <div className="flex flex-col md:flex-row gap-4 justify-between py-2 items-center min-h-[70px] w-full lg:px-6 text-white">

  <div className="flex items-center gap-3">
    <FaUserDoctor className="text-[30px]" />
    <p className="font-bold text-[20px]">Data Dokter</p>
  </div>

  <div className="flex flex-col md:flex-row gap-3">
    <TambahDokter fetchdokter={fetchdokter} />

    <button
      type="button"
      onClick={exportDokterToPDF}
      className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150"
    >
      <FaFilePdf className="text-[18px]" />
      Unduh PDF
    </button>

    <button
      type="button"
        onClick={exportDokterToExcel}
      className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150"
    >
      <FaFileExcel className="text-[18px]" />
      Unduh Excel
    </button>
  </div>

</div>
</div>



      <div className="bg-white shadow-lg rounded-b-lg flex flex-col px-5 justify-center items-center to-red-500 w-full min-h-[100px] ">
         <input
       type="text"
  placeholder="Cari Nama Dokter..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
      className="border border-gray-300 mt-3 rounded-lg px-4 py-2 w-full "
    />
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
              ) : Datadokter.filter((data) =>
      data.nama.toLowerCase().includes(searchTerm.toLowerCase())
    ).length === 0 ? (
    <tr>
      <td colSpan="7" className="text-center py-4 text-gray-500">
        Data tidak ditemukan
      </td>
    </tr>
  ) : (
                Datadokter.filter((data) =>
      data.nama.toLowerCase().includes(searchTerm.toLowerCase())
    ).map((dokter) => (
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
