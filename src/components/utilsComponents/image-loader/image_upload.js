import Draggable from "react-draggable";
import Alert from "./Alerts";
import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";

export default function ImageHandle({
  user,
  image,
  setImage,
  setImageUrl,
  imageUrl,
}) {
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
      const data = await response.json();
      const res = await fetch(`${process.env.REACT_APP_REST_API}addImage`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: data.secure_url,
          user: user,
        }),
      });
      return data.secure_url;
    } catch (error) {
      console.error(error);
    }
  };
  // ! SHOW PREVIEW
  const showPreview = async (event) => {
    if (event.target.files.length > 0) {
      const url = await uploadImage(event.target.files[0]);
      setImage(url);

      console.log(image, "i am image");

      // push image into array
      const imageArr = [image];
      imageArr.push(image);
      setImageUrl(imageArr);
      console.log(imageUrl, "i am imageUrl");
    }
  };

  return (
    <Draggable>
      <div className="">
        <img
          className=""
          src={image}
          id="upload-preview"
          alt="image"
          style={{ width: 200, height: 200 }}
        />
        <button>
          <input
            type="file"
            onChange={(event) => {
              showPreview(event);
            }}
          />
        </button>

        {/* <h1>image url</h1>

      {imageUrl ? (
        <div>
          {imageUrl.map((imageUrl, index) => {
            return (
              <img
                src={imageUrl}
                style={{ width: 200, height: 200 }}
                key={index}
              />
            );
          })}
        </div>
      ) : null} */}
      </div>
    </Draggable>
  );
}
