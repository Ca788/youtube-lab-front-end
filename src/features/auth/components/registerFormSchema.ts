import { z } from 'zod';

export const registerFormSchema = z
  .object({
    name: z.string().trim().min(2, 'Informe o nome'),
    email: z.string().min(1, 'Informe o e-mail').email('E-mail invalido'),
    password: z.string().min(6, 'A senha deve ter ao menos 6 caracteres'),
    passwordConfirmation: z.string().min(1, 'Confirme a senha'),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Senhas nao conferem',
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
