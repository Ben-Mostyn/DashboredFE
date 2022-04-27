import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { DraggableCore } from "react-draggable";

function Textbox() {
  const [showBtn, setShowBtn] = useState(false);
  const [textArea, setTextArea] = useState([]);
  const [activeDrags, setActiveDrags] = useState(0);
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
  const [workXPs, setWorkXPs] = useState(0);
  const [textInput, setTextInput] = useState();

  // const onStart = () => {
  //   this.setActiveDrags({ activeDrags: ++this.activeDrags });
  // };

  // const onStop = () => {
  //   this.setActiveDrags({ activeDrags: --this.activeDrags });
  // };
  // const dragHandlers = { onStart: onStart, onStop: onStop };

  //   function on this button create a textbox and push into textarea array

  const createText = () => {
    setShowBtn(true);
    setWorkXPs(workXPs + 1);
    setTextArea([...textArea, textInput]);
    setTextInput();
  };

  return (
    <div>
      <button style={{ zIndex: 1 }} onClick={createText}>
        Text
      </button>

      {showBtn ? (
        <div>
          {textArea.map((workXP, i) => {
            return (
              <Draggable>
                <textarea
                  className="draggable"
                  key={i}
                  placeholder="Enter here"
                  onChange={(e) => {
                    setTextInput(e.target.value);
                  }}
                />
              </Draggable>
            );
          })}
        </div>
      ) : null}

      <button onClick={() => setShowBtn(false)}>Delete</button>
    </div>
  );
}

export default Textbox;

/* <Draggable>
             <div>
              <textarea
                style={{ zIndex: 1 }}
                placeholder="enter text here"
                id="textbox"
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </Draggable> */
