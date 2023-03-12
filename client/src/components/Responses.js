import React from "react";

const Response = ({ content, user }) => {
  return (
    <>
      <div className={user ? "inset-y-0 right-0 w-3/4" : ""}>{content}</div>
      <br />
    </>
    );
};

export default Response;
