import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import ModalLogin from './ModalLogin';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LupaPassword from './LupaPassword';

const Login = ({ setIsAuthenticated, setUser }) => {
  const [daftar, setDaftar] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [Openmodal, setOpenmodal] = useState(false);
  const [lihatPassword, setLihatpassword] = useState(false);
  const [lupaPassword, setlupaPassword] = useState(false);
  const handleLihatPassword = () => {
    setLihatpassword(!lihatPassword);
  };
  const handlelupaPassword = () => {
    setlupaPassword(!lupaPassword);
  };
  const [fromData, setFromdata] = useState({
    nama: '',
    nik: '',
    email: '',
    password: '',
    jenis_kelamin: '',
    alamat: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    status_pernikahan: '',
    golongan_darah: '',
    pekerjaan: '',
  });
  const { nama, nik, email, password, alamat, tempat_lahir, tanggal_lahir, status_pernikahan, golongan_darah, pekerjaan } = fromData;
  const handelchange = (e) => {
    setFromdata({ ...fromData, [e.target.name]: e.target.value });
  };
  const fromkosong = () => {
    setFromdata({
      nama: '',
      nik: '',
      email: '',
      password: '',
      jenis_kelamin: '',
      alamat: '',
      tempat_lahir: '',
      tanggal_lahir: '',
      status_pernikahan: '',
      golongan_darah: '',
      pekerjaan: '',
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/login', fromData);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      setUser(response.data.user);
      setLoading(false);
      const userRole = response.data.user.role;
      setError('');
      setMessage(response.data.message || 'Login berhasil');
      setTimeout(() => {
        if (userRole === 'admin') {
          navigate('/dashboardAdmin');
        } else if (userRole === 'pasien' || userRole === 'admin') {
          navigate('/dashboardPasien');
        } else if (userRole === 'dokter' || userRole === 'admin') {
          navigate('/dashboardDokter');
        } else if (userRole === 'apoteker' || userRole === 'admin') {
          navigate('/dashboardApoteker');
        } else {
          navigate('/');
        }
      }, 100);
    } catch (err) {
      setLoading(false);
      console.error('Login error:', err.response?.data || err.message);
      setMessage('');
      setError(err.response?.data?.message || 'Login Failed');
    }
  };

  const handleRegis = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', fromData);
      setMessage(response.data.message || 'Register berhasil');
      setOpenmodal(true);
      setLoading(false);
      setError('');

      fromkosong();
    } catch (err) {
      setOpenmodal(true);
      setLoading(false);
      console.error('Registration error:', err);
      setMessage('');
      setError(err.response?.data?.message || 'Registration failed');
    }
  };
  return (
    <>
      <div className="bg-[url('https://img.freepik.com/free-vector/clean-medical-background_53876-116875.jpg?ga=GA1.1.1854155985.1747902370&semt=ais_hybrid&w=740')] bg-cover bg-center bg-fixed min-h-screen flex items-center justify-center ">
        <div className="bg-white/90 backdrop-blur-sm  rounded-2xl shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          {!daftar ? (
            <>
              <img src="https://www.piksi.ac.id/wp-content/uploads/2019/05/PIKSI.png" alt="Logo Piksi" className="w-20 mb-2 mx-auto" />
              <h1 className="text-xl text-center font-semibold mb-5 text-black">E - REKAM MEDIS</h1>

              <div className=" mb-4">
                {lupaPassword ? (
                  <LupaPassword setlupaPassword={setlupaPassword} />
                ) : (
                  <>
                    <h2 className="text-lg text-center font-bold mb-4">Login</h2>
                    <form onSubmit={handleLogin} id="formLogin" className="space-y-3">
                      <input type="email" name="email" value={email} onChange={handelchange} id="loginEmail" placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-xl" />
                      <div>
                        <div className="flex items-center gap-2">
                          <input
                            type={lihatPassword ? 'text' : 'password'}
                            name="password"
                            value={password}
                            onChange={handelchange}
                            id="password"
                            placeholder="Password"
                            required
                            className="w-full p-3 border border-gray-300 rounded-xl pr-10"
                          />
                          <button type="button" onClick={handleLihatPassword} className="text-gray-600 hover:text-gray-800">
                            {lihatPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                      <button type="submit" className="w-full bg-teal-400 hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition duration-300">
                        {loading ? 'Loading...' : 'Login'}
                      </button>
                      {error && <p className="text-red-400">{error}</p>}

                      <p className="text-sm text-center mt-4">
                        Belum Punya Akun?{' '}
                        <a onClick={() => setDaftar(true)} id="showSignup" className="text-teal-600 font-bold hover:underline cursor-pointer">
                          Daftar
                        </a>
                      </p>
                    </form>
                  </>
                )}
                <p className="text-sm text-center mt-4">
                  <a onClick={handlelupaPassword} id="showSignup" className="text-teal-600 font-bold hover:underline cursor-pointer">
                    {lupaPassword ? 'Kembali' : 'Lupa Password'}
                  </a>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className=" ">
                <h2 className="text-lg text-center font-bold mb-4">Sign Up</h2>
                <form onSubmit={handleRegis} id="registerForm" className="space-y-3">
                  <div>
                    <label htmlFor="nama" className="block text-sm font-medium mb-1">
                      Nama
                    </label>
                    <input type="text" id="nama" name="nama" value={nama} onChange={handelchange} placeholder="Nama" required className="w-full p-3 border border-gray-300 rounded-xl" />
                  </div>

                  <div>
                    <label htmlFor="nik" className="block text-sm font-medium mb-1">
                      NIK
                    </label>
                    <input type="text" id="nik" name="nik" value={nik} onChange={handelchange} placeholder="NIK" maxLength="16" required className="w-full p-3 border border-gray-300 rounded-xl" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input type="email" id="email" name="email" value={email} onChange={handelchange} placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-xl" />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <div className="flex items-center gap-2">
                      <input type={lihatPassword ? 'text' : 'password'} name="password" value={password} onChange={handelchange} id="password" placeholder="Password" required className="w-full p-3 border border-gray-300 rounded-xl pr-10" />
                      <button type="button" onClick={handleLihatPassword} className="text-gray-600 hover:text-gray-800">
                        {lihatPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="text-left">
                    <label className="block text-sm font-medium mb-1">Jenis Kelamin</label>
                    <div className="space-x-4">
                      <input type="radio" id="male" name="jenis_kelamin" onChange={handelchange} value="laki-laki" />
                      <label htmlFor="male">Laki-laki</label>

                      <input type="radio" id="female" name="jenis_kelamin" onChange={handelchange} value="perempuan" />
                      <label htmlFor="female">Perempuan</label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="status_pernikahan" className="block text-sm font-medium mb-1">
                      Status Pernikahan
                    </label>
                    <select
                      id="status_pernikahan"
                      name="status_pernikahan"
                      value={status_pernikahan}
                      onChange={handelchange}
                      required
                      className="rounded-lg w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Pilih Status Pernikahan</option>
                      <option value="belum menikah">Belum Menikah</option>
                      <option value="menikah">Menikah</option>
                      <option value="cerai">Cerai</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="golongan_darah" className="block text-sm font-medium mb-1">
                      Golongan Darah
                    </label>
                    <select
                      id="golongan_darah"
                      name="golongan_darah"
                      value={golongan_darah}
                      onChange={handelchange}
                      required
                      className="rounded-lg w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">Pilih Golongan Darah</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="AB">AB</option>
                      <option value="O">O</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="pekerjaan" className="block text-sm font-medium mb-1">
                      Pekerjaan
                    </label>
                    <select id="pekerjaan" name="pekerjaan" value={pekerjaan} onChange={handelchange} required className="rounded-lg w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                      <option value="">Pilih Pekerjaan</option>
                      <option value="mahasiswa">Mahasiswa</option>
                      <option value="bekerja">Bekerja</option>
                      <option value="belum bekerja">Belum Bekerja</option>
                      <option value="pelajar">Pelajar</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="alamat" className="block text-sm font-medium mb-1">
                      Alamat
                    </label>
                    <input type="text" id="alamat" name="alamat" placeholder="Alamat" value={alamat} onChange={handelchange} required className="w-full p-3 border border-gray-300 rounded-xl" />
                  </div>

                  <div>
                    <label htmlFor="tempatLahir" className="block text-sm font-medium mb-1">
                      Tempat Lahir
                    </label>
                    <input type="text" id="tempatLahir" name="tempat_lahir" value={tempat_lahir} onChange={handelchange} placeholder="Tempat Lahir" required className="w-full p-3 border border-gray-300 rounded-xl" />
                  </div>

                  <div>
                    <label htmlFor="tanggalLahir" className="block text-sm font-medium mb-1">
                      Tanggal Lahir
                    </label>
                    <input type="date" id="tanggalLahir" name="tanggal_lahir" value={tanggal_lahir} onChange={handelchange} required className="w-full p-3 border border-gray-300 rounded-xl" />
                  </div>

                  <button type="submit" className="w-full bg-teal-400 hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition duration-300">
                    {loading ? 'Menyimpan...' : 'SUBMIT'}
                  </button>

                  <p className="text-sm text-center mt-4">
                    Sudah Punya Akun?{' '}
                    <a onClick={() => setDaftar(false)} id="showLogin" className="text-teal-600 font-bold hover:underline cursor-pointer">
                      Login
                    </a>
                  </p>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={`${Openmodal && 'fixed  inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'} `}>
        <ModalLogin Openmodal={Openmodal} setOpenmodal={setOpenmodal} error={error} message={message} setDaftar={setDaftar} />
      </div>
    </>
  );
};

export default Login;
