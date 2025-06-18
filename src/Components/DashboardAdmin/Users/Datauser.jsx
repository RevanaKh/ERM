import react, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { FaEdit, FaEye, FaTrash, FaUsers } from 'react-icons/fa';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa6';
import Createuser from './Createuser';
import ModalEditUser from './ModalEditUser';
import ModalDeleteUser from './ModalDeleteUser';
import ModalDetailUser from './ModalDetailUser';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
const Datauser = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [EditUser, setEditUser] = useState(false);
  const [modaldelete, setModaldelete] = useState(false);
  const [message, setMessage] = useState('');
  const [modalDetail, setModalDetail] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState('');

  const fetchUser = async () => {
    try {
      const res = await api.get('/users/');
      setUsers(res.data);
    } catch (err) {
      console.log(err.res.data.message);
    }
  };
  const handleUpdate = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await api.put(`/users/${id}`, updatedData);
      setUsers(users.map((p) => (p.id === id ? res.data : p)));
      await fetchUser();
      setLoading(false);
      setMessage('Berhasil mengubah data User');
      setError('');
    } catch (err) {
      setLoading(false);
      console.error(err.response?.data?.message || 'Gagal memperbarui data');
      setError(`Gagal Memperbarui Data Users ${err.response?.data?.message}`);
      setMessage('');
    }
  };
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((data) => data.id !== id));
      setLoading(false);
      await fetchUser();
      setModaldelete(false);
      setMessage('Berhasil menghapus data User');
      setError('');
    } catch (err) {
      setLoading(false);
      console.log(err.response?.data?.message || 'Failed to delete user');
      setModaldelete(false);
      setError(`Gagal Menghapus Data Users ${err.response?.data?.message}`);
      setMessage('');
    }
  };
  const handleEditClick = (data) => {
    setSelectedUser(data);
    setEditUser(true);
  };
  const handleDeleteClick = (data) => {
    setSelectedUser(data);
    setModaldelete(true);
  };
  const handleDetailClick = (data) => {
    setSelectedUser(data);
    setModalDetail(true);
  };
  const exportUserToExcel = () => {
    const filteredUsers = users.filter((user) => user.nama.toLowerCase().includes(searchTerm.toLowerCase()));

    const worksheetData = filteredUsers.map((user) => ({
      'Nama User': user.nama,
      NIK: user.nik,
      Email: user.email,
      'Jenis Kelamin': user.jenis_kelamin,
      Alamat: user.alamat,
      'Tempat Lahir': user.tempat_lahir,
      'Tanggal Lahir': user.tanggal_lahir,
      Pernikahan: user.status_pernikahan,
      'Golongan Darah': user.golongan_darah,
      Pekerjaan: user.pekerjaan,
      Role: user.role,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Users');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, 'data-users.xlsx');
  };

  const exportUserToPDF = () => {
    const doc = new jsPDF();

    const filteredUsers = users.filter((user) => user.nama.toLowerCase().includes(searchTerm.toLowerCase()));

    const tableColumn = ['NAMA', 'NIK', 'EMAIL', 'GENDER', 'ALAMAT', 'TEMPAT LAHIR', 'TGL LAHIR', 'PERNIKAHAN', 'GOLONGAN_DARAH', 'PEKERJAAN', 'ROLE'];

    const tableRows = filteredUsers.map((user) => [user.nama, user.nik, user.email, user.jenis_kelamin, user.alamat, user.tempat_lahir, user.tanggal_lahir, user.staus_pernikahan, user.golongan_darah, user.pekerjaan, user.role]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [0, 182, 134] },
      startY: 20,
      margin: { horizontal: 10 },
    });

    doc.text('Data Users', 14, 15);
    doc.save('data-users.pdf');
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="min-h-screen w-full bg-[#FAF7F2] ">
        <div className="bg-white shadow-lg mt-[20px] mb-2 flex justify-center items-center to-red-500 w-full h-[100px] rounded-md">
          <p className="text-[#00B686] font-bold text-[25px]">Manajemen akun Pengguna</p>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 bg-black mt-4 rounded-t-lg px-6 py-4">
          <div className="flex items-center gap-3 text-white">
            <FaUsers className="text-[30px]" />
            <p className="font-bold text-[20px]">Data Users</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Createuser onSuccess={fetchUser} setMessage={setMessage} setError={setError} />

            <button
              type="button"
              onClick={exportUserToPDF}
              className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150"
            >
              <FaFilePdf className="text-[18px]" />
              Unduh PDF
            </button>

            <button
              type="button"
              onClick={exportUserToExcel}
              className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 transition duration-150"
            >
              <FaFileExcel className="text-[18px]" />
              Unduh Excel
            </button>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-b-lg flex flex-col px-5 justify-center items-center to-red-500 w-full min-h-[100px] ">
          <input type="text" placeholder="Cari Users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 mt-3 rounded-lg px-4 py-2 w-full " />
          <div class="relative overflow-x-auto shadow-lg my-[20px] w-full mx-[10px]">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-white  uppercase bg-gray-50 ">
                <tr className="bg-[#00B686]">
                  <th scope="col" class="px-6 py-3">
                    Nama user
                  </th>

                  <th scope="col" class="px-6 py-3">
                    Email
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
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500">
                      Tidak ada Data Ditemukan
                    </td>
                  </tr>
                ) : users.filter((data) => data.nama.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      Data tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  users
                    .filter((data) => data.nama.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((user) => (
                      <tr key={user.id} class=" border-b bg-white hover:bg-gray-50 text-black border-gray-200">
                        <td class="px-6 py-4">{user.nama}</td>
                        <td class="px-6 py-4">{user.email}</td>

                        <td class="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4 flex justify-center">
                          <button onClick={() => handleEditClick(user)} type="button" className="focus:outline-none text-[#00B686]  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            <FaEdit />
                          </button>
                          <button type="button" onClick={() => handleDeleteClick(user)} className="focus:outline-none text-red-400  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            <FaTrash />
                          </button>
                          <button type="button" onClick={() => handleDetailClick(user)} className="focus:outline-none text-blue-400  hover:text-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
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
      <ModalEditUser data={selectedUser} loading={loading} setEditUser={setEditUser} EditUser={EditUser} onUpdate={handleUpdate} />
      <ModalDeleteUser data={selectedUser} loading={loading} setModaldelete={setModaldelete} modaldelete={modaldelete} onDelete={handleDelete} />
      <ModalDetailUser data={selectedUser} show={modalDetail} setModalDetail={setModalDetail} />
    </>
  );
};
export default Datauser;
