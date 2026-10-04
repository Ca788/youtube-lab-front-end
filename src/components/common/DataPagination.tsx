'use client';

import TablePagination from '@mui/material/TablePagination';

interface DataPaginationProps {
  page: number;
  perPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  perPageOptions?: number[];
}

export function DataPagination({
  page,
  perPage,
  totalCount,
  onPageChange,
  onPerPageChange,
  perPageOptions = [10, 25, 50],
}: DataPaginationProps) {
  return (
    <TablePagination
      component="div"
      count={totalCount}
      page={page - 1}
      onPageChange={(_, nextPage) => onPageChange(nextPage + 1)}
      rowsPerPage={perPage}
      onRowsPerPageChange={(event) => onPerPageChange(Number(event.target.value))}
      rowsPerPageOptions={perPageOptions}
      labelRowsPerPage="Por pagina"
      labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
    />
  );
}
