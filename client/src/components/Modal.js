import React from "react";
import Button from "./Button";

const Modal = ({
  title,
  items,
  valueListener,
  valueSetter,
  state,
  modalSetter,
  modalListener,
}) => {
  return (
    <section className="w-full inset-0 fixed">
      <div
        className="h-min-1/2 inset-0 fixed bg-gray-700 opacity-80"
        onClick={() => modalListener(state, modalSetter)}
      >
        <div className="bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute">
          <h2> Choose your {title} </h2>
          <div>
            {items.map((item) => (
              <Button
                key={item}
                value={item}
                changeValueHandler={valueListener}
              />
            ))}
          </div>
          <button onClick={modalSetter}> Close </button>
        </div>
      </div>
    </section>
  );
};

export default Modal;
