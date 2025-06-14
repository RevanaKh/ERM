import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';

const Antrian = () => {
  useEffect(() => {
    getAntrian();
  }, []);
  const [dataAntrian, setDataAntrian] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAntrian = async (id) => {
    try {
      const get = await api.get(`/pasien/antrian`);
      setDataAntrian(get.data.data);
    } catch (err) {
      console.log(err.response?.data.message || 'Gagal mengambil data antrian');
    } finally {
      setLoading(false);
    }
  };
  const deleteAntrian = async (id) => {
    try {
      await api.delete(`/pasien/antrian/${id}`);
      setDataAntrian((prev) => prev.filter((antri) => antri.pendaftaran_id !== id));
    } catch (error) {
      console.error('Gagal menghapus antrian:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9f9f9] px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-xl p-6">
        <h2 className="text-[#00B686] text-[26px] font-bold text-center mb-4">Antrian Pemeriksaan Anda</h2>
        <div className="bg-gray-100 rounded-md p-5 shadow-inner">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-300 animate-spin fill-[#00B686]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591..." fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624..." fill="currentFill" />
              </svg>
              <span className="ml-3 text-gray-500">Memuat data antrian...</span>
            </div>
          ) : dataAntrian.length > 0 ? (
            dataAntrian.map((antri) => (
              <div key={antri.id || antri.no_antrian}>
                <div className="bg-white p-4 rounded-md shadow-sm mb-4 border border-gray-200">
                  <p className="text-center text-[22px] font-bold text-gray-800 mb-3">Nomor Antrian Anda:</p>
                  <p className="text-center text-[36px] font-extrabold text-[#00B686] mb-4">{antri.no_antrian}</p>
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <span className="font-semibold">👨‍⚕️ Dokter:</span> {antri.nama_dokter}
                    </p>
                    <p>
                      <span className="font-semibold">🏥 Poli:</span> {antri.poli}
                    </p>
                    <p>
                      <span className="font-semibold">📅 Tanggal:</span> {new Date(antri.tanggal_pemeriksaan).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => deleteAntrian(antri.pendaftaran_id)}
                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                  >
                    Batalkan Antrian
                  </button>
                </div>
              </div>
            ))
          ) : dataAntrian.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">Silakan mendaftar terlebih dahulu.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Antrian;
