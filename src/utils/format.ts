const NUMBER_FORMATTER = new Intl.NumberFormat('pt-BR');

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

const TIME_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return '-';
  return NUMBER_FORMATTER.format(value);
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return '-';
  return DATE_TIME_FORMATTER.format(new Date(value));
}

export function formatTime(value: string | null | undefined): string {
  if (!value) return '-';
  return TIME_FORMATTER.format(new Date(value));
}

export function formatCurrency(
  value: string | number | null | undefined,
  currency: string | null | undefined,
): string {
  const amount = typeof value === 'string' ? Number(value) : value;
  if (!amount) return '-';

  try {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency ?? 'BRL',
    }).format(amount);
  } catch {
    return `${currency ?? ''} ${amount}`.trim();
  }
}
