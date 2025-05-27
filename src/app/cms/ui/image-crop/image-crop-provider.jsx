import { useField } from "formik";
import { useCallback, useContext, useState } from "react";

import { ImageCropContext } from "./image-crop-context";
import { getCroppedImg } from "./image-crop.helper";
import { usePreviousCancel, usePreviousClose } from "./image-crop.hook";

const defaultImage = null;
const defaultCrop = { x: 0, y: 0 };
const defaultRotation = 0;
const defaultZoom = 1;
const defaultCroppedAreaPixels = null;

export const ImageCropProvider = ({
  children,
  maxZoom = 3,
  minZoom = 1,
  zoomStep = 0.1,
  maxRotation = 360,
  minRotation = 0,
  rotationStep = 5,
  name,
}) => {
  const [field, meta, form] = useField(name);
  const [image, setImage] = useState(defaultImage);
  const [crop, setCrop] = useState(defaultCrop);
  const [rotation, setRotation] = useState(defaultRotation);
  const [zoom, setZoom] = useState(defaultZoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(
    defaultCroppedAreaPixels,
  );
  const [fileEvent, setFileEvent] = useState();
  const [afterCropFile, setAfterCropFile] = useState(null);
  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const canclePrevFile = usePreviousCancel(afterCropFile);
  const closePrevFile = usePreviousClose(field?.value);

  const handleZoomIn = () => {
    if (zoom < maxZoom) {
      setZoom(zoom + zoomStep * 2);
    }
  };

  const handleZoomOut = () => {
    if (zoom > minZoom) {
      setZoom(zoom - zoomStep * 2);
    }
  };

  const handleRotateCw = () => {
    if (rotation < maxRotation) {
      setRotation(rotation + rotationStep);
    }
  };

  const handleRotateAntiCw = () => {
    if (rotation > minRotation) {
      setRotation(rotation - rotationStep);
    }
  };
  const getProcessedImage = async () => {
    if (image && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation,
        undefined,
        field?.value?.type,
      );
      const imageFile = new File([croppedImage.file], field?.value?.name, {
        type: field?.value?.type,
      });

      return imageFile;
    }
  };

  const resetStates = () => {
    setImage(defaultImage);
    setCrop(defaultCrop);
    setRotation(defaultRotation);
    setZoom(defaultZoom);
    setCroppedAreaPixels(defaultCroppedAreaPixels);
  };

  const onComplete = async () => {
    const file = await getProcessedImage();
    setAfterCropFile(file);
    form.setValue(file);
    resetStates();
  };

  const onHide = async () => {
    form.setValue(closePrevFile ?? "");
    resetStates();
    if (fileEvent) fileEvent.target.value = null;
  };

  return (
    <ImageCropContext.Provider
      value={{
        image,
        setImage,
        zoom,
        setZoom,
        rotation,
        setRotation,
        crop,
        setCrop,
        croppedAreaPixels,
        setCroppedAreaPixels,
        onCropComplete,
        getProcessedImage,
        handleZoomIn,
        handleZoomOut,
        handleRotateAntiCw,
        handleRotateCw,
        maxZoom,
        minZoom,
        zoomStep,
        maxRotation,
        minRotation,
        rotationStep,
        resetStates,
        onHide,
        onComplete,
        field,
        meta,
        form,
        fileEvent,
        setFileEvent,
        canclePrevFile,
      }}
    >
      {children}
    </ImageCropContext.Provider>
  );
};

export const useImageCropContext = () => useContext(ImageCropContext);
