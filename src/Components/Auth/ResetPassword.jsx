import React, { useState } from 'react';
import api from '../../utils/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPasswordForm = ({ kembalikeLogin , formData , setError , setMessage , setLoading , loading }) => {
  const [password, setPassword] = useState('');
    const [lihatPassword, setLihatpassword] = useState(false);
  
const handleLihatPassword = () => {
    setLihatpassword(!lihatPassword);
  };
  const handleReset = async (e) => {
    e.preventDefault();
setLoading(true)
    try {
        const res = await api.post('/auth/reset-password', {email : formData.email , password : password})
        setLoading(false)
        setMessage(res.data.message)
        kembalikeLogin()
    } catch (err) {
        setLoading(false)
        console.log(err.res.data.message)
        setError(err.res.data.message)
    }

  };

  return (
    <form onSubmit={handleReset}>
      <div className='flex flex-col gap-3'>
                         <label htmlFor="password" className="block text-sm font-medium mb-1">
                           Password
                         </label>
                         <div className="flex items-center gap-2">
                           <input type={lihatPassword ? 'text' : 'password'} name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Password" required className="w-full p-3 border border-gray-300 rounded-xl pr-10" />
                           <button type="button" onClick={handleLihatPassword} className="text-gray-600 hover:text-gray-800">
                             {lihatPassword ? <FaEyeSlash /> : <FaEye />}
                           </button>
                         </div>
      <button className='w-full py-3 bg-[#75D6CB] text-white font-semibold rounded-xl hover:bg-[#047481] transition duration-300' type="submit">{ loading ?'Loading...' :'Reset Password'}</button>
                       </div>
    </form>
  );
};

export default ResetPasswordForm;
