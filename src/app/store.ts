import { appReducer } from './app-reducer'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {authReducer} from "../features/auth/auth-reducer";

const reducers = combineReducers({
  app: appReducer,
  auth:authReducer
})

const store = legacy_createStore(reducers, applyMiddleware(thunk))

export default store

export type AppStoreType = ReturnType<typeof reducers>
export type AppThunkDispatch = ThunkDispatch<AppStoreType, any, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStoreType, unknown, AnyAction>>()
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector

// @ts-ignore
window.store = store // for dev // для того чтобы автотесты видели состояние данных
