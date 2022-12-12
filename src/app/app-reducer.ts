const initialState = {
    isLoading: false,
    status: "loading" as RequestStatusType,
    error: null as null | string
}

export const appReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.value}
        default:
            return state
    }
}

///----------- actions creators -----------\\\
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (value: string | null) => ({type: "APP/SET-ERROR", value} as const)

///----------- types -----------\\\
export type initialStateType = typeof initialState
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
type ActionsType = SetAppStatusType | SetAppErrorType


