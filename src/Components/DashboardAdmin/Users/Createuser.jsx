import { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import api from "../../../utils/api";

export default function TambahDokterModal({onSuccess}) {
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(null);
  const [cekDokter , setcekDokter] = useState(false)
  const [form, setForm] = useState({
    nama: "",
    nik: "",
    email: "",
    password: "", 
    jenis_kelamin: "",
    alamat: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    poli: "",
    role: ""
  });
const {nama , nik , email ,password , jenis_kelamin , alamat ,tempat_lahir ,tanggal_lahir ,poli , role} = form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "role") {
    setcekDokter(e.target.value === "dokter");
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/createuser", form);
      setStatus({ type: "success", message: "User berhasil ditambahkan!" });
      await onSuccess()
      setTimeout(() => {
        setOpenModal(false);
        setStatus(null);
        setForm({
          nama: "", nik: "", email: "", password: "",
          jenis_kelamin: "", alamat: "", tempat_lahir: "",
          tanggal_lahir: "", poli: "", role: ""
        });
      }, 1500);
    } catch (error) {
      setStatus({ type: "error", message: "Gagal menambahkan dokter." });
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center gap-2 text-white bg-[#00B686] hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-150"
      >
        <FaPlus className="text-[20px]" />
        Tambah Users
      </button>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold mb-6 text-center text-teal-500">
            Tambah User Baru
          </h2>
        </ModalHeader>
        <ModalBody className="bg-white">
          <div className="space-y-6">
            {status && (
              <div
                className={`mb-4 px-4 py-2 rounded text-sm ${
                  status.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status.message}
              </div>
            )}
               <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" name="nama" value={nama} onChange={handleChange} placeholder="Nama" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="text" name="nik" value={nik} onChange={handleChange} placeholder="NIK" maxLength="16" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
   <input type="password" name="password" value={password} onChange={handleChange} placeholder="*****" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <div className="space-x-4">
              <label>Jenis Kelamin:</label>
              <input type="radio" id="male" name="jenis_kelamin" value="laki-laki" checked={jenis_kelamin === 'laki-laki'} onChange={handleChange} />
              <label htmlFor="male">Laki-laki</label>

              <input type="radio" id="female" name="jenis_kelamin" value="perempuan" checked={jenis_kelamin === 'perempuan'} onChange={handleChange} />
              <label htmlFor="female">Perempuan</label>
            </div>

            <input type="text" name="alamat" value={alamat} onChange={handleChange} placeholder="Alamat" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input
              type="text"
              name="tempat_lahir"
              value={tempat_lahir}
              onChange={handleChange}
              placeholder="Tempat Lahir"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input type="date" name="tanggal_lahir" value={tanggal_lahir} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 rounded" />
   <select name="role" value={role} onChange={handleChange} required className="rounded-lg w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="">Pilih Role</option>
                  <option value="admin">Admin</option>
                  <option  value="dokter">Dokter</option>
                  <option value="pasien">Pasien</option>
                  <option value="apoteker">Apoteker</option>
                </select>
                {cekDokter && (
                    <select name="poli" value={form.poli} onChange={handleChange} required className="rounded-lg w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="">Pilih Poli</option>
                  <option value="umum">Umum</option>
                  <option value="gigi">Gigi</option>
                  <option value="anak">Anak</option>
                  <option value="mata">Mata</option>
                  <option value="THT">THT</option>
                </select>
            )}
              <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600">
                Tambah users
              </button>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

