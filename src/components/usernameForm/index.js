import { useState } from "react";
import { addUser, login } from "../../utils";
import { AiOutlineCloseCircle } from "react-icons/ai";







export const UsernameForm = (props) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [logBool, setLogBool] = useState(false);
  const [btn, setBtn] = useState("Login");


 
  const btnContent = (e) => {
    if (!logBool) {
      setBtn("Sign Up");
      setLogBool(true);
    } else {
      setBtn("Login");
      setLogBool(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!logBool) {
      addUser(username, email, password, props.setUser);
    } else  {
      login(username, password, props.setUser);
    }
    

  };

 
  return (
    //Modal
   
     
   
    <div className="modal">
    
         <div className="front-cover">
        <div className="first-half"></div>
        <div className="second-half"></div>  
       
      </div>
      <div className="middleleft"></div>
      <div className="middleright"></div>
      
      <div className="back-cover">
    
      
    
      <form onSubmit={submitHandler} className="form">
      {props.user && <h1>{props.user}</h1>}
      <div className="Avatar">
       
      </div>
      <button onClick={(e) => btnContent()}>{btn} </button>
        <input
        id="Username"
          className="inputs"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        
        {!logBool && (
          <input
            className="inputs"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        )}
        <input
          className="inputs"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <button type="submit">Submit</button>
      </form>
      </div>
     
    </div>
    
   
  );
};

