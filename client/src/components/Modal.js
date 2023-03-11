import React from "react";
import Button from "./Button";

const Modal = ({
  title,
  items,
  valueListener,
  state,
  setter,
  modalListener,
}) => {
  return (
    <section className="w-full inset-0 fixed">
      <div
        className="h-min-1/2 inset-0 fixed bg-gray-700 opacity-80"
        onClick={() => modalListener(state, setter)}
      >
        <div className="bg-white">
          <h2> Choose your {title} </h2>
          <div>
            {items.map((item) => (
              <Button key={item} value={item} listener={valueListener} />
            ))}
          </div>
          <button onClick={setter}> Close </button>
        </div>
      </div>
    </section>
  );
};

export default Modal;
