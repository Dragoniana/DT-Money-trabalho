import { type FormLoginParams } from '@/screens/login/LoginForm/schema'
import { type FormRegisterParams } from '@/screens/register/RegisterForm/schema'
import { type IAuthenticateResponse } from '@/shared/interfaces/http/authenticate-response'
import { type IUser } from '@/shared/interfaces/user.interface'
import * as AuthServices from '@/shared/services/dtMoney/auth.service'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react'

const STORAGE_KEY = 'dt-money-user'

type AuthContextType = {
  user: IUser | null
  token: string | null
  handleAuthenticate: (params: FormLoginParams) => Promise<void>
  handleRegister: (params: FormRegisterParams) => Promise<void>
  handleLogout: () => Promise<void>
  restoreUserSession: () => Promise<string | null>
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [token, setToken] = useState<string | null>(null)

  async function saveUserSession(data: IAuthenticateResponse) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))

    setUser(data.user)
    setToken(data.token)
  }

  async function handleAuthenticate(userData: FormLoginParams) {
    const data = await AuthServices.authenticate(userData)

    await saveUserSession(data)
  }

  async function handleRegister(formData: FormRegisterParams) {
    const data = await AuthServices.registerUser(formData)

    await saveUserSession(data)
  }

  async function handleLogout() {
    await AsyncStorage.removeItem(STORAGE_KEY)

    setUser(null)
    setToken(null)
  }

  async function restoreUserSession() {
    const userData = await AsyncStorage.getItem(STORAGE_KEY)

    if (userData) {
      const { user, token } = JSON.parse(userData) as IAuthenticateResponse

      setUser(user)
      setToken(token)
    }

    return userData
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        handleAuthenticate,
        handleRegister,
        handleLogout,
        restoreUserSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  return context
}