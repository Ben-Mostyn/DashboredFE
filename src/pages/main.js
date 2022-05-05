import React from "react";
import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { CirclePicker } from "react-color";
import {AiFillEdit} from "react-icons/ai"
import Star from "./Shapes/Star.png";
import circle from "../pages/Shapes/circle.png";
import moon from "../pages/Shapes/CrescentMoon.png";
import { Star1, Circle, Moon } from "../components/Shapes";

// ! COMPONENTS
import Clock from "../components/clock";
// import MemeGenerator from "../components/utilsComponents/memeApi";
import ImageHandle from "../components/utilsComponents/image-loader/image_upload";

// ! CSS
import "./main.css";
import { BiText } from "react-icons/bi";
import { FiPenTool } from "react-icons/fi";
import { HiMusicNote } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiTodoLine } from "react-icons/ri";
import { RiEmotionLaughLine } from "react-icons/ri";
import { BsChatRightQuote } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import {BiMove} from "react-icons/bi"
import "./todolist.css"
import "../components/textbox.css";
import { color } from "@cloudinary/url-gen/qualifiers/background";

const ScrapBook = ({ user, setUser }) => {
  // ! Todo state
  const [toDo, setToDo] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(""); //the one you are typing
  const [todos, setTodos] = useState([]);

  // !image state
  const [image, setImage] = useState();
  const [showImage, setShowImage] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  // ! textbox states
  const [showBtn, setShowBtn] = useState(false);
  const [textArea, setTextArea] = useState([]);
  const [textInput, setTextInput] = useState();
  // const [workXPs, setWorkXPs] = useState(0);
  // const [zIndex, setZIndex] = useState(1);

  // font changer state

  const [fontValue, setFontValue] = useState();

  // ! meme state
  const [meme, setMeme] = useState([""]);
  const [showMeme, setShowMeme] = useState(false);
  const [showMemeBtn, setShowMemeBtn] = useState(false);

  /// color picker

  const [color, setColor] = useState("ff0000");
  const [colorFont, setColorFont] = useState("ff0000");
  const [visible, setVisible] = useState(false);

  /// font size state
  const [fontSize, setFontSize] = useState(15);

  //!Quote State
  const [advice, setAdvice] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  const [showQuoteButton, setShowQuoteButton] = useState(false);

  //!Shape Model State
  const [shapeModal, setShapeModal] = useState(false);

  //!Shape States
  const [star, setStar] = useState();
  const [starArr, setStarArr] = useState([]);
  const [showStar, setShowStar] = useState(false);

  //!Circle States
  const [circle, setCircle] = useState();
  const [circleArr, setCircleArr] = useState([]);
  const [showCircle, setShowCircle] = useState(false);

  //!Crescent Moon Shapes
  const [moon, setMoon] = useState();
  const [moonArr, setMoonArr] = useState([]);
  const [showMoon, setShowMoon] = useState(false);

  //! Advice Function
  let handleFetch = async () => {
    let response = await fetch("https://api.adviceslip.com/advice");
    let data = await response.json();
    setAdvice(data.slip);
    setShowQuoteButton(true);
  };

  //!   creates textbox onclick
  const createText = () => {
    setShowBtn(true);
    setTextArea([...textArea, textInput]);
    setTextInput();
  };

  //! Creates Star PNG
  const createStar = () => {
    setShowStar(true);
    setStarArr([...starArr, setStar({ Star })]);
    setStar();
  };

  //!Creates Circle PNG
  const createCircle = () => {
    setShowCircle(true);
    setCircleArr([...circleArr, setCircle({ circle })]);
    setCircle();
  };

  //!Creates Moon PNG
  const createMoon = () => {
    setShowMoon(true);
    setMoonArr([...moonArr, setMoon({ moon })]);
    setMoon();
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
    setShowMemeBtn(true);
  };

  // !random meme gen

  // font changer

  const fontPicker = () => {
    const selectedValue = document.getElementById("list").value;
    setFontValue(selectedValue);

    console.log(selectedValue, "selectedValue");
  };

  //! Shape Modal
  const ShapeModal = () => {
    setShapeModal(true);
  };

  useEffect(() => {
    const getImages = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_REST_API}getImages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user,
          }),
        }
      );
      const json = await response.json();
      const { image: images } = json;
      setUploadedImages(images);
      console.log(uploadedImages, "i am uploaded images");
    };
    getImages();
  });

  return (
    <div>
      <div className="main">
        <div className="playArea">
          {!visible ? null : (
            <div className="fontModal">
              <div className="background">
                <h1 className="bgh1">Background</h1>
              </div>
              <div className="fontpickerdiv">
                <CirclePicker
                  className="textBackgroundPicker"
                  color={color}
                  onChangeComplete={(color) => {
                    setColor(color.hex);
                  }}
                  circleSize={12}
                  width={180}
                />
              </div>
              <div className="background1">
                <h1 className="bgh1">Font-Color</h1>
              </div>
              <div className="fontpickerdiv1">
                <CirclePicker
                  className="fontColorPicker"
                  color={colorFont}
                  onChangeComplete={(colorFont) => {
                    setColorFont(colorFont.hex);
                  }}
                  circleSize={12}
                  width={180}
                />
                {/* <button fontFamily={fontFamily} onClick={() => {setFontFamily("Arial")}}> Arial</button> */}
              </div>
              <div className="background3">
                <h1 className="bgh1">Font-style</h1>
              </div>
              <select className="dropdown" id="list" onChange={fontPicker}>
                <option value="Times New Roman" id="timesnew">
                  Times New Roman
                </option>
                <option value="Arial">Arial</option>
                <option value="Gill Sans">Gil Sans</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                {/* <option value="">Times New roman</option> */}
              </select>
              <div className="background2">
                <h1 className="bgh1">Font-Size</h1>
              </div>
              <div className="fontbuttons">
                <button
                  className="btn1"
                  id="fontbig"
                  onClick={() => {
                    setFontSize(fontSize + 2);
                  }}
                >
                  +
                </button>
                <button
                  className="btn1"
                  id="fontsmall"
                  onClick={() => {
                    setFontSize(fontSize - 2);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          )}
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
              {/* IMAGE BUTTON */}
              <button
                className="btn1"
                onClick={() => {
                  showImage ? setShowImage(false) : setShowImage(true);
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
                <HiMusicNote
                  onClick={() => {
                    !shapeModal ? setShapeModal(true) : setShapeModal(false);
                  }}
                  size={30}
                />
              </div>
            </div>

            <button
              className="btn2"
              onClick={() => {
                setUser();
                localStorage.clear();
              }}
            >
              {" "}
              <BiLogOut size={30} />
            </button>
          </div>
          <div>
            {/* <button className="textButton" onClick={createText}><BiText size={30} /></button> */}
            {shapeModal ? (
              <div className="shapeModal1">
                <button onClick={createStar}>Star</button>
                <button onClick={createCircle}>Circle</button>
                <button onClick={createMoon}>Moon</button>
              </div>
            ) : null}

            <div className="mainPlayArea">
              {/* Text Box return ///////////////////////////////////////////////////////// */}
              {showBtn ? (
                <div className="textParent">
                  {textArea.map((workXP, i) => {
                    return (
                      <Draggable handle=".handle">
                        <div className="textborder">
                          <button onClick={removeHandler} className="closeicon"  id="x">
                            <AiOutlineCloseCircle />
                          </button>
                          <div className="handle"><BiMove/></div>
                          <button style={{border: '0px solid rgba(0, 0, 0, 0.05)'}}
                            onClick={() => {
                              visible ? setVisible(false) : setVisible(true);
                            }}
                            className="editicon"
                          >
                            {" "}
                            <AiFillEdit/>
                          </button>
                          <textarea
                            className="draggable textbox"
                            id="textbox"
                            key={i}
                            placeholder="Enter here"
                            style={{
                              //style react color
                              backgroundColor: color,
                              transition: "ease all 500ms",
                              color: colorFont,
                              fontSize: `${fontSize}px`,
                              fontFamily: `${fontValue}`,
                            }}
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
              {/* /////////////////////////////////////////////////////////////////////////////// */}
              <Star1
                star={star}
                setStar={setStar}
                starArr={starArr}
                setStarArr={setStarArr}
              />
              <Circle
                circle={circle}
                setCircle={setCircle}
                circleArr={circleArr}
                setCircleArr={setCircleArr}
              />
              <Moon
                moon={moon}
                setMoon={setMoon}
                moonArr={moonArr}
                setMoonArr={setMoonArr}
              />
              {/* Quote ///////////////////////////////////////////// */}
              {showQuote ? (
                <Draggable>
                  <div className="quoteContainer draggable12">
                    <h2 className="quote" placeholder="Pick a Quote">
                      {advice.advice}
                    </h2>
                    {!showQuoteButton ? (
                      <button className="quoteBtnDefault" onClick={handleFetch}>
                        Randomize
                      </button>
                    ) : (
                      <button className="quoteBtn" onClick={handleFetch}>
                        Randomize
                      </button>
                    )}
                  </div>
                </Draggable>
              ) : null}
              {/* Meme ////////////////////////////////////////////////////// */}
              <div>
                {!showMeme ? null : (
                  <Draggable>
                    <div>
                      {!showMemeBtn ? (
                        <button onClick={fetchMeme} className="quoteBtnDefault">
                          Randomize
                        </button>
                      ) : (
                        <button className="quoteBtn" onClick={fetchMeme}>
                          Randomize
                        </button>
                      )}

                      <img
                        src={meme}
                        style={{ height: 200, width: 200 }}
                        alt="meme"
                      />
                    </div>
                  </Draggable>
                )}
              </div>{" "}
              {/* ! ImageLoaderrrrr//////////////////////////////////////////////////// */}
              <div>
                {showImage ? (
                  <ImageHandle
                    user={user}
                    image={image}
                    setImage={setImage}
                    uploadedImages={uploadedImages}
                    setUploadedImages={setUploadedImages}
                  />
                ) : null}
              </div>
              {uploadedImages.map((imageUrl, index) => (
                <img alt="uploaded" key={index} src={imageUrl} />
              ))}

              {/* to do list */}
              {!toDo ? null : (
                <Draggable>
                  <div className="todolist">
                    <h1 className="todoh1g">To do list</h1>
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
                      placeholder="Things i need to do....."
                    />

                    {todos.map((todo, index) => (
                      <div key={todo} className="todo">
                        <div
                          className="checkbox"
                          onClick={() => completeTodo(index)}
                        >
                          {todo.isCompleted && <span>&#x2714;</span>}
                        </div>
                        <div className={todo.isCompleted ? "done" : " "} id="todo">
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
          <div>
            <h1 className="userHead">{`${user}'s Dashbored`}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapBook;
