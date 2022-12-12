import {LoginDataType} from "./login/loginForm/LoginForm";
import {Dispatch} from "redux";
import {authAPI} from "./auth-api";
import {SetAppErrorType, setAppStatusAC, SetAppStatusType} from "../../app/app-reducer";

const initialState = {
    isLoggedIn: false,
    error: ""
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "LOGIN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

///----------- actions creators -----------\\\
export const isLoggedInAC = (value: boolean) =>
    ({type: "LOGIN", value} as const)

///----------- thunks creators -----------\\\
export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        const responce = await authAPI.login(data)
        if (responce.data)
            dispatch(isLoggedInAC(true))
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        //console.log('Error: ', {...e})
    }
}

///----------- types -----------\\\
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof isLoggedInAC> | SetAppStatusType | SetAppErrorType