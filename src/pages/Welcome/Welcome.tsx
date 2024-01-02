import { Stack, Card, Grid } from '@mui/material';
import { type FC } from 'react';
import homeIcon from '@app/assets/images/home.svg';
import adduserIcon from '@app/assets/images/add-user.svg';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Heading from '@app/components/Heading';
import AuthOption from '@app/components/AuthOption';

const welcomeNamespace = RouteNames.WELCOME;

const Welcome: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Grid item lg={7} md={10} sm={10} xs={12}>
      <Stack mt={12} data-testid="welcome-screen-wrapper">
        <Heading
          title={t(`${welcomeNamespace}.title`)}
          subTitle={t(`${welcomeNamespace}.subtitle`)}
        />
        <Stack mt={6}>
          <Card
            sx={{
              boxSizing: 'border-box',
              borderRadius: '1.6rem'
            }}>
            <AuthOption
              onClick={() => {
                navigate(`/${RouteNames.LOGIN}`);
              }}
              title={t(`${welcomeNamespace}.login_option_title`)}
              subTitle={t(`${welcomeNamespace}.login_option_subtitle`)}
              icon={homeIcon}
              borderType="top"
            />
            <AuthOption
              onClick={() => {
                navigate(`/${RouteNames.ONBOARDING}`);
              }}
              title={t(`${welcomeNamespace}.create_option_title`)}
              subTitle={t(`${welcomeNamespace}.create_option_subtitle`)}
              icon={adduserIcon}
              iconWidth={22}
              borderType="bottom"
            />
          </Card>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default Welcome;
