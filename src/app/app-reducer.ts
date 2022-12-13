const initialState = {
    isInitialized: false as boolean,
    status: "idle" as RequestStatusType,
    error: null as null | string
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, ...action.payload}
        default:
            return state
    }
}

///----------- actions creators -----------\\\
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
export const setAppIsInitializedAC = (isInitialized: boolean) =>
    ({
        type: "APP/SET-IS-INITIALIZED",
        payload: {
            isInitialized
        }
    } as const)

///----------- types -----------\\\
export type InitialStateType = typeof initialState
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedAppType = ReturnType<typeof setAppIsInitializedAC>
type ActionsType = SetAppStatusType | SetAppErrorType | SetIsInitializedAppType


