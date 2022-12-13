import { appReducer } from './app-reducer'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {PasswordActionsType, passwordReducer} from "../features/old/pages/password/password-reducer";

const reducers = combineReducers({
  app: appReducer,
  password: passwordReducer,
})

const store = legacy_createStore(reducers, applyMiddleware(thunk))

export default store

// types
export type AppStoreType = ReturnType<typeof reducers>
export type AppActionsType = PasswordActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AppActionsType>

// hooks
export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStoreType, unknown, AnyAction>>()
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector

// @ts-ignore
window.store = store // for dev // для того чтобы автотесты видели состояние данных
