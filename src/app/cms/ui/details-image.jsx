import { Col, Image, Row } from "react-bootstrap";

export const DetailsImage = ({ value, styles = {} }) => {
  const src = import.meta.env.VITE_APP_IMAGE_URL + value;

  return (
    <Row>
      <Col xs={12} className="mb-1 text-center position-relative mt-2">
        {value && (
          <div className="position-relative d-inline-block">
            <div className="position-absolute top-0 end-0"></div>
            <Image fluid src={src} style={styles} />
          </div>
        )}
      </Col>
    </Row>
  );
};
