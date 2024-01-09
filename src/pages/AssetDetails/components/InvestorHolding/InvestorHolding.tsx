import React, { useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Paper
} from '@mui/material';
import { type InvestorHoldingDto, headers, type InvestorHoldingColumns } from './types';

interface InvestorHoldingsTableProps {
  holdings: InvestorHoldingDto[];
  columns: InvestorHoldingColumns[];
  onRowClick?: (e: any) => void;
}

const dummyHoldings: InvestorHoldingDto[] = [
  {
    holder_id: '1',
    holder_name: 'John Doe',
    holder_address: '123 Main St',
    holder_amount: '5000',
    holder_holdings: 'ABC Company',
    transfered: '2022-03-15'
  },
  {
    holder_id: '2',
    holder_name: 'Jane Smith',
    holder_address: '456 Oak Ave',
    holder_amount: '8000',
    holder_holdings: 'XYZ Corporation',
    transfered: '2022-04-20'
  }
];

const rowsPerPageOptions = [5, 10, 25];

const InvestorHoldingsTable: React.FC<InvestorHoldingsTableProps> = ({
  columns,
  holdings,
  onRowClick
}) => {
  const { NoHoldings } = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedHoldings = holdings.length > 0 ? holdings : dummyHoldings;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table
          stickyHeader
          component={Card}
          sx={{
            boxShadow: 'none',
            borderRadius: onRowClick ? '0px 0px 8px 8px' : '12px'
          }}>
          <TableHead>
            <TableRow sx={{ color: 'gray' }}>
              {headers.map((header, id) => (
                <TableCell key={header.id} align="center" sx={{ textTransform: 'capitalize' }}>
                  {columns[id].title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedHoldings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={headers.length} align="center" sx={NoHoldings}>
                  No Listings
                </TableCell>
              </TableRow>
            ) : (
              displayedHoldings
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((holding, id) => (
                  <TableRow
                    key={id}
                    onClick={() => {
                      if (onRowClick) {
                        onRowClick(holding);
                      }
                    }}
                    style={{
                      borderBottom: '2px solid rgb(224,224,224)',
                      padding: '3px'
                    }}>
                    {headers.map((header) => (
                      <TableCell key={header.id} align="center">
                        <Typography variant="body2">
                          {holding[header.id as keyof InvestorHoldingDto] ?? '-'}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={displayedHoldings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const useStyles = (): any => ({
  NoHoldings: {
    color: ' var(--on-surface-secondary, rgba(0, 0, 0, 0.72))',
    fontFamily: 'PP Neue Montreal',
    fontSize: '16px',
    width: '833px',
    lineHeight: '35px',
    letterSpacing: '0.32px'
  }
});

export default InvestorHoldingsTable;
