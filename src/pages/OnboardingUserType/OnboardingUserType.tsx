import { Stack, Card, Grid } from '@mui/material';
import { type FC } from 'react';
import homeIcon from '@app/assets/images/home.svg';
import adduserIcon from '@app/assets/images/add-user.svg';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Heading from '@app/components/Heading';
import AuthOption from '@app/components/AuthOption';
import BackButton from '@app/components/BackButton';
import { useNavigate } from 'react-router-dom';

const userTypeNamespace = RouteNames.ONBOARDING;

const OnboardingUserType: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Grid item lg={7} md={10} sm={10} xs={12}>
      <Stack mt={4}>
        <BackButton />
        <Stack mt={4} data-testid="welcome-screen-wrapper">
          <Heading
            title={t(`${userTypeNamespace}.title`)}
            subTitle={t(`${userTypeNamespace}.subtitle`)}
          />
          <Stack mt={6}>
            <Card
              sx={{
                boxSizing: 'border-box',
                borderRadius: '1.6rem'
              }}>
              <AuthOption
                onClick={() => {
                  navigate(`/${RouteNames.INVESTOR_SIGNUP}`);
                }}
                title={t(`${userTypeNamespace}.login_option_title`)}
                subTitle={t(`${userTypeNamespace}.login_option_subtitle`)}
                icon={homeIcon}
                borderType="top"
              />
              <AuthOption
                onClick={() => {
                  navigate(`/${RouteNames.ISSUER_SIGNUP}`);
                }}
                title={t(`${userTypeNamespace}.create_option_title`)}
                subTitle={t(`${userTypeNamespace}.create_option_subtitle`)}
                icon={adduserIcon}
                iconWidth={22}
                borderType="bottom"
              />
            </Card>
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
};

export default OnboardingUserType;
