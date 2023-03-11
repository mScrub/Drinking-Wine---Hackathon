import React from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
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
    if (!state) {
      document.getElementById("buttonContainer").classList.add("opacity-0");
    } else {
      document.getElementById("buttonContainer").classList.remove("opacity-0");
    }
  };

  const valueListener = (value, setter) => {
    setter(value);
  };

  const commenceInterview = () => {
    navigate("/chat", {
      state: { position: position, ambiance: ambiance },
      replace: true,
    });
  };

  // Also need to ad a tag where if there are no history chat, don't show the button else show
  return (
    <>
      <main className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 h-1/2 shadow-lg border-1 bg-green-50 ring-inset">
        <div
          id="buttonContainer"
          className="flex flex-col w-full h-full justify-center items-center gap-3"
        >
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
          {position !== "Position" && ambiance !== "Ambiance" && (
            <button
              className="w-1/2 bg-red-700 p-1 subpixel-antialiased font-semibold text-white rounded-sm"
              onClick={commenceInterview}
            >
              {" "}
              Start Interview{" "}
            </button>
          )}
        </div>
      </main>
      {positionIsShowing && (
        <Modal
          title={"Choose your Position"}
          items={positionList}
          valueListener={setPosition}
          state={positionIsShowing}
          modalSetter={setPositionIsShowing}
          modalListener={modalListener}
        />
      )}
      {ambianceIsShowing && (
        <Modal
          title={"Choose the Ambiance"}
          items={ambianceList}
          valueListener={setAmbiance}
          valueSetter={valueListener}
          state={ambianceIsShowing}
          modalSetter={setAmbianceIsShowing}
          modalListener={modalListener}
        />
      )}
    </>
  );
};

export default Profile;
