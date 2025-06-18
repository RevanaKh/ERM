import React, { useState } from 'react';
import api from '../../utils/api';
import ResetPassword from './ResetPassword';
const LupaPassword = ({setlupaPassword}) => {
  const [formData, setFormData] = useState({
    email: ''
  });
  const [message, setMessage] = useState('');
    const [loading ,setLoading] = useState(false)
    const[resetPassword , setResetPassword] = useState(false)
    const [otp, setOtp] = useState('');
  const [verifyotp , setVerifyOtp] = useState(false)
const [error , setError] = useState('')
const {email } = formData
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
try {
 const res = await api.post('/auth/forgot-password' ,formData)   
 setMessage(res.data.message);
 setLoading(false)
 setError('')
setVerifyOtp(true)
} catch (err) {
    console.log(err)
    setMessage('')
    setLoading(false)
if (err.response && err.response.data && err.response.data.message) {
    setError(err.response.data.message);
  } else {
    setError('Terjadi kesalahan');
  }}
  };
  const kembalikeLogin = () => {
    setlupaPassword(false)
  }
const handleVerify = async (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    try {
const res = await api.post('/auth/verify-otp', {
  email: formData.email,
  otp: otp
});
        setLoading(false)
        setMessage(res.data.message)
        setError('')
        setResetPassword(true)
    } catch (err) {
        console.log(err)
        setMessage('')
        setError(err.response.data.message)
        setLoading(false)

    }
}
  return (
    <> 
    {!verifyotp &&!resetPassword ? (
        <form
        className="max-w-md mx-auto  p-8 rounded-2xl space-y-6"
  onSubmit={handleSubmit}
>
  <h2 className="text-md font-semibold text-center text-gray-800">Lupa Password</h2>

  <div className="flex flex-col space-y-2">
    <label htmlFor="loginEmail" className="text-sm text-gray-600">
      Masukkan Email Anda
    </label>
    <input
      type="email"
      name="email"
      id="loginEmail"
      value={email}
 onChange={(e) => setFormData({ ...formData, email: e.target.value })}      placeholder="rekapmedis@gmail.com"
      required
      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
  </div>

  <button
    type="submit"
    className="w-full py-3 bg-[#75D6CB] text-white font-semibold rounded-xl hover:bg-[#047481] transition duration-300"
    >
    { loading ? 'Mengirim...':'Kirim OTP'}
  </button>
  </form>

    ) :  verifyotp && !resetPassword  ? (
    <form
  onSubmit={handleVerify}
  className="max-w-md mx-auto  p-8 rounded-2xl  space-y-6"
>
  <h2 className="text-2xl font-semibold text-center text-gray-800">Verifikasi OTP</h2>
  <div className="flex flex-col space-y-2">
    <label htmlFor="otp" className="text-sm text-gray-600">
      Masukkan Kode OTP
    </label>
    <input
      type="text"
      id="otp"
      placeholder="123456"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      required
      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest"
    />
  </div>

  <button
    type="submit"
    className="w-full py-3 bg-[#75D6CB] text-white font-semibold rounded-xl hover:bg-[#047481] transition duration-300"
  >
    {loading ? 'Tunggu Sebentar...':'Verifikasi'}
  </button>
</form>
    ) : (
<ResetPassword kembalikeLogin={kembalikeLogin} setMessage={setMessage} setError={setError} formData={formData} loading={loading} setLoading={setLoading} />
    )}
  {error ? (
      <p className="text-sm text-red-500 text-center">{error}</p>
    ) : message ? (
        <p className="text-sm text-black text-center">{message}</p>
    ) : null}

    </>
  );
};

export default LupaPassword;
