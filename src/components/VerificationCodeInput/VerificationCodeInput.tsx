import React, { useState } from 'react';
import type { VerificationCodeInputProps } from './types';
import { Box, Typography } from '@mui/material';
import { RouteNames } from '@app/constants/routes';
import { useTranslation } from 'react-i18next';
import VerificationCharacterInput from '@app/components/VerificationCharacterInput';

const emailVerifyNamespace = RouteNames.VERIFY_EMAIL;

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  codeCharacterCount = 6,
  onCodeComplete,
  onInputChange,
  disabled,
  isError
}: VerificationCodeInputProps) => {
  const [digits, setDigits] = useState<string[]>(Array(codeCharacterCount).fill(''));
  const { t } = useTranslation();

  const handeOnChange = (value: string, index: number): void => {
    onInputChange();
    digits[index] = value;
    setDigits([...digits]);
    if (digits[digits.length - 1] !== '') {
      onCodeComplete(digits.join(''));
    }
  };

  const onBackSpace = (): void => {
    onInputChange();
    // we start the loop from the end to find the last non-empty index to mark it empty.
    for (let index = digits.length - 1; index >= 0; index--) {
      if (digits[index] !== '') {
        digits[index] = '';
        break;
      }
    }
    setDigits([...digits]);
  };

  const firstEmptyIndex = digits.findIndex((digit) => digit === '');

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.5rem',
          alignSelf: 'stretch'
        }}>
        {digits.map((digit, index) => (
          <VerificationCharacterInput
            key={`verification_character_${index}`}
            index={index}
            digit={digit}
            isActive={
              index === firstEmptyIndex || (digits[index] !== '' && index === digits.length - 1)
            }
            readonly={index !== firstEmptyIndex || disabled}
            onBackSpace={onBackSpace}
            onChange={(value) => {
              handeOnChange(value, index);
            }}
            isError={isError}
          />
        ))}
      </Box>
      {isError && (
        <Typography
          sx={{
            color: '#ED725D'
          }}>
          {t(`${emailVerifyNamespace}.wrong_code`)}
        </Typography>
      )}
    </>
  );
};

export default VerificationCodeInput;
