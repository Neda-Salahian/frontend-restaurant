import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap"; // Import necessary components from React Bootstrap
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

import "./About.css";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation/NavigationComponent";
import Header from "../Header/HeaderComponent";
import Footer from "../Footer/Footer";

function AboutUsMore() {
  const navigateTo = useNavigate();
  return (
    <>
      <Navigation />
      <Header />
      <Container fluid>
        <Row className="about-section-title">
          <div>
            <h3>About Sushi House</h3>
          </div>
        </Row>
        <Row>
          <Col className="about-section">
            <Col md={8} className="offset-md-2 mt-5 image-text-overlay p-4">
              <h3>About Us</h3>
              <p>
              Welcome to Sushi House, where we invite you to embark on a culinary journey through the authentic flavors of Japan. Our restaurant promises not only exceptional sushi but also a welcoming ambiance that sets the stage for a memorable dining experience. Whether you choose to dine in and savor the atmosphere or opt for the convenience of our delivery service, we ensure that the essence of Japanese cuisine reaches your doorstep.
              </p>
              <p>
              At Sushi House, we take pride in crafting handmade sushi using only the finest quality fish. Each bite promises a delightful surprise as you indulge in the freshness and authenticity of our ingredients. From traditional favorites to innovative creations, our menu offers a tantalizing array of options to satisfy every palate.
              </p>

              <p>
              We are open from Tuesday to Sunday, welcoming guests from 11 am to 10 pm. Please note that we are closed on Mondays to prepare for the week ahead. Join us at Sushi House and let us treat you to a culinary adventure that will leave you craving more.
              </p>
            </Col>
            <div className="image-container"></div>
          </Col>
        </Row>
        <Row className="g-4 about-card-container mt-3">
          <CardGroup>
            <Card>
              <Card.Img
                variant="top"
                src="../../../public/assets/images/image-about.jpg"
              />
              <Card.Body>
                <Card.Title>Discover Personalized Sushi Perfection</Card.Title>
                <Card.Text>
                Experience sushi like never before with our customized sushi service. Tailor your roll with your favorite ingredients, and we'll handcraft a masterpiece just for you. Let your taste buds lead the way – indulge in a culinary adventure that's uniquely yours.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Sushi House updated</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Img
                variant="top"
                src="../../../public/assets/images/about-image-1.jpg"
              />
              <Card.Body>
                <Card.Title>Chef's Special Rolls</Card.Title>
                <Card.Text>
                Delight in our chef's expertly crafted special rolls, each a masterpiece of flavor and creativity. From innovative fusion combinations to timeless classics with a twist, our chef's specials promise an unforgettable sushi experience.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Sushi House updated</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Img
                variant="top"
                src="../../../public/assets/images/about-image-3.jpg"
              />
              <Card.Body>
                <Card.Title>Vegetarian/Vegan Selections</Card.Title>
                <Card.Text>
                Indulge in our delectable vegetarian and vegan sushi selections, meticulously crafted to tantalize your taste buds. Whether you follow a plant-based diet or simply enjoy exploring new culinary horizons, our chefs are ready to create custom vegan sushi tailored to your preferences. Simply let us know your desires, and we'll craft a vegan sushi experience that exceeds your expectations.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Sushi House updated</small>
              </Card.Footer>
            </Card>
          </CardGroup>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default AboutUsMore;
