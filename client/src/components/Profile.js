import React from "react";
import Modal from "./Modal";

const Profile = () => {
  const [position, setPosition] = React.useState("Position");
  const [ambiance, setAmbiance] = React.useState("Ambiance");
  const [positionIsShowing, setPositionIsShowing] = React.useState(false);
  const [ambianceIsShowing, setAmbianceIsShowing] = React.useState(false);
  const positionList = [
    "Full Stack Intern",
    "Software Engineer",
    "Data Scientist",
  ];
  const ambianceList = ["Casual", "Normal", "Intense"];

  const modalListener = (state, setter) => {
    setter(!state);
  };

  // Also need to ad a tag where if there are no history chat, don't show the button else show
  return (
    <>
      <main className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 h-1/2 shadow-lg border-1 bg-green-50 border-gray-300 rounded-md">
        <div className="flex flex-col w-full h-full justify-center items-center gap-3">
          <button
            className="w-3/4 bg-blue-900 h-8 subpixel-antialiased font-semibold text-white rounded-sm"
            onClick={() => {
              modalListener(positionIsShowing, setPositionIsShowing);
            }}
          >
            {position}
          </button>
          <button
            className="w-3/4 bg-blue-900 h-8 subpixel-antialiased font-semibold text-white rounded-sm"
            onClick={() => {
              modalListener(ambianceIsShowing, setAmbianceIsShowing);
            }}
          >
            {ambiance}
          </button>
        </div>
      </main>
      {positionIsShowing && (
        <Modal
          title={"Position"}
          items={positionList}
          valueListener={setPosition}
          state={positionIsShowing}
          setter={setPositionIsShowing}
          modalListener={modalListener}
        />
      )}
      {ambianceIsShowing && (
        <Modal
          title={"Ambiance"}
          items={ambianceList}
          valueListener={setAmbiance}
          state={ambianceIsShowing}
          setter={setAmbianceIsShowing}
          modalListener={modalListener}
        />
      )}
    </>
  );
};

export default Profile;
