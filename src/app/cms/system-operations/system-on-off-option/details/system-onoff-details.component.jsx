import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { useParams } from "react-router-dom";
import { useLazyGetSystemOptionByIdQuery } from "../system-on-off-option-api";
import { useEffect } from "react";
import { Card, Row, Stack } from "react-bootstrap";
const title = "System On Off Option Details";
const breadcrumbItems = [
  { name: "System operation" },
  { name: "System on off option", url: "/system-on-off-option" },
  { name: "System on off option details" },
];

export const SystemOnoffDetails = () => {
  const props = useParams();
  const [trigger, { data: detailsData, isFetching }] =
    useLazyGetSystemOptionByIdQuery();
  useEffect(() => {
    if (props.id) {
      trigger(props.id);
    }
  }, [props.id]);
  return (
    <CommonLayout
      title={title}
      breadcrumbItems={breadcrumbItems}
      BtnComp={<LinkButton btnName="Back" to="/system-on-off-option" />}
    >
      {isFetching == false && (
        <div>
          <Card>
            <Card.Header className="fw-bold">Details info</Card.Header>
            <Card.Body>
              <Row className="d-flex justify-content-between">
                <Stack direction="vertical" gap={2} className="col-md-6">
                  <p>
                    <span className="fw-bold">Name : </span>
                    {detailsData?.data?.name}
                  </p>
                  <p>
                    <span className="fw-bold">System status : </span>
                    {detailsData?.data?.isSystemOff == true ? "On" : "Off"}
                  </p>
                </Stack>
                <Stack direction="vertical" gap={2} className="col-md-6">
                  <p>
                    <span className="fw-bold">Reason : </span>
                    {detailsData?.data?.systemOnOffReason?.name}
                  </p>
                </Stack>
              </Row>
            </Card.Body>
          </Card>
        </div>
      )}
    </CommonLayout>
  );
};
