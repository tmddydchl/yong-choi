// this creates Action
//redux flow
// Action --> Reducer --> Store --> DOM changes
import {UserActionTypes} from './user-types' // this is to prevent type errors when writing the same string multiple times 
export const setCurrentUser=user=>{
    return {type:UserActionTypes.SET_CURRENT_USER,
payload:user} // "type" MUST match with one of the cases in user-reducer
}