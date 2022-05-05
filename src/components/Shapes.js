import Star from "../pages/Shapes/Star.png";
import Circle1 from "../pages/Shapes/circle.png";
import Moon1 from "../pages/Shapes/CrescentMoon.png";
import Draggable from "react-draggable";
import "../pages/main.css";
import { AiOutlineClose } from "react-icons/ai";

export function Star1({ star, setStar, starArr, setStarArr }) {
  const removeHandler = (index, i) => {
    let storedArr = [...starArr];
    setStarArr(storedArr);
    storedArr.splice(index, 1);
  };
  return (
    <div className="shapeContainer">
      {starArr.map((i) => {
        return (
          <Draggable>
            <div>
              <button className="ShapeBtn" onClick={removeHandler}>
                <AiOutlineClose size={20} />
              </button>
              <img
                src={Star}
                onChange={(e) => {
                  setStar(e.target.value);
                }}
                style={{
                  height: 100,
                  width: 100,
                  position: "absolute",
                  zIndex: 1,
                }}
                index={i}
              />
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}

export function Circle({ circle, setCircle, circleArr, setCircleArr }) {
  const removeHandler = (index, i) => {
    let storedArr = [...circleArr];
    setCircleArr(storedArr);
    storedArr.splice(index, 1);
  };
  return (
    <div>
      {circleArr.map((i) => {
        return (
          <Draggable>
            <div className="shapeContainer">
              <button className="ShapeBtn" onClick={removeHandler}>
                <AiOutlineClose size={20} />
              </button>

              <img
                src={Circle1}
                onChange={(e) => {
                  setCircle(e.target.value);
                }}
                style={{
                  height: 150,
                  width: 150,
                  position: "absolute",
                  zIndex: 2,
                }}
                index={i}
              />
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}

export function Moon({ moon, setMoon, moonArr, setMoonArr }) {
  const removeHandler = (index, i) => {
    let storedArr = [...moonArr];
    setMoonArr(storedArr);
    storedArr.splice(index, 1);
  };
  return (
    <div className="shapeContainer">
      {moonArr.map((i) => {
        return (
          <Draggable>
            <div>
              <button className="ShapeBtn" onClick={removeHandler}>
                <AiOutlineClose size={20} />
              </button>
              <img
                src={Moon1}
                onChange={(e) => {
                  setMoon(e.target.value);
                }}
                style={{
                  height: 200,
                  width: 200,
                  position: "absolute",
                  zIndex: 3,
                }}
                index={i}
              />
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}
