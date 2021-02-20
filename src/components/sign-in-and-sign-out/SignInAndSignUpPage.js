import React from "react";
import "./SignInAndSignUpPage.scss";
import SignIn from "../SignIn/SignIn";
import SignUp from "../sign-up/SignUp";
import Loader from "../Loader/Loader";
import { connect } from "react-redux";
import { selectCurrentLoader } from "../redux/loader/loader-selector";
import { createStructuredSelector } from "reselect";

function SignInAndSignUpPage({ loader }) {
  return (
    <div>
      {loader ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <div className="sign-in-and-sign-up">
          <SignIn />
          <SignUp />
        </div>
      )}
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  // this is built in function in 'reselect' module
  loader: selectCurrentLoader
});

export default connect(mapStateToProps)(SignInAndSignUpPage);
