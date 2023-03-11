import React from "react";

const Button = ({ changeValueHandler, value, valueSetter }) => {
  return (
    <button
      onClick={() => {
        changeValueHandler(value, valueSetter);
      }}
      id={value}
    >
      {" "}
      {value}{" "}
    </button>
  );
};

export default Button;
