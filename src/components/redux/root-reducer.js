// this combines all the reducers.

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // this gives you access to localstorage from the browser.

import userReducer from "./user/user-reducer";
// import directoryReducer from "./directory/directory.reducer";
//--------------with persist---------------//
const persistConfig = {
	key: "root", // this tis required. this represents the point that the persist will start storing the reducer object or states. "root" will store everything.
	storage, // this sets the storage as "storage"
	whitelist: ["cart"], // this lets you choose what reducer you want to store. Only cart is needed as user is already save in firebase.
};
const reducer = combineReducers({
	// unlike below version this now needs to be stored in a variable and will be passed into persistReducer as a parameter.
	users: userReducer,

});

//----------------without persist-------------//
// export default combineReducers({
//     user:userReducer,
//     cart:cartReducer
// })

export default persistReducer(persistConfig, reducer);
