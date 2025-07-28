import { CommonLayout } from "@/features/layouts";
import { CardWrapper, DetailsImage, LinkButton } from "@/features/ui";
import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useLazyGetIdAvertisementQuery } from "./advertisement-apislice";

const breadcrumbItems = [
  { name: "Advertisement", url: "/advertisement" },
  {
    name: "Advertisement Details",
    url: "/advertisement/details",
  },
];

export const AdvertisementDetails = () => {
  const { id } = useParams();

  const [trigger, { data: editAdvertimentList }] =
    useLazyGetIdAvertisementQuery();
  const isVideo = editAdvertimentList?.data?.isVideo;

  useEffect(() => {
    trigger(id);
  }, [id]);

  return (
    <div>
      <CommonLayout
        breadcrumbItems={breadcrumbItems}
        BtnComp={<LinkButton to="/advertisement" btnName="Back" />}
        title={"Advertisement details"}
      />
      <CardWrapper>
        <Card.Body>
          <Row>
            <Col>
              <div>
                <span className="fw-bold">Title:</span>{" "}
                {editAdvertimentList?.data?.title}
              </div>
            </Col>
            <Col>
              <div>
                <span className="fw-bold">Description:</span>{" "}
                {editAdvertimentList?.data?.description}
              </div>
            </Col>
          </Row>
          <Row className="pt-5">
            <div className="d-flex flex-column justify-content-start align-items-start">
              <span className="fw-bold">Media:</span>

              {isVideo ? (
                <video width="320" height="240" controls>
                  <source
                    src={
                      import.meta.env.VITE_APP_IMAGE_URL +
                      editAdvertimentList?.data?.image
                    }
                    type="video/mp4"
                  />
                </video>
              ) : (
                <DetailsImage value={editAdvertimentList?.data?.image} />
              )}
            </div>
          </Row>
        </Card.Body>
      </CardWrapper>
    </div>
  );
};
