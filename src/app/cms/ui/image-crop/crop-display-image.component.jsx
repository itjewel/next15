import { useField } from "formik";
import { Button, Col, Image, Row } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";
import { useImageCropContext } from ".";

export const CropDisplayImage = ({
  value,
  id,
  fieldName,
  height = 0,
  width = 250,
  borderRadius = 0,
  rounded = false,
  alt = "Image",
  setDelete = () => {},
}) => {
  const [field, _, form] = useField(fieldName);

  const { fileEvent } = useImageCropContext();

  const src =
    typeof value === "object" || (id && typeof value === "object")
      ? URL.createObjectURL(value)
      : import.meta.env.VITE_APP_IMAGE_URL + value;

  return (
    <Row>
      <Col xs={12} className="mb-1 position-relative mt-2">
        {value && (
          <div className="position-relative d-inline-block">
            <div className="position-absolute top-0 end-0">
              <Button
                variant="transparent"
                className="text-white cursor-pointer btn-fit-content bg-white rounded-full"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "66%",
                  margin: "0",
                  padding: "3px",
                }}
                onClick={() => {
                  form.setValue("");
                  if (fileEvent) fileEvent.target.value = null;
                  setDelete(true);
                }}
              >
                <FaTimesCircle color="red" />
              </Button>
            </div>
            <Image
              rounded
              alt={alt}
              src={src}
              style={{
                ...(height
                  ? {
                      maxHeight: height,
                      height: "100%",
                      width: "auto",
                    }
                  : {
                      maxWidth: width,
                      width: "100%",
                      height: "auto",
                    }),
                objectFit: "fill",
                borderRadius,
              }}
            />
          </div>
        )}
      </Col>
    </Row>
  );
};
