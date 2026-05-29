import { AppButton } from '@/components/AppButton'
import { AppInput } from '@/components/AppInput'
import { useAuthContext } from '@/context/auth.context'
import { PublicStackParamsList } from '@/routes/PublicRoutes'
import { colors } from '@/shared/colors'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Resolver, useForm } from 'react-hook-form'
import { ActivityIndicator, Text, View } from 'react-native'

import { schema, type FormLoginParams } from './schema'

export function LoginForm() {
  const navigation = useNavigation<StackNavigationProp<PublicStackParamsList>>()

  const { handleAuthenticate } = useAuthContext()
  const { errorHandler } = useErrorHandler()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema) as unknown as Resolver<FormLoginParams>,
  })

  async function onSubmit(userData: FormLoginParams) {
    try {
      await handleAuthenticate(userData)
    } catch (error) {
      errorHandler(error, 'Falha ao logar')
    }
  }

  return (
    <>
      <AppInput
        control={control}
        name="email"
        label="E-MAIL"
        leftIconName="email"
        placeholder="mail@example.br"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <AppInput
        control={control}
        name="password"
        label="SENHA"
        leftIconName="lock-outline"
        placeholder="Sua senha"
        secureTextEntry
      />

      <View className="mb-8 mt-8 min-h-[250px] flex-1 justify-between">
        <AppButton
          iconName="arrow-forward"
          disabled={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        >
          {isSubmitting ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            'Login'
          )}
        </AppButton>

        <View>
          <Text className="mb-6 text-base text-gray-300">
            Ainda não possui uma conta?
          </Text>

          <AppButton
            mode="outline"
            onPress={() => navigation.navigate('Register')}
          >
            Cadastrar
          </AppButton>
        </View>
      </View>
    </>
  )
}