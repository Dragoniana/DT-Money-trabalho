import { Login } from '@/screens/login'
import { Register } from '@/screens/register'
import { createStackNavigator } from '@react-navigation/stack'

export type PublicStackParamsList = {
  Login: undefined
  Register: undefined
}

const PublicStack = createStackNavigator<PublicStackParamsList>()

export function PublicRoutes() {
  return (
    <PublicStack.Navigator id="PublicStack" screenOptions={{ headerShown: false }}>
      <PublicStack.Screen name="Login" component={Login} />
      <PublicStack.Screen name="Register" component={Register} />
    </PublicStack.Navigator>
  )
}