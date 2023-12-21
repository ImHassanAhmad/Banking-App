import { Stack, Button, CircularProgress } from '@mui/material';
import Heading from '@app/components/Heading';
import { useState, type FC } from 'react';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import PrivacyTerms from '@app/components/PrivacyTerms';
import { NotSupportedModal } from '@app/components/Modals';
import { useAppSelector } from '@app/store/hooks';
import { type CountrySelectOption, type SignUpStepperContextProps } from '@app/common/types';
import { NOT_SUPPORTED_MODES } from '@app/constants';
import CountrySelector from '@app/components/CountrySelector';
import { ALL_COUNTRIES } from '@app/constants/countries';

const translationNamespace = RouteNames.COUNTRY;

const CountrySelect: FC<SignUpStepperContextProps> = ({
  onBoardType,
  updateActiveStep,
  registerUser,
  isLoading,
  userPayload
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [country, setCountry] = useState<CountrySelectOption | undefined>(
    ALL_COUNTRIES
      ? ALL_COUNTRIES[
          ALL_COUNTRIES.findIndex(
            (_: CountrySelectOption) => _.iso2 === userPayload.countryOfIncorporation
          )
        ]
      : undefined
  );

  const {
    supportedCountries: { supportedCountriesOfIncorporation }
  } = useAppSelector((state) => state.userData);
  const submit = (): void => {
    const isExist: boolean = supportedCountriesOfIncorporation.includes(country?.iso2) || true;
    if (!isExist) {
      setOpen(true);
      return;
    }
    registerUser({
      payload: {
        countryOfIncorporation: country?.iso2,
        dryRun: true
      },
      onSuccess: () => {
        updateActiveStep();
      }
    });
  };

  const countrySelectHandler = (value: CountrySelectOption): void => {
    setCountry(value);
  };

  return (
    <Stack mt={4} sx={{ width: '100%' }}>
      <Stack mt={4}>
        <Heading
          title={t(`${translationNamespace}.${onBoardType}_title`)}
          subTitle={t(`${translationNamespace}.${onBoardType}_subtitle`)}
        />
      </Stack>

      <Stack gap={3} mt={3}>
        <CountrySelector
          placeholder={t(`${translationNamespace}.placeholder`)}
          onChange={countrySelectHandler}
          selectedCountry={country}
        />
        <Stack width={'100%'} height={'5.4rem'} alignItems={'center'} justifyContent={'center'}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              sx={{ textTransform: 'uppercase', width: '100%' }}
              disabled={!country?.iso2 || isLoading}
              onClick={submit}>
              {t(`${translationNamespace}.continue`)}
            </Button>
          )}
        </Stack>
        <NotSupportedModal
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
          country={country}
          mode={NOT_SUPPORTED_MODES.country}
        />
        <PrivacyTerms />
      </Stack>
    </Stack>
  );
};

export default CountrySelect;
