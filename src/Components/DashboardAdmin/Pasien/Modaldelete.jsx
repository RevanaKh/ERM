import React, { useEffect, useState } from 'react';

export default function Modaldelete({ modaldelete, data, onClose, onDelete ,loading }) {
  const [formData, setFormData] = useState({ ...data });

  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onDelete(data.id);
  };

  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center ${
        modaldelete ? 'flex' : 'hidden'
      }`}
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">Hapus Data Pasien</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <p>
          Yakin Anda ingin menghapus pasien{' '}
          <strong>{formData.nama}</strong>?
        </p>

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700"
          >
            {loading ?  'Menghapus...':'Hapus'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-300 text-black py-3 rounded hover:bg-gray-400"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
