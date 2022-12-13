import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authReducer } from '../features/auth/auth-reducer'

import { appReducer } from './app-reducer'

const reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
})

const store = legacy_createStore(reducers, applyMiddleware(thunk))

export default store

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
>

/*// types
export type AppStoreType = ReturnType<typeof reducers>
export type AppActionsType = PasswordActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AppActionsType>

// hooks
export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStoreType, unknown, AnyAction>>()
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector*/

// @ts-ignore
window.store = store // for dev // для того чтобы автотесты видели состояние данных
