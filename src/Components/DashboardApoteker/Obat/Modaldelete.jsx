import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';

const ModalDeleteObat = ({ show, obat, onDelete, onClose, loading }) => {
  const [selectedObat, setSelectedObat] = useState({});

  useEffect(() => {
    setSelectedObat(obat);
  }, [obat]);

  const handleDelete = () => {
    onDelete(obat.id);
  };

  return (
    <div tabIndex="-1" aria-hidden="true" className={`fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center ${show ? 'flex' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">Hapus Obat</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>
        <p>
          Yakin ingin menghapus <strong>{selectedObat.nama_obat}</strong>?
        </p>
        <div className="flex gap-4 mt-6">
          <button onClick={handleDelete} className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700">
            {loading ? 'Menghapus...' : 'Hapus'}
          </button>
          <button onClick={onClose} className="w-full bg-gray-300 text-black py-3 rounded hover:bg-gray-400">
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteObat;
