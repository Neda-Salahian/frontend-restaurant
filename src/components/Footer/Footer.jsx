import "./Footer.css";

import logoImage from "../../../public/assets/images/logo-header-1.png";
import instagramSvg from "../../../public/assets/images/instagram.svg";
import telegramSvg from "../../../public/assets/images/telegram.svg";
import youtubeSvg from "../../../public/assets/images/youtube.svg";

import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import CopyRight from "../CopyRight.jsx/CopyRight.jsx";
function Footer() {
  return (
    <>
      <Container fluid className="footer-container">
        <Row className=" footer-row">
          <Col lg={2} md={6} sm={12} xs={12}>
            <Link to="/">
              <Image
                src={logoImage}
                alt="logo"
                className="container-logo"
                fluid
              />
            </Link>
          </Col>

          <Col lg={2} md={6} sm={12} xs={12}>
            <div>
              <h4 className="mb-3">Address</h4>
              <p>5th Floor, 350 5th Avenue, Frankfurt, NY 10010, Germany</p>
              <h5>
                Phone : +49 123 4567 890</h5>
              <h5>
                Email : <a href="mailto:">sushihouse@admin.de</a>
              </h5>
            </div>
          </Col>

          <Col lg={2} md={6} sm={12} xs={12}>
            <h4 className="mb-3">Fast Links</h4>
            <div className="link-container">
              <ul>
                <li>
                  <Link to="/Menu">Menu</Link>
                </li>
                <li>
                  <Link to="/Contactus">Contact Us</Link>
                </li>
                <li>
                  <Link to="/Aboutus">About Us</Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col lg={2} md={6} sm={12} xs={12} className="reserv-container">
            <h4>Reservation</h4>

            <Link to="/Reservation">
              <Button className="read-more-btn">Table Reservation</Button>
            </Link>
          </Col>
          <Col lg={2} md={6} sm={12} xs={12} className="social-container-mb">
            <h4 className="mb-3">Social Network</h4>
            <div className="social-container">
              <a
                href="https://www.instagram.com/your_instagram_username"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagramSvg} alt="Instagram" className="icon" />
              </a>

              <a
                href="https://www.youtube.com/your_youtube_channel"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={youtubeSvg} alt="Youtube" className="icon" />
              </a>

              <a
                href="https://t.me/your_telegram_channel"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={telegramSvg} alt="Telegram" className="icon" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      <CopyRight />
    </>
  );
}

export default Footer;
