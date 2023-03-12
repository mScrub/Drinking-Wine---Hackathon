import React from "react";

const Response = ({ content, role }) => {
  const user = role === "user";
  return (
    <div
      className={
        user
          ? "subpixel-antialiased font-medium text-sm leading-relaxed ml-auto max-w-[83%] text-left p-4 bg-blue-700 text-white rounded-2xl border border-slate-400"
          : "subpixel-antialiased font-medium text-sm leading-relaxed mr-auto max-w-[83%] text-left p-4 bg-gray-400 rounded-2xl border border-slate-300"
      }
    >
      {content}
    </div>
  );
};

export default Response;
