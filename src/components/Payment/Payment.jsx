import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button, InputGroup, Col, Row } from "react-bootstrap";
import "./Payment.css";
import BasketModalSuccess from "./BasketModalSuccess.jsx";
import CartContext from "../context/CartContext.jsx";

function Payment() {
  const { cartItems, emptyCart } = useContext(CartContext);
  console.log(cartItems);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [showMadalSuccess, setShowMadalSuccess] = useState(false);

  const navigateTo = useNavigate();

  const location = useLocation();
  console.log("Location state:", location.state);
  const { address } = location.state || {};
  console.log(address, "in payment component");

  const handlePayment = async () => {
    try {
      if (cartItems.length === 0) {
        throw new Error(
          "Cart is empty. Please add items before making a payment."
        );
      }

      // Extracting only the 'id' from each cart item
      const menus = cartItems.map((item) => item && item._id);

      const response = await fetch(
        "https://restaurant-backend-ccgs.onrender.com/deliveryorder/userorder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            menus: menus,
            address: address,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      console.log("Order created:", await response.json());
      console.log("Payment successful");
      setShowMadalSuccess(true);
      setPaymentStatus("success");
      localStorage.removeItem("cartItems");
      emptyCart();
    } catch (error) {
      console.error("Error creating order:", error);
      setPaymentStatus("error");
    }
  };

  useEffect(() => {
    console.log("Payment status updated:", paymentStatus);
    if (paymentStatus === "success") {
      setShowMadalSuccess(true);
    }
  }, [paymentStatus]);

  const handleCloseModalSuccess = () => {
    setShowMadalSuccess(false);
    navigateTo("/");
  };

  return (
    <>
      <Container fluid className="payment-container">
        <Row>
          <Col lg={12}>
            <h1>Payment</h1>
            <Form className="payment-form">
              {["radio"].map((type) => (
                <div key={`inline-${type}`} className="mb-3 col-md-6">
                  <Form.Check
                    inline
                    label="Pay Pal"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                    className="m-2"
                  />
                  <Form.Check
                    inline
                    label="Pay with Debit Card"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                    className="m-2"
                  />
                </div>
              ))}
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Card Number</InputGroup.Text>
                <Form.Control
                  placeholder="4111 1111 1111 1111"
                  aria-label="card number"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <Row>
                <Col lg={6}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Expiry</InputGroup.Text>
                    <Form.Control
                      placeholder="MM/YYYY"
                      aria-label="expiry"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Col>
                <Col lg={6}>
                  <InputGroup className="mb-3 col-md-6">
                    <InputGroup.Text id="basic-addon1">CVC</InputGroup.Text>
                    <Form.Control
                      placeholder="123"
                      aria-label="cvc"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Button
                variant="primary"
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  handlePayment();
                }}
              >
                Finish and Pay
              </Button>
            </Form>
            <Row className="basket-status mt-3">
              <Col>
                {paymentStatus === "success" && (
                  <BasketModalSuccess
                    isOpen={showMadalSuccess}
                    onRequestClose={handleCloseModalSuccess}
                  />
                )}
                {paymentStatus === "error" && (
                  <p style={{ color: "red" }}>
                    Payment failed. Please try again later.
                  </p>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Payment;
