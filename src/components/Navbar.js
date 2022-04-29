import { IoPersonCircleOutline } from "react-icons/io5";
import {BiText} from "react-icons/bi"
import {BsCalendar2DateFill} from "react-icons/bs"
import {BiWebcam} from "react-icons/bi"
import {FiPenTool} from "react-icons/fi"
import {AiOutlineGif} from "react-icons/ai"
import {HiMusicNote} from "react-icons/hi"

const Navbar = () => {





  return (
    
    // <div className="main">
    <div className="nav">
     
      <div className="half1">
    <div className="btn1" id="icon1">  <BiText size={30}/> </div>
    <div className="btn1"> <BsCalendar2DateFill size={30}/> </div>
    <div className="btn1"> <BiWebcam size={30}/></div>
    <div className="btn1"> <FiPenTool size={30}/> </div>
    <div className="btn1"> <AiOutlineGif size={30}/></div>
    <div className="btn1"><HiMusicNote size={30}/></div>
    </div>

    {/* <div className="half3">
     
    </div>
    <div className="half2">
    <div className="circle">
      <div className="circle1"></div>
    </div>
        </div>
    </div> */}
   </div>
  );
};

export default Navbar;
