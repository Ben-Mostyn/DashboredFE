import { useState, useEffect } from "react";
import "./App.css";
import { UsernameForm } from "./components/usernameForm";
import Navbar from "./components/Navbar";
import { tokenCheck } from "./utils";

const App = () => {
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.key("myToken")) {
      tokenCheck(setUser);
    }
  }, []);
  //DevCom
  return (
    <div className="full">
      <nav classname="nav">
        <Navbar setShow={setShow} />
      </nav>

      <UsernameForm
        setUser={setUser}
        user={user}
        onClose={() => setShow(false)}
        show={show}
      />
      <div className="mainContent">
        <div className="App"></div>
      </div>
    </div>
  );
};

export default App;
