import React from "react";

const Button = ({ valueListener, value }) => {
  return (
    <button onClick={valueListener} id={value}>
      {" "}
      {value}{" "}
    </button>
  );
};

export default Button;
