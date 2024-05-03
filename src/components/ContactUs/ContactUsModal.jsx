import React from "react";
import Modal from "react-modal";

// import "./ContactUsModal.css";

function ContactUsModal({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Success Modal"
      className="custom-modal-success"
      overlayClassName="custom-overlay-success"
    >
      <div className="success-reservation ">
        <h4>Contact Us submitted</h4>
        <button onClick={onRequestClose}>X</button>
      </div>

      <div>
        <p className="success-message">Contact submitted successfully!</p>
      </div>
    </Modal>
  );
}

export default ContactUsModal;
