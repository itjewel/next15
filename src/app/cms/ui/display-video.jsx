export const DisplayVideo = ({ value }) => {
  if (!value) {
    return <div>No video file provided</div>;
  }
  if (!(value instanceof File)) {
    return (
      <div className="mt-2">
        <video width="320" height="240" controls>
          <source
            src={import.meta.env.VITE_APP_IMAGE_URL + value}
            type="video/mp4"
          />
        </video>
      </div>
    );
  }
  const videoUrl = URL.createObjectURL(value);
  return (
    <div className="mt-2">
      <video width="320" height="240" controls>
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};
