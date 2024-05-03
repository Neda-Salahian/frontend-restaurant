import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Container, Row, Col, Button } from "react-bootstrap";

function OrderEditModal({ isOpen, onRequestClose, orderData, onUpdateOrderData, menus, setMenus }) {

    const [user, setUser] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("");
    const [timeOrder, setTimeOrder] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [menu, setMenu] = useState("");


    useEffect(() => {
        if (isOpen) {
            setUser(orderData.user.username);
            setAddress(orderData.address);
            setStatus(orderData.status);
            setTimeOrder(orderData.timeOrder);
            setPrice(orderData.price);
            setQuantity(orderData.quantity);
            setMenu(orderData.menus);
        }
    }, [isOpen, orderData]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedOrderData = {
            _id: orderData._id,
            user: user,
            address: address,
            status: status,
            timeOrder: timeOrder,
            price: price,
            quantity: quantity,
            menus: menus, // Ensure you handle menus properly
        };
        onUpdateOrderData(updatedOrderData);
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
                            <label>Address:</label>
                            <input
                                type="text"
                                value={address}
                                placeholder={orderData.address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Col>

                        <Col md={6}>
                            <label>Status:</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="delivered">Delivered</option>
                            </select>
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

export default OrderEditModal;
