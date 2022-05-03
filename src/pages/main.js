import React from "react";
import { useState } from "react";
import Draggable from "react-draggable";
import { DraggableCore } from "react-draggable";
import { CirclePicker} from 'react-color';

// ! COMPONENTS
import Upload from "../components/utilsComponents/image-loader/image_upload";
import Clock from "../components/clock";
// import MemeGenerator from "../components/utilsComponents/memeApi";
import ImageHandle from "../components/utilsComponents/image-loader/image_upload";


// ! CSS
import "./main.css";
import { IoPersonCircleOutline } from "react-icons/io5";
import { BiText } from "react-icons/bi";
import { BsCalendar2DateFill } from "react-icons/bs";
import { BiWebcam } from "react-icons/bi";
import { FiPenTool } from "react-icons/fi";
import { AiOutlineGif } from "react-icons/ai";
import { HiMusicNote } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../components/textbox.css";
import { color } from "@cloudinary/url-gen/qualifiers/background";

const ScrapBook = ({ user, setUser }) => {
  // ! Todo state
  const [toDo, setToDo] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(""); //the one you are typing
  const [todos, setTodos] = useState([]);

  // !image state
  const [image, setImage] = useState();

  // ! textbox states
  const [showBtn, setShowBtn] = useState(false);
  const [textArea, setTextArea] = useState([]);
  const [textInput, setTextInput] = useState();
  const [workXPs, setWorkXPs] = useState(0);
  const [zIndex, setZIndex] = useState(1);

  // font changer state
  
  const [fontValue, setFontValue] = useState()

  // ! meme state
  const [meme, setMeme] = useState([""]);
  const [memeBtn, setMemeBtn] = useState();
  const [memeArr, setMemeArr] = useState([]);
  const [showMeme, setShowMeme] = useState(false);

  /// color picker

 const [color, setColor] = useState('ff0000');
 const [colorFont, setColorFont] = useState('ff0000');
 const [visible, setVisible] = useState(false);

/// font size state
  const [fontSize, setFontSize] =  useState(15);


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

  // font changer
  
  const fontPicker = () => {
  const selectedValue = document.getElementById("list").value;
 setFontValue(selectedValue)
 
   console.log(selectedValue,"selectedValue")
   
 }


  return (
    <div>
      <div className="main">
        <div className="playArea">
                  
      {!visible ? null :  (
        <div className="fontModal">
        <CirclePicker className="textBackgroundPicker"color={color}   onChangeComplete={ (color) => {setColor(color.hex)}} circleSize={12} width={180}/>
         <CirclePicker className="fontColorPicker" color={colorFont}  onChangeComplete={ (colorFont) => {setColorFont(colorFont.hex)}} circleSize={12} width={180}/>
         {/* <button fontFamily={fontFamily} onClick={() => {setFontFamily("Arial")}}> Arial</button> */}
         <select className="dropdown" id="list"    onChange={fontPicker}>
           <option value="Times New Roman" >Times New Roman</option>
           <option value="Arial">Arial</option>
           <option value="Gill Sans">Gil Sans</option>
           <option value="Trebuchet MS">Trebuchet MS</option>
           {/* <option value="">Times New roman</option> */}
         </select>
         <button className="fontbig" onClick={() => {setFontSize (fontSize + 2)}}>+</button>
          <button className="fontsmall" onClick={() => {setFontSize (fontSize - 2)}}>-</button>
          </div>
          ) }
          <Clock />
          <div className="nav">
            <div className="half1">
              <button className="btn1" onClick={createText}>
                <BiText size={30}/>
              </button>{" "}
              {/* working*/}
              <button className="btn1" onClick={() => setToDo(!toDo)}>
                {" "}
                <BsCalendar2DateFill size={30} />{" "}
              </button>
              <button
                className="btn1"
                onClick={() => {
                  !showMeme ? setShowMeme(true) : setShowMeme(false);
                }}
              >
                {" "}
                <BiWebcam size={30} />
              </button>
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
                          <button onClick={ () =>{visible ? setVisible(false): setVisible(true) 
                           } }> Edit</button> 
                          <textarea
                            className="draggable textbox"
                            id="textbox"
                            key={i}
                            placeholder="Enter here"
                            style={{                          //style react color
                              backgroundColor: color,
                              transition: 'ease all 500ms',
                              color: colorFont,
                            fontSize: `${fontSize}px`,
                            fontFamily: `${fontValue}`
                           
                            }}
                            onChange={(e) => {
                              setTextInput(e.target.value);
                            }}
                            cols={20}
                            rows={8}
                            
                            
                            //  onMouseOver={hover}
                          />
                        <button onClick={() => {setFontSize (fontSize + 2)}}>+</button>
                        <button onClick={() => {setFontSize (fontSize - 2)}}>-</button>
                   
                        </div>
                      </Draggable>
                    );
                    // <button onClick={() => setShowBtn(false)}>Delete</button>;
                  })}
                </div>
              ) : null}
              <div>
                {!showMeme ? null : (
                  <div>
                    <button onClick={fetchMeme}>Meme</button>

                    <img src={meme} style={{ height: 200, width: 200 }} />
                  </div>
                )}
              </div>{" "}
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
