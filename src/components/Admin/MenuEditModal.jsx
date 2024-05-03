import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Container, Row, Col, Button } from "react-bootstrap";

function MenuEditModal({ isOpen, onRequestClose , menuData, onUpdateMenuData }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

  
    // Set initial values when modal opens
    useEffect(() => {
      if (isOpen) {
        setTitle(menuData.title);
        setDescription(menuData.description);
        setPrice(menuData.price);
      }
    }, [isOpen, menuData]);
  

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedMenuData = {
          _id: menuData._id,
          title: title,
          description: description,
          price: price,
        };
        onUpdateMenuData(updatedMenuData);
        onRequestClose();
      };

      
      

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Profile Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <Container>
        <form onSubmit={handleSubmit} className="form-group">
          <Row>
            <Col md={6}>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                placeholder={menuData.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <label>Description:</label>
              <input
                type="text"
                value={description}
                placeholder={menuData.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <label>Price:</label>
              <input
                type="text"
                value={price}
                placeholder={menuData.price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
            
            <Col md={12}>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    </Modal>
  );
}

export default MenuEditModal;
