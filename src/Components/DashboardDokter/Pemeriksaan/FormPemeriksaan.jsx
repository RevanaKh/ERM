import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import ModalDetailpasien from './ModalDetail';

const FormPemeriksaan = ({ setClickform, setselectedPasien, data, fetchpasien }) => {
  const [dataObat, setDataObat] = useState([]);
  const [ModalDetail, setModalDetail] = useState(false);
  useEffect(() => {
    fetchObat();
    setnamaPasien({ ...data });
    fetchpasien();
  }, [data]);
  const fetchObat = async () => {
    try {
      const res = await api.get('/obat/dataobat');
      setDataObat(res.data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const [namapasien, setnamaPasien] = useState({ ...data });
  const [formData, setFormData] = useState({
    pendaftaran_id: namapasien.pendaftaran_id,
    diagnosa: '',
    tindakan: '',
    obat: '',
    status_pemeriksaan: 'menunggu',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/pasien/pemeriksaan', formData);
      setFormData({
        diagnosa: '',
        tindakan: '',
        obat: '',
      });
      await fetchpasien();
      setClickform(false);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg  w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Form Pemeriksaan Pasien</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Nama Pasien</label>
            <input type="text" value={namapasien.nama_pasien} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" readOnly />
          </div>
          <p onClick={() => setModalDetail(true)} className="text-[#00B686] hover:font-bold cursor-pointer">
            lihat Data Pasien
          </p>
          <p className="text-[#00B686]">
            Sedang memeriksa:<span className="font-bold"> {namapasien.nama_pasien}</span>
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-600">Diagnosa</label>
            <textarea name="diagnosa" value={formData.diagnosa} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" rows="3" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Tindakan</label>
            <textarea name="tindakan" value={formData.tindakan} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" rows="2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Obat</label>
            <select name="obat" value={formData.obat || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">-- Pilih Obat --</option>
              {dataObat.map((obat) => (
                <option key={obat.id} value={obat.id}>
                  {obat.nama_obat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Status Pemeriksaan</label>
            <select name="status_pemeriksaan" value={formData.status_pemeriksaan} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <option value="menunggu">Menunggu</option>
              <option value="dalam pemeriksaan">Dalam Pemeriksaan</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200">
              Simpan Data
            </button>
            <button
              type="button"
              onClick={() => {
                setClickform(false);
                setselectedPasien(null);
              }}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
      <ModalDetailpasien data={data} show={ModalDetail} setModalDetail={setModalDetail} />
    </>
  );
};

export default FormPemeriksaan;
