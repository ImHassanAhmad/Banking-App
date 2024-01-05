import { type ReactElement, type FC } from 'react';
import { useSelector } from 'react-redux';
import { onBoardType } from '@app/common/types';
import InvestorSidebar from './InvestorSidebar';
import IssuerSidebar from './IssuerSidebar';

const Sidebar: FC = () => {
  const { userType } = useSelector((state: any) => state.userData);

  const renderSidebar = (): ReactElement => {
    switch (userType) {
      case onBoardType.Investor:
        return <InvestorSidebar />;
      case onBoardType.Issuer:
        return <IssuerSidebar />;
      default:
        return <IssuerSidebar />;
    }
  };

  return renderSidebar();
};

export default Sidebar;
