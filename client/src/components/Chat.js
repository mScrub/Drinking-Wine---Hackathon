import React from "react";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const { state } = useLocation();
  console.log(state);
  return <div>Chat</div>;
};

export default Chat;
