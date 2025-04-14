import * as zod from 'zod'

export const editProfileFormValidationsSchema = zod
  .object({
    firstName: zod.string().nonempty('Digite seu nome'),
    lastName: zod.string().nonempty('Digite seu sobrenome'),
    email: zod.string().email('Digite um endereço de e-mail válido'),
    role: zod.string().min(1, 'Selecione o seu cargo'),
    plan: zod.string().min(1, 'Selecione o seu plano'),
    city: zod.string().min(1, 'Selecione sua cidade'),
    state: zod.string().min(1, 'Selecione seu estado'),
    experience_age: zod
      .number({ required_error: 'Digite seu valor' })
      .min(0.01, 'Digite um valor maior que zero'),
    social_x: zod.string().min(1, 'Selecione sua cidade'),
    social_discord: zod.string().min(1, 'Selecione sua cidade'),
    social_telegram: zod.string().min(1, 'Selecione sua cidade'),
    social_whatsapp: zod.string().min(1, 'Selecione sua cidade'),
    day_birth: zod.string().min(1, 'Selecione sua cidade'),
    month_birth: zod.string().min(1, 'Selecione sua cidade'),
    gender: zod.string().min(1, 'Selecione sua cidade'),
    year_birth: zod.string().min(1, 'Selecione sua cidade'),
    investor_style: zod.string().min(1, 'Selecione sua cidade'),
    amount: zod
      .number({ required_error: 'Digite seu valor' })
      .min(0.01, 'Digite um valor maior que zero'),
    password: zod
      .string()
      .min(8, 'A senha deve ter, ao menos, 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
      .regex(/[\W_]/, 'A senha deve conter pelo menos um caractere especial')
      .optional()
      .or(zod.literal('')),
    passwordConfirm: zod.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password && data.passwordConfirm) {
        return data.password === data.passwordConfirm
      }
      return true
    },
    {
      message: 'As senhas não coincidem',
      path: ['passwordConfirm'],
    }
  )

export type EditProfileFormData = zod.infer<
  typeof editProfileFormValidationsSchema
>
