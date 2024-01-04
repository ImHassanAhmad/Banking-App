import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CROSS_ICON } from '@app/assets/images';
interface CountryCardProps {
  imageSrc?: string;
  text: string;
  code: string;
  customStyle: React.CSSProperties;
  onClick: (code: string) => void;
}

type StyleProps = React.CSSProperties & {
  objectFit?: React.CSSProperties['objectFit'];
};
const defaultImageStyle: StyleProps = {
  width: '27px',
  height: '27px',
  marginRight: '10px',
  borderRadius: '50%',
  objectFit: 'cover'
};
const CountryCard: React.FC<CountryCardProps> = ({
  imageSrc,
  text,
  code,
  onClick,
  customStyle
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '8px',
        background: '#EBEBEB',
        borderRadius: '10px',
        paddingLeft: '15px',
        alignItems: 'center',
        height: '5.2rem',
        marginTop: '8px',
        cursor: 'pointer',
        justifyContent: 'space-between',
        padding: '10px'
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>
          {imageSrc && <img src={imageSrc} style={{ ...defaultImageStyle }} />}
        </Typography>
        <Typography sx={{ fontSize: '15px' }}>
          {text}
          <br />
          {code}
        </Typography>
      </Box>
      <Box
        component={'img'}
        src={CROSS_ICON}
        alt="info icon"
        sx={{ width: '16px', height: '16px', padding: '8px' }}
        onClick={() => {
          onClick(code);
        }}
      />
    </Box>
  );
};

export default CountryCard;
