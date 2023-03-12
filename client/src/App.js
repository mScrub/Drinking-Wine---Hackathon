import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    event.preventDefault()
    axios.post("core/login/", {email: email, password: password})
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const write = async (event) => {
    event.preventDefault()
    axios.post("core/writing/", {"name": "some name"})
  }

  return (
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
  );
}

export default App;
