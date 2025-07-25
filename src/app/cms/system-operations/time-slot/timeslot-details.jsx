import { useEffect } from "react";
import { CommonLayout } from "../../layouts";
import { LinkButton } from "../../ui";
import { useLazyGetTimeSlotByIdQuery } from "./time-slot-api";
import { useParams } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import Table from "react-data-table-component";
import moment from "moment";

const breadcrumbItems = [
  { name: "System Operation Timeslot" },
  { name: "System Operation Timeslot", url: "/systemOperation/time-slot" },
  { name: "Details" },
];

const columns = [
  {
    name: "SL",
    selector: (row) => row.id,
  },
  {
    name: "Zone Name",
    selector: (row) => row.zoneName,
  },
];

export const TimeslotDetails = () => {
  const { id } = useParams();
  const [trigger, { data: details }] = useLazyGetTimeSlotByIdQuery();

  useEffect(() => {
    if (id) {
      trigger(id);
    }
  }, [id]);

  return (
    <div>
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        BtnComp={<LinkButton to="/systemOperation/time-slot" btnName="Back" />}
        title="Details"
      />
      <>
        <Card className="mb-3">
          <Card.Header className="fw-bold fs-5"> Timeslot Details</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <div>
                  <span className="fw-bold">Weekday:</span>{" "}
                  {details?.data?.weekDayName}
                </div>
                <div>
                  <span className="fw-bold">Start Time:</span>{" "}
                  {moment (details?.data?.startTime, "HH:mm:ss").format("hh:mm a")}
                </div>
              </Col>
              <Col>
                <div>
                  <span className="fw-bold">End Time:</span>{" "}
                  {moment (details?.data?.endTime, "HH:mm:ss").format("hh:mm a")}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Header className="fw-bold fs-5">Timeslot Operation</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Table data={details?.data?.operations} columns={columns} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </>
    </div>
  );
};
