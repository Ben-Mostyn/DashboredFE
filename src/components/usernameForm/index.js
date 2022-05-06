import { useState } from "react";
import { addUser, login } from "../../utils";


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
    } else {
      login(username, password, props.setUser);
    }
  };

  return (
    <div className="modal">
      <div className="back-cover">

      <div className="logo">logo</div>

        <form onSubmit={submitHandler} className="form">
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

          <div className="buttons">
            <button onClick={(e) => btnContent()}>{btn} </button>
            <button type="submit">Submit</button>
          </div>

          <div className="message">
            {props.user && <h1>Hi {props.user}, just logging you in..</h1>}
          </div>
        </form>
      </div>
    </div>
  );
};
