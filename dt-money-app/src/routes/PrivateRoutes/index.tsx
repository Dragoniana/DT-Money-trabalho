import { Home } from '@/screens/home'
import { createStackNavigator } from '@react-navigation/stack'

export type PrivateStackParamsList = {
  Home: undefined
}

const PrivateStack = createStackNavigator<PrivateStackParamsList>()

export function PrivateRoutes() {
  return (
    <PrivateStack.Navigator
      id="PrivateStack"
      screenOptions={{ headerShown: false }}
    >
      <PrivateStack.Screen name="Home" component={Home} />
    </PrivateStack.Navigator>
  )
}