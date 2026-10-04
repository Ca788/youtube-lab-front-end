'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { login, selectAuthState } from '@/store/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AppRoutePaths } from '@/constants/AppRoutePaths';
import {
  loginFormSchema,
  type LoginFormValues,
} from '@/features/auth/components/loginFormSchema';

export function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loading, error, status } = useAppSelector(selectAuthState);

  const next = AppRoutePaths.safeNext(searchParams.get('next'));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (status === 'authorized') {
      router.replace(next);
    }
  }, [status, next, router]);

  const onSubmit = async (values: LoginFormValues) => {
    await dispatch(login(values));
  };

  return (
    <Paper className="w-full max-w-sm p-6">
      <Stack spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={0.5}>
          <Typography variant="h5">YouTube Lab</Typography>
          <Typography variant="body2" sx={{
            color: "text.secondary"
          }}>
            Acompanhe audiencia e chat de lives em tempo real.
          </Typography>
        </Stack>

        {error && <Alert severity="error">{error.data.message}</Alert>}

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
          autoComplete="current-password"
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" variant="contained" size="large" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>

        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          Ainda nao tem conta?{' '}
          <MuiLink component={Link} href={AppRoutePaths.REGISTER}>
            Criar conta
          </MuiLink>
        </Typography>
      </Stack>
    </Paper>
  );
}
