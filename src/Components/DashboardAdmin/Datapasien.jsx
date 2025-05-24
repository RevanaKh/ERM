import react , {useEffect , useState} from 'react'
import api from '../../utils/api'
import Modalpasien from './Modalpasien'
import { FaEdit , FaTrash } from "react-icons/fa";
import Modaldelete from './Modaldelete';
import Tambahpasien from './Tambahpasien';
const Datapasien = () => {
    const [modalpasien , setModalpasien] = useState(false)
    const [modaldelete , setModaldelete] = useState(false)

    const [datapasien , setDatapasien] = useState([])
      const [selectedPasien, setSelectedPasien] = useState(null);
     const [fromData , setFromdata] = useState({
        nama :'',
        nik: '',
        email: '',
        jenis_kelamin: '',
        alamat: '',
        tempat_lahir: '',
        tanggal_lahir: ''
      })
    useEffect(() => {
const fetchpasien = async () => {
    try {
        const res = await api.get('/users')
        setDatapasien(res.data)
    } catch (err) {
        console.error(err.res?.data.message)
    }
}
fetchpasien()
    },[])
const handleSearch = async () => {
  if (!fromData.nik) {
    alert('Masukkan NIK untuk mencari');
    return;
  }
  try {
    const res = await api.get(`/users/search?nik=${fromData.nik}`);
      setDatapasien(res.data);
   

  } catch (err) {
    console.error(err.response?.data?.message || 'Terjadi kesalahan');
    setDatapasien([]);
  }
};



      const handleEditClick = (data) => {
    setSelectedPasien(data);
    setModalpasien(true);
  };

  const handleCloseModal = () => {
    setModalpasien(false);
    setModaldelete(false)
    setSelectedPasien(null);
  };
   const handleUpdate = async (id, updatedData) => {
    try {
      const res = await api.put(`/users/${id}`, updatedData);
      setDatapasien(datapasien.map(p => (p.id === id ? res.data : p)));
      handleCloseModal();
    } catch (err) {
      console.error(err.response?.data?.message || 'Gagal memperbarui data');
    }
  };
  const handleDeleteClick = (data) => {
    setSelectedPasien(data);
setModaldelete(true)
  }
    const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setDatapasien(datapasien.filter((data) => data.id !== id));
      setModaldelete(false)
    } catch (err) {
      console.log(err.response?.data?.message || 'Failed to delete user');
      setModaldelete(false)
    }
  };

return (
    <>
     <div className="h-[120vh] w-full bg-[#FAF7F2] ">
        <p className="md:text-[25px] text-center font-bold mb-5">Data Pasien</p>
          <div className="space-y-4">
   <input
  type="text"
  placeholder="Cari berdasarkan NIK"
  value={fromData.nik}
  onChange={(e) => setFromdata((prev) => ({ ...prev, nik: e.target.value }))}
  className="border p-2 rounded w-full"
/>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Cari
      </button>
      </div>
        <div className='w-full flex justify-end'>
<Tambahpasien/>
        </div>
<div className="relative overflow-x-auto shadow-lg">
    <table className="w-full text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-[#00B686] ">
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
           {datapasien.map((data) => 
    data.role === 'pasien' && (
        <tr key={data.id} className="bg-white border-b text-black border-gray-200">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {`RM-${data.id}`}
            </th>
            <td className="px-6 py-4">{data.nama}</td>
            <td className="px-6 py-4">{data.nik}</td>
            <td className="px-6 py-4">{data.jenis_kelamin}</td>
            <td className="px-6 py-4">{data.tempat_lahir}</td>
            <td className="px-6 py-4">{data.tanggal_lahir}</td>
            <td className="px-6 py-4">{data.alamat}</td>
            <td className="px-6 py-4">{data.email}</td>
            <td className="px-6 py-4">
                <button type="button" onClick={() => handleEditClick(data)} className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    <FaEdit />
                </button>
                <button type="button" onClick={() => handleDeleteClick(data)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    <FaTrash />
                </button>
            </td>
        </tr>
    )
)}

        </tbody>
    </table>
</div>
 <div className={`${modalpasien && 'fixed  inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 '} `}>

        <Modalpasien  modalpasien={modalpasien}   data={selectedPasien}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}/>
 </div>
  <div className={`${modaldelete && 'fixed  inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 '} `}>

        <Modaldelete  modaldelete={modaldelete}   data={selectedPasien}
          onClose={handleCloseModal}
          onDelete={handleDelete}/>
 </div>
        </div>
</>
)
}
export default Datapasien