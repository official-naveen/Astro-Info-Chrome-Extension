import React from "react";

const LoadingSpinner = () => {
  return (
    <>
      <div
        style={{
          background: "#213159",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="https://i.giphy.com/media/l1KVcrdl7rJpFnY2s/giphy.webp"
          alt="loading"
        />
      </div>
    </>
  );
};

export default LoadingSpinner;
