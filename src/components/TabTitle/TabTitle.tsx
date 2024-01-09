import { type FC } from 'react';
import { Helmet } from 'react-helmet';
import { type TabTitleProps } from './types';

export const TabTitle: FC<TabTitleProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default TabTitle;
