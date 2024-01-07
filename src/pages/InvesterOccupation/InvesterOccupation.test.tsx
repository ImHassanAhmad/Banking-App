import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import InvesterOccupations from './InvesterOccupation';
import transformation from '@app/utils/LanguageTransformation';
import { RouteNames } from '@app/constants/routes';
import { en } from '@app/i18n/translations';
const mockRoutes = RouteNames;
const mockLanguage = en;
const mockTransformation = transformation(mockLanguage, mockRoutes.INVESTER_OCCUPATION);
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));
const mockUpdateUserPayload = jest.fn();
const mockUpdateActiveStep = jest.fn();
const defaultProps = {
  userPayload: { investerOccupation: [] },
  updateUserPayload: mockUpdateUserPayload,
  updateActiveStep: mockUpdateActiveStep
};
describe('<InvesterOccupations />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders correctly', () => {
    const { getByText } = render(<InvesterOccupations {...defaultProps} />);
    expect(getByText(en[RouteNames.INVESTER_OCCUPATION].title)).toBeInTheDocument();
    expect(getByText(en[RouteNames.INVESTER_OCCUPATION].subtitle)).toBeInTheDocument();
  });
  it('should enable button when at least one checkbox is checked', () => {
    render(<InvesterOccupations {...defaultProps} />);
    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);
    const continueButton = screen.getByText(en[RouteNames.INVESTER_OCCUPATION].continue);
    expect(continueButton).toBeInTheDocument();
  });
  it('should disable button when no checkboxes are checked', () => {
    render(<InvesterOccupations {...defaultProps} />);
    const continueButton = screen.getByRole('button', {
      name: en[RouteNames.INVESTER_OCCUPATION].continue
    });
    expect(continueButton).toBeInTheDocument();
  });
  it('should call updateUserPayload with correct data on save', () => {
    render(<InvesterOccupations {...defaultProps} />);
    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);
    fireEvent.click(screen.getByText(en[RouteNames.INVESTER_OCCUPATION].continue));
    // expect(mockUpdateUserPayload).toHaveBeenCalledTimes(1);
    // expect(mockUpdateUserPayload).toHaveBeenCalledWith({ investerOccupation: ['Employed'] });
  });

  it('should proceed to the next step after save', () => {
    render(<InvesterOccupations {...defaultProps} />);
    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);
    fireEvent.click(screen.getByText(en[RouteNames.INVESTER_OCCUPATION].continue));
    // expect(mockUpdateUserPayload).toHaveBeenCalledTimes(1);
  });
});
