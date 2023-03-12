import React from "react";
import Button from "./Button";
import { RiCloseCircleLine } from "react-icons/ri";

const Modal = ({
  title,
  items,
  valueListener,
  valueSetter,
  state,
  modalSetter,
  modalListener,
}) => {
  const closerModal = () => {
    modalListener(state, modalSetter);
  };

  return (
    <section className="w-full inset-0 fixed">
      <div
        className="w-full h-full inset-0 fixed bg-gray-500 opacity-60"
        onClick={closerModal}
      ></div>
      <div className=" h-min-3/4 w-3/4 p-4 flex flex-col bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed ring-2 ring-gray-50 rounded-md">
        <h2 className="text-lg font-semibold"> {title} </h2>
        <div className="mt-5 flex flex-col p-3 gap-3">
          {items.map((item) => (
            <Button
              key={item}
              value={item}
              changeValueHandler={valueListener}
              valueSetter={valueSetter}
              closer={closerModal}
            />
          ))}
        </div>
        <button className="absolute top-1 right-1 p-3" onClick={closerModal}>
          <RiCloseCircleLine size="23" className="text-red-700" />
        </button>
      </div>
    </section>
  );
};

export default Modal;
