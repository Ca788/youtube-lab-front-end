'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

interface LiveStreamPlayerProps {
  videoId: string;
  title?: string;
}

export function LiveStreamPlayer({ videoId, title }: LiveStreamPlayerProps) {
  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          bgcolor: 'common.black',
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          title={title ?? videoId}
          width={1280}
          height={720}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 0,
          }}
        />
      </Box>
    </Paper>
  );
}
