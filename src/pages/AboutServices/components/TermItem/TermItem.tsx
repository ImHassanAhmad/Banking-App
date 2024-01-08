import React, { type FC } from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { type TermLabelProps, type TermItemProps, type CheckIconProps } from '../../types';
import { useTranslation } from 'react-i18next';
import { RouteNames } from '@app/constants/routes';
import { UNCHECHK_ICON } from '@app/assets/images';
import CustomChecbox from '@app/components/CustomChecbox';

const labelStyle = {
  '& .MuiTypography-root': {
    fontSize: '1.6rem'
  },
  minHeight: '6rem',
  gap: '1rem'
};

const checkboxStyle = {
  '& .MuiSvgIcon-root': { fontSize: 22 },
  '& input': { position: 'relative' }
};

const CheckIcon: React.FC<CheckIconProps> = ({ icon }) => {
  return (
    <Box>
      <img src={icon} alt="" height={22} width={22} />
    </Box>
  );
};

const aboutOurServicesNamespace = RouteNames.ABOUT_OUR_SERVICES;

const RequiredTermLabel: FC<TermLabelProps> = ({ link, linkText }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <span>
      <span data-testid="terms-agreement">{t(`${aboutOurServicesNamespace}.agree`)} </span>
      <a
        style={{
          fontWeight: 'bold',
          textDecoration: 'none',
          color: ` ${theme.palette.common.black} `
        }}
        href={link}
        rel="noreferrer"
        target="_blank"
        onMouseOver={(e) =>
          (e.currentTarget.style.borderBottom = `0.1rem solid ${theme.palette.common.black}`)
        } // Set the underline on hover
        onMouseOut={(e) => (e.currentTarget.style.borderBottom = '0.1rem solid transparent')} // Remove the underline when not hovered
      >
        {linkText}
      </a>
    </span>
  );
};

const OptionalTermLabel: FC<TermLabelProps> = ({ linkText }) => {
  return <span>{linkText}</span>;
};

const TermItem: React.FC<TermItemProps> = ({
  checked,
  link,
  linkText,
  optional = false,
  onChange
}) => {
  return (
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
      label={
        optional ? (
          <OptionalTermLabel linkText={linkText} />
        ) : link ? (
          <RequiredTermLabel linkText={linkText} link={link} />
        ) : (
          <OptionalTermLabel linkText={linkText} />
        )
      }
    />
  );
};

export default TermItem;
