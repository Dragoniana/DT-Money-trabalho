import { useAuthContext } from '@/context/auth.context'
import { colors } from '@/shared/colors'
import { type FC, useEffect } from 'react'
import { ActivityIndicator, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface LoadingParams {
  setLoading: (value: boolean) => void
}

export const Loading: FC<LoadingParams> = ({ setLoading }) => {
  const { restoreUserSession, handleLogout } = useAuthContext()

  useEffect(() => {
    ;(async () => {
      try {
        const user = await restoreUserSession()

        if (!user) {
          await handleLogout()
        }
      } catch {
        await handleLogout()
      } finally {
        setLoading(false)
      }
    })()
  }, [handleLogout, restoreUserSession, setLoading])

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-background-primary">
      <Image
        source={require('@/assets/logo.png')}
        className="h-[48px] w-[255px]"
        resizeMode="contain"
      />

      <ActivityIndicator color={colors.white} className="mt-20" />
    </SafeAreaView>
  )
}