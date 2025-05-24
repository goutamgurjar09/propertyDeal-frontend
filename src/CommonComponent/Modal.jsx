import React from "react";

const Modal = ({ isOpen, onClose, title, children, size }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-xs">
      {/* Modal Box */}
      <div
        className={`relative ${size} w-[30%] max-w-4xl h-[30%] bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl overflow-y-auto p-6 transition-all duration-300`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-3xl font-bold"
        >
          &times;
        </button>

        {/* Title */}
        {title && (
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 border-b pb-2">
            {title}
          </h2>
        )}

        {/* Content */}
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
