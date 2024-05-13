import axios from "axios";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Modal } from "react-bootstrap"; 
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
// Remove duplicate import statement for Modal
// import Modal from "react-modal";

//Import Components
import Navigation from "../Navigation/NavigationComponent";
import Header from "../Header/HeaderComponent";
import Footer from "../Footer/Footer.jsx";
import ReservationModalSuccess from "./ReservationModalSuccess.jsx";


import "./Reservation.css"

function Reservation() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        numberOfGuests: "",
        calendar: "",
        time: "",
        message: "",
    });
    const [formIncomplete, setFormIncomplete] = useState(false);
    const [reservationSubmitted, setReservationSubmitted] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            formData.name === "" ||
            formData.email === "" ||
            formData.numberOfGuests === "" ||
            formData.calendar === "" ||
            formData.time === ""
        ) {
            setFormIncomplete(true);
            return;
        }

        try {
            const response = await axios.post(
                "https://restaurant-backend-ccgs.onrender.com/reservations",
                formData
            );
            // console.log("Reservation created successfully:", response.data);
            setReservationSubmitted(true);
            clearTheForm();
            // setTimeout(() => {
            //     setReservationSubmitted(false);
            // }, 3000); // Hide the message after 3 seconds
        } catch (error) {
            console.error("Error creating reservation:", error);
            alert("Error during submit the form");
        }
    };

    const clearTheForm = () => {
        setFormData({
            name: "",
            email: "",
            numberOfGuests: "",
            calendar: "",
            time: "",
            message: "",
        });

        setFormIncomplete(false);
    };

    return (
        <>
            <Navigation />
            <Header />

            <Container fluid className="reservation-section">
                <Row className="contact-section-title">
                    <div>
                        <h3>Reservation Form </h3>
                    </div>
                </Row>
                <Row className="g-2 form-container">
                    <Col md={6}>
                        <FloatingLabel  label="Name">
                            <Form.Control type="text" name="name" id="name" autoComplete="name" className="form-control" value={formData.name} onChange={handleChange} required />
                        </FloatingLabel>
                    </Col>

                    <Col md={6}>
                        <FloatingLabel  label="Email">
                            <Form.Control type="email" name="email" id="email" autoComplete="email" className="form-control" value={formData.email} onChange={handleChange} required />
                        </FloatingLabel>
                    </Col>

                    <Col md={6}>
                        <FloatingLabel  label="Number of Guests">
                            <Form.Control type="number" name="numberOfGuests" id="numberOfGuests" autoComplete="number" className="form-control" value={formData.numberOfGuests} onChange={handleChange} required />
                        </FloatingLabel>
                    </Col>

                    <Col md={6}>
                        <FloatingLabel htmlFor="calendar" className="form-label" label="Date">
                            <Form.Control type="date" name="calendar" id="calendar" className="form-control" value={formData.calendar} onChange={handleChange} required />
                        </FloatingLabel>
                    </Col>

                    <Col md={6}>
                        <FloatingLabel htmlFor="time" className="form-label" label="Time">
                            <Form.Control type="time" name="time" id="time" className="form-control" value={formData.time} onChange={handleChange} required />
                        </FloatingLabel>
                    </Col>

                    <Col md={12}>
                        <FloatingLabel htmlFor="message" className="form-label" label="Message Here ...">
                            <Form.Control as="textarea" id="message" name="message" rows="3" className="form-control" value={formData.message} onChange={handleChange}></Form.Control>
                        </FloatingLabel>
                    </Col>

                    <Col md={12} className="text-center">
                        <Button className="btn btn-success" onClick={handleSubmit}>Send Message</Button>
                    </Col>
                </Row>
            </Container>

            {reservationSubmitted && (

            <ReservationModalSuccess isOpen={reservationSubmitted} onRequestClose={() => setReservationSubmitted(false)} />


                    
            )}

            <Footer />
        </>
    );
}

export default Reservation;
