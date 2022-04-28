import React from "react";
import ToDoTemplate from "../components/utilsComponents/todo";
import { useState } from "react";
import Textbox from "../components/utilsComponents/textbox";
import "./main.css";
import ImageUpload from "../components/utilsComponents/image_upload";
import Navbar from "../components/Navbar";

const ScrapBook = () => {
  const [toDo, setToDo] = useState(false);
  return (

    <div className= "container">
<Navbar></Navbar>
    <div className="playArea">
      <h1>hello</h1>
      {toDo && <ToDoTemplate />}
      <button onClick={() => setToDo(!toDo)}> ToDo </button>
      <Textbox />
      <ImageUpload />
    </div>
    </div>
  );
};

export default ScrapBook;
