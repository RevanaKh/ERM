import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';

const ModalDeleteLaporan = ({ show, datas, onDelete, setOpenDelete, loading }) => {
  const [selectLaporan, setSelectLaporan] = useState({ ...datas });

  useEffect(() => {
    setSelectLaporan({ ...datas });
  }, [datas]);

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(datas.id);
  };

  return (
    <Modal show={show} onClose={() => setOpenDelete(false)}>
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-black text-center">Hapus Laporan</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <p>
          Yakin ingin menghapus laporan id <strong>{selectLaporan.id}</strong> ?
        </p>
        <div className="flex gap-4 mt-6">
          <button onClick={handleDelete} className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700">
            {loading ? 'Menghapus...' : 'Hapus'}
          </button>
          <button onClick={() => setOpenDelete(false)} className="w-full bg-gray-300 text-black py-3 rounded hover:bg-gray-400">
            Batal
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalDeleteLaporan;
