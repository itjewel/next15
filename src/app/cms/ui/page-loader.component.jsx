import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CustomLoader } from "./custom-loader.component";

export function PageLoader({ variant = "warning" }) {
  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col className="col-12 text-center mt-5">
            <CustomLoader variant={variant} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
