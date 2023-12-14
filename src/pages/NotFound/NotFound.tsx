import { Typography, Box, Button } from '@mui/material';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteNames } from '@app/constants/routes';
import { Link } from 'react-router-dom';

const translationNamespace = RouteNames.NOT_FOUND;

const NotFound: FC = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        textAlign: 'center',
        paddingTop: 10
      }}>
      <Typography
        sx={{
          fontSize: '4rem',
          marginBottom: 2
        }}
        variant="h1">
        {t(`${translationNamespace}.title`)}
      </Typography>
      <Typography
        sx={{
          fontSize: '1.5rem',
          marginBottom: 4
        }}
        variant="h3">
        {t(`${translationNamespace}.sub_title`)}
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{
          fontSize: '1.2rem'
        }}>
        {t(`${translationNamespace}.go_back`)}
      </Button>
    </Box>
  );
};

export default NotFound;
