import { State } from "react-native-gesture-handler"

const initialState ={
    currentUser : null
}

export const user = (state = initialState, action) => {
    return {
        ...state,
        currentUser : action.currentUser
    }
}