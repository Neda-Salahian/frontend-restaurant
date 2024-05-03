import React from "react";
import Modal from "react-modal";

import "./SuccessRegisterModal.css";

function SuccessRegisterModal({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Success Modal"
      className="custom-modal-success"
      overlayClassName="custom-overlay-success"
    >
      <div className="success-header">
        <h3>Register Confirmation!</h3>
        <button onClick={onRequestClose}>X</button>
      </div>

      <div>
        <p className="success-message">Register successfully!</p>
      </div>
    </Modal>
  );
}

export default SuccessRegisterModal;
