import { Form } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";
import { RiArrowGoBackFill, RiArrowGoForwardFill } from "react-icons/ri";
import { useImageCropContext } from "..";

export const ZoomSlider = () => {
  const {
    zoom,
    setZoom,
    handleZoomIn,
    handleZoomOut,
    maxZoom,
    minZoom,
    zoomStep,
  } = useImageCropContext();
  return (
    <div className="d-flex justify-content-center align-items-center my-2">
      <LuMinus
        onClick={handleZoomOut}
        size={22}
        className="mx-2 cursor-pointer"
        color="#636568"
      />
      <Form.Range
        min={minZoom}
        max={maxZoom}
        tep={zoomStep}
        value={zoom}
        onChange={(e) => {
          setZoom(Number(e.target.value));
        }}
      />
      <FiPlus
        onClick={handleZoomIn}
        size={22}
        className="mx-2 cursor-pointer"
        color="#636568"
      />
    </div>
  );
};

export const RotateSlider = () => {
  const {
    rotation,
    setRotation,
    maxRotation,
    minRotation,
    rotationStep,
    handleRotateAntiCw,
    handleRotateCw,
  } = useImageCropContext();
  return (
    <div className="d-flex justify-content-center align-items-center my-2">
      <RiArrowGoBackFill
        onClick={handleRotateAntiCw}
        size={22}
        className="mx-2 cursor-pointer"
        color="#636568"
      />
      <Form.Range
        min={minRotation}
        max={maxRotation}
        step={rotationStep}
        value={rotation}
        onChange={(e) => {
          setRotation(Number(e.target.value));
        }}
      />
      <RiArrowGoForwardFill
        onClick={handleRotateCw}
        size={22}
        className="mx-2 cursor-pointer"
        color="#636568"
      />
    </div>
  );
};
