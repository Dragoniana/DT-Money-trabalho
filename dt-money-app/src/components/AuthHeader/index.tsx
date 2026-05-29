import { useKeyboardVisible } from '@/shared/hooks/useKeyboardVisible'
import { Image, View } from 'react-native'

export const AuthHeader = () => {
  const keyboardIsVisible = useKeyboardVisible()

  if (keyboardIsVisible) {
    return null
  }

  return (
    <View className="h-40 items-center justify-center">
      <Image
        source={require('@/assets/logo.png')}
        className="h-[48px] w-[255px]"
        resizeMode="contain"
      />
    </View>
  )
}