import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'flowbite-react';

const ModalDeleteObat = ({ show, obat, onDelete, onClose ,loading}) => {
  const [selectedObat, setSelectedObat] = useState({...obat});

  useEffect(() => {
    setSelectedObat({...obat});
  }, [obat]);

  const handleDelete = (e) => {
    e.preventDefault()
    onDelete(obat.id);
  };

  return (
    <Modal show={show} onClose={() => onClose(false)}>
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-red-600 text-center">Hapus Obat</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <p className="text-center text-gray-700">
          Apakah Anda yakin ingin menghapus data Obat  <span className="font-semibold">{selectedObat.nama_obat}</span>?
        </p>
      </ModalBody>
      <ModalFooter className="bg-white flex justify-end space-x-2">
        <Button color="gray" onClick={() => onClose(false)}>
          Batal
        </Button>
        <Button color="failure" onClick={handleDelete}>
          {loading ? 'Menghapus...' : 'hapus'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalDeleteObat;
