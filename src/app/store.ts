import {appReducer} from './app-reducer'
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import { AuthActionsType, authReducer } from '../features/auth/auth-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// types
export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootActionsType = AuthActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, RootActionsType>

// hooks
export const useAppDispatch = () => useDispatch<ThunkDispatch<AppRootStateType, unknown, RootActionsType>>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store // for dev // для того чтобы автотесты видели состояние данных

/*
export type AppStoreType = ReturnType<typeof reducers>
export type AppThunkDispatch = ThunkDispatch<AppStoreType, any, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStoreType, unknown, AnyAction>>()
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector
export type RootActionsType = AnyAction
export type RootThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStoreType,
    unknown,
    RootActionsType
    >*/
