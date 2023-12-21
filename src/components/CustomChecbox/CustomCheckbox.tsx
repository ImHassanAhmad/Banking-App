import { SvgIcon } from '@mui/material';
import { type FC } from 'react';

const CustomCheckbox: FC = () => {
  return (
    <SvgIcon>
      <svg
        width="24"
        height="24"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="8" fill="#BAFF2A" />
        <rect opacity="0.1" x="0.5" y="0.5" width="23" height="23" rx="7.5" stroke="black" />
        <path d="M16 9L10.5 14L8 11.7273" stroke="black" strokeWidth="2" strokeLinecap="square" />
      </svg>
    </SvgIcon>
  );
};

export default CustomCheckbox;
