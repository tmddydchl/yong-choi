// this is user reducer which will be used to change the state in Redux "Store"
//redux flow
// Action --> Reducer --> Store --> DOM changes

import { UserActionTypes } from "./user-types";

const INITIAL_STATE = {
  // Just like this.state or useState, redux needs initial state.
  currentUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  // the state paramter contains whatever the current state that is associated with userReducer.
  switch (
    action.type // these 'swtich' statement checks whether there is any match with the cases below. If match it will trigger case if not it will trigger default
  ) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state, // this saves other objects or state that is already saved in "store"
        currentUser: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
