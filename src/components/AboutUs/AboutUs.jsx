import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap"; // Import necessary components from React Bootstrap

import "./About.css";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigateTo = useNavigate();
  return (
    <Container fluid className="about-container">
      <Row>
        <Col className="about-section">
          <Col md={8} className="offset-md-2 mt-5 image-text-overlay p-4 about-style">
            <h3>About Us</h3>
            <p>
            Welcome to Sushi House, where we invite you to embark on a culinary journey through the authentic flavors of Japan. Our restaurant promises not only exceptional sushi but also a welcoming ambiance that sets the stage for a memorable dining experience. Whether you choose to dine in and savor the atmosphere or opt for the convenience of our delivery service, we ensure that the essence of Japanese cuisine reaches your doorstep.
            </p>
           
            <div className="d-flex justify-content-end">
              <Button
                className="mt-3 read-more-btn"
                onClick={() => navigateTo("/Aboutus")}
              >
                Read More ...
              </Button>
            </div>
          </Col>
          <div className="image-container"></div>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;
