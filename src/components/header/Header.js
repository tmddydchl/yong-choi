import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase.utils";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";
import "./Header.scss";
function Header({ currentUser }) {
  return (
    <div className="header">
      <div className="options">
        <Link className="option" to="/">
          Home
        </Link>
        <Link className="option" to="/alljob">
          Jobs
        </Link>
        <Link className="option" to="/yourjob">
          Your Ad
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  // this is built in function in 'reselect' module
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Header);
