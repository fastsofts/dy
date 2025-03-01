import React, { ReactNode } from "react";
import '../App.css'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='modalwrapper'>
      <div className='modal' >
        <button onClick={onClose} className='modalbutton'>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
