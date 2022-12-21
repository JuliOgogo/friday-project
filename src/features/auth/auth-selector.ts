import { AppRootStateType } from '../../app/store'

export const userId = (state: AppRootStateType) => state.auth.LoginParams._id
export const forgotPasswordEmailSelector = (state: AppRootStateType) => state.auth.email
export const forgotPasswordCheckSelector = (state: AppRootStateType) => state.auth.check
export const registrationSelector = (state: AppRootStateType) => state.auth.isRegistration
export const userNameSelector = (state: AppRootStateType) => state.auth.LoginParams.name
export const userEmailSelector = (state: AppRootStateType) => state.auth.LoginParams.email
