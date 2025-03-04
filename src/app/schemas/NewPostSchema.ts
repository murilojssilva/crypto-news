import * as zod from 'zod'

export const newPostFormValidationsSchema = zod.object({
  title: zod
    .string()
    .max(100, 'Título não pode ter mais de 100 caracteres')
    .nonempty('Digite o título da postagem'),
  subtitle: zod.string().nonempty('Digite o subtítulo'),
  content: zod.string().nonempty('Digite o conteúdo da postagem'),
  published: zod.boolean(),
})

export type NewPostFormData = zod.infer<typeof newPostFormValidationsSchema>

export const editPostFormValidationsSchema = zod.object({
  title: zod
    .string()
    .max(100, 'Título não pode ter mais de 100 caracteres')
    .nonempty('Digite o título da postagem'),
  subtitle: zod.string().nonempty('Digite o subtítulo'),
  content: zod.string().nonempty('Digite o conteúdo da postagem'),
  published: zod.boolean(),
})

export type EditPostFormData = zod.infer<typeof newPostFormValidationsSchema>
