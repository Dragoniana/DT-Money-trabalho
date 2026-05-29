import { useSnackbarContext } from '@/context/snackbar.context'
import clsx from 'clsx'
import { Text, View } from 'react-native'

export const SnackBar = () => {
  const { message, type } = useSnackbarContext()

  if (!message || !type) {
    return null
  }

  return (
    <View
      className={clsx(
        'absolute bottom-10 z-10 h-[50px] w-[90%] self-center justify-center rounded-xl p-2',
        {
          'bg-accent-brand-background-primary': type === 'success',
          'bg-accent-red-background-primary': type === 'error',
        },
      )}
    >
      <Text className="text-base font-bold text-white">
        {message}
      </Text>
    </View>
  )
}