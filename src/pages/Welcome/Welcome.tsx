import { Stack, Card } from '@mui/material';
import { type FC } from 'react';
import homeIcon from '@app/assets/images/home.svg';
import adduserIcon from '@app/assets/images/add-user.svg';
import AuthOption from './components/AuthOption';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import Heading from '@app/components/Heading';

const welcomeNamespace = RouteNames.WELCOME;

const Welcome: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
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
                navigate(`/${RouteNames.INVESTOR_SIGNUP}`);
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
    </>
  );
};

export default Welcome;
