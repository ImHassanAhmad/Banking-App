import { Box, Input, Stack, Typography } from '@mui/material';
import { useState, useRef, useEffect, type FC } from 'react';
import { type VerificationCharacterInputProps } from './types';
import { useTheme } from '@mui/material/styles';

const VerificationCharacterInput: FC<VerificationCharacterInputProps> = ({
  digit,
  isActive,

  onChange,
  readonly,
  onBackSpace,
  isError,
  index
}: VerificationCharacterInputProps) => {
  const [isVisible, setVisibility] = useState(true);

  const ref = useRef<HTMLInputElement>(null);
  const [hasFocus, setHasFocus] = useState(true);

  const theme = useTheme();
  useEffect(() => {
    if (isActive) {
      const timer = setInterval(() => {
        setVisibility(!isVisible);
      }, 350);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isActive, isVisible]);

  useEffect(() => {
    ref.current?.focus();
  }, [ref]);

  return (
    <Box
      data-testid={`verification-character-${index}`}
      sx={{
        width: '3.5rem',
        height: '4rem',
        backgroundColor: '#EBEBEB',
        borderRadius: '0.4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: isError ? '0.5px solid #ED725D' : 'none'
      }}>
      {isActive ? (
        <Stack alignItems={'center'} justifyContent={'center'}>
          <Input
            data-testid="verification-character-input"
            onKeyDown={(e) => {
              if (e.key === 'Backspace') {
                onBackSpace();
              }
            }}
            inputProps={{ maxLength: 1 }}
            ref={ref}
            value={digit}
            onFocus={() => {
              setHasFocus(true);
            }}
            onBlur={() => {
              setHasFocus(false);
            }}
            disableUnderline={true}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            readOnly={readonly}
            autoFocus={isActive}
            sx={{
              width: '1rem',
              height: '2rem',
              paddingTop: '0.4rem',
              caretColor: 'transparent',
              backgroundColor: 'transparent',
              textAlign: 'end'
            }}
          />
          {isActive && hasFocus ? (
            <Box
              data-testid="verification-input-indicator"
              sx={{
                width: '1.15rem',
                backgroundColor: isVisible ? theme.palette.common.black : 'transparent',
                height: '0.17rem'
              }}
            />
          ) : (
            <> </>
          )}
        </Stack>
      ) : (
        <Typography data-testid="verification-character-value">{digit}</Typography>
      )}
    </Box>
  );
};

export default VerificationCharacterInput;
