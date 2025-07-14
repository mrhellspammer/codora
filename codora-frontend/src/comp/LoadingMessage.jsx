import React from "react";

const LoadingMessage = ({ message = "Waking up the secure servers… thanks for your patience!" }) => {
  return (
    <div className="flex items-center justify-center mt-2 gap-2 z-5000">
      <div className="animate-spin inline-block p-2 w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      <p className="ml-2 text-green-500 text-xs">{message}</p>
    </div>
  );
};

export default LoadingMessage;
