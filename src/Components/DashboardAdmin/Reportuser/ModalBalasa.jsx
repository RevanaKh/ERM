import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa6';

function ModalBalasan({ datas, setOpenModal, openModal }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    id_report: '',
    balasan: '',
  });

  const [status, setStatus] = useState(null);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (datas && datas.id) {
      setForm({
        id_report: datas.id,
        balasan: '',
      });
    }
  }, [datas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const response = await api.post('/users/pesan', form);
      console.log(form);
      const data = response.data;
      setStatus({ type: 'success', message: data.message });
      setLoading(false);
      setForm({
        id_report: '',
        balasan: '',
      });
    } catch (err) {
      setLoading(false);
      const errorMsg = err.response?.data?.message || 'Terjadi kesalahan saat mengirim data.';
      setStatus({ type: 'error', message: errorMsg });
    }
  };

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold mb-6 text-center text-teal-500">Laporan</h2>
        </ModalHeader>
        <ModalBody className="bg-white">
          <div className="space-y-6">
            {status && <div className={`mb-4 px-4 py-2 rounded text-sm ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{status.message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Balasan</label>
                <input type="text" name="balasan" value={form.balasan} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>

              <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600">
                {loading ? 'Menyimpan...' : 'Balas'}
              </button>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalBalasan;
