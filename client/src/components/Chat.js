import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Response from "./Responses";
import { FaMicrophone } from "react-icons/fa";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { state } = useLocation();

  // Get data...
  // console.log(state.position, state.ambiance);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  if (!browserSupportsSpeechRecognition || !isMicrophoneAvailable) {
    return <h1> Browser does not support Speech to Text d </h1>;
  }

  const recording = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      storeTranscript();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const storeTranscript = () => {
    if (transcript === "") return;
    setTimeout(() => {
      setMessages((messages) => [...messages, transcript]);
    }, 1000);
    resetTranscript();
  };

  return (
    <>
      <div>
        <h1 className="py-3 text-center font-semibold ">
          {" "}
          Practice: {state.position}{" "}
        </h1>
        <div> {transcript} </div>
        <div className="flex, flex-col">
          <Response
            content={
              "Hello! Welcome to our office. It's great to meet you in person. I'm glad you made it here safely. Please have a seat and make yourself comfortable. Can I get you some water or coffee before we start?"
            }
            user={true}
          />
          {messages.map((message) => (
            <Response key={message} content={message} />
          ))}
        </div>
      </div>

      {listening && (
        <div className="w-full h-full inset-0 fixed bg-gray-700 opacity-60"></div>
      )}
      <div
        onClick={recording}
        className="flex flex-row justify-center item-center mb-3 fixed inset-x-0 bottom-0"
      >
        <FaMicrophone
          size="50"
          className="text-white bg-blue-900 p-3 rounded-full"
        />
      </div>
    </>
  );
};

export default Chat;