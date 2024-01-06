import { Stack } from '@mui/material';
import Heading from '@app/components/Heading';
import { useState, type FC } from 'react';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import { type SubmitHandler, useForm, Controller, type FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Textfield from '@app/components/Textfield';
import { type CountrySelectOption, type WithSignUpStepperContextProps } from '@app/common/types';
import { ALL_COUNTRIES } from '@app/constants/countries';
import CountrySelector from '@app/components/CountrySelector';
import { ConfirmationModal, InfoModal } from '@app/components/Modals';
import { ModalNames } from '@app/constants/modals';
import SubmitButton from '@app/components/SubmitButton';

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
  userPayload: { country, city, address1, address2, postalCode }
}) => {
  const { t } = useTranslation();
  const [positionDenied, setPositionDenied] = useState(false);
  const [fieldErrors] = useState<FieldError>();
  const [open, setOpen] = useState<boolean>(false);
  const [countryData, setCountryData] = useState<CountrySelectOption | undefined>(
    ALL_COUNTRIES
      ? ALL_COUNTRIES[
          ALL_COUNTRIES.findIndex((_: CountrySelectOption) => _.iso2 === userPayload.country)
        ]
      : undefined
  );

  const schema = yup
    .object()
    .shape({
      postalCode: yup.string().required('Postal code is a required field'),
      city: yup.string().required('City is a required field'),
      address1: yup.string().required('Address 1 is a required field'),
      address2: yup.string(),
      country: yup.string().required('Country is a required field'),
      longitude: yup.number(),
      latitude: yup.number()
    })
    .required();
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IForm>({
    defaultValues: {
      address1,
      address2,
      city,
      country,
      postalCode
    },
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

  return (
    <Stack mt={4}>
      <Stack>
        <Heading title={t(`${translationNamespace}.title`)} subTitle="" />
      </Stack>
      <Stack gap={3}>
        <form>
          <Stack gap={2}>
            <Controller
              name="country"
              control={control}
              defaultValue={country}
              render={() => (
                <CountrySelector
                  placeholder={t(`${translationNamespace}.placeholder`)}
                  onChange={(value) => {
                    setValue('country', value.iso2);
                    setCountryData(value);
                  }}
                  selectedCountry={countryData}
                />
              )}
            />

            <Textfield
              name="address1"
              label={t(`${translationNamespace}.address1`)}
              register={register}
              defaultValue={address1}
              errorValue={errors?.address1 ?? fieldErrors}
              fullWidth
            />

            <Textfield
              name="address2"
              label={t(`${translationNamespace}.address2`)}
              register={register}
              defaultValue={address2}
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

          <SubmitButton
            title={t(`${translationNamespace}.continue`)}
            disabled={!!Object.keys(errors).length || isLoading}
            isLoading={isLoading}
            sx={{ mt: 4 }}
            onClick={() => {
              setOpen(true);
            }}
            type="button"
          />

          <ConfirmationModal
            open={open}
            leftButtonText={t(`${geoPermissionNamespace}.cancel`)}
            rightButtonText={t(`${geoPermissionNamespace}.OK`)}
            title={t(`${geoPermissionNamespace}.title`)}
            title2={t(`${geoPermissionNamespace}.title2`)}
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
