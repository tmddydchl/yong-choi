import React from "react";

import "./CustomButton.scss";

function CustomButton({ children, inverted, isGoogleSignIn, ...rest }) {
  // console.log(children);
  return (
    <button
      className={`${inverted ? "inverted" : ""} ${
        isGoogleSignIn ? "google-sign-in" : ""
      } custom-button`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default CustomButton;
