import { useState, useEffect } from "react";
import "./App.css";
import { UsernameForm } from "./components/usernameForm";
import Navbar from "./components/Navbar";
import { tokenCheck } from "./utils";
import ToDoTemplate from "./components/ToDo/ToDo";


const App = () => {
  const [user, setUser] = useState();
  const [toDo, setToDo] = useState(false);

  useEffect(() => {
    if (localStorage.key("myToken")) {
      tokenCheck(setUser);
    }
  }, []);
  //DevCom
  return (
    <div className="full">
    
       
      <UsernameForm
        setUser={setUser}
        user={user}
        />
      
      {toDo && <ToDoTemplate/>}
      <button onClick = {()=>setToDo(!toDo)}> ToDo </button>
      
    </div>
  );
};

export default App;
