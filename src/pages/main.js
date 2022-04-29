import React from "react";
import ToDoTemplate from "../components/utilsComponents/todo";
import { useState } from "react";
import Textbox from "../components/utilsComponents/textbox";
import "./main.css";
import MemeGenerator from "../components/utilsComponents/memeApi";


const John = () => {
  const [toDo, setToDo] = useState(false);
  return (
    <div className="playArea">
      <h1>hello</h1>
      {toDo && <ToDoTemplate />}
      <button onClick={() => setToDo(!toDo)}> ToDo </button>
      <Textbox />
      <MemeGenerator/>
    </div>
  );
};

export default John;
