import { Box, Stack, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import arrowRightIcon from '@app/assets/images/arrow-right.svg';
import { type FC } from 'react';
import { type AuthoOptionProps } from '../../types';

const AuthOption: FC<AuthoOptionProps> = ({
  title,
  subTitle,
  icon,
  iconWidth,
  borderType,
  onClick
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: 2,
        ...(borderType === 'top' && {
          borderTopLeftRadius: '1.6rem',
          borderTopRightRadius: '1.6rem'
        }),
        ...(borderType === 'bottom' && {
          borderBottomLeftRadius: '1.6rem',
          borderBottomRightRadius: '1.6rem'
        }),
        '&:hover': {
          background: theme.palette.grey[100]
        }
      }}>
      <Stack
        direction="row"
        alignItems="center"
        gap={2}
        sx={{
          cursor: 'pointer'
        }}
        onClick={onClick}>
        <IconButton sx={{ background: theme.palette.primary.main, borderRadius: '1.4rem' }}>
          <Box
            component="img"
            src={icon}
            alt="auth"
            sx={{
              width: iconWidth
            }}
          />
        </IconButton>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={3}
          width="100%">
          <Stack>
            <Typography sx={{ fontSize: '1.8rem', fontWeight: 500 }}>{title}</Typography>
            <Typography
              variant="subtitle2"
              sx={{
                opacity: '72%'
              }}>
              {subTitle}
            </Typography>
          </Stack>
          <Box component="img" src={arrowRightIcon} alt="auth" />
        </Stack>
      </Stack>
    </Box>
  );
};

export default AuthOption;
