import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Box } from '@mui/material';
import { type FundingSourceItemProps } from '../types';
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

const FundingSourceItem: React.FC<FundingSourceItemProps> = ({ title, onChange }) => {
  const checkboxStyle = {
    '& .MuiSvgIcon-root': {
      paddingLeft: '20px'
    }
  };
  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = (): void => {
    setChecked(!checked);
    onChange();
  };
  return (
    <Box sx={{}}>
      <Box
        sx={{
          cursor: 'pointer',
          border: `1px solid ${checked ? '#32CD32' : 'gray'}`,
          marginBottom: '4px',
          borderRadius: '10px'
        }}
        onClick={onChange}>
        <FormControlLabel
          control={
            <Checkbox
              sx={checkboxStyle}
              checked={checked}
              onChange={handleCheckboxChange}
              icon={<AddIcon />}
              checkedIcon={<DoneIcon />}
            />
          }
          label={title}
          sx={labelStyle}
        />
      </Box>
    </Box>
  );
};

export default FundingSourceItem;
