import React from "react";

const Button = ({ changeValueHandler, value, valueSetter, closer }) => {
  return (
    <button
      className="bg-green-700 py-1.5 text-white rounded-md"
      onClick={() => {
        changeValueHandler(value, valueSetter);
        closer();
      }}
      id={value}
    >
      {" "}
      {value}{" "}
    </button>
  );
};

export default Button;
