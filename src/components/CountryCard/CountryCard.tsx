import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
interface CountryCardProps {
  imageSrc?: string;
  text: string;
  code: string;
  customStyle: React.CSSProperties;
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
const CountryCard: React.FC<CountryCardProps> = ({ imageSrc, text, code, customStyle }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '8px',
        background: '#EBEBEB',
        width: '380px',
        borderRadius: '10px',
        paddingLeft: '15px',
        alignItems: 'center',
        height: '5.2rem',
        marginTop: '8px',
        cursor: 'pointer',
        paddingTop: '13px'
      }}>
      <Typography>{imageSrc && <img src={imageSrc} style={{ ...defaultImageStyle }} />}</Typography>
      <Typography sx={{ marginBottom: '10px', fontSize: '15px' }}>
        {text}
        <br />
        {code}
      </Typography>
    </Box>
  );
};

export default CountryCard;
