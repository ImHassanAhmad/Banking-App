import { type RenderResult, fireEvent, render, screen } from '@testing-library/react';
import AboutServices from './AboutServices';
import { en } from '@app/i18n/translations';

import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';
import { type SetupResult } from './types';

jest.mock('react-router', () => ({
  useNavigate: () => jest.fn()
}));

const mockLanguage = en;
const mockRoutes = RouteNames;
const translation = en['about-our-services'];
const mockTransformation = transformation(mockLanguage, mockRoutes.ABOUT_OUR_SERVICES);

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

const clickCheckboxByLabel = (renderResult: RenderResult, labelText: string): void => {
  const checkboxLabel = renderResult.getByText(labelText);
  const checkbox = checkboxLabel
    ?.closest('label')
    ?.querySelector<HTMLInputElement>('input[type="checkbox"]');

  expect(checkbox).toBeInTheDocument();
  checkbox && fireEvent.click(checkbox);
};

const setup = (): SetupResult => {
  const renderComponent: RenderResult = render(<AboutServices />);

  return {
    ...renderComponent,
    clickCheckboxByLabel: (labelText: string) => {
      clickCheckboxByLabel(renderComponent, labelText);
    }
  };
};

describe('AboutServices', () => {
  it('renders without crash', () => {
    setup();
  });

  it('renders term checkboxes', () => {
    const { getByText } = setup();
    expect(getByText(translation.title)).toBeInTheDocument();
    expect(getByText(translation.subtitle)).toBeInTheDocument();

    expect(screen.getByLabelText(translation.news_promotions)).toBeInTheDocument();
  });

  it('renders links for terms', () => {
    const { getByRole } = setup();

    expect(getByRole('link', { name: translation.terms_conditions })).toHaveAttribute('href', '#');
    expect(getByRole('link', { name: translation.privacy_policy })).toHaveAttribute('href', '#');
  });

  it('disables continue button when no checkboxes checked', () => {
    const { getByRole } = setup();

    expect(getByRole('button', { name: translation.confirm })).toBeDisabled();
  });

  it('enables continue button when Select All checkbox checked', async () => {
    const { getByRole } = setup();

    fireEvent.click(screen.getByText(translation.select_all));

    expect(getByRole('button', { name: translation.confirm })).toBeEnabled();
  });

  it('enables continue button when required checkboxes checked', async () => {
    const { getByRole, clickCheckboxByLabel } = setup();

    clickCheckboxByLabel(translation.visa_card_policy);
    clickCheckboxByLabel(translation.terms_conditions);
    clickCheckboxByLabel(translation.privacy_policy);
    clickCheckboxByLabel(translation.prices_limits);

    expect(getByRole('button', { name: translation.confirm })).toBeEnabled();
  });
});
