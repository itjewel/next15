import Cropper from "react-easy-crop";
import { useImageCropContext } from "..";

export const CropperImage = ({ aspectRatio }) => {
  const {
    image,
    zoom,
    setZoom,
    rotation,
    setRotation,
    crop,
    setCrop,
    onCropComplete,
  } = useImageCropContext();
  return (
    <div className="crop-container">
      <Cropper
        image={image || undefined}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        aspect={aspectRatio}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        setRotation={setRotation}
        style={{
          containerStyle: {
            height: 300,
            width: "auto",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
        }}
      />
    </div>
  );
};
