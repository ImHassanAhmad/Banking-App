import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import React, { useState, type FC } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonWithIcon from '@app/components/ButtonWithIcon';
import { ADD_ICON } from '@app/assets/images';
import AddNewAgent from '@app/components/Modals/AddNewAgent';

const AgentListing: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Stack mt={-3} sx={{ width: '100%' }}>
      <Stack style={{ display: 'flex', alignItems: 'flex-end' }}>
        <ButtonWithIcon
          sx={{ width: '20%', minWidth: '186px' }}
          title={'Add New Agent'}
          icon={ADD_ICON}
          handleClick={() => {
            setIsOpen(true);
          }}
        />
      </Stack>
      <Stack mt={3}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align={'center'}>ID</TableCell>
                  <TableCell align={'center'}>Name</TableCell>
                  <TableCell align={'center'}>Email</TableCell>
                  <TableCell align={'center'}>Address</TableCell>
                  <TableCell align={'center'}>Permission(s)</TableCell>
                  <TableCell align={'center'}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align={'center'}>1</TableCell>
                  <TableCell align={'center'}>Zain</TableCell>
                  <TableCell align={'center'}>zain.mustafaaa@gmail.com</TableCell>
                  <TableCell align={'center'}>0x9522...65Cf5</TableCell>
                  <TableCell align={'center'}>Burn, Pause, Mint</TableCell>
                  <TableCell align={'center'}>
                    <Stack direction={'row'}>
                      <Stack mr={1} direction={'column'}>
                        <EditIcon />
                      </Stack>
                      <Stack direction={'column'}>
                        <DeleteIcon />
                      </Stack>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={10}
            rowsPerPage={10}
            page={1}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
          />
          <AddNewAgent
            open={isOpen}
            handleClose={() => {
              setIsOpen(false);
            }}
            onSuccess={() => {}}
            onErrored={() => {}}
          />
        </Paper>
      </Stack>
    </Stack>
  );
};

export default AgentListing;
