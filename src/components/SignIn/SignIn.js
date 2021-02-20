import React from "react";
import "./SignIn.scss";
import FormInput from "../form-input/FormInput";
import CustomButton from "../custom-button/CustomButton";
import { auth, signInWithGoogle } from "../firebase/firebase.utils";

import GoogleIcon from "./GoogleIcon";
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  handleSumbit = async (e) => {
    e.preventDefault();
    // this.setstate({ email: "", password: "" });
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password); // this authenticates the user with provdied email and password.
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            // className='InputForm'
            handleChange={this.handleChange}
            name="email"
            type="email"
            value={this.state.email}
            required
            label="EMAIL"
          />
          <FormInput
            // className='InputForm'
            handleChange={this.handleChange}
            name="password"
            type="password"
            value={this.state.password}
            required
            label="PASSWORD"
          />
          <div className="buttons">
            <CustomButton type="submit"> sign in</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              <div className="google-icon">
                <GoogleIcon />
              </div>
              sign in with google /
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
