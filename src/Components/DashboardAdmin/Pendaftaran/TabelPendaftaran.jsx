import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { FaTrash } from 'react-icons/fa';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'flowbite-react';
import { IoIosAlert } from 'react-icons/io';

const TabelPendaftaran = () => {
  const [pendaftaran, setPendaftaran] = useState([]);
  const [openModalDelete, setModalDelete] = useState(false);
  const [selectDaftar, setSelectDaftar] = useState(null);

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
  return (
    <>
      <div className="min-h-screen w-full bg-[#FAF7F2] py-5">
        <div className="bg-white mb-2 shadow-lg mt-[20px] flex justify-center items-center to-red-500 w-full h-[100px] rounded-md">
          <p className="text-[#00B686] font-bold">Data Pendaftaran</p>
        </div>
        <div className="bg-white shadow-lg flex justify-center items-center to-red-500 w-full min-h-[100px] p-5 ">
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
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      Tidak ada data Pendaftaran
                    </td>
                  </tr>
                ) : (
                  pendaftaran.map((data) => (
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
                          className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${
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
                        <button onClick={() => handleDeleteClick(data)} type="button" className="focus:outline-none text-red-400  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
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
