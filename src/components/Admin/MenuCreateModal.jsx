import { useState } from "react";
import Modal from "react-modal";
import { Button, Form } from "react-bootstrap";


function MenuCreateModal({ isOpen, onRequestClose, onCreateMenuData }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    type: "",
    picture: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateMenuData(formData);
    setFormData({
      title: "",
      description: "",
      price: "",
      type: "",
      picture: null,
    });
    onRequestClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      picture: e.target.files[0],
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Menu Modal"
      className="custom-modal-success-menu"
      overlayClassName="custom-overlay-success-menu"
    >
      <div className="success-header-menu">
        <h3>Create New Menu</h3>
        <button onClick={onRequestClose}>X</button>
      </div>
      <Form onSubmit={handleSubmit} className="form-container-style">
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Picture</Form.Label>
          <Form.Control
            type="file"
            name="picture"
            onChange={handleFileChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Create
        </Button>
      </Form>
    </Modal>
  );
}

export default MenuCreateModal;
