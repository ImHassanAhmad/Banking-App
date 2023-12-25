import React, { type FC } from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { type CheckboxLabelProps, type CheckboxItemProps, type CheckIconProps } from './types';
import { UNCHECHK_ICON } from '@app/assets/images';
import CustomChecbox from '@app/components/CustomChecbox';

const labelStyle = {
  '& .MuiTypography-root': {
    fontSize: '16px'
  },
  minHeight: '4.5rem',
  gap: '1rem'
};

const checkboxStyle = {
  '& .MuiSvgIcon-root': { fontSize: 22 },
  '& input': { position: 'relative' }
};

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
  onChange
}) => {
  return (
    <FormControlLabel
      control={
        <Box sx={{ width: '12%' }}>
          <Checkbox
            sx={checkboxStyle}
            checked={checked}
            onChange={onChange}
            icon={<CheckIcon icon={UNCHECHK_ICON} />}
            checkedIcon={<CustomChecbox />}
          />
        </Box>
      }
      sx={labelStyle}
      label={<OptionalTermLabel linkText={linkText} />}
    />
  );
};

export default CheckboxItem;
