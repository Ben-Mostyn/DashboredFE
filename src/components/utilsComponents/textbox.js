import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { DraggableCore } from "react-draggable";
import "../utilsComponents/textbox.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Textbox({}) {
  const [showBtn, setShowBtn] = useState(false);
  const [textArea, setTextArea] = useState([]);
  const [activeDrags, setActiveDrags] = useState({ zIndex: 10 });
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
  const [workXPs, setWorkXPs] = useState(0);
  const [textInput, setTextInput] = useState();
  const [zIndex, setZIndex] = useState(1);

  // const onStart = () => {
  //   this.setActiveDrags({ activeDrags: ++activeDrags });
  // };

  // const onStop = () => {
  //   this.setActiveDrags({ activeDrags: --this.activeDrags });
  // };
  // const dragHandlers = { onStart: onStart, onStop: onStop };

  //   function on this button create a textbox and push into textarea array

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

  //   const tbox = document.getElementById("x")
  // const hover = ()=>{
  //   if(tbox.style.display="none" == "none"){
  //     tbox.style.display="block";}
  //     else{tbox.style.display="none"}

  // }

  return (
    <div>
      <button onClick={createText}>Text</button>

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
    </div>
  );
}

export default Textbox;
