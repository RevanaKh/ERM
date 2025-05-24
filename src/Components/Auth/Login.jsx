import React ,{useState , useEffect} from "react";
import api from "../../utils/api";
import ModalLogin from "./ModalLogin";
const Login = () => {
  const [daftar , setDaftar] = useState(false)
  const [error , setError] = useState('')
  const [message ,setMessage] = useState('')

  const [Openmodal , setOpenmodal] = useState(false)
  const [fromData , setFromdata] = useState({
    nama :'',
    nik: '',
    email: '',
    password : '',
    jenis_kelamin: '',
    alamat: '',
    tempat_lahir: '',
    tanggal_lahir: ''
  })
  const {nama , nik ,email ,password ,jenis_kelamin , alamat , tempat_lahir ,tanggal_lahir} = fromData
  const handelchange = (e) =>{
    setFromdata({...fromData , [e.target.name]: e.target.value})
  }
  const fromkosong = () => {
    setFromdata({
      nama :'',
    nik: '',
    email: '',
    password : '',
    jenis_kelamin: '',
    alamat: '',
    tempat_lahir: '',
    tanggal_lahir: ''
    })
  }
   const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/auth/login' ,fromData)
      localStorage.setItem('token', response.data.token);
    } catch (err) {
         console.error('Login error:', err.response?.data || err.message);
    }
   }
  const handleRegis =  async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/auth/register' , fromData)
            setMessage(response.data.message || 'Register berhasil');
            setOpenmodal(true)
            fromkosong()
    } catch (err) {
            setOpenmodal(true)
fromkosong()
           console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  }
  return (
    <>
    
<div className="bg-[url('https://img.freepik.com/free-vector/clean-medical-background_53876-116875.jpg?ga=GA1.1.1854155985.1747902370&semt=ais_hybrid&w=740')] bg-cover bg-center bg-fixed min-h-screen flex items-center justify-center ">

   <div className="bg-white/90 backdrop-blur-sm text-center rounded-2xl shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">

   {!daftar ? (
    <>
    

<img src="https://www.piksi.ac.id/wp-content/uploads/2019/05/PIKSI.png" alt="Logo Piksi" className="w-20 mb-2 mx-auto" />
        <h1 className="text-xl font-semibold mb-5 text-black">E - REKAM MEDIS</h1>

        {/* LOGIN FORM */}
        <div className="form-box mb-4">
          <h2 className="text-lg font-bold mb-4">Login</h2>
          <form onSubmit={handleLogin} id="formLogin" className="space-y-3">
            <input type="email" name="email" value={email} onChange={handelchange} id="loginEmail" placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-xl" />
            <input type="password" id="loginPassword" name="password" value={password} onChange={handelchange}  placeholder="Password" required className="w-full p-3 border border-gray-300 rounded-xl" />

            <div className="text-right text-sm text-gray-600 mb-2">
              <a href="#" id="forgotLink" className="hover:underline">Lupa Akun?</a>
            </div>

            <button type="submit" className="w-full bg-teal-400 hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition duration-300">SUBMIT</button>

            <p className="text-sm mt-4">
              Belum Punya Akun? <a onClick={() => setDaftar(true)} id="showSignup" className="text-teal-600 font-bold hover:underline">Daftar</a>
            </p>
          </form>
        </div>
    </>



) : (
    <>
    
       {/* SIGNUP FORM */}
            <div className="form-box ">
          <h2 className="text-lg font-bold mb-4">Sign Up</h2>
          <form onSubmit={handleRegis} id="registerForm" className="space-y-3">
            <input type="text" id="nama" name="nama" value={nama} onChange={handelchange} placeholder="Nama" required className="w-full p-3 border border-gray-300 rounded-xl" />
            <input type="text" id="nik" name="nik" value={nik} onChange={handelchange} placeholder="NIK" maxLength="16" required className="w-full p-3 border border-gray-300 rounded-xl" />
            <input type="email" id="email" name="email" value={email} onChange={handelchange} placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-xl" />

            <div className="relative">
              <input type="password" name="password" value={password} onChange={handelchange} id="password" placeholder="Password" required className="w-full p-3 border border-gray-300 rounded-xl pr-10" />
              <span id="togglePassword" className="absolute top-3.5 right-3 cursor-pointer">👁️</span>
            </div>

            <div className="text-left space-x-4">
  <label>Jenis Kelamin:</label>
  <input type="radio" id="male" name="jenis_kelamin" onChange={handelchange} value="laki-laki"/>
  <label htmlFor="male">Laki-laki</label>
  <input type="radio" id="female" name="jenis_kelamin" onChange={handelchange} value="perempuan"/>
  <label htmlFor="female">Perempuan</label>
</div>

            <input type="text" id="alamat" name="alamat" placeholder="Alamat" value={alamat} onChange={handelchange} required className="w-full p-3 border border-gray-300 rounded-xl" />
            <input type="text" id="tempatLahir" name="tempat_lahir" value={tempat_lahir} onChange={handelchange} placeholder="Tempat Lahir" required className="w-full p-3 border border-gray-300 rounded-xl" />
            <input type="date" id="tanggalLahir" name="tanggal_lahir" value={tanggal_lahir} onChange={handelchange} required className="w-full p-3 border border-gray-300 rounded-xl" />

            <button type="submit" className="w-full bg-teal-400 hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition duration-300">SUBMIT</button>
            <p className="text-sm mt-4">
              Sudah Punya Akun? <a onClick={() => setDaftar(false)} id="showLogin" className="text-teal-600 font-bold hover:underline">Login</a>
            </p>
          </form>
        </div>
    </>
    ) }
      </div>
    </div>
     <div className={`${Openmodal && 'fixed  inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'} `}>
  <ModalLogin Openmodal={Openmodal} setOpenmodal={setOpenmodal} error={error} message={message} setDaftar={setDaftar} />
</div>
    </>
  );
};

export default Login;
