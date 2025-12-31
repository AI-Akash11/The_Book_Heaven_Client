import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = ({
  fullScreen = true,
  message = "Loading Book Haven...",
  size = 50,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "min-h-screen" : "py-12"
      }`}
    >
      <ClipLoader
        size={size}
        color="var(--color-primary)"
        aria-label="Loading"
      />

      <p className="text-sm font-medium text-base-content opacity-80">
        {message}
      </p>
    </div>
  );
};

export default Loading;
