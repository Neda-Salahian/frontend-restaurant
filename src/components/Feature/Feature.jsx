import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import feature1svg from "../../assets/images/feature-1.svg";
import feature2svg from "../../assets/images/feature-2.svg";
import feature3svg from "../../assets/images/feature-3.svg";

import "./Feature.css";

function Feauture() {
  return (
    <>
      <Container fluid className="container-feature">
        <Row>
          <Col md={4} className="text-center">
            <Image
              src={feature1svg}
              alt="image 1"
              className="image-container feature-style"
            />
            <h4 className="mt-5">Delicious Food</h4>
            <p>Where Every Bite is a Culinary Delight!</p>
          </Col>
          <Col md={4} className="text-center">
            <Image
              src={feature2svg}
              alt="image 1"
              className="image-container feature-style"
            />
            <h4 className="mt-5">Excellent Service</h4>
            <p>Elevating Your Dining Experience.</p>
          </Col>
          <Col md={4} className="text-center">
            <Image
              src={feature3svg}
              alt="image 1"
              className="image-container feature-style"
            />
            <h4 className="mt-5">Fast Delivery</h4>
            <p>Bringing Culinary Bliss to Your Doorstep in Record Time!</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Feauture;
