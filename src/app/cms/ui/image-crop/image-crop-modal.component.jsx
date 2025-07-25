import { Button, Modal } from "react-bootstrap";

import { useImageCropContext } from "..";
import { CropperImage } from "./crop.component";
import { RotateSlider, ZoomSlider } from "./slider.component";

export const defaultAcpectRatio = 16 / 9;

export const ImageCropModal = ({ aspectRatio = defaultAcpectRatio }) => {
  const { image, onHide, onComplete, meta } = useImageCropContext();
  return (
    <Modal show={!!image}>
      <Modal.Header>
        <Modal.Title>Set image with aspect ratio</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <CropperImage aspectRatio={aspectRatio} />
        {meta.error && (
          <div className="mt-2">
            <small className="text-danger text-center d-block">
              {meta.error}
            </small>
          </div>
        )}
        <div className="w-50 m-auto">
          <ZoomSlider />
          <RotateSlider />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex hstack gap-1 justify-content-end">
          <Button disabled={!!meta.error} type="button" onClick={onComplete}>
            Done
          </Button>

          <Button className="ms-2" variant="outline-secondary" onClick={onHide}>
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
