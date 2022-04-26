import { useState } from "react";
import { addUser, login } from "../../utils";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const UsernameForm = (props) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [logBool, setLogBool] = useState(false);
  const [btn, setBtn] = useState("Login");

  if (!props.show) {
    return null;
  }
  const btnContent = (e) => {
    if (!logBool) {
      setBtn("Sign Up");
      setLogBool(true);
    } else {
      setBtn("Login");
      setLogBool(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!logBool) {
      addUser(username, email, password, props.setUser);
    } else {
      login(username, password, props.setUser);
    }
  };
  return (
    <div className="modal">
      {props.user && <h1>{props.user}</h1>}
      <button onClick={(e) => btnContent()}>{btn} </button>
      <form onSubmit={submitHandler} className="form">
        <input
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
      <button className="close-btn" onClick={props.onClose}>
        <AiOutlineCloseCircle />
      </button>
    </div>
  );
};
