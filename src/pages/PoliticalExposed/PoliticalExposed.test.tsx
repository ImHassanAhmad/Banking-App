import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PoliticalExposed from './PoliticalExposed';
import * as routes from '@app/constants/routes';
import { BINARY_ANSWER_OPTIONS } from '@app/constants/issuer-onboarding';
import transformation from '@app/utils/LanguageTransformation';
import { en } from '@app/i18n/translations';

const mockRoutes = routes.RouteNames;
const mockLanguage = en;
const mockTransformation = transformation(mockLanguage, mockRoutes.POLITICAL_EXPOSED);
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));
const mockUpdateActiveStep = jest.fn();
const defaultProps = {
  updateActiveStep: mockUpdateActiveStep,
  userPayload: {}
};
describe('PoliticalExposed Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component correctly with Heading, Error Box, and Buttons', () => {
    const { getByText } = render(<PoliticalExposed {...defaultProps} />);
    expect(getByText(en[routes.RouteNames.POLITICAL_EXPOSED].title)).toBeInTheDocument();
    expect(getByText(en[routes.RouteNames.POLITICAL_EXPOSED].subtitle)).toBeInTheDocument();
    expect(getByText(en[routes.RouteNames.POLITICAL_EXPOSED].stateserror)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: BINARY_ANSWER_OPTIONS[0].topic })
    ).toBeInTheDocument();
  });

  it('calls updateActiveStep when any button is clicked', () => {
    render(<PoliticalExposed {...defaultProps} />);

    BINARY_ANSWER_OPTIONS.forEach((option) => {
      fireEvent.click(screen.getByRole('button', { name: option.topic }));
      expect(mockUpdateActiveStep).toHaveBeenCalled();
      jest.clearAllMocks();
    });
  });
  it('renders correct number of buttons based on BINARY_ANSWER_OPTIONS', () => {
    render(<PoliticalExposed {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(BINARY_ANSWER_OPTIONS.length);
    BINARY_ANSWER_OPTIONS.forEach((option, index) => {
      expect(buttons[index]).toHaveTextContent(option.topic);
    });
  });
});
