import { colors } from '@/shared/colors'
import { MaterialIcons } from '@expo/vector-icons'
import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type AppButtonMode = 'fill' | 'outline'

interface AppButtonParams extends TouchableOpacityProps {
  mode?: AppButtonMode
  iconName?: keyof typeof MaterialIcons.glyphMap
}

export const AppButton: FC<PropsWithChildren<AppButtonParams>> = ({
  children,
  mode = 'fill',
  iconName,
  ...rest
}) => {
  const isFill = mode === 'fill'

  const childrenIsText =
    typeof children === 'string' || typeof children === 'number'

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...rest}
      className={clsx(
        'mt-8 h-button w-full flex-row items-center rounded-xl px-5',
        iconName ? 'justify-between' : 'justify-center',
        {
          'bg-accent-brand': isFill,
          'border border-accent-brand bg-transparent': !isFill,
          'opacity-60': rest.disabled,
        },
      )}
    >
      {childrenIsText ? (
        <Text
          className={clsx('text-base font-bold', {
            'text-white': isFill,
            'text-accent-brand': !isFill,
          })}
        >
          {children}
        </Text>
      ) : (
        children
      )}

      {iconName && (
        <MaterialIcons
          name={iconName}
          size={24}
          color={isFill ? colors.white : colors['accent-brand']}
        />
      )}
    </TouchableOpacity>
  )
}