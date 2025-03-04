import * as zod from 'zod'

export const editProfileFormValidationsSchema = zod
  .object({
    firstName: zod.string().nonempty('Digite seu nome'),
    lastName: zod.string().nonempty('Digite seu sobrenome'),
    email: zod.string().email('Digite um endereço de e-mail válido'),
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
