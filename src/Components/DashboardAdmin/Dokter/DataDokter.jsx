import react, { useEffect, useState } from 'react';
import { FaEdit, FaTrash ,FaCalendarAlt } from 'react-icons/fa';
import { FaFileExcel ,FaFilePdf} from "react-icons/fa6";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import api from '../../../utils/api';
import Modaldokter from './Modaldokter';
import Deletejadwal from './Deletejadwal';
import TambahJadwal from './TambahJadwal';
import TabelDokter from './TabelDokter';
const DataDokter = () => {
  const [jadwaldokter, setJadwaldokter] = useState([]);
  const [modalDokter, setmodalDokter] = useState(false);
  const [modalDelete, setModaldelete] = useState(false);
  const [selectedDokter, setSelectedDokter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
const [loading ,setLoading ] = useState(false)
  
  const fetchdokter = async () => {
    try {
      const res = await api.get('/jadwal/getjadwal');
      setJadwaldokter(res.data);
    } catch (err) {
      console.log(err.res?.data.message);
    }
  };
  useEffect(() => {
    fetchdokter();
  }, []);
  const handleUpdate = async (id, updatedData) => {
    setLoading(true)
    try {
      await api.put(`/jadwal/${id}`, updatedData);
      const res = await api.get('/jadwal/getjadwal');
      setLoading(false)
      await fetchdokter();
      setJadwaldokter(res.data);
      handleCloseModal();
    } catch (err) {
      console.error(err.response?.data?.message || 'Gagal memperbarui data');
      setLoading(false)
    }
  };
  const handleDelete = async (id) => {
    setLoading(true)
    try {
      await api.delete(`/jadwal/${id}`);
      setLoading(false)
      setJadwaldokter(jadwaldokter.filter((jadwal) => jadwal.id !== id));
      await fetchdokter();
      setModaldelete(false);
    } catch (err) {
      setLoading(false)
      console.log(err.response?.data?.message || 'Failed to delete user');
    }
  };
  const handleEditClick = (jadwal) => {
    setSelectedDokter(jadwal);
    setmodalDokter(true);
  };
  const handleDeleteClick = (jadwal) => {
    setSelectedDokter(jadwal);
    setModaldelete(true);
  };
  const handleCloseModal = () => {
    setmodalDokter(false);
    setModaldelete(false)
    setSelectedDokter(null);
  };

const exportJadwalDokterToPDF = () => {
  const doc = new jsPDF();

  const columns = ['Nama Dokter', 'Poli', 'Hari Praktek', 'Jam Mulai', 'Jam Selesai', 'Status'];
  const rows = jadwaldokter.map(jadwal => [
    jadwal.nama,
    jadwal.poli,
    jadwal.hari,
    jadwal.jam_mulai,
    jadwal.jam_selesai,
    jadwal.status,
  ]);

  doc.text('Jadwal Dokter', 14, 15);
  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 20,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 182, 134] },
  });

  doc.save('jadwal-dokter.pdf');
};

const exportJadwalDokterToExcel = () => {
  const worksheetData = jadwaldokter.map(jadwal => ({
    'Nama Dokter': jadwal.nama,
    Poli: jadwal.poli,
    'Hari Praktek': jadwal.hari,
    'Jam Mulai': jadwal.jam_mulai,
    'Jam Selesai': jadwal.jam_selesai,
    Status: jadwal.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Jadwal Dokter');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/octet-stream' });

  saveAs(data, 'jadwal-dokter.xlsx');
};  

  return (
    <>
      <div className="min-h-screen py-6 w-full bg-[#FAF7F2] ">
        <div className="bg-white shadow-lg  flex justify-center items-center to-red-500 w-full h-[100px] rounded-md">
          <p className="text-[#00B686] font-bold text-[30px]">Data Dokter</p>
        </div>
        <TabelDokter />
            <div className="bg-black rounded-t-lg shadow-lg mt-5 w-full">
  <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4 px-6 text-white">

    <div className="flex items-center gap-3">
      <FaCalendarAlt className="text-[30px]" />
      <p className="font-bold text-[20px]">Jadwal Dokter</p>
    </div>

    <div className="flex flex-col sm:flex-row gap-3">
      <TambahJadwal data={fetchdokter} />

      <button
        type="button"
         onClick={exportJadwalDokterToPDF}
        className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1 transition duration-150"
      >
        <FaFilePdf className="text-[18px]" />
        Unduh PDF
      </button>

      <button
        type="button"
         onClick={exportJadwalDokterToExcel}
        className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1 transition duration-150"
      >
        <FaFileExcel className="text-[18px]" />
        Unduh Excel
      </button>
    </div>

  </div>
</div>

    
        <div className="bg-white shadow-lg flex flex-col px-5 justify-center items-center to-red-500 w-full min-h-[100px] ">
             <input
       type="text"
  placeholder="Cari Nama Dokter..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
      className="border border-gray-300 rounded-lg mt-4 px-4 py-2 w-full "
    />
          <div class="relative overflow-x-auto shadow-lg my-[20px] w-full mx-[10px]">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-white  uppercase bg-gray-50 ">
                <tr className="bg-[#00B686]">
                  <th scope="col" class="px-6 py-3">
                    Nama dokter
                  </th>
                  <th scope="col" class="px-6 py-3">
                    poli
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Hari Praktek
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Jam Mulai
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Jam Selesai
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>{' '}
                  <th scope="col" class="px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {jadwaldokter.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      Tidak ada Jadwal
                    </td>
                  </tr>
                ) : jadwaldokter.filter((data) =>
      data.nama.toLowerCase().includes(searchTerm.toLowerCase())
    ).length === 0 ? (
    <tr>
      <td colSpan="7" className="text-center py-4 text-gray-500">
        Data tidak ditemukan
      </td>
    </tr>
  ) : (
                  jadwaldokter.filter((jadwal) => 
                    jadwal.nama.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((jadwal) => (
                    <tr key={jadwal.id} class=" border-b bg-white hover:bg-gray-50 text-black border-gray-200">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {jadwal.nama}
                      </th>
                      <td class="px-6 py-4">{jadwal.poli}</td>
                      <td class="px-6 py-4">{jadwal.hari}</td>
                      <td class="px-6 py-4">{jadwal.jam_mulai}</td>
                      <td class="px-6 py-4">{jadwal.jam_selesai}</td>
                      <td class="px-6 py-4">{jadwal.status}</td>
                      <td className="px-6 py-4">
                        <button type="button" onClick={() => handleEditClick(jadwal)} className="focus:outline-none text-[#00B686] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                          <FaEdit />
                        </button>
                        <button type="button" onClick={() => handleDeleteClick(jadwal)} className="focus:outline-none text-red-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
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
        <div className={`${modalDokter && 'fixed  inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 '} `}>
          <Modaldokter modalDokter={modalDokter} loading={loading} jadwal={selectedDokter} onUpdate={handleUpdate} onClose={handleCloseModal} />
        </div>
        <div className={`${modalDelete && 'fixed  inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 '} `}>
          <Deletejadwal modalDelete={modalDelete} loading={loading} jadwal={selectedDokter} onDelete={handleDelete} onClose={handleCloseModal} />
        </div>
      </div>
    </>
  );
};
export default DataDokter;
