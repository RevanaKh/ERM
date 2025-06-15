import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ModalEditpw from './ModalEditpw';
import ModalEdit from './ModalEdit';
import ModalBalasan from './ModalBalasa';
const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [OpenDelete, setOpenDelete] = useState(false);
  const [OpenEdit, setOpenEdit] = useState(false);

  const fetchReports = async () => {
    try {
      const res = await api.get('/users/laporan');
      setReports(res.data.data);
    } catch (err) {
      setError('Gagal mengambil data laporan');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/users/deletereport/${id}`);
      setReports(reports.filter((data) => data.id !== id));
      await fetchReports();
      setLoading(false);
      setOpenDelete(false);
    } catch (err) {
      setLoading(false);
      console.log(err.response?.data?.message || 'Failed to delete');
    }
  };
  const handleUpdate = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await api.put(`/users/editreport/${id}`, updatedData);
      setReports(reports.map((p) => (p.id === id ? res.data : p)));
      await fetchReports();
      setLoading(false);
    } catch (err) {
      console.error(err.response?.data?.message || 'Gagal memperbarui data');
      setLoading(false);
    }
  };
  const handelBalas = (report) => {
    setSelectedLaporan(report);
    setOpenModal(true);
  };
  const handleEditClick = (report) => {
    setSelectedLaporan(report);
    setOpenEdit(true);

    console.log(selectedLaporan);
  };
  const handleDeleteClick = (report) => {
    setOpenDelete(true);
    setSelectedLaporan(report);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 mt-10 bg-white shadow rounded-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Daftar Laporan User</h2>
        {reports.length === 0 ? (
          <p className="text-center text-gray-400">Belum ada laporan</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-white rounded-md">
              <thead className="bg-[#00B686]">
                <tr>
                  <th className="border px-4 py-2 text-left text-sm font-medium text-white">Email</th>
                  <th className="border px-4 py-2 text-left text-sm font-medium text-white">Masalah</th>
                  <th className="border px-4 py-2 text-left text-sm font-medium text-white">Pesan</th>
                  <th className="border px-4 py-2 text-left text-sm font-medium text-white">Tanggal Lapor</th>
                  <th className="border px-4 py-2 text-left text-sm font-medium text-white">Balasan</th>
                  <th className="border px-4 py-2 text-left text-sm font-medium text-white">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-white">
                    <td className="border px-4 py-2 text-sm">{report.email}</td>
                    <td className="border px-4 py-2 text-sm">{report.masalah}</td>
                    <td className="border px-4 py-2 text-sm">{report.pesan}</td>

                    <td className="border px-4 py-2 text-sm">{new Date(report.created_at || Date.now()).toLocaleString()}</td>
                    <td className="border px-4 py-2 text-sm">
                      <button
                        type="button"
                        onClick={() => handelBalas(report)}
                        className="flex items-center gap-2 text-white bg-[#00B686] hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-150"
                      >
                        Balas
                      </button>
                    </td>
                    <td className="border px-4 py-2 text-sm flex">
                      <button type="button" onClick={() => handleEditClick(report)} className="focus:outline-none text-[#00B686]  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                        <FaEdit />
                      </button>
                      <button type="button" onClick={() => handleDeleteClick(report)} className="focus:outline-none text-red-400  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ModalEdit onUpdate={handleUpdate} loading={loading} datas={selectedLaporan} setOpenEdit={setOpenEdit} OpenEdit={OpenEdit} />
      <ModalBalasan datas={selectedLaporan} setOpenModal={setOpenModal} openModal={openModal} />
      <ModalEditpw onDelete={handleDelete} loading={loading} datas={selectedLaporan} show={OpenDelete} setOpenDelete={setOpenDelete} />
    </>
  );
};

export default ReportList;
