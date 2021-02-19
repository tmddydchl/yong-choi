import {createSelector} from 'reselect'

const selectUser=(state)=>{
    console.log(state)
    return state.users
}

export const selectCurrentUser=createSelector(
    [selectUser],
    (user)=>{
        console.log(user)
        return user.currentUser
    }
)