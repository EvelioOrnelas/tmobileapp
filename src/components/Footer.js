import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const Footer = () => {
  return (
    <footer style={{ backgroundColor: "lightgray"}}>
      <Container>
        <Row>
          <Col className="text-center py-3">Questions? Call T-Mobile Customer Service at 1-844-275-9310 &copy; T-Mobile Mobile, Inc.</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;