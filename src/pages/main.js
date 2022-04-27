import React from "react";
import ToDoTemplate from "../components/utilsComponents/todo";
import { useState } from "react";
import Textbox from "../components/utilsComponents/textbox";
import "./main.css";
import ImageUpload from "../components/utilsComponents/image_upload";

const ScrapBook = ({ user, setUser }) => {
  const [toDo, setToDo] = useState(false);

  return (
    <div className="playArea">
      <button
        onClick={() => {
          setUser();
          localStorage.clear();
        }}
      >
        Logout
      </button>
      <h1>hello!</h1>
      {toDo && <ToDoTemplate />}
      <button onClick={() => setToDo(!toDo)}> ToDo </button>
      <Textbox />
      <ImageUpload />
    </div>
  );
};

export default ScrapBook;
