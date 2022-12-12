const initialState = {
    isLoggedIn: false,
    error: ''
}

export const authReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case "":
            return state
        default:
            return state
    }
}

///----------- actions creators -----------\\\

///----------- thunks creators -----------\\\

///----------- types -----------\\\
type InitialStateType = typeof initialState
type ActionsType = {}