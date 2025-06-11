import react, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
    try {
      await api.put(`/jadwal/${id}`, updatedData);
      const res = await api.get('/jadwal/getjadwal');
      await fetchdokter();
      setJadwaldokter(res.data);
      handleCloseModal();
    } catch (err) {
      console.error(err.response?.data?.message || 'Gagal memperbarui data');
    }
  };
  const handleDelete = async (id) => {
    try {
      await api.delete(`/jadwal/${id}`);
      setJadwaldokter(jadwaldokter.filter((jadwal) => jadwal.id !== id));
      await fetchdokter();
      setModaldelete(false);
    } catch (err) {
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
    setSelectedDokter(null);
  };
  return (
    <>
      <div className="min-h-screen w-full bg-[#FAF7F2] ">
        <div className="bg-white shadow-lg mt-[20px] flex justify-center items-center to-red-500 w-full h-[100px] rounded-md">
          <p className="text-[#00B686] font-bold">Jadwal Dokter</p>
        </div>
        <TabelDokter />
        <div className="bg-[#6C757D] rounded-lg shadow-lg mt-[20px] flex justify-center items-center to-red-500 w-full h-[50px] ">
          <div className="flex justify-between text-white h-[100px] items-center rounded-lg w-[70%] ">
            <p className=" font-bold">Daftar Jadwal</p>
            <TambahJadwal data={fetchdokter} />
          </div>
        </div>
        <div className="bg-white shadow-lg flex justify-center items-center to-red-500 w-full min-h-[100px] ">
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
                ) : (
                  jadwaldokter.map((jadwal) => (
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
          <Modaldokter modalDokter={modalDokter} jadwal={selectedDokter} onUpdate={handleUpdate} onClose={handleCloseModal} />
        </div>
        <div className={`${modalDelete && 'fixed  inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 '} `}>
          <Deletejadwal modalDelete={modalDelete} jadwal={selectedDokter} onDelete={handleDelete} onClose={handleCloseModal} />
        </div>
      </div>
    </>
  );
};
export default DataDokter;
