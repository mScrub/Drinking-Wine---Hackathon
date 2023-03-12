import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Chat from "./components/Chat";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("core/is_logged_in/")
      .then((response) => {
        setIsLoggedIn(response.data.success);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isLoggedIn]);

  const search = async (event) => {
    console.log(email, password);
    event.preventDefault();
    axios
      .post("core/create_user/", { email: email, password: password })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const login = async (event) => {
    event.preventDefault();
    axios
      .post("core/login/", { email: email, password: password })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const write = async (event) => {
    event.preventDefault();
    axios.post("core/writing/", { name: "some name" }).then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      <div className="App">
        <form onSubmit={search} method="POST" className="">
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button onClick={search}>Click</button>
          <button onClick={login}>Login</button>
          <button onClick={write}>Write</button>
        </form>
      </div>
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={<Profile />}
            // element={isLoggedIn ? <Profile /> : <LogIn />}
          />
          <Route path="/chat" exact element={<Chat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
