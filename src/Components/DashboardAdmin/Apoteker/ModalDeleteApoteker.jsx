import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'flowbite-react';
const ModalDeleteApoteker = ({ onDelete, OpenDelete, setOpenDelete, datas ,loading}) => {
  const [formData, setFormData] = useState({ ...datas });

  useEffect(() => {
    setFormData({ ...datas });
  }, [datas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onDelete(datas.id);
  };
  return (
    <Modal show={OpenDelete} onClose={() => setOpenDelete(false)}>
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-red-600 text-center">Hapus Apoteker</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <p className="text-center text-gray-700">
          Apakah Anda yakin ingin menghapus data apoteker <span className="font-semibold">{formData.nama}</span>?
        </p>
      </ModalBody>
      <ModalFooter className="bg-white flex justify-end space-x-2">
        <Button color="gray" onClick={() => setOpenDelete(false)}>
          Batal
        </Button>
        <Button color="failure" onClick={handleSubmit}>
          {loading ? 'Menghapus...' : 'hapus'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalDeleteApoteker;
