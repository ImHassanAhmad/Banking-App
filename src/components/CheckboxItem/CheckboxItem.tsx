import React, { type FC } from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { type CheckboxLabelProps, type CheckboxItemProps, type CheckIconProps } from './types';
import { UNCHECHK_ICON } from '@app/assets/images';
import CustomChecbox from '@app/components/CustomChecbox';

const labelStyle = {
  '& .MuiTypography-root': {
    fontSize: '16px',
    opacity: '1 !important'
  },
  gap: '1rem',
  '& .Mui-disabled': {
    color: 'black !important'
  }
};

const checkboxStyle = (disabled: boolean | undefined): any => ({
  '& .MuiSvgIcon-root': {
    fontSize: 22,
    opacity: disabled ? 0.5 : 1 // Adjust opacity for disabled or enabled states
  }
  // '&.Mui-disabled': {
  //   '& svg': {
  //     opacity: disabled ? 0.5 : 1 // Adjust opacity for disabled or enabled states
  //   }
  // }
});

const CheckIcon: React.FC<CheckIconProps> = ({ icon }) => {
  return (
    <Box sx={{ paddingLeft: '2px' }}>
      <img src={icon} alt="" height={20} width={20} />
    </Box>
  );
};

const OptionalTermLabel: FC<CheckboxLabelProps> = ({ linkText }) => {
  return <span>{linkText}</span>;
};

const CheckboxItem: React.FC<CheckboxItemProps> = ({
  checked,
  link,
  linkText,
  optional = false,
  onChange,
  isDisabled
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          sx={checkboxStyle(isDisabled)}
          checked={checked}
          onChange={onChange}
          icon={<CheckIcon icon={UNCHECHK_ICON} />}
          checkedIcon={<CustomChecbox />}
          disabled={isDisabled} // Setting the disabled state
        />
      }
      sx={labelStyle}
      label={<OptionalTermLabel linkText={linkText} />}
    />
  );
};

export default CheckboxItem;
