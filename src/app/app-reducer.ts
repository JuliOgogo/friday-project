export type initStateType = {
    isLoading: boolean
}
const initState = {
    isLoading: false
}

export const appReducer = (state: initStateType = initState, action: LoadingActionType): initStateType => {
    switch (action.type) {
        case "CHANGE_LOADING": {
            return {...state, isLoading: action.isLoading}
        }
        default:
            return state
    }
}

type LoadingActionType = {
    type: 'CHANGE_LOADING'
    isLoading: boolean
}

export const loadingAC = (isLoading: boolean): LoadingActionType => ({
    type: 'CHANGE_LOADING',
    isLoading
})
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setInitialized = (isInitialized:boolean)=>({type: 'APP/INITIALIZED', isInitialized} as const)
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setInitializedType = ReturnType<typeof setInitialized>