"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import RegisterLandForm from "@/app/components/sections/registerLandForm";
import Button from "@/app/components/ui/button";

const RegisterLandButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  const modal = (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black bg-opacity-50 z-50 backdrop-blur-sm"
      onClick={toggleModal}
    >
      <div
        className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 transition"
          onClick={toggleModal}
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Register New Land
        </h2>
        <RegisterLandForm handleClose={toggleModal} />
      </div>
    </div>
  );

  return (
    <>
      <Button onClick={toggleModal}>Register New Land</Button>
      {isOpen && createPortal(modal, document.body)}
    </>
  );
};

export default RegisterLandButton;
