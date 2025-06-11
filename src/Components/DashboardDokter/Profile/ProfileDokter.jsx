import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
import { FaUserCircle, FaEnvelope, FaPhoneAlt, FaIdCard, FaMale, FaFemale, FaMap, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import ModalProfileDokter from './ModalProfileDokter';
const ProfileDokter = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [modalprofile, setModalprofile] = useState(false);
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    try {
      const res = await api.get('/auth/user');
      setUser(res.data);
      return res.data;
    } catch (error) {
      console.error('Gagal mengambil data user', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await api.put(`/auth/${id}`, updatedData);
      setUser(res.data);
      await fetchUser();
      setModalprofile(false);
      setMessage('Berhasil mengubah data ');
      setError('');
    } catch (err) {
      setModalprofile(false);
      console.error(err.response?.data?.message || 'Gagal memperbarui data');
      setError(`Gagal Memperbarui Data  ${err.response?.data?.message}`);
      setMessage('');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <p className="text-red-500">Gagal memuat data user.</p>
      </div>
    );
  }

  return (
    <>
      <div className="my-[20px]">
        {message ? (
          <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-300" role="alert">
            <span class="font-medium">{message}</span>
          </div>
        ) : error ? (
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-300" role="alert">
            <span class="font-medium">{error}</span>
          </div>
        ) : null}
      </div>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 my-10">
        <div className="flex flex-col items-center">
          <FaUserCircle className="text-[#00B686] text-[80px]" />
          <h2 className="text-xl font-semibold mt-4">{user.nama}</h2>
          <p className="text-gray-500">{user.role || 'Pasien'}</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-[#00B686]" />
            <p className="text-gray-700">{user.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-[#00B686]" />
            <p className="text-gray-700">{user.phone || '-'}</p>
          </div>
          <div className="flex items-center gap-4">
            <FaIdCard className="text-[#00B686]" />
            <p className="text-gray-700">{user.nik || 'Tidak tersedia'}</p>
          </div>
          <div className="flex items-center gap-4">
            {user.jenis_kelamin === 'Laki-laki' ? <FaMale className="text-[#00B686]" /> : user.jenis_kelamin === 'Perempuan' ? <FaFemale className="text-[#00B686]" /> : null}
            <p className="text-gray-700">{user.jenis_kelamin || 'Tidak tersedia'}</p>
          </div>
          <div className="flex items-center gap-4">
            <FaMap className="text-[#00B686]" />
            <p className="text-gray-700">{user.alamat || 'Tidak tersedia'}</p>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-[#00B686]" />
            <p className="text-gray-700">{user.tempat_lahir || 'Tidak tersedia'}</p>
          </div>
          <div className="flex items-center gap-4">
            <FaCalendarAlt className="text-[#00B686]" />
            <p className="text-gray-700">
              {user.tanggal_lahir
                ? new Date(user.tanggal_lahir).toLocaleString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour12: false,
                  })
                : 'Tidak tersedia'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <FaCalendarAlt className="text-[#00B686]" />
            <p className="text-gray-700">
              Anda Membuat Akun ini Pada{' '}
              {user.created_at
                ? new Date(user.created_at).toLocaleString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                  })
                : 'Tidak tersedia'}
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button onClick={() => setModalprofile(true)} className="bg-[#1DE9B6] hover:bg-[#00B686] text-white px-6 py-2 rounded-md">
            Edit Profile
          </button>
        </div>
        <div className={`${modalprofile && 'fixed  inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 '} `}>
          <ModalProfileDokter modalprofile={modalprofile} onClose={() => setModalprofile(false)} onUpdate={handleUpdate} fetchUser={fetchUser} user={user} />
        </div>
      </div>
    </>
  );
};

export default ProfileDokter;
