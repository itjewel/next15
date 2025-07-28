import { useField } from "formik";
import { Button, Image } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";

const imageBasePath = import.meta.env.VITE_APP_IMAGE_URL;

export const ImagePreview = ({
  fieldName,
  width = 60,
  height = 50,
  rounded = false,
}) => {
  const [field, _, form] = useField(fieldName);
  const image =
    field?.value instanceof File
      ? URL.createObjectURL(field.value)
      : `${imageBasePath}${field.value}`;
  // console.log(image);
  return (
    <div>
      {field?.value && image && (
        <div className="position-relative d-inline-block">
          <div className="position-absolute top-1 end-0">
            <Button
              variant="transparent"
              className="text-white cursor-pointer btn-fit-content bg-white rounded-full"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "66%",
                marginTop: "0",
                padding: "3px",
              }}
              onClick={() => form.setValue("")}
            >
              <FaTimesCircle color="red" />
            </Button>
          </div>
          <Image
            rounded={rounded}
            style={{
              width,
              height,
              objectFit: "fill",
            }}
            src={image}
            alt={`${fieldName} image`}
          />
        </div>
      )}
    </div>
  );
};
