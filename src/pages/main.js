import React from "react";
import { useState } from "react";
import Draggable from "react-draggable";
import { DraggableCore } from "react-draggable";
import { Resizable } from "re-resizable";

// ! COMPONENTS
import Upload from "../components/utilsComponents/image-loader/image_upload";
import Clock from "../components/clock";
// import MemeGenerator from "../components/utilsComponents/memeApi";
import ImageHandle from "../components/utilsComponents/image-loader/image_upload";

// ! CSS
import "./main.css";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BiText } from "react-icons/bi";
import { BiWebcam } from "react-icons/bi";
import { FiPenTool } from "react-icons/fi";
import { AiOutlineGif } from "react-icons/ai";
import { HiMusicNote } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiTodoLine } from "react-icons/ri";
import { RiEmotionLaughLine } from "react-icons/ri";
import { BsChatRightQuote } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

import "../components/textbox.css";
import { color } from "@cloudinary/url-gen/qualifiers/background";

const ScrapBook = ({ user, setUser }) => {
  // ! Todo state
  const [toDo, setToDo] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(""); //the one you are typing
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState();

  // !image state
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState([]);
  const [showImage, setShowImage] = useState(false);

  // ! textbox states
  const [showBtn, setShowBtn] = useState(false);
  const [textArea, setTextArea] = useState([]);
  const [textInput, setTextInput] = useState();
  const [workXPs, setWorkXPs] = useState(0);
  const [zIndex, setZIndex] = useState(1);

  // ! meme state
  const [meme, setMeme] = useState([""]);
  const [memeBtn, setMemeBtn] = useState();
  const [memeArr, setMemeArr] = useState([]);
  const [showMeme, setShowMeme] = useState(false);

  //!Quote State
  const [advice, setAdvice] = useState("");
  const [showQuote, setShowQuote] = useState(false);

  //! Advice Function
  let handleFetch = async () => {
    let response = await fetch("https://api.adviceslip.com/advice");
    let data = await response.json();
    setAdvice(data.slip);
  };

  //!   creates textbox onclick
  const createText = () => {
    setShowBtn(true);
    setTextArea([...textArea, textInput]);
    setTextInput();
  };

  //   !deletes targeted textbox
  const removeHandler = (index, i) => {
    let storedArr = [...textArea];
    setTextArea(storedArr);
    storedArr.splice(index, 1);
  };

  // ! creates todo

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

  // ! deletes todo
  const deleteTodo = (index) => {
    let todosArray = [...todos];
    todosArray.splice(index, 1);
    setTodos(todosArray);
  };

  // ! meme generator

  const fetchMeme = async () => {
    const res = await fetch("https://api.imgflip.com/get_memes");
    const data = await res.json();
    // console.log(data.data, "i am data");
    setMeme(data.data.memes);
    let randomNum = Math.floor(Math.random() * meme.length);
    setMeme(meme[randomNum].url);
  };

  // !random meme gen

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
                <RiTodoLine size={30} />{" "}
              </button>
              <button
                className="btn1"
                onClick={() => {
                  !showMeme ? setShowMeme(true) : setShowMeme(false);
                }}
              >
                {" "}
                <RiEmotionLaughLine size={30} />
              </button>
              <button
                className="btn1"
                onClick={() => {
                  !showImage ? setShowImage(true) : setShowImage(false);
                }}
              >
                {" "}
                <FiPenTool size={30} />{" "}
              </button>
              <button
                className="btn1"
                onClick={() => {
                  !showQuote ? setShowQuote(true) : setShowQuote(false);
                }}
              >
                {" "}
                <BsChatRightQuote size={30} />
              </button>
              <div className="btn1">
                <HiMusicNote size={30} />
              </div>
            </div>

            <button className= "btn1"
              onClick={() => {
                setUser();
                localStorage.clear();
              }}
            >
             {" "}
             <BiLogOut size={30} />
            </button>


            {/* <MemeGenerator /> */}
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
              {/* Quote ///////////////////////////////////////////// */}
              {showQuote ? (
                <Draggable>
                  <div>
                    <h2>{advice.advice}</h2>
                    <button onClick={handleFetch}>Randomize Quote</button>
                  </div>
                </Draggable>
              ) : null}
              {/* Meme ////////////////////////////////////////////////////// */}
              <div>
                {!showMeme ? null : (
                  <div>
                    <button onClick={fetchMeme}>Meme</button>

                    <img src={meme} style={{ height: 200, width: 200 }} />
                  </div>
                )}
              </div>{" "}
              {/* ImageLoaderrrrr//////////////////////////////////////////////////// */}
              <div>
                {showImage ? (
                  <ImageHandle
                    user={user}
                    image={image}
                    setImage={setImage}
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                  />
                ) : null}
              </div>
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
