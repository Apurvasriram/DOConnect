import PreviewImage from "./PreviewImage";

const PreviewImages = ({ imageFiles, onImageClicked }) => {
  return imageFiles.map((file, index) => (
    <PreviewImage
      key={index}
      src={file.url}
      id={index}
      onClick={onImageClicked}
    />
  ));
};

export default PreviewImages;
