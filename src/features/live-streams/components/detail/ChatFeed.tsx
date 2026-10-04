'use client';

import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { EmptyState } from '@/components/common/EmptyState';
import { DataPagination } from '@/components/common/DataPagination';
import { useChatMessages } from '@/features/live-streams/hooks/useChatMessages';
import { formatCurrency, formatTime } from '@/utils/format';
import type { ChatMessage } from '@/features/live-streams/models/chat-message.model';

interface ChatMessageItemProps {
  message: ChatMessage;
}

function ChatMessageItem({ message }: ChatMessageItemProps) {
  const amount = formatCurrency(message.amount, message.currency);
  const author = message.author;
  const authorName = author?.name ?? 'Anonimo';

  return (
    <Stack direction="row" spacing={1.5} sx={{
      alignItems: "flex-start"
    }}>
      <Avatar
        src={author?.imageUrl ?? undefined}
        sx={{ width: 32, height: 32, fontSize: 13 }}
      >
        {authorName.charAt(0).toUpperCase()}
      </Avatar>

      <Stack spacing={0.25} className="min-w-0 flex-1">
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            flexWrap: "wrap"
          }}>
          <Typography variant="body2" sx={{
            fontWeight: 500
          }}>
            {authorName}
          </Typography>
          {author?.isOwner && (
            <Chip size="small" label="Dono" color="primary" variant="outlined" />
          )}
          {author?.isModerator && (
            <Chip size="small" label="Mod" color="info" variant="outlined" />
          )}
          {author?.isSponsor && (
            <Chip size="small" label="Membro" color="success" variant="outlined" />
          )}
          {amount !== '-' && (
            <Chip size="small" label={amount} color="warning" variant="outlined" />
          )}
          <Typography variant="caption" sx={{
            color: "text.disabled"
          }}>
            {formatTime(message.published_at)}
          </Typography>
        </Stack>

        <Typography variant="body2" className="break-words" sx={{
          color: "text.secondary"
        }}>
          {message.text ?? '-'}
        </Typography>
      </Stack>
    </Stack>
  );
}

interface ChatFeedProps {
  liveStreamId: string;
  compact?: boolean;
}

export function ChatFeed({ liveStreamId, compact = false }: ChatFeedProps) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(compact ? 50 : 25);
  const [paidOnly, setPaidOnly] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const { data, isLoading } = useChatMessages(
    { liveStreamId, page, perPage, paid_only: paidOnly, view: 'extended' },
    autoRefresh ? 10_000 : false,
  );

  const messages = data?.data ?? [];
  const totalCount = data?.pagination.totalCount ?? 0;

  return (
    <Paper className="p-4" sx={{ maxHeight: compact ? 480 : 'none' }}>
      <Stack spacing={2} sx={{ height: compact ? '100%' : 'auto', maxHeight: compact ? 448 : 'none' }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: 'flex-start', sm: 'center' }
          }}>
          <Stack spacing={0.25}>
            <Typography variant="subtitle1">Chat capturado</Typography>
            <Typography variant="caption" sx={{
              color: "text.secondary"
            }}>
              {totalCount} mensagens
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={paidOnly}
                  onChange={(event) => {
                    setPaidOnly(event.target.checked);
                    setPage(1);
                  }}
                />
              }
              label="Somente pagas"
            />
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={autoRefresh}
                  onChange={(event) => setAutoRefresh(event.target.checked)}
                />
              }
              label="Auto"
            />
          </Stack>
        </Stack>

        {isLoading && <Typography variant="body2">Carregando mensagens...</Typography>}

        {!isLoading && messages.length === 0 && (
          <EmptyState
            title="Nenhuma mensagem capturada"
            description="O chat so pode ser coletado enquanto a live esta no ar."
          />
        )}

        {messages.length > 0 && (
          <Stack
            spacing={2}
            divider={<div className="h-px bg-white/5" />}
            sx={{
              flex: compact ? 1 : undefined,
              minHeight: 0,
              overflowY: compact ? 'auto' : 'visible',
              pr: compact ? 1 : 0,
            }}
          >
            {messages.map((message) => (
              <ChatMessageItem key={message.id} message={message} />
            ))}
          </Stack>
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
