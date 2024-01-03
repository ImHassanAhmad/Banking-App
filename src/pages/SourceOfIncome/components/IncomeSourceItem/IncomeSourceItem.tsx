import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Checkbox, FormControlLabel, Box } from '@mui/material';
import { type IncomeSourceItemProps } from '../../types';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

const labelStyle = {
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  gap: '3px',
  margin: '0px',
  '& .MuiTypography-root': {
    paddingLeft: '10px'
  }
};

const IncomeSourceItem: React.FC<IncomeSourceItemProps> = ({ title, checked, onChange }) => {
  const theme = useTheme();

  const checkboxStyle = {
    '& .MuiSvgIcon-root': {
      paddingLeft: '20px'
    }
  };

  const [_checked, setChecked] = useState(checked);

  const handleCheckboxChange = (): void => {
    setChecked(!_checked);
    onChange();
  };

  return (
    <Box sx={{}}>
      <Box
        sx={{
          cursor: 'pointer',
          border: `0.1rem solid ${checked ? theme.palette.success.main : theme.palette.grey[900]}`,
          marginBottom: '0.4rem',
          borderRadius: '1rem'
        }}>
        <FormControlLabel
          control={
            <Checkbox
              sx={checkboxStyle}
              checked={checked}
              onChange={handleCheckboxChange}
              icon={<AddIcon />}
              checkedIcon={<DoneIcon color="success" />}
            />
          }
          label={title}
          sx={labelStyle}
        />
      </Box>
    </Box>
  );
};

export default IncomeSourceItem;
