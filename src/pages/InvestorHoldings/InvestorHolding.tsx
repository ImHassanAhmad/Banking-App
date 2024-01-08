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
  Typography
} from '@mui/material';
import { type InvestorHoldingDto, headers } from './types';

interface InvestorHoldingsTableProps {
  holdings: InvestorHoldingDto[];
  onRowClick?: (e: any) => void;
}

const dummyHoldings: InvestorHoldingDto[] = [
  { id: '1', name: 'John Doe', amount: 5000 },
  { id: '2', name: 'Jane Smith', amount: 8000 }
];

const rowsPerPageOptions = [5, 10, 25];

const InvestorHoldingsTable: React.FC<InvestorHoldingsTableProps> = ({ holdings, onRowClick }) => {
  const { tableheading, NoHoldings } = useStyles();

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
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, displayedHoldings.length - page * rowsPerPage);

  return (
    <>
      <TableContainer>
        <Table
          component={Card}
          sx={{
            boxShadow: 'none',
            borderRadius: onRowClick ? '0px 0px 8px 8px' : '12px'
          }}>
          <TableHead>
            <TableRow sx={{ color: 'gray' }}>
              {headers.map((header) => (
                <TableCell
                  key={header.id}
                  align="center"
                  sx={
                    header.isSpecial
                      ? { fontSize: '12px', textAlign: 'left', color: 'gray' }
                      : tableheading
                  }>
                  {header.id}
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
                    {headers.map((header) => {
                      console.log('here all eaders', header);
                      return (
                        <TableCell key={header.id} align="center">
                          <Typography variant="body2">
                            {header.id === 'id'
                              ? holding.id
                              : header.id === 'name'
                              ? holding.name ?? '-'
                              : header.id === 'amount'
                              ? holding.amount
                              : ''}
                          </Typography>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={headers.length} />
              </TableRow>
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
    </>
  );
};

const useStyles = (): any => ({
  secondaryText: { color: '#454745', fontSize: '14px', textAlign: 'left' },
  tableheading: {
    fontSize: '12px',
    color: 'gray'
  },
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
