import React from "react";
// import "./SignInAndSignUpPage.scss";
import SignIn from "../SignIn/SignIn";
import SignUp from '../sign-up/SignUp'

function SignInAndSignUpPage() {
	return (
		<div className="sign-in-and-sign-up">
			<SignIn />
			<SignUp />
		</div>
	);
}

export default SignInAndSignUpPage;
