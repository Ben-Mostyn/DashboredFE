import Draggable from "react-draggable";
import Alert from "./Alerts";
import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";

export default function Upload() {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [imageIds, setImageIds] = useState();
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
      setErrMsg("something went wrong front end!");
    };
  };
  // !upload image
  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });
      setFileInputState("");
      setPreviewSource("");
      setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      setErrMsg("Something went wrong!");
    }
  };

  const loadImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      setImageIds(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadImages();
  }, []);
  return (
    <div>
      <div>
        <h1 className="title">Upload an Image</h1>
        <Alert msg={errMsg} type="danger" />
        <Alert msg={successMsg} type="success" />
        <form onSubmit={handleSubmitFile} className="form">
          <input
            id="fileInput"
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
            className="form-input"
          />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>

        {previewSource && (
          <img src={previewSource} alt="chosen" style={{ height: "200px" }} />
        )}
      </div>
      <div>
        <h1 className="title">Cloudinary Gallery</h1>
        <div className="gallery">
          {imageIds &&
            imageIds.map((imageId, index) => (
              <Image
                key={index}
                cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                publicId={imageId}
                width="300"
                crop="scale"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
