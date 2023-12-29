/* eslint-disable no-var */
import { fireEvent, render, screen } from '@testing-library/react';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import {
  type InvestorSignUpStepperContextProps,
  useInvestorSignUpStepper
} from '@app/context/InvestorSignUpStepperContext';
import { type IssuerSignUpStepperContextProps } from '@app/context/IssuerSignUpStepperContext';
import BusinessRevenue from './BusinessRevenue';
import { RevenueRange } from '@app/constants/revenue-range';

const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.BUSINESS_REVENUE);

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

jest.mock(
  '@app/context/InvestorSignUpStepperContext.tsx',
  () =>
    ({
      useInvestorSignUpStepper: () => ({}) as any
    }) as any
);

const initialRender = (
  props: Partial<IssuerSignUpStepperContextProps | InvestorSignUpStepperContextProps> = {}
): void => {
  const defaultProps = useInvestorSignUpStepper();
  render(<BusinessRevenue {...{ ...defaultProps, ...props }} />);
};

describe('BusinessRevenue', () => {
  it('it renders business revenue with options', () => {
    initialRender();

    expect(screen.getByText(en[RouteNames.BUSINESS_REVENUE].title)).toBeInTheDocument();
    RevenueRange.forEach((item) => {
      expect(screen.getByText(item.topic)).toBeInTheDocument();
    });
  });
  it('it should update activeStep when clicked on an item', () => {
    const updateActiveStep = jest.fn();
    const updateUserPayload = jest.fn();
    initialRender({ updateActiveStep, updateUserPayload });

    fireEvent.click(screen.getByText(RevenueRange[0].topic));

    expect(updateActiveStep).toBeCalledTimes(1);
    expect(updateUserPayload).toBeCalledTimes(1);
  });
});
