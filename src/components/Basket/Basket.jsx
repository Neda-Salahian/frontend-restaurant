import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext.jsx";
import { Container, Row, Button, Card, Col, Form } from "react-bootstrap";
import Navigation from "../Navigation/NavigationComponent.jsx";
import Header from "../Header/HeaderComponent.jsx";
import Footer from "../Footer/Footer.jsx";
import "./Basket.css";

function Basket() {
  const { cartItems, removeItemFromCart, emptyCart, groupedItems } = useContext(CartContext);
  const [address, setAddress] = useState("");
  const [showAddressAlert, setShowAddressAlert] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach((item) => {
        if (item && item.price) {
          totalPrice += item.price;
        }
      });
    }
    return totalPrice.toFixed(2);
  };

  const totalPrice = calculateTotalPrice();

  const handleRemoveItem = (itemId) => {
    removeItemFromCart(itemId);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  console.log("address", address);

  const handlePaymentButton = () => {
    if (address === "") {
      setShowAddressAlert(true);
    } else {
      setShowAddressAlert(false);
      emptyCart();
    }
  };


  function DateTimeDisplay() {
    const currentDate = new Date();
    return <div>Current Date and Time: {currentDate.toLocaleString()}</div>;
  }
  return (
    <>
      <Navigation />
      <Header />
      <Container fluid className="basket-container">
        <Row className="about-section-title">
          <Col>
            <h3>Basket</h3>
          </Col>
        </Row>
        <Row className="form-basket-container">
          {cartItems.length === 0 ? (
            <Col md={8} xs={12} lg={6} sm={12}>
              <div className="empty-cart-message">
                <p>
                  Your cart is empty. Go to the{" "}
                  <Link to="/Menu">Food list</Link> and place your order.
                </p>
              </div>
            </Col>
          ) : (
            <>
              <Col md={8} xs={12} lg={5} sm={12}>
                {Object.values(groupedItems).map((item) => (
                  <Card key={item.id} lg={12} md={12} sm={11} xs={11}>
                    <Card.Body className="card-body-basket">
                      <Card.Img
                        src={item.picture}
                        alt="Card image"
                        className="cart-basket img-fluid"
                      />
                      <Card.Title>{item.title}</Card.Title>
                      <span className="item-count">{item.count}</span>
                      <Card.Text>{item.price} €</Card.Text>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
              <Col md={8} lg={6} xs={11} sm={11} className="summary-basket card-basket-box card">
                <Row className="mt-3">
                  <Col md={6}>
                    <Form>
                      <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your address"
                          value={address}
                          onChange={handleAddressChange}
                        />
                      </Form.Group>
                    </Form>
                  </Col>

                </Row>

                <Row className="mt-3">
                  <Col className="total-items">
                    <strong>Total Items:</strong> {cartItems.length}
                  </Col>
                  <Col>
                    <strong>Total price:</strong> {totalPrice}€
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                      <DateTimeDisplay />
                  </Col>
                </Row>
                <Row className="mt-3 mb-3">
                  <Col>
                    {isLoggedIn ? (
                      address.trim() === "" ? (
                        <Button
                          variant="success"
                          onClick={handlePaymentButton}
                        >
                          Payment
                        </Button>
                      ) : 
                      (
                        <Button variant="success" className="button-payment">
                          <Link
                            to="/Payment"
                            state={{ address: address }}
                            onClick={() => console.log("address passed properly", address)}
                          >
                            Payment
                          </Link>
                        </Button>
                      )
                    ) 
                    : 
                    (<p style={{ color: "red", textAlign: "center", fontWeight: "bold", borderRadius: "5px" }}>Please log in  to continue.</p>)
                    }
                    {showAddressAlert && address.trim() === "" && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "20px",
                          fontWeight: "bold",
                        }}
                        className="mt-3"
                      >
                        Please fill in the address
                      </p>
                    )}
                  </Col>
                </Row>
              </Col>
            </>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Basket;