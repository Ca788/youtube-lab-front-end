import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().min(1, 'Informe o e-mail').email('E-mail invalido'),
  password: z.string().min(6, 'A senha deve ter ao menos 6 caracteres'),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
