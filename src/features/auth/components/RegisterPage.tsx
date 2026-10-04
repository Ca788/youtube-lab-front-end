'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { register as registerUser, selectAuthState } from '@/store/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AppRoutePaths } from '@/constants/AppRoutePaths';
import {
  registerFormSchema,
  type RegisterFormValues,
} from '@/features/auth/components/registerFormSchema';

export function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, status } = useAppSelector(selectAuthState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  useEffect(() => {
    if (status === 'authorized') {
      router.replace(AppRoutePaths.LIVE_STREAMS);
    }
  }, [status, router]);

  const onSubmit = async (values: RegisterFormValues) => {
    await dispatch(registerUser(values));
  };

  return (
    <Paper className="w-full max-w-sm p-6">
      <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={0.5}>
          <Typography variant="h5">Criar conta</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Use o mesmo cadastro da API para validar o backend.
          </Typography>
        </Stack>

        {error && <Alert severity="error">{error.data.message}</Alert>}

        <TextField
          label="Nome"
          autoComplete="name"
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          {...register('name')}
        />

        <TextField
          label="E-mail"
          type="email"
          autoComplete="email"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register('email')}
        />

        <TextField
          label="Senha"
          type="password"
          autoComplete="new-password"
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register('password')}
        />

        <TextField
          label="Confirmar senha"
          type="password"
          autoComplete="new-password"
          error={Boolean(errors.passwordConfirmation)}
          helperText={errors.passwordConfirmation?.message}
          {...register('passwordConfirmation')}
        />

        <Button type="submit" variant="contained" size="large" disabled={loading}>
          {loading ? 'Criando conta...' : 'Criar conta'}
        </Button>

        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          Ja tem conta?{' '}
          <MuiLink component={Link} href={AppRoutePaths.LOGIN}>
            Entrar
          </MuiLink>
        </Typography>
      </Stack>
    </Paper>
  );
}
