import Draggable from "react-draggable";
import Alert from "./Alerts";
import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import { motion, MotionConfig } from "framer-motion";
import { scale } from "@cloudinary/url-gen/actions/resize";

export default function ImageHandle() {
  const [imageArray, setImageArray] = useState([]);

  // !UPLOAD
  const uploadImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "yxsv9pot");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dwgd8mfjz/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const { secure_url } = await response.json();

      await fetch(`${process.env.REACT_APP_REST_API}addImage`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: secure_url,
        }),
      });
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };
  // ! SHOW PREVIEW
  const showPreview = async (event) => {
    if (event.target.files.length > 0) {
      const url = await uploadImage(event.target.files[0]);
      setImageArray([...imageArray, url]);
    }
  };

  const updateImage = async (image) => {
    try {
      await fetch(`${image}/updateImage`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("myToken")}`, //this maybe different for you?
        },
        body: JSON.stringify(image),
      });
      return image;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <Draggable>
        <div className="imageModal">
          <div className="imagePreview">
            <div className="previewBox">
              <h2>Image Preview</h2>

              <img
                className="preview"
                src={[...imageArray].pop()}
                id="upload-preview"
                alt="preview"
                style={{ width: 100, height: 100 }}
              />
            </div>
            <div className="imageInputContainer">
              <input
                className="imageInput"
                type="file"
                onChange={(event) => {
                  showPreview(event);
                }}
              />
            </div>
          </div>
        </div>
      </Draggable>
      <div>
        {updateImage ? (
          <div>
            {imageArray.map((imageUrl, index) => {
              return (
                <Draggable>
                  <img
                    alt="uploaded images"
                    src={imageUrl}
                    style={{ width: 200, height: 200 }}
                    key={index}
                  />
                </Draggable>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}