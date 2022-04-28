import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { DraggableCore } from "react-draggable";

function Textbox() {
  const [showBtn, setShowBtn] = useState(false);
  const [textArea, setTextArea] = useState([]);
  // const [activeDrags, setActiveDrags] = useState({ zIndex: 10 });
  // const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
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
    setWorkXPs(workXPs + 1);
    setTextArea([...textArea, textInput]);
    setTextInput();
  };

  //   !deletes targeted textbox
  const removeHandler = (index, i) => {
    let storedArr = [...textArea];
    storedArr.splice(index, 1);
    setTextArea(storedArr);
  };

  return (
    <div>
      <button onClick={createText}>Text</button>

      {showBtn ? (
        <div className="textParent">
          {textArea.map((workXP, i) => {
            return (
              <Draggable handle=".handle">
                <div>
                  <button onClick={removeHandler}>x</button>
                  <div className="handle">Drag from here</div>
                  <textarea
                    className="draggable textbox"
                    key={i}
                    placeholder="Enter here"
                    onChange={(e) => {
                      setTextInput(e.target.value);
                    }}
                    cols={20}
                    rows={8}
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
