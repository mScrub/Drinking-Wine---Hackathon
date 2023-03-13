import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Response from "./Responses";
import { FaMicrophone } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";

const Chat = () => {
  const speaker = window.speechSynthesis;
  const speech = new SpeechSynthesisUtterance();
  const [openAiResponse, setOpenAiResponse] = useState("");
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [waiting, setWaiting] = useState(true);
  const { state } = useLocation();
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(async () => {
    setWaiting(true);
    const sendInformation = async () => {
      await axios
        .post("core/get_chatgpt_response/", {
          ambiance: state.ambiance,
          position: state.position,
          messages: messages,
        })
        .then((response) => {
          setMessages((messages) => [
            ...messages,
            response.data.response.choices[0].message,
          ]);
          setOpenAiResponse(response.data.response.choices[0].message.content);
        });
    };
    setWaiting(false);
    sendInformation();
  }, []);

  // Get data...
  // console.log(state.position, state.ambiance);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  useEffect(() => {
    if (openAiResponse) {
      speech.text = openAiResponse;
      speaker.speak(speech);
      setOpenAiResponse("");
    }
  }, [messages]);

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
    const newMessage = transcript;
    resetTranscript();
    setWaiting(true);
    setTimeout(async () => {
      await axios
        .post("core/get_chatgpt_response/", {
          messages: messages,
          text: transcript,
        })
        .then((response) => {
          setMessages((messages) => [
            ...messages,
            { role: "user", content: newMessage },
            response.data.response.choices[0].message,
          ]);
          setOpenAiResponse(response.data.response.choices[0].message.content);
          window.speechSynthesis.speak(speech);
        });
    }, 1000);
    setWaiting(false);
  };

  return (
    <main className="bg-gray-50 h-screen flex flex-col h-screen">
      <header className="sticky inset-x-0 top-0 py-4 mb-3 text-black bg-white border-b-2 border-gray-300 shadow-md">
        <IoIosArrowBack
          size="30"
          className="absolute inset-y-0 left-0 my-auto"
          onClick={() => {
            navigate("/");
          }}
        />
        <h1 className="text-center font-semibold pl-auto">
          {" "}
          Practice: {state.position}{" "}
        </h1>
      </header>
      <div className="flex flex-col gap-3 h-auto flex-grow">
        {messages.map((message) => (
          <Response
            key={message.content}
            content={message.content}
            role={message.role}
          />
        ))}
      </div>
      <div ref={messageEndRef} />

      {listening && (
        <>
          <div className="w-full h-full inset-0 fixed bg-gray-700 opacity-60"></div>
        </>
      )}

      {listening && transcript && (
        <div className="h-min-3/4 w-3/4 subpixel-antialiased font-medium p-4 flex flex-col bg-white opacity-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed ring-2 ring-gray-50 rounded-md">
          {transcript}
        </div>
      )}

      {waiting && (
        <div class="flex subpixel-antialiased font-medium text-sm leading-relaxed mr-auto w-fit text-left p-3 bg-gray-400 rounded-2xl border border-slate-300 space-x-2">
          <div class="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></div>
          <div class="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></div>
          <div class="w-2 h-2 bg-gray-900 rounded-full animate-pulse"></div>
        </div>
      )}

      <footer
        onClick={recording}
        className="relative inset-x-0 bottom-0 flex flex-row justify-center item-center mt-6 p-2 bg-gray-300 opacity-90 border-t-2 border-gray-200"
      >
        <FaMicrophone
          size="50"
          className="text-white bg-gray-900 p-3 rounded-full"
        />
      </footer>
    </main>
  );
};

export default Chat;
