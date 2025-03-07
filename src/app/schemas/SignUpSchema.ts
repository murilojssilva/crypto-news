import * as zod from 'zod'

export const loginFormValidationsSchema = zod
  .object({
    firstName: zod.string().nonempty('Digite seu nome'),
    lastName: zod.string().nonempty('Digite seu sobrenome'),
    email: zod.string().email('Digite um endereço de e-mail válido'),
    password: zod
      .string()
      .min(8, 'A senha deve ter, ao menos, 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
      .regex(/[\W_]/, 'A senha deve conter pelo menos um caractere especial'),
    passwordConfirm: zod.string().nonempty('Confirme sua senha'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  })

export type NewSignUpFormData = zod.infer<typeof loginFormValidationsSchema>
