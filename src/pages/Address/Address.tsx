import { Stack, Button } from '@mui/material';
import Heading from '@app/components/Heading';
import { useState, type FC } from 'react';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { type SubmitHandler, useForm, type FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Textfield from '@app/components/Textfield';
import { type CountrySelectOption, type WithSignUpStepperContextProps } from '@app/common/types';
import { ALL_COUNTRIES } from '@app/constants/countries';
import CountrySelector from '@app/components/CountrySelector';
import { ConfirmationModal, InfoModal } from '@app/components/Modals';
import { ModalNames } from '@app/constants/modals';

interface IForm {
  postalCode: string;
  city: string;
  address1: string;
  address2?: string;
  country: string;
  longitude?: number;
  latitude?: number;
}

const translationNamespace = RouteNames.ADDRESS;
const geoPermissionNamespace = ModalNames.GEO_PERMISSION;
const geoPermissionDeniedNamespace = ModalNames.GEO_PERMISSION_DENIED;

const Address: FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  registerUser,
  isLoading,
  userPayload,
  userPayload: { postalCode, city, address1, address2 }
}) => {
  const { t } = useTranslation();
  const [positionDenied, setPositionDenied] = useState(false);
  const [fieldErrors] = useState<FieldError>();
  const [open, setOpen] = useState<boolean>(false);
  const [country, setCountry] = useState<CountrySelectOption | undefined>(
    ALL_COUNTRIES
      ? ALL_COUNTRIES[
          ALL_COUNTRIES.findIndex((_: CountrySelectOption) => _.iso2 === userPayload.country)
        ]
      : undefined
  );

  const schema = yup
    .object()
    .shape({
      postalCode: yup.string().required(),
      city: yup.string().required(),
      address1: yup.string().required(),
      address2: yup.string(),
      country: yup.string().required(),
      longitude: yup.number(),
      latitude: yup.number()
    })
    .required();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<IForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IForm> = async (userPayload: IForm) => {
    registerUser({
      payload: {
        ...userPayload,
        dryRun: true
      },
      onSuccess: () => {
        updateActiveStep();
      }
    });
  };

  const getLocationAndSubmitForm = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPositionDenied(false);
          setValue('longitude', position.coords.longitude);
          setValue('latitude', position.coords.latitude);
          setOpen(false);

          void handleSubmit(onSubmit)();
        },
        (error) => {
          console.error(error);
          if (error.code === error.PERMISSION_DENIED) {
            setPositionDenied(true);
            setOpen(false);
          }
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const countrySelectHandler = (value: CountrySelectOption): void => {
    setCountry(value);
    setValue('country', value.iso2);
  };
  return (
    <Stack mt={4}>
      <Stack mt={4}>
        <Heading title={t(`${translationNamespace}.title`)} subTitle="" />
      </Stack>
      <Stack gap={3} mt={3}>
        <form>
          <Stack gap={2}>
            <CountrySelector
              placeholder={t(`${translationNamespace}.placeholder`)}
              onChange={countrySelectHandler}
              selectedCountry={country}
            />

            <Textfield
              name="address1"
              label={t(`${translationNamespace}.address1`)}
              register={register}
              errorValue={errors?.address1 ?? fieldErrors}
              fullWidth
            />

            <Textfield
              name="address2"
              label={t(`${translationNamespace}.address2`)}
              register={register}
              errorValue={errors?.address2 ?? fieldErrors}
              fullWidth
            />

            <Textfield
              name="city"
              label={t(`${translationNamespace}.city`)}
              register={register}
              defaultValue={city}
              errorValue={errors?.city ?? fieldErrors}
              fullWidth
            />

            <Textfield
              name="postalCode"
              label={t(`${translationNamespace}.postal_code`)}
              register={register}
              defaultValue={postalCode}
              errorValue={errors?.postalCode ?? fieldErrors}
              fullWidth
            />
          </Stack>

          <Button
            disabled={!!Object.keys(errors).length}
            sx={{ textTransform: 'uppercase', marginTop: '2rem' }}
            fullWidth
            onClick={() => {
              setOpen(true);
            }}>
            {t(`${translationNamespace}.continue`)}
          </Button>
          <ConfirmationModal
            open={open}
            leftButtonText={t(`${geoPermissionNamespace}.cancel`)}
            rightButtonText={t(`${geoPermissionNamespace}.OK`)}
            title={t(`${geoPermissionNamespace}.title`)}
            subtitle={t(`${geoPermissionNamespace}.subtitle`)}
            rightButtonOnclickHandler={() => {
              getLocationAndSubmitForm();
            }}
            leftButtonOnclickHandler={() => {
              setOpen(false);
            }}
            handleClose={() => {
              setOpen(false);
            }}
          />
        </form>
      </Stack>

      <InfoModal
        open={positionDenied}
        buttonText={t(`${geoPermissionDeniedNamespace}.OK`)}
        title={t(`${geoPermissionDeniedNamespace}.title`)}
        subtitle={t(`${geoPermissionDeniedNamespace}.subtitle`)}
        handleClose={() => {
          setPositionDenied(false);
        }}
      />
    </Stack>
  );
};

export default Address;
