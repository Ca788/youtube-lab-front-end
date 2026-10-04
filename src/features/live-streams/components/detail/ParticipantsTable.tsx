'use client';

import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { EmptyState } from '@/components/common/EmptyState';
import { DataPagination } from '@/components/common/DataPagination';
import { useParticipants } from '@/features/live-streams/hooks/useParticipants';
import { formatCurrency, formatTime } from '@/utils/format';
import type { ParticipantOrder } from '@/features/live-streams/models/participant.model';

const ORDER_OPTIONS: { value: ParticipantOrder; label: string }[] = [
  { value: 'messages', label: 'Mais mensagens' },
  { value: 'recent', label: 'Mais recentes' },
  { value: 'paid', label: 'Maior valor pago' },
];

interface ParticipantsTableProps {
  liveStreamId: string;
}

export function ParticipantsTable({ liveStreamId }: ParticipantsTableProps) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [order, setOrder] = useState<ParticipantOrder>('messages');

  const { data, isLoading } = useParticipants({ liveStreamId, page, perPage, order });

  const participants = data?.data ?? [];
  const totalCount = data?.pagination.totalCount ?? 0;

  return (
    <Paper className="p-4">
      <Stack spacing={2}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: 'stretch', sm: 'center' }
          }}>
          <Stack spacing={0.25}>
            <Typography variant="subtitle1">Participantes do chat</Typography>
            <Typography variant="caption" sx={{
              color: "text.secondary"
            }}>
              {totalCount} pessoas escreveram no chat
            </Typography>
          </Stack>

          <TextField
            select
            label="Ordenar por"
            value={order}
            onChange={(event) => {
              setOrder(event.target.value as ParticipantOrder);
              setPage(1);
            }}
            sx={{ minWidth: 200 }}
          >
            {ORDER_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {isLoading && <Typography variant="body2">Carregando participantes...</Typography>}

        {!isLoading && participants.length === 0 && (
          <EmptyState
            title="Nenhum participante identificado"
            description="A API do YouTube so revela quem escreveu no chat."
          />
        )}

        {participants.length > 0 && (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Participante</TableCell>
                <TableCell align="right">Mensagens</TableCell>
                <TableCell>Primeira</TableCell>
                <TableCell>Ultima</TableCell>
                <TableCell align="right">Pago</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participants.map((participant) => (
                <TableRow key={participant.author_channel_id} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} sx={{
                      alignItems: "center"
                    }}>
                      <Avatar
                        src={participant.author_image_url ?? undefined}
                        sx={{ width: 28, height: 28, fontSize: 12 }}
                      >
                        {participant.author_name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="body2">
                        {participant.author_name ?? 'Anonimo'}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">{participant.messages_count}</TableCell>
                  <TableCell>{formatTime(participant.first_message_at)}</TableCell>
                  <TableCell>{formatTime(participant.last_message_at)}</TableCell>
                  <TableCell align="right">
                    {formatCurrency(participant.paid_amount, 'BRL')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {totalCount > 0 && (
          <DataPagination
            page={page}
            perPage={perPage}
            totalCount={totalCount}
            onPageChange={setPage}
            onPerPageChange={(next) => {
              setPerPage(next);
              setPage(1);
            }}
          />
        )}
      </Stack>
    </Paper>
  );
}
