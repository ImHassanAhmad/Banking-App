import { render, fireEvent, waitFor } from '@testing-library/react';
import SourceOfIncome from './SourceOfIncome';
import { RouteNames } from '@app/constants/routes';
import { en } from '@app/i18n/translations';
import transformation from '@app/utils/LanguageTransformation';
const mockRoutes = RouteNames;
const mockLanguage = en;
const mockTransformation = transformation(mockLanguage, mockRoutes.SOURCE_OF_INCOME);
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

describe('SourceOfIncome component', () => {
  const updateActiveStepMock = jest.fn();
  const updateUserPayloadMock = jest.fn();

  const defaultProps = {
    updateActiveStep: updateActiveStepMock,
    updateUserPayload: updateUserPayloadMock
  };
  test('renders SourceOfIncome component correctly', () => {
    const { getByText } = render(<SourceOfIncome {...defaultProps} />);
    expect(getByText(en[RouteNames.SOURCE_OF_INCOME].title)).toBeInTheDocument();
    expect(getByText(en[RouteNames.SOURCE_OF_INCOME].subtitle)).toBeInTheDocument();
    expect(getByText(en[RouteNames.SOURCE_OF_INCOME].continue)).toBeInTheDocument();
  });

  test('handles save button click correctly', async () => {
    const { getByText } = render(<SourceOfIncome {...defaultProps} />);
    const saveButton = getByText(en[RouteNames.SOURCE_OF_INCOME].continue);
    fireEvent.click(saveButton);
    await waitFor(() => {
      expect(updateActiveStepMock).toHaveBeenCalled();
    });
  });
});
