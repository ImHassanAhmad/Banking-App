import { useTheme } from '@mui/material/styles';
import React, { useRef, useState, type FC, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import { RouteNames } from '@app/constants/routes';
import { EYE_CLOSE_ICON } from '@app/assets/images';
import TextField from '@app/components/Textfield';
import { strengthProgress } from '@app/constants';
import { useTranslation } from 'react-i18next';
import { type ITextFieldProps } from '@app/types/types';
import {
  Box,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  Typography,
  type TextFieldProps
} from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
const translationNamespace = RouteNames.CREATE_PASSWORD;
const PasswordField: FC<ITextFieldProps & TextFieldProps> = ({
  register,
  name,
  error,
  noPopper,
  label,
  ...rest
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [entropy, setEntropy] = useState(0);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [passwordMsg, setPasswordMsg] = useState(
    password.length < 13 ? t(`${translationNamespace}.13_or_more`) : ''
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const calculateEntropy = (inputPassword: string): void => {
    const result = zxcvbn(inputPassword);
    setEntropy(result.score);
  };

  const handleMouseDownPassword: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setShowPassword(true);
  };

  const handleMouseUpPassword: React.MouseEventHandler<HTMLButtonElement> = () => {
    setShowPassword(false);
  };

  const setPasswordMessageBasedOnCriteria = (passwordValue: string): void => {
    const criteria = [
      {
        check: passwordValue.length >= 13,
        message: t(`${translationNamespace}.13_or_more`)
      },
      {
        check: /[a-z]/.test(passwordValue),
        message: t(`${translationNamespace}.at_least_one_small_letter`)
      },
      {
        check: /[A-Z]/.test(passwordValue),
        message: t(`${translationNamespace}.at_least_one_capital_letter`)
      },
      {
        check: /\d/.test(passwordValue),
        message: t(`${translationNamespace}.at_least_one_number`)
      },
      {
        check: /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(passwordValue),
        message: t(`${translationNamespace}.at_least_one_special`)
      }
    ];

    for (const criterion of criteria) {
      if (!criterion.check) {
        setPasswordMsg(criterion.message);
        return; // Exit early on the first failure
      }
    }

    // If we reach this point, the password meets all criteria
    setPasswordMsg('');
  };

  const checkPasswordStrength = (passwordValue: string): void => {
    // const strengthScore =
    //   (hasLetter ? 1 : 0) +
    //   (hasNumber ? 1 : 0) +
    //   (hasSpecialChar ? 1 : 0) +
    //   (isLengthValid ? 1 : 0);

    // Set the strength as a percentage using zxcvbn score
    const newStrength = (entropy / 4) * 100;
    setStrength(passwordMsg ? 1 : newStrength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement & HTMLElement>): void => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    calculateEntropy(newPassword);
    checkPasswordStrength(newPassword);
    setPasswordMessageBasedOnCriteria(newPassword);
  };

  useEffect(() => {
    // Use the useEffect hook to call checkPasswordStrength and setPasswordMessageBasedOnCriteria whenever entropy changes.
    checkPasswordStrength(password);
    setPasswordMessageBasedOnCriteria(password);
  }, [entropy, password]);

  // const renderIcon = (isValid: boolean): React.ReactNode => {
  //   return isValid ? (
  //     <IconButton
  //       sx={{
  //         borderRadius: '50%',
  //         backgroundColor: theme.palette.primary.main,
  //         p: 0.7
  //       }}>
  //       <Box component="img" src={CHECK_ICON} alt="check" />
  //     </IconButton>
  //   ) : (
  //     <Box component="img" src={CROSS_ICON} alt="cross" sx={{ width: 20 }} />
  //   );
  // };

  const style = {
    'input::-ms-reveal, input::-ms-clear': {
      display: 'none'
    }
  };

  const containerRef = useRef();
  const onChangeAttr = register
    ? { onChangeCapture: handlePasswordChange }
    : { onChange: handlePasswordChange, value: password };
  return (
    <Box
      ref={containerRef}
      sx={
        {
          // width: '378px'
        }
      }>
      <GlobalStyles styles={style} />
      <TextField
        name={name}
        type={showPassword ? 'text' : 'password'}
        fullWidth
        label={label}
        register={register}
        onChangeCapture={handlePasswordChange}
        {...onChangeAttr}
        inputProps={{ 'data-testid': 'password-input' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                sx={{ mr: 0.5 }}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                onMouseLeave={handleMouseUpPassword}
                edge="end">
                <Box component="img" src={EYE_CLOSE_ICON} alt="eye" />
              </IconButton>
            </InputAdornment>
          )
        }}
        {...rest}
      />

      {!noPopper && (
        <Stack gap={1}>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              color: strengthProgress[strength]?.color ?? theme.palette.error.main,
              whiteSpace: 'nowrap',
              marginTop: '8px'
            }}>
            <span
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '450',
                marginRight: '2px'
              }}>
              Strength:
            </span>
            {strengthProgress[strength]?.title}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={strength}
            sx={{
              width: '80%',
              borderRadius: '0.5rem',
              '&.MuiLinearProgress-root': {
                backgroundColor: theme.palette.grey[50]
              },
              '& .MuiLinearProgress-bar': {
                backgroundColor: strengthProgress[strength]?.color ?? theme.palette.error.main
              }
            }}
          />
          <Typography fontSize={'12px'} letterSpacing={0.48} height={'36px'}>
            {/* {t(`${translationNamespace}.13_or_more`)} */}
            {passwordMsg}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default PasswordField;
