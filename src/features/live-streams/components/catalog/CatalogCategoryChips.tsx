'use client';

import { useRef } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { videoCategoryTitlePt } from '@/features/live-streams/models/video-category.model';
import type { VideoCategory } from '@/features/live-streams/models/video-category.model';

interface CatalogCategoryChipsProps {
  categories: VideoCategory[];
  value: string;
  onChange: (categoryId: string) => void;
}

export function CatalogCategoryChips({
  categories,
  value,
  onChange,
}: CatalogCategoryChipsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: direction * 240, behavior: 'smooth' });
  };

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center', minWidth: 0 }}>
      <IconButton
        size="small"
        aria-label="Categorias anteriores"
        onClick={() => scrollBy(-1)}
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>

      <Box
        ref={scrollerRef}
        sx={{
          display: 'flex',
          gap: 1,
          minWidth: 0,
          flex: 1,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Chip
          label="Todas"
          clickable
          color={value === '' ? 'primary' : 'default'}
          variant={value === '' ? 'filled' : 'outlined'}
          onClick={() => onChange('')}
          sx={{ flexShrink: 0 }}
        />
        {categories.map((category) => {
          const selected = value === category.id;

          return (
            <Chip
              key={category.id}
              label={videoCategoryTitlePt(category)}
              clickable
              color={selected ? 'primary' : 'default'}
              variant={selected ? 'filled' : 'outlined'}
              onClick={() => onChange(category.id)}
              sx={{ flexShrink: 0 }}
            />
          );
        })}
      </Box>

      <IconButton
        size="small"
        aria-label="Proximas categorias"
        onClick={() => scrollBy(1)}
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
