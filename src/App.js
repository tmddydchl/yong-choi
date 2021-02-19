import React from 'react';
import './App.css'
import Main from './Main'
import { connect } from "react-redux"
import AddJobInfo from './components/Add-Job-Info//AddJobInfo'
import JobPage from './components/Job-Page/JobPage'
import {
    BrowserRouter as Router, Route, Switch, Redirect
} from 'react-router-dom';
import Header from './components/header/Header'
import SignInAndSignUpPage from './components/sign-in-and-sign-out/SignInAndSignUpPage'
import {
	auth,
	createUserProfileDocument,
	// addCollectionAndItem,
} from "./components/firebase/firebase.utils";
import { setCurrentUser } from "./components/redux/user/user-actions"
class App extends React.Component {
  	// constructor() {
	// 	super();
	// 	this.state = {
	// 		currentUser: null,
	// 	};
	// }

	// above is replaced with redux
	unsubscribeFromAuth = null;

	componentDidMount() {
		const {
			setCurrentUser,
			// collections
		} = this.props;
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			console.log(userAuth);
			// this is function inside auth library.
			// this.setState({currentUser:user}) // this grabs the users data when auth.onAuthStateChanged gives the data of an user that has logged in. Remember with monogodb token needs to be stored somewhere (usually local storage)to authenticate the user however this function does all that automatically.
			// createUserProfileDocument(userAuth)
			if (userAuth) {
				const userId = await createUserProfileDocument(userAuth);
				userId.onSnapshot((userData) => {
					// onSnapshot is built function in firebase that retrives data associated with the 'id' from the google login.
					// this.setState (// without redux
					// 	{
					// 		currentUser: {
					// 			id: userData.id,
					// 			...userData.data(),
					// 		},
					// 	},
					// 	() => {
					// 		console.log(this.state);
					// 	}
					// );
					setCurrentUser(
						// instead of saving the state locally it is passed to redux store
						{
							id: userData.id,
							...userData.data(),
						}
						// ,
						// () => {
						// 	console.log(this.state);
						// }
					);
				});
			}
			//this.setState({currentUser:userAuth}) -- with out redux
			setCurrentUser(userAuth); // -- with redux. This is necessary when user logs out and userAuth becomes 'null' the currentUser will store the value of null
			// addCollectionAndItem(
			// 	"collections",
			// 	collections.map(({ title, items }) => {
			// 		return {
			// 			title,
			// 			items,
			// 		};
			// 	})
			// );
		});
	}
	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

  
  render(){
  return (
    <div className="App">
      <Router>
      <Header />
      <Switch>
      <Route exact path='/' component={Main}/>
      <Route path='/yourjob' component={AddJobInfo}/>
      <Route path='/alljob' component={JobPage}/>
      
      <Route
								exact
								path="/signin"
								render={() => {
									return this.props.currentUser ? ( // what this will do if if currentUser is not 'null' it will redirect the page to the home page
										<Redirect to="/" />
									) : (
										<SignInAndSignUpPage />
									);
								}}
							/>
      </Switch>
      </Router>
    </div>
    
  );
  }
}
const mapStateToProps = (state) => {
	return {
		currentUser: state.users.currentUser,
		// collections: selectCollections(state),
	};
};
// above can be changed with reselector but I have decided not to because I need to know how the basic level look like without implementing selectors.

const mapDispatchToProps = (dispatch) => {
	return { setCurrentUser: (user) => dispatch(setCurrentUser(user)) }; 
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
