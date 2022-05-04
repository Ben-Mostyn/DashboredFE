import Draggable from "react-draggable";
import Alert from "./Alerts";
import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";

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
      {/* <h1>Cloudinary</h1> */}

      <img
        className=""
        src={[...imageArray].pop()}
        id="upload-preview"
        alt="preview"
        style={{ width: 200, height: 200 }}
      />
      <button>
        {/* <span>Upload Image and preview</span> */}
        <input
          type="file"
          onChange={(event) => {
            showPreview(event);
          }}
        />
      </button>

      {/* <h1>image url</h1> */}

      {updateImage ? (
        <div>
          {imageArray.map((imageUrl, index) => {
            return (
              <img
                alt="uploaded images"
                src={imageUrl}
                style={{ width: 200, height: 200 }}
                key={index}
              />
            );
          })}
        </div>
      ) : null}

      {/* <span>image url</span>
      <button onClick={updateImage}>image url</button> */}
    </div>
  );
}
