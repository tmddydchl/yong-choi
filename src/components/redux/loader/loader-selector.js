import {createSelector} from 'reselect'

const selectLoader=(state)=>{
    // console.log(state)
    return state.loader
}

export const selectCurrentLoader=createSelector(
    [selectLoader],
    (loader)=>{
        // console.log(user)
        return loader.hidden
    }
)