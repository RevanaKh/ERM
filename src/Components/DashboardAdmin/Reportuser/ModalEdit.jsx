import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ModalEdit = ({ onUpdate, datas, OpenEdit, setOpenEdit, loading }) => {
  const [formData, setFormData] = useState({ ...datas });
  const [lihatPassword, setLihatpassword] = useState(false);

  useEffect(() => {
    setFormData({ ...datas });
  }, [datas]);
  const handleLihatPassword = () => {
    setLihatpassword(!lihatPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(datas.user_id, formData);
    setOpenEdit(false);
  };

  return (
    <Modal show={OpenEdit} onClose={() => setOpenEdit(false)}>
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-center text-teal-500">Edit Apoteker</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="flex items-center gap-2">
              <input
                type={lihatPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="*****"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button type="button" onClick={handleLihatPassword} className="text-gray-600 hover:text-gray-800">
                {lihatPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600">
            {loading ? 'Menyimpan' : 'Simpan Perubahan'}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalEdit;
