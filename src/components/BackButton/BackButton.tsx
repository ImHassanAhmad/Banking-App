import { useTheme } from '@mui/material/styles';
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonWithIcon from '../ButtonWithIcon';
import { type BackButtonProps } from './types';
import { BACK_ICON } from '@app/assets/images';

const BackButton: FC<BackButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const defaultOnClick = (): void => {
    navigate(-1);
  };
  return (
    <ButtonWithIcon
      title="Back"
      icon={BACK_ICON}
      iconType="start"
      sx={{
        borderRadius: '10rem',
        backgroundColor: theme.palette.grey[700],
        width: '9.7rem',
        height: '3.4rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      handleClick={onClick ?? defaultOnClick}
    />
  );
};

export default BackButton;
