import { useState, useEffect, useCallback } from "react";
import Draggable from "react-draggable";
import { useDropzone } from "react-dropzone";
// import { Image } from "cloudinary-react";
import imageuploader from "./imageuploader.css";

const ImageUpload = () => {
  const onDrop = useCallback((acceptedFiles) => {
    const url = `https://cloudinary.com/console/c-64df2c7886a2aaa0d70549e81de5cd/media_library/folders/c035c509c789166c480d0302413095b0d1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`;
    acceptedFiles.forEach(async (acceptedFile) => {
      const formData = new FormData();
      formData.append("file", acceptedFile);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      const response = await fetch(url, { method: "post", body: formData });
      const data = await response.json();
      console.log(data);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: "image/*",
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`${imageuploader.dropzone} ${
        isDragActive ? imageuploader.active : null
      }`}
    >
      <input {...getInputProps()} />
      Drop Zone
    </div>
  );
};

export default ImageUpload;

// cloudname = dwgd8mfjz
// cloud url = pB2W7rJEVKIdl8SH1TJSxglZU4I
