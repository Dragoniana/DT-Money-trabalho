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

import { schema, type FormRegisterParams } from './schema'

export function RegisterForm() {
  const navigation = useNavigation<StackNavigationProp<PublicStackParamsList>>()

  const { handleRegister } = useAuthContext()
  const { errorHandler } = useErrorHandler()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormRegisterParams>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema) as unknown as Resolver<FormRegisterParams>,
  })

  async function onSubmit(userData: FormRegisterParams) {
    try {
      await handleRegister(userData)
    } catch (error) {
      errorHandler(error, 'Falha ao cadastrar usuário')
    }
  }

  return (
    <>
      <AppInput
        control={control}
        name="name"
        leftIconName="person"
        label="NOME"
        placeholder="Seu nome"
      />

      <AppInput
        control={control}
        name="email"
        leftIconName="mail-outline"
        label="E-MAIL"
        placeholder="mail@example.br"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <AppInput
        control={control}
        name="password"
        leftIconName="lock-outline"
        label="SENHA"
        placeholder="Sua senha"
        secureTextEntry
      />

      <AppInput
        control={control}
        name="confirmPassword"
        leftIconName="lock-outline"
        label="SENHA"
        placeholder="Confirme sua senha"
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
            'Cadastrar'
          )}
        </AppButton>

        <View>
          <Text className="mb-6 text-base text-gray-300">
            Já possui uma conta?
          </Text>

          <AppButton
            mode="outline"
            onPress={() => navigation.navigate('Login')}
          >
            Acessar
          </AppButton>
        </View>
      </View>
    </>
  )
}