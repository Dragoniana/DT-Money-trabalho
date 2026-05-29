import * as yup from 'yup'

export interface FormRegisterParams {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const schema: yup.ObjectSchema<FormRegisterParams> = yup
  .object({
    name: yup
      .string()
      .required('Nome é obrigatório'),

    email: yup
      .string()
      .email('E-mail inválido')
      .required('E-mail é obrigatório'),

    password: yup
      .string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('A senha é obrigatória'),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
      .required('Confirmação de senha é obrigatória'),
  })
  .required()