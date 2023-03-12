import React, { useState } from "react";

const Login = ({ loginListener }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const invalidInput = (idTag) => {
    document.getElementById(idTag).classList.remove("valid-input");
    document.querySelector(`[id="${idTag}"]`).classList.add("invalid-input");
  };

  const validInput = (idTag) => {
    document.getElementById(idTag).classList.remove("invalid-input");
    document.querySelector(`[id="${idTag}"]`).classList.add("valid-input");
  };

  const userLogin = async (e) => {
    e.preventDefault();
    let missingInputs = false;

    if (email === "") {
      missingInputs = true;
      invalidInput("email");
    } else {
      validInput("email");
    }
    if (password === "") {
      missingInputs = true;
      invalidInput("password");
    } else {
      validInput("password");
    }
    if (missingInputs) {
      return;
    }
    loginListener(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="authentication-container md:min-w-1/4">
      <form className="authentication-form-container" onSubmit={userLogin}>
        <h1 className="authentication-header">Login</h1>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
          className="authentication-input"
          id="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Password"
          className="authentication-input"
          id="password"
        />
        <input
          type="submit"
          value="Log In"
          className="authentication-input-submit"
        />
      </form>
    </div>
  );
};

export default Login;
