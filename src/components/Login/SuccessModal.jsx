import React from "react";
import Modal from "react-modal";

import "./SuccessModal.css";

function SuccessModal({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Success Modal"
      className="custom-modal-success"
      overlayClassName="custom-overlay-success"
    >
      <div className="success-header">
        <h3>Login Confirmation!</h3>
        <button onClick={onRequestClose}>X</button>
      </div>

      <div>
        <p className="success-message">Login successfully!</p>
      </div>
    </Modal>
  );
}

export default SuccessModal;
