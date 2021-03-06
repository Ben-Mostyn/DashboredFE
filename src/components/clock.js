import React, { useEffect, useState } from "react";
import "./clock.css"

function Clock() {
  const [clockState, setClockState] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000);
  }, []);

  return (
 <div className="box">
  <view className="clockkk">{clockState}</view>
 </div>
  )
  }
  
export default Clock;
