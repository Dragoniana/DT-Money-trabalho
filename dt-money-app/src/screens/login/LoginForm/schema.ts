import * as yup from 'yup'

export interface FormLoginParams {
  email: string
  password: string
}

export const schema: yup.ObjectSchema<FormLoginParams> = yup
  .object({
    email: yup
      .string()
      .email('E-mail inválido')
      .required('E-mail é obrigatório'),

    password: yup
      .string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('A senha é obrigatória'),
  })
  .required()