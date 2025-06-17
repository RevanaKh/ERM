import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'flowbite-react';

const ModalDeleteUser = ({ data, onDelete, modaldelete, setModaldelete, loading }) => {
  const [formData, setFormData] = useState({ ...data });

  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onDelete(data.user_id);
    setModaldelete(false);
  };

  return (
    <Modal show={modaldelete} onClose={() => setModaldelete(false)}>
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold mb-6 text-center text-teal-500">Hapus User</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <p>
          Yakin Anda ingin menghapus user <strong>{formData.nama}</strong>?
        </p>

        <div className="flex gap-4 mt-6">
          <button type="button" onClick={handleSubmit} className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700">
            {loading ? 'Menghapus...' : 'Hapus'}
          </button>
          <button type="button" onClick={() => setModaldelete(false)} className="w-full bg-gray-300 text-black py-3 rounded hover:bg-gray-400">
            Batal
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalDeleteUser;
