import React from "react";
import Modal from "react-modal";



function BasketModalSuccess({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Success Modal"
      className="custom-modal-success"
      overlayClassName="custom-overlay-success"
    >
      <div className="success-header">
        <h3>Payment Successfully</h3>
        <button onClick={onRequestClose}>X</button>
      </div>

      <div>
        <p className="success-message">Your order has been successfully placed.</p>
      </div>
    </Modal>
  );
}

export default BasketModalSuccess;
