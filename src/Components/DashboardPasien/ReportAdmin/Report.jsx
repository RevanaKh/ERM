import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';

const ReportPage = () => {
  const [formData, setFormData] = useState({
    masalah: '',
    pesan: '',
  });

  const [balas, setBalasan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [laporan, setLaporan] = useState([]);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/users/report', formData);
      setSubmitted(true);
      setFormData({ ...formData, masalah: '', pesan: '' });
    } catch (err) {
      console.error('Gagal kirim laporan:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBalasan = async () => {
    try {
      const res = await api.get('/pasien/pesan');
      setBalasan(res.data?.data);
    } catch (err) {
      console.error('Gagal ambil balas:', err.message);
    }
  };
  const fetchReports = async () => {
    try {
      const res = await api.get('/pasien/laporansaya');
      setLaporan(res.data);
    } catch (err) {
      console.error('Gagal ambil balas:', err.message);
    }
  };
  useEffect(() => {
    fetchReports();
    fetchBalasan();
  }, []);

  return (
    <>
      <div className="overflow-x-auto rounded-lg shadow ring-1 ring-gray-200 mt-[20px]">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-[#00B686] text-white text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">ID-LAPORAN</th>
              <th className="px-4 py-3 text-left">Masalah</th>
              <th className="px-4 py-3 text-left">Pesan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {laporan.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  Tidak ada Laporan
                </td>
              </tr>
            ) : (
              laporan.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">ID-{item.id}</td>
                  <td className="px-4 py-3">{item.masalah}</td>
                  <td className="px-4 py-3">{item.pesan}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Kirim Pesan ke Admin</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Masalah</label>
            <select name="masalah" value={formData.masalah} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md bg-gray-50">
              <option value="">-- Pilih Masalah --</option>
              <option value="Ganti Email">Ganti Email</option>
              <option value="Ganti Password">Ganti Password</option>
              <option value="Ganti Email dan Password">Ganti Email dan Password</option>
              <option value="Lain-lain">Lain-lain</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Pesan</label>
            <textarea name="pesan" value={formData.pesan} onChange={handleChange} rows={4} required className="w-full px-3 py-2 border rounded-md bg-gray-50" placeholder="Tuliskan detail masalah Anda..."></textarea>
          </div>

          <button type="submit" className="w-full bg-[#1DE9B6] text-white px-4 py-2 rounded hover:bg-[#00B686] transition-colors">
            {loading ? 'Mengirim...' : 'Kirim Laporan'}
          </button>

          {submitted && <p className="text-green-600 text-center mt-2">Laporan berhasil dikirim. Tunggu balas dari admin.</p>}
        </form>

        <hr className="my-6" />

        <div className="mt-6">
          <h3 className="text-xl font-medium mb-2">Balasan dari Admin</h3>

          {balas && balas.length > 0 ? (
            <div className="space-y-4">
              {balas.map((item, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-md text-sm text-gray-800 shadow">
                  <p>
                    <strong>Balasan:</strong> {item.balasan}
                  </p>
                  <p className="text-xs text-gray-500">ID Report: {item.id_report}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Belum ada balasan dari admin.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ReportPage;
