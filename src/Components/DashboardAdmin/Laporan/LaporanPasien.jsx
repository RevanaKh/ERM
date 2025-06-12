import react , {useEffect ,useState} from 'react'
import { FaUsers, FaClipboardList, FaBriefcaseMedical } from 'react-icons/fa';
import api from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
const LaporanPasien = () => {
  const [datapasien, setDatapasien] = useState([]);
  const [totalpasien, setTotalpasien] = useState(0);

const navigate = useNavigate()
     const fetchpasien = async () => {
    try {
      const res = await api.get('/users');
      const pasienOnly = res.data.filter((user) => user.role === 'pasien');
      setTotalpasien(pasienOnly.length);

      setDatapasien(res.data);
    } catch (err) {
      console.error(err.res?.data.message);
    }
  };
  useEffect(() => {
    fetchpasien();
  }, []);
    return (
         <div className="bg-white shadow-lg  flex flex-col p-5 gap-4 w-full min-h-[100px] rounded-md">
            <div className='flex justify-start py-2 border-b-2 border-[#1DE9B6]'>
                <p className='font-bold text-[20px]'>Laporan Data pasien</p>
            </div>
   <div className="flex bg-[#F0F0F0]  shadow-lg flex-col p-4 rounded-lg items-center justify-center gap-2 w-full max-w-sm mx-auto sm:w-[80%] ">
  <FaUsers className="text-4xl text-[#00B686]" />
  <p className="font-bold text-center text-base sm:text-lg md:text-xl">
    Total Pasien {totalpasien}
  </p>
  <button
    onClick={() => navigate('/dashboardAdmin/datapasien')}
    type="button"
    className="w-full sm:w-2/3 bg-[#1DE9B6] text-white py-2 rounded hover:bg-[#00B686] transition duration-300"
  >
    Data Pasien
  </button>
</div>

          <div className="relative overflow-x-auto rounded-lg shadow">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-white uppercase bg-[#00B686]">
                  <tr>
                    <th scope="col" className="px-6 py-3">ID PASIEN</th>
                    <th scope="col" className="px-6 py-3">NAMA PASIEN</th>
                    <th scope="col" className="px-6 py-3">NIK</th>
                    <th scope="col" className="px-6 py-3">GENDER</th>
                    <th scope="col" className="px-6 py-3">TEMPAT LAHIR</th>
                    <th scope="col" className="px-6 py-3">TANGGAL LAHIR</th>
                    <th scope="col" className="px-6 py-3">ALAMAT</th>
                    <th scope="col" className="px-6 py-3">EMAIL</th>
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
                          <td className="px-6 py-4"> {data.tanggal_lahir
                                    ? new Date(data.tanggal_lahir).toLocaleString('id-ID', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                        hour12: false,
                                      })
                                    : 'Tidak tersedia'}</td>
                          <td className="px-6 py-4">{data.alamat}</td>
                          <td className="px-6 py-4">{data.email}</td>
                         
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
    )
}
export default LaporanPasien