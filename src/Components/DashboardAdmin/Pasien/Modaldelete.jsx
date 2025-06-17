import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';

const ModalDeleteObat = ({ modaldelete, data, onDelete, setModaldelete, loading }) => {
  const [selectedPasien, setSelectedPasien] = useState({ ...data });

  useEffect(() => {
    setSelectedPasien({ ...data });
  }, [data]);

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(data.user_id);
  };

  return (
    <Modal show={modaldelete} onClose={() => setModaldelete(false)}>
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-black text-center">Delete Pasien</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <p>
          Yakin ingin menghapus <strong>{selectedPasien.nama}</strong>?
        </p>
        <div className="flex gap-4 mt-6">
          <button onClick={handleDelete} className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700">
            {loading ? 'Menghapus...' : 'Hapus'}
          </button>
          <button onClick={() => setModaldelete(false)} className="w-full bg-gray-300 text-black py-3 rounded hover:bg-gray-400">
            Batal
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalDeleteObat;
