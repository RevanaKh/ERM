import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';

const ModalDetail = ({ data, show, setModalDetail }) => {
  const [formData, setFromData] = useState({ ...data });
  useEffect(() => {
    setFromData({ ...data });
  }, [data]);
  return (
    <Modal show={show} onClose={() => setModalDetail(false)} size="xl">
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-center text-teal-500 w-full">Detail Pasien</h2>
      </ModalHeader>

      <ModalBody className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <span className="font-semibold">Nama Pasien:</span> {formData.nama_pasien}
          </div>
          <div>
            <span className="font-semibold">NIK:</span> {formData.nik}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {formData.email}
          </div>
          <div>
            <span className="font-semibold">Jenis Kelamin:</span> {formData.jenisKelamin}
          </div>
          <div>
            <span className="font-semibold">Tanggal Lahir:</span> {new Date(formData.tanggalLahir).toLocaleDateString()}
          </div>
          <div>
            <span className="font-semibold">Golongan Darah:</span> {formData.golongan_darah}
          </div>
          <div>
            <span className="font-semibold">Status Pernikahan:</span> {formData.status_pernikahan}
          </div>
          <div>
            <span className="font-semibold">Pekerjaan:</span> {formData.pekerjaan}
          </div>
          <div>
            <span className="font-semibold">Keluhan:</span> {formData.keluhan}
          </div>
          <div>
            <span className="font-semibold">Poli:</span> {formData.poli}
          </div>
          <div>
            <span className="font-semibold">Metode Pembayaran:</span> {formData.metodePembayaran}
          </div>
          <div>
            <span className="font-semibold">No Antrian:</span> {formData.no_antrian}
          </div>
          <div>
            <span className="font-semibold">Status Pemeriksaan:</span> {formData.status_pemeriksaan}
          </div>
          <div>
            <span className="font-semibold">Waktu Daftar:</span> {new Date(formData.waktu_daftar).toLocaleString()}
          </div>
        </div>
      </ModalBody>

      <ModalFooter className="bg-white">
        <Button color="gray" onClick={() => setModalDetail(false)}>
          Tutup
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalDetail;
