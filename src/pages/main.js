import React from "react";
import ToDoTemplate from "../components/utilsComponents/todo";
import { useState } from "react";
import Textbox from "../components/utilsComponents/textbox";
import "./main.css";
import Upload from "../components/utilsComponents/image-loader/image_upload";
import  NavBar from "../components/Navbar";


import {BiText} from "react-icons/bi"
import { color } from "@cloudinary/url-gen/qualifiers/background";

const ScrapBook = ({ user, setUser }) => {

  const [toDo, setToDo] = useState(false);

  return (
<div>
  <div className="main">
<NavBar/>
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
      <Upload />
    </div>
     </div>
     </div>
  );
};

export default ScrapBook;
