import React from "react";
import ToDoTemplate from "../components/utilsComponents/todo";
import { useState } from "react";
import Textbox from "../components/utilsComponents/textbox";
import "./main.css";
import Draggable from "react-draggable";
import { DraggableCore } from "react-draggable";

import Upload from "../components/utilsComponents/image-loader/image_upload";
// import  NavBar from "../components/Navbar";
import Clock from "../components/clock";
// import Modal from "src/components/modal.js"
import { IoPersonCircleOutline } from "react-icons/io5";
import { BiText } from "react-icons/bi";
import { BsCalendar2DateFill } from "react-icons/bs";
import { BiWebcam } from "react-icons/bi";
import { FiPenTool } from "react-icons/fi";
import { AiOutlineGif } from "react-icons/ai";
import { HiMusicNote } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../components/textbox.css";

// import App from "../utils/index";

// import MemeGenerator from "../components/utilsComponents/memeApi";

import ImageHandle from "../components/utilsComponents/image-loader/image_upload";

import { color } from "@cloudinary/url-gen/qualifiers/background";

const ScrapBook = ({ user, setUser }) => {
  const [toDo, setToDo] = useState(false);
  const [image, setImage] = useState();

  //Testing

  const [showBtn, setShowBtn] = useState(false);
  const [textArea, setTextArea] = useState([]);
  const [textInput, setTextInput] = useState();
  const [activeDrags, setActiveDrags] = useState({ zIndex: 10 });
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
  const [workXPs, setWorkXPs] = useState(0);
  const [zIndex, setZIndex] = useState(1);

  //!   creates textbox onclick
  const createText = () => {
    setShowBtn(true);
    setTextArea([...textArea, textInput]);
    setTextInput();
  };

  //   !deletes targeted textbox
  const removeHandler = (index, i) => {
    let storedArr = [...textArea];
    storedArr.splice(index, 1);
    setTextArea(storedArr);
  };

  ////////////////To Do Functionality
  const [currentTodo, setCurrentTodo] = useState(""); //the one you are typing
  const [todos, setTodos] = useState([
    //the ones you have already written
    {
      todo: "Add new todo",
      isCompleted: true,
    },
  ]);
  const createNewTodo = (currentTodo) => {
    let todosArray = [...todos];
    todosArray.push({ todo: currentTodo, isCompleted: false });
    setTodos(todosArray);
  };
  const completeTodo = (index) => {
    let todosArray = [...todos];
    todosArray[index].isCompleted = !todosArray[index].isCompleted;
    setTodos(todosArray);
  };

  const deleteTodo = (index) => {
    let todosArray = [...todos];
    todosArray.splice(index, 1);
    setTodos(todosArray);
  };

  return (
    <div>
      <div className="main">
        <div className="playArea">
          <Clock />
          <div className="nav">
            <div className="half1">
              <button className="btn1" onClick={createText}>
                <BiText size={30} />
              </button>{" "}
              {/* working*/}
              <button className="btn1" onClick={() => setToDo(!toDo)}>
                {" "}
                <BsCalendar2DateFill size={30} />{" "}
              </button>
              <div className="btn1">
                {" "}
                <BiWebcam size={30} />
              </div>
              <div className="btn1">
                {" "}
                <FiPenTool size={30} />{" "}
              </div>
              <div className="btn1">
                {" "}
                <AiOutlineGif size={30} />
              </div>
              <div className="btn1">
                <HiMusicNote size={30} />
              </div>
            </div>

            <button
              onClick={() => {
                setUser();
                localStorage.clear();
              }}
            >
              Logout
            </button>
            <h1>hello!</h1>

            {/* <MemeGenerator /> */}

            <ImageHandle />
          </div>
          <div>
            {/* <button className="textButton" onClick={createText}><BiText size={30} /></button> */}

            <div className="mainPlayArea">
              {/* Text Box return ///////////////////////////////////////////////////////// */}
              {showBtn ? (
                <div className="textParent">
                  {textArea.map((workXP, i) => {
                    return (
                      <Draggable handle=".handle">
                        <div>
                          <button onClick={removeHandler} id="x">
                            <AiOutlineCloseCircle />
                          </button>
                          <div className="handle">Drag Me!</div>
                          <textarea
                            className="draggable textbox"
                            id="textbox"
                            key={i}
                            placeholder="Enter here"
                            onChange={(e) => {
                              setTextInput(e.target.value);
                            }}
                            cols={20}
                            rows={8}

                            //  onMouseOver={hover}
                          />
                        </div>
                      </Draggable>
                    );
                    // <button onClick={() => setShowBtn(false)}>Delete</button>;
                  })}
                </div>
              ) : null}

              {/* //////////To Do List */}
              {!toDo ? null : (
                <Draggable>
                  <div className="todolist">
                    <h1>ToDo List!</h1>
                    <input
                      className="todo-input"
                      value={currentTodo}
                      onChange={(e) => {
                        setCurrentTodo(e.target.value);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          createNewTodo(currentTodo);
                          setCurrentTodo(" ");
                        }
                      }}
                      placeholder="What do you need ToDo?"
                    />

                    {todos.map((todo, index) => (
                      <div key={todo} className="todo">
                        <div
                          className="checkbox"
                          onClick={() => completeTodo(index)}
                        >
                          {todo.isCompleted && <span>&#x2714;</span>}
                        </div>
                        <div className={todo.isCompleted ? "done" : " "}>
                          {" "}
                          {todo.todo}
                        </div>
                        <div
                          className="delete"
                          onClick={() => deleteTodo(index)}
                        >
                          &#128465;
                        </div>
                      </div>
                    ))}
                    {todos.length > 0 && `${todos.length} items`}
                  </div>
                </Draggable>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapBook;
