// this creates Action
//redux flow
// Action --> Reducer --> Store --> DOM changes
import { LoaderActionTypes } from "./loader-types"; // this is to prevent type errors when writing the same string multiple times
export const setLoader = () => {
  return { type: LoaderActionTypes.SET_LOADER }; // "type" MUST match with one of the cases in user-reducer
};
