import { useState, useEffect } from "react";
import "./App.css";
import { UsernameForm } from "./components/usernameForm";
import { tokenCheck } from "./utils";
import "./components/usernameForm/index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ScrapBook from "./pages/main";

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.key("myToken")) {
      tokenCheck(setUser);
    }
  }, []);
  //DevCom
  return (
    <Router>
      {!user && <Navigate to="/" />}
      {user && <Navigate to="/main" />}

      <Routes>
        <Route
          path="/"
          element={<UsernameForm setUser={setUser} user={user} />}
        />
        <Route
          path="/main"
          element={<ScrapBook setUser={setUser} user={user} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
