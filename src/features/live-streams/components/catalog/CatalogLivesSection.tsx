'use client';

import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { EmptyState } from '@/components/common/EmptyState';
import { CatalogLiveCard } from '@/features/live-streams/components/catalog/CatalogLiveCard';
import { CatalogCategoryChips } from '@/features/live-streams/components/catalog/CatalogCategoryChips';
import { useCatalogLives } from '@/features/live-streams/hooks/useCatalogLives';
import { useVideoCategories } from '@/features/live-streams/hooks/useVideoCategories';
import { useTrackLiveStream } from '@/features/live-streams/hooks/useTrackLiveStream';
import { useSnackbar } from '@/providers/SnackbarProvider';
import { extractErrorMessage } from '@/infrastructure/AppResponse';
import type { CatalogLive } from '@/features/live-streams/models/catalog-live.model';

export function CatalogLivesSection() {
  const [draftQuery, setDraftQuery] = useState('');
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [pageToken, setPageToken] = useState<string>();
  const [tokenStack, setTokenStack] = useState<string[]>([]);

  const { showError, showSuccess } = useSnackbar();
  const trackLiveStream = useTrackLiveStream();
  const { data: categoriesData } = useVideoCategories();
  const { data, isLoading, isFetching, isError } = useCatalogLives({
    q: query || undefined,
    category_id: categoryId || undefined,
    page_token: pageToken,
    perPage: 12,
    view: 'default',
  });

  const lives = data?.data ?? [];
  const nextPageToken = data?.metadata?.nextPageToken;
  const categories = categoriesData?.data ?? [];
  const trackingVideoId = trackLiveStream.variables?.url;

  const resetPaging = () => {
    setPageToken(undefined);
    setTokenStack([]);
  };

  const handleSearch = () => {
    setQuery(draftQuery.trim());
    resetPaging();
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    resetPaging();
  };

  const handleNextPage = () => {
    if (!nextPageToken) return;
    setTokenStack((stack) => [...stack, pageToken ?? '']);
    setPageToken(nextPageToken);
  };

  const handlePrevPage = () => {
    if (tokenStack.length === 0) return;

    const stack = [...tokenStack];
    const previous = stack.pop();
    setTokenStack(stack);
    setPageToken(previous || undefined);
  };

  const handleTrack = async (live: CatalogLive) => {
    if (!live.watch_url) return;

    try {
      const tracked = await trackLiveStream.mutateAsync({ url: live.watch_url });
      showSuccess(`Monitorando "${tracked.title ?? tracked.video_id}".`);
    } catch (error) {
      showError(extractErrorMessage(error, 'Nao foi possivel monitorar essa live.'));
    }
  };

  return (
    <Paper className="p-4">
      <Stack spacing={2}>
        <Stack spacing={0.25}>
          <Typography variant="subtitle1">Lives ao vivo no YouTube</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Busca so broadcasts no ar. Cada pagina consome cota da API.
          </Typography>
        </Stack>

        <Stack
          component="form"
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
        >
          <TextField
            fullWidth
            label="Buscar lives"
            placeholder="eleicoes, games, musica..."
            value={draftQuery}
            onChange={(event) => setDraftQuery(event.target.value)}
          />
          <Button
            type="submit"
            variant="outlined"
            startIcon={<SearchIcon />}
            sx={{ minWidth: 140, height: 40 }}
          >
            Buscar
          </Button>
        </Stack>

        <CatalogCategoryChips
          categories={categories}
          value={categoryId}
          onChange={handleCategoryChange}
        />

        {isError && <Alert severity="error">Erro ao buscar lives ao vivo.</Alert>}
        {isFetching && !isLoading && <LinearProgress />}

        {isLoading && <Typography variant="body2">Carregando lives ao vivo...</Typography>}

        {!isLoading && lives.length === 0 && (
          <EmptyState
            title="Nenhuma live ao vivo encontrada"
            description="Ajuste a busca ou a categoria. O YouTube nao devolve um catalogo completo."
          />
        )}

        {lives.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 2,
            }}
          >
            {lives.map((live) => (
              <CatalogLiveCard
                key={live.video_id}
                live={live}
                isTracking={trackLiveStream.isPending && trackingVideoId === live.watch_url}
                onTrack={handleTrack}
              />
            ))}
          </Box>
        )}

        {(nextPageToken || tokenStack.length > 0) && (
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
            <Button
              size="small"
              disabled={tokenStack.length === 0 || isFetching}
              onClick={handlePrevPage}
            >
              Anterior
            </Button>
            <Button
              size="small"
              disabled={!nextPageToken || isFetching}
              onClick={handleNextPage}
            >
              Proxima
            </Button>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
