import { ErrorMessage } from '@/components/ErrorMessage'
import { colors } from '@/shared/colors'
import { MaterialIcons } from '@expo/vector-icons'
import clsx from 'clsx'
import { useRef, useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'

interface AppInputParams<T extends FieldValues> extends TextInputProps {
  control: Control<T>
  name: Path<T>
  leftIconName?: keyof typeof MaterialIcons.glyphMap
  label?: string
}

export const AppInput = <T extends FieldValues,>({
  control,
  name,
  label,
  leftIconName,
  secureTextEntry,
  ...rest
}: AppInputParams<T>) => {
  const inputRef = useRef<TextInput>(null)

  const [isFocused, setIsFocused] = useState(false)
  const [showText, setShowText] = useState(!!secureTextEntry)

  function checkFocus() {
    if (inputRef.current) {
      setIsFocused(inputRef.current.isFocused())
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => {
        return (
          <View className="mt-4 w-full">
            {label && (
              <Text
                className={clsx(
                  'mb-2 mt-3 text-base',
                  isFocused ? 'text-accent-brand' : 'text-gray-600',
                )}
              >
                {label}
              </Text>
            )}

            <TouchableOpacity
              activeOpacity={1}
              className="h-16 flex-row items-center justify-between border-b border-gray-600 px-3 py-2"
              onPress={() => inputRef.current?.focus()}
            >
              {leftIconName && (
                <MaterialIcons
                  name={leftIconName}
                  size={24}
                  color={isFocused ? colors['accent-brand'] : colors.gray[600]}
                  style={{ marginRight: 8 }}
                />
              )}

              <TextInput
                {...rest}
                ref={inputRef}
                value={value}
                onChangeText={onChange}
                onFocus={checkFocus}
                onEndEditing={checkFocus}
                placeholderTextColor={colors.gray[700]}
                secureTextEntry={showText}
                className="flex-1 text-base text-gray-500"
              />

              {secureTextEntry && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowText((value) => !value)}
                >
                  <MaterialIcons
                    name={showText ? 'visibility' : 'visibility-off'}
                    color={colors.gray[600]}
                    size={24}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            {error && (
              <ErrorMessage>
                {error.message}
              </ErrorMessage>
            )}
          </View>
        )
      }}
    />
  )
}