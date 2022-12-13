import {Dispatch} from "redux";
import {authAPI, AuthResponseType, LoginDataType} from "./auth-api";
import {
    SetAppErrorType, setAppIsInitializedAC,
    setAppStatusAC,
    SetAppStatusType, SetIsInitializedAppType
} from "../../app/app-reducer";
import {errorUtils} from "../../common/utils/error-utils";
import {RootThunkType} from "../../app/store";

const initialState = {
    isLoggedIn: false,
    error: ""
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'auth/AUTH_ME': {
            return {...state, ...action.payload}
        }
        case "AUTH/LOGIN":
            return {...state, ...action.payload}
        default:
            return state
    }
}

///----------- actions creators -----------\\\
export const authMeAC = (payload: AuthResponseType) => {
    return {
        type: 'auth/AUTH_ME',
        payload
    } as const
}
export const setLoginDataAC = (payload: AuthResponseType) =>
    ({type: "AUTH/LOGIN", payload} as const)

///----------- thunks creators -----------\\\
export const authMeTC = (): RootThunkType => async (dispatch: Dispatch<ActionsType>) => {
    setAppStatusAC('loading')
    try {
        const responce = await authAPI.me()
        dispatch(authMeAC(responce.data))
    } catch (e) {
    } finally {
        setAppStatusAC('idle')
        dispatch(setAppIsInitializedAC(true))
    }
}

export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const responce = await authAPI.login(data)
        if (responce.data)
            dispatch(setLoginDataAC(responce.data))
    } catch (e: any) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

///----------- types -----------\\\
type InitialStateType = typeof initialState
type ActionsType =
    ReturnType<typeof authMeAC>
    | ReturnType<typeof setLoginDataAC>
    | SetAppStatusType
    | SetAppErrorType
    | SetIsInitializedAppType