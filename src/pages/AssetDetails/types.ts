import type { SxProps } from '@mui/material';
import type { FC, ReactNode } from 'react';

export interface ISocialLinkProps {
  Icon: FC<{ sx?: SxProps }>;
}

export interface AccordionContentProps {
  expanded: boolean;
}

export interface IAccordion {
  header: string;
  content: ReactNode;
}
