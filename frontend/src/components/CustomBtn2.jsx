import React from "react";
// import "./CustomBtn2.css";

function CustomBtn2({ children, loadingText, isLoading, onClick, type }) {
  return (
    <button
      // className={`w-full py-3 md:py-4 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed`}
      // style = {{backgroundColor: "#200B62"}}
      disabled={isLoading}
      className="button_design w-full px-3 md:px-4 py-3 md:py-3 text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed text-center cursor-pointer"
      size="lg"
      active
      onClick={onClick}
      type={type}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}

export default CustomBtn2;
