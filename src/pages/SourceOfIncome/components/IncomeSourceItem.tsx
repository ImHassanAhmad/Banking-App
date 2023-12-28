import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Box } from '@mui/material';
import { type FundingSourceItemProps } from '../types';

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
              icon={
                <span style={{ fontSize: '25px', color: 'black', marginBottom: '4px' }}>+</span>
              }
              checkedIcon={
                <span style={{ color: '#32CD32', fontSize: '25px', marginBottom: '4px' }}>
                  &#10003;
                </span>
              }
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
