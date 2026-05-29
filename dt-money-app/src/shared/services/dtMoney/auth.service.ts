import { type FormLoginParams } from '@/screens/login/LoginForm/schema'
import { type FormRegisterParams } from '@/screens/register/RegisterForm/schema'
import { dtMoneyApi } from '@/shared/api/dtmoney'
import { type IAuthenticateResponse } from '@/shared/interfaces/http/authenticate-response'

export const authenticate = async (
  userData: FormLoginParams,
): Promise<IAuthenticateResponse> => {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    '/auth/login',
    userData,
  )

  return data
}

export const registerUser = async (
  userData: FormRegisterParams,
): Promise<IAuthenticateResponse> => {
  const { confirmPassword, ...userDataWithoutConfirmPassword } = userData

  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    '/auth/register',
    userDataWithoutConfirmPassword,
  )

  return data
}