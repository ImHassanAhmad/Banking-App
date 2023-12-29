import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
interface CustomComponentProps {
  imageSrc?: string;
  text: string;
  code: string;
  customStyle: React.CSSProperties;
}

const CustomComponent: React.FC<CustomComponentProps> = ({ imageSrc, text, code, customStyle }) => {
  const defaultImageStyle = {
    width: '24px',
    height: '24px'
  };

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

export default CustomComponent;
