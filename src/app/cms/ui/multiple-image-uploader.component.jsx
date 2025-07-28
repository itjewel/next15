import React from "react";
import ReactImageUploadComponent from "react-images-upload";

export const UploadImages = (props) => {
  const onDrop = (pictureFiles, pictureDtaURLs) => {
    const newImageUploaded = pictureDtaURLs.slice(props.defaultImages.length);
    props.handleChange(pictureFiles, newImageUploaded, pictureDtaURLs);
  };

  return (
    <ReactImageUploadComponent
      withIcon={props.withIcon}
      withLabel={props.withLabel}
      withPreview={true}
      buttonText={"Add photos"}
      fileSizeError={"File size is too big!"}
      fileTypeError={"This extension is not supported!"}
      onChange={onDrop}
      label={props.label}
      imgExtension={props.imgExtension}
      maxFileSize={props.maxFileSize}
      defaultImages={props.defaultImages}
      buttonClassName={props.buttonClassName}
      buttonType={props.buttonType}
      buttonStyles={props.buttonStyles}
    />
  );
};
