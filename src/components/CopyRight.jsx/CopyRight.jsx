import { Container, Row, Col } from "react-bootstrap";

import "./CopyRight.css";
function CopyRight() {
  return (
    <>
      <Container fluid className="copyright-container">
        <Row>
          <Col className="text-center mt-3 copyright-container">
            <p>Copyright © 2024. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CopyRight;
