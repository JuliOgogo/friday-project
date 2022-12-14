import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AuthActionsType, authReducer } from '../features/auth/auth-reducer'

import { AppActionsType, appReducer } from './app-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// types
export type AppRootStateType = ReturnType<typeof rootReducer>

// сюда добавлять все общие типы actions из reducers
export type RootActionsType = AuthActionsType | AppActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  RootActionsType
>

// hooks
export const useAppDispatch = () =>
  useDispatch<ThunkDispatch<AppRootStateType, unknown, RootActionsType>>()
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
