import React from "react";
import axios from "axios";
import {useState} from "react"
import { Container, Row, Col, Button } from "react-bootstrap"; // Import necessary components from React Bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import "./ContactUs.css";
import Navigation from "../Navigation/NavigationComponent.jsx";
import Header from "../Header/HeaderComponent.jsx";
import Footer from "../Footer/Footer.jsx";
import ContactUsModal from "./ContactUsModal.jsx";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formIncomplete, setFormIncomplete] = useState(false);
  const [messageSubmitted, setMessageSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.subject === "" ||
      formData.message === ""
    ) {
      setFormIncomplete(true);
      return;
    }

    try {
      const response = await axios.post(
        "https://restaurant-backend-1-ixbn.onrender.com/messageqna",
        formData
      );
      console.log("Message sent successfully:", response.data);
      setMessageSubmitted(true);
      clearTheForm();
      // setTimeout(() => {
      //   setMessageSubmitted(false);
      // }, 3000); // Hide the message after 3 seconds
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error during sending the message");
    }
  };

  const clearTheForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setFormIncomplete(false);
  };

  return (
    <>
      <Navigation />
      <Header />
      <Container fluid className="contact-section">
        <Row className="contact-section-title">
          <div>
            <h3>Contact Us </h3>
          </div>
        </Row>
        <Row className="g-2 form-container">
          <Col md={6}>
            <FloatingLabel label="Name">
              <Form.Control type="name" name="name" id="name" autoComplete="name"  className="form-control" value={formData.name} onChange={handleInputChange} required />
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel  label="Email Address">
              <Form.Control type="email" name="email" id="email" autoComplete="email" value={formData.email}
              onChange={handleInputChange}
              className="form-control"
              required/>
            </FloatingLabel>
          </Col>

          <Col md={6}>
            <FloatingLabel  label="Subject">
              <Form.Control type="subject" name="subject" id="subject" autoComplete="subject" 
              value={formData.subject}
              onChange={handleInputChange}
              className="form-control"
              required/>
            </FloatingLabel>
          </Col>

          <Col md={12}>
            <FloatingLabel
              label="Write a Message here..."
              htmlFor="message" className="form-label"
            >
              <Form.Control
                as="textarea" id="message" name="message" rows="3" className="form-control" value={formData.message} onChange={handleInputChange}
                style={{ height: "100px" }}
              required
              />
            </FloatingLabel>
          </Col>

          <Col md={12} className="text-center">
            <Button className="btn btn-success" onClick={handleSubmit}>Send Message</Button>
          </Col>

        </Row>
      </Container>
      {messageSubmitted && (
        <ContactUsModal isOpen={messageSubmitted} onRequestClose={() => setMessageSubmitted(false)} />     
            )}
      <Footer />
    </>
  );
}

export default ContactUs;
