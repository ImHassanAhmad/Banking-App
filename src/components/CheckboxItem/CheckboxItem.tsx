import React, { type FC } from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { type CheckboxLabelProps, type CheckboxItemProps, type CheckIconProps } from './types';
import { UNCHECHK_ICON } from '@app/assets/images';
import CustomChecbox from '@app/components/CustomChecbox';

const labelStyle = {
  '& .MuiTypography-root': {
    fontSize: '1.6rem',
    opacity: '1 !important'
  },
  minHeight: '6rem',
  gap: '1rem',
  '& .Mui-disabled': {
    color: 'black !important'
  }
};

const checkboxStyle = (disabled: boolean | undefined): any => ({
  '&.MuiCheckbox-root': {
    '& input': { position: 'relative' }
  },
  '& .MuiSvgIcon-root': {
    fontSize: 22,

    opacity: disabled ? 0.5 : 1
  }
});

const CheckIcon: React.FC<CheckIconProps> = ({ icon }) => {
  return (
    <Box>
      <img src={icon} alt="unchecked" height={21} width={21} />
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
          data-testid={linkText}
          sx={checkboxStyle(isDisabled)}
          checked={checked}
          onChange={onChange}
          icon={<CheckIcon icon={UNCHECHK_ICON} />}
          checkedIcon={<CustomChecbox />}
          disabled={isDisabled}
        />
      }
      sx={labelStyle}
      label={<OptionalTermLabel linkText={linkText} />}
    />
  );
};

export default CheckboxItem;
