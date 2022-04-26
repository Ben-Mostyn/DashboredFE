import { useState, useEffect } from "react";
import "./App.css";
import { UsernameForm } from "./components/usernameForm";
import Navbar from "./components/Navbar";
import { tokenCheck } from "./utils";

const App = () => {
  const [user, setUser] = useState();
 

  useEffect(() => {
    if (localStorage.key("myToken")) {
      tokenCheck(setUser);
    }
  }, []);

  return (
    <div className="full">
    
       
      <UsernameForm
        setUser={setUser}
        user={user}
        />
        
  
    </div>
  );
};

export default App;
