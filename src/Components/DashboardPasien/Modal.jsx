import React from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

const Modal = ({ open, setOpen, message, error }) => {
  return (
    <div tabIndex="-1" aria-hidden="true" className={`fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center ${open ? 'flex' : 'hidden'}`}>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={() => setOpen(false)}>
          <IoClose size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          {error ? (
            <>
              <AiOutlineCloseCircle size={60} className="text-red-500 mb-4" />
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-300 w-full" role="alert">
                <span className="font-medium">{error}</span>
              </div>
            </>
          ) : message ? (
            <>
              <AiOutlineCheckCircle size={60} className="text-green-500 mb-4" />
              <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-300 w-full" role="alert">
                <span className="font-medium">{message}</span>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Modal;
