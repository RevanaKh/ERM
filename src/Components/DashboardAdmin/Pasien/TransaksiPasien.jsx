import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import { FaEdit,FaMoneyBillWave } from 'react-icons/fa';
import { FaFilePdf ,FaFileExcel } from "react-icons/fa6";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
const TransaksiPasien = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [selectTransaksi, setselectTransaksi] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    pendaftaran_id: '',
    status_pembayaran: '',
  });
  const [editModal, setEditModal] = useState(false);
  const fetchtransaksi = async () => {
    try {
      const res = await api.get('/pasien/getpembayaran');
      setTransaksi(res.data);
    } catch (err) {
      console.log(err.res.data.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleEdit = (data) => {
    setselectTransaksi(data);
    console.log(selectTransaksi);
    setFormData({
      pendaftaran_id: data.id_pendaftaran,
      status_pembayaran: data.status_pembayaran,
    });
    setEditModal(true);
  };
  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await api.put(`/pasien/${id}`, updatedData);
      setTransaksi(transaksi.map((p) => (p.id === id ? res.data : p)));
      await fetchtransaksi();
    } catch (err) {
      console.error(err.response?.data?.message || 'Gagal memperbarui data');
    }
  };
  const handleSave = async () => {
    if (!selectTransaksi) return;

    try {
      await handleUpdate(formData.id_pendaftaran, formData);
      console.log(formData);
      setEditModal(false);
    } catch (error) {
      console.error('Gagal menyimpan:', error);
    }
  };

  useEffect(() => {
    fetchtransaksi();
  }, []);

const exportTransaksiToPDF = () => {
  const doc = new jsPDF();

  const tableColumn = [
    'ID TRANSAKSI',
    'TANGGAL',
    'NAMA PASIEN',
    'JENIS LAYANAN',
    'TOTAL BIAYA',
    'STATUS PEMBAYARAN',
  ];

  const tableRows = transaksi.map(item => [
    `ID-${item.id}`,
    item.waktu_daftar
      ? new Date(item.waktu_daftar).toLocaleString('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour12: false,
        })
      : 'Tidak tersedia',
    item.nama_pasien,
    item.metodePembayaran,
    `Rp. ${item.harga_jual}`,
    item.status_pembayaran,
  ]);

  doc.text('Data Transaksi', 14, 15);
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 182, 134] },
  });

  doc.save('data-transaksi.pdf');
};

const exportTransaksiToExcel = () => {
  const worksheetData = transaksi.map(item => ({
    'ID TRANSAKSI': `ID-${item.id}`,
    'TANGGAL': item.waktu_daftar
      ? new Date(item.waktu_daftar).toLocaleString('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour12: false,
        })
      : 'Tidak tersedia',
    'NAMA PASIEN': item.nama_pasien,
    'JENIS LAYANAN': item.metodePembayaran,
    'TOTAL BIAYA': item.harga_jual,
    'STATUS PEMBAYARAN': item.status_pembayaran,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transaksi');

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(data, 'data-transaksi.xlsx');
};


  return (
    <>
      <div className="min-h-screen w-full bg-[#FAF7F2] py-5">
        <div className="bg-white mb-2 shadow-lg mt-[20px] flex justify-center items-center to-red-500 w-full h-[100px] rounded-md">
          <p className="text-[#00B686] text-[25px] font-bold">Transaksi Pasien</p>
        </div>
          <div className="w-full flex justify-between flex-col md:flex-row items-center px-6 py-2 min-h-[70px] bg-black mt-4 rounded-t-lg">
  <div className="flex items-center gap-3 text-white">
    <FaMoneyBillWave className="text-[20px]" />
    <p className="font-bold text-[20px]">Daftar Transaksi</p>
  </div>
<div className='flex flex-col md:flex-row gap-3'>

  <button
    type="button"
    onClick={exportTransaksiToPDF}
    className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 transition duration-150"
  >
    <FaFilePdf className="text-[20px]" />
    Unduh PDF
  </button>
    <button
    type="button"
     onClick={exportTransaksiToExcel}
    className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 transition duration-150"
  >
    <FaFileExcel className="text-[20px]" />
    Unduh EXCEL
  </button>
    </div>
</div>

        <div className="bg-white rounded-b-lg shadow-lg flex flex-col gap-3 justify-center items-center to-red-500 w-full min-h-[100px] p-5 ">
           <input
       type="number"
  placeholder="Cari ID Transaksi..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
      className="border border-gray-300 rounded-lg px-4 py-2 w-full "
    />
          <div className="relative overflow-x-auto shadow-lg w-full">
            <table className="w-full text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-[#00B686] ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID TRANSAKSI
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TANGGAL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NAMA PASIEN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    JENIS LAYANAN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TOTAL BIAYA
                  </th>
                  <th scope="col" className="px-6 py-3">
                    STATUS PEMBAYARAN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody>
                {transaksi.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      Tidak ada data Transaksi
                    </td>
                  </tr>
                ) :transaksi.filter((data) =>
      String(data.id).includes(searchTerm)
    ).length === 0 ? (
    <tr>
      <td colSpan="7" className="text-center py-4 text-gray-500">
        Data tidak ditemukan
      </td>
    </tr>
  ) : (
                  transaksi.filter((data) =>
  String(data.id).includes(searchTerm)
)

    .map((data) => (
                    <tr key={data.id} className="bg-white border-b text-black hover:bg-gray-50 border-gray-200">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        ID-{data.id}
                      </th>
                      <td className="px-6 py-4">
                        {data.waktu_daftar
                          ? new Date(data.waktu_daftar).toLocaleString('id-ID', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                              hour12: false,
                            })
                          : 'Tidak tersedia'}
                      </td>
                      <td className="px-6 py-4">{data.nama_pasien}</td>
                      <td className="px-6 py-4">{data.metodePembayaran}</td>
                      <td className="px-6 py-4">Rp .{data.harga_jual}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold
      ${data.status_pembayaran === 'belum lunas' ? 'bg-yellow-100 text-yellow-800' : data.status_pembayaran === 'lunas' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
      `}
                        >
                          {data.status_pembayaran}
                        </span>
                      </td>

                      <td className="px-6 py-4 flex">
                        <button onClick={() => handleEdit(data)} type="button" className="focus:outline-none text-[#00B686]  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                          <FaEdit />
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
      <Modal show={editModal} onClose={() => setEditModal(false)}>
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold text-center text-teal-500">Ubah Status Pembayaran</h2>
        </ModalHeader>
        <ModalBody className="bg-white">
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-600">Status Pembayaran</label>
            <select name="status_pembayaran" value={formData.status_pembayaran} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">-- Pilih Status --</option>
              <option value="belum lunas">Belum Lunas</option>
              <option value="lunas">Lunas</option>
            </select>
          </div>

          <button type="button" onClick={handleSave} className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200">
            Simpan Status
          </button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TransaksiPasien;
