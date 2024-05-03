import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "./Cart.css";
import CartContext from "../context/CartContext.jsx";
// import MenuContext from "../context/MenuContext.jsx";


function Cart({ isOpen, onRequestClose }) {
  const { cartItems, removeItemFromCart, groupedItems, addItemToCart } = useContext(CartContext);
  // const { addItemToCart } = useContext(MenuContext);
  const navigate = useNavigate();
  
  const handleRemoveItem = (itemId) => {
    removeItemFromCart(itemId);
  };

  const goToBasketPage = (e) => {
    navigate("/Basket");
    
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Cart Modal"
      className="custom-modal-cart"
      overlayClassName="custom-overlay-cart"
    >
      <div className="cart-header">
        <h3>Shopping Cart</h3>
        <button onClick={onRequestClose}>X</button>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <p>
            Your cart is empty. Go to the <Link to="/Menu">Food list</Link> and
            place your order.
          </p>
        </div>
      ) : (
        Object.values(groupedItems).map((item) => (
          <Card key={item._id}>
            <div className="row no-gutters cart-container">
              <div className="col-md-3">
                <Card.Img
                  src={item.picture}
                  alt="Card image"
                  className="card-image"
                />
              </div>
              <div className="col-md-9">
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>{item.price} €</Card.Text>
                  <div className="d-flex align-items-center flex-grow-0">
                    <Button onClick={() => handleRemoveItem(item._id)}>
                    &minus;
                    </Button>
                    <span className="item-count">{item.count}</span>
                    <Button onClick={() => addItemToCart(item)} className="add-button">
                      +
                    </Button>
                  </div>
                </Card.Body>
              </div>
            </div>
          </Card>
        ))
      )}

      {cartItems.length > 0 && (
        <div className="button-cart">
          <Button variant="primary mb-5" onClick={goToBasketPage}>Go to Basket</Button>
        </div>
      )}
    </Modal>
  );
}

export default Cart;


