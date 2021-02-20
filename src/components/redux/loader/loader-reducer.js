// this is user reducer which will be used to change the state in Redux "Store"
//redux flow
// Action --> Reducer --> Store --> DOM changes

import { LoaderActionTypes } from "./loader-types";

const INITIAL_STATE = {
  // Just like this.state or useState, redux needs initial state.
  hidden: null
};

const loaderReducer = (state = INITIAL_STATE, action) => {
  // the state paramter contains whatever the current state that is associated with userReducer.
  switch (
    action.type // these 'swtich' statement checks whether there is any match with the cases below. If match it will trigger case if not it will trigger default
  ) {
    case LoaderActionTypes.SET_LOADER:
      return {
        ...state, // this saves other objects or state that is already saved in "store"
        hidden: !state.hidden
      };

    default:
      return state;
  }
};

export default loaderReducer;
