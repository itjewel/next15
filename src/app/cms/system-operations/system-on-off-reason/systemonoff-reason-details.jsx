import { Container, Row, Col, Card } from "react-bootstrap";
import { useEffect } from "react";
import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { useLazyGetSystemOnOffReasonIdQuery } from "./system-on-off-api";
import { useParams } from "react-router-dom";
import { DetailsImage } from "@/features/ui";

const breadcrumbItems = [
  { name: "System-on-off-reason", url: "/system-on-off-reason" },
  {
    name: "System-on-off-reason Details",
    url: "/system-on-off-reason/details",
  },
];

export const RebbotSystemDetails = () => {
  const { id } = useParams();

  const [trigger, { data: editRebootSystem }] =
    useLazyGetSystemOnOffReasonIdQuery();

  useEffect(() => {
    trigger(id);
  }, [id]);

  return (
    <div>
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        BtnComp={<LinkButton to="/system-on-off-reason" btnName="Back" />}
        title={"Details"}
      />
      <Container fluid className="pt-2">
        <Card className="mb-3">
          <Card.Header className="fw-bold fs-5">
            {" "}
            System On and off reason Details
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <div>
                  <span className="fw-bold">Name:</span>{" "}
                  {editRebootSystem?.data?.name}
                </div>
              </Col>
              <Col>
                <div>
                  <span className="fw-bold">Description:</span>{" "}
                  {editRebootSystem?.data?.description}
                </div>
              </Col>
            </Row>
            <Row className="pt-5">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <span className="fw-bold">Image</span>{" "}
                <DetailsImage value={editRebootSystem?.data?.image} />
              </div>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
