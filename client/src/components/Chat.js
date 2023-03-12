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
  const navigate = useNavigate();
  const testing = [
    {
      role: "assistant",
      content:
        "Hi there! Thanks for coming in today. Can you tell me a little about your software engineering background and experience?",
    },
    {
      role: "user",
      content:
        "Hey, good morning as well. Thanks. Thank you for inviting me. I am currently at BCIT student and I do have. I unfortunately don't have any experience at work, but I do have experience with personal projects.",
    },
    {
      role: "assistant",
      content:
        "That's great to hear! can you tell me a bit more about the personal projects that you have worked on? What programming languages and tools did you use? What were the challenges you faced and how did you overcome them?",
    },
    {
      role: "user",
      content: "Actually, that's more like it, yeah.",
    },
    {
      role: "assistant",
      content:
        "Hi there! Thanks for coming in today. Can you tell me a little about your software engineering background and experience?",
    },
    {
      role: "user",
      content:
        "Hey, good morning as well. Thanks. Thank you for inviting me. I am currently at BCIT student and I do have. I unfortunately don't have any experience at work, but I do have experience with personal projects.",
    },
    {
      role: "assistant",
      content:
        "That's great to hear! can you tell me a bit more about the personal projects that you have worked on? What programming languages and tools did you use? What were the challenges you faced and how did you overcome them?",
    },
    {
      role: "user",
      content: "Actually, that's more like it, yeah.",
    },
  ];
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
        });
    };
    setWaiting(false);
    sendInformation();
    console.log(messages);
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
        });
    }, 1000);
    setWaiting(false);
    console.log(messages);
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
