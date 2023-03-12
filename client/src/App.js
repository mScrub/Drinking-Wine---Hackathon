import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Chat from "./components/Chat";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    axios
      .get("core/is_logged_in/")
      .then((response) => {
        if (response.data.success) {
          setIsLoggedIn(response.data.success);
        } else {
          setIsLoggedIn(false)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isLoggedIn]);

  const login = async (email, password) => {
    axios
      .post("core/login/", { email: email, password: password })
      .then((response) => {
        if (response.data.success) {
          console.log(response);
          setIsLoggedIn(response.data.success);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={isLoggedIn ? <Profile /> : <Login loginListener={login} />}
          />
          <Route path="/chat" exact element={<Chat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
