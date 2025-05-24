import react,{useState} from 'react'
import api from '../../utils/api'
const Tambahpasien = () => {
    const [modaltambah , setModalTambah] = useState(false)
        const [fromData , setFromdata] = useState({
        nama :'',
        nik: '',
        email: '',
        jenis_kelamin: '',
        alamat: '',
        tempat_lahir: '',
        tanggal_lahir: ''
      })
      const {nama , nik , email ,jenis_kelamin , alamat ,tempat_lahir , tanggal_lahir} = fromData
      const handleChange = (e) => {
        setFromdata({...fromData , [e.target.name]: e.target.value})
      }
      const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post('/users/createpasien', fromData)
            console.log('tambahdone')
            setModalTambah(false)
        } catch (err) {
            console.log(err.response?.data.message)
            setModalTambah(false)
        }
      } 
return (
    <>
    <button type="button" onClick={() => setModalTambah(true)} class="focus:outline-none text-white  bg-[#00B686] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Tambah pasien </button>

      <div
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center ${modaltambah ? 'flex' : 'hidden'}`}
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">Edit Data Pasien</h3>
          <button onClick={() => setModalTambah(false)} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="nama"
            value={nama}
            onChange={handleChange}
            placeholder="Nama"
            required
            className="w-full p-3 border rounded"
          />
          <input
            type="text"
            name="nik"
            value={nik}
            onChange={handleChange}
            placeholder="NIK"
            maxLength="16"
            required
            className="w-full p-3 border rounded"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-3 border rounded"
          />

          <div className="space-x-4">
            <label>Jenis Kelamin:</label>
            <input
              type="radio"
              id="male"
              name="jenis_kelamin"
              value="laki-laki"
              checked={jenis_kelamin === "laki-laki"}
              onChange={handleChange}
            />
            <label htmlFor="male">Laki-laki</label>

            <input
              type="radio"
              id="female"
              name="jenis_kelamin"
              value="perempuan"
              checked={jenis_kelamin === "perempuan"}
              onChange={handleChange}
            />
            <label htmlFor="female">Perempuan</label>
          </div>

          <input
            type="text"
            name="alamat"
            value={alamat}
            onChange={handleChange}
            placeholder="Alamat"
            required
            className="w-full p-3 border rounded"
          />
          <input
            type="text"
            name="tempat_lahir"
            value={tempat_lahir}
            onChange={handleChange}
            placeholder="Tempat Lahir"
            required
            className="w-full p-3 border rounded"
          />
          <input
            type="date"
            name="tanggal_lahir"
            value={tanggal_lahir}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded"
          />

          <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600">
Tambah Pasien
          </button>
        </form>
      </div>
    </div>
    </>
)
}
export default Tambahpasien