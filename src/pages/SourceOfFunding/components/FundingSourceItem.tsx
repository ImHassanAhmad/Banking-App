import React from 'react';
import { Checkbox, FormControlLabel, Box } from '@mui/material';
import { type FundingSourceItemProps } from '../types';
import CustomChecbox from '@app/components/CustomChecbox';
import { type CheckIconProps } from '@app/pages/InvestorSignUp/AboutServices/types';
import { UNCHECHK_ICON } from '@app/assets/images';

const labelStyle = {
  '& .MuiTypography-root': {
    padding: '20px'
  },
  gap: '1rem'
};

const CheckIcon: React.FC<CheckIconProps> = ({ icon }) => {
  return (
    <Box sx={{ paddingLeft: '20px' }}>
      <img src={icon} alt="" height={22} width={22} />
    </Box>
  );
};

const FundingSourceItem: React.FC<FundingSourceItemProps> = ({ checked, title, onChange }) => {
  const checkboxStyle = {
    '& .MuiSvgIcon-root': {
      paddingLeft: '20px'
    }
  };

  return (
    <Box
      sx={{
        cursor: 'pointer',
        ':hover': {
          backgroundColor: '#f2f2f2',
          borderRadius: '10px'
        }
      }}
      onClick={onChange}>
      <FormControlLabel
        control={
          <Checkbox
            sx={checkboxStyle}
            checked={checked}
            onChange={onChange}
            icon={<CheckIcon icon={UNCHECHK_ICON} />}
            checkedIcon={<CustomChecbox />}
          />
        }
        sx={labelStyle}
        label={title}
      />
    </Box>
  );
};

export default FundingSourceItem;
