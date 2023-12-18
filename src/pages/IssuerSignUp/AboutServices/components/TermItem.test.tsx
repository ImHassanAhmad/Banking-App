import { render, fireEvent, screen } from '@testing-library/react';
import TermItem from './TermItem';
import { en } from '@app/i18n/translations';
import { RouteNames } from '@app/constants/routes';
import transformation from '@app/utils/LanguageTransformation';

const translation = en[RouteNames.ABOUT_OUR_SERVICES];
const mockLanguage = en;
const mockRoutes = RouteNames;
const mockTransformation = transformation(mockLanguage, mockRoutes.ABOUT_OUR_SERVICES);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTransformation[key]
  })
}));

const defaultProps = {
  checked: false,
  onChange: jest.fn()
};

const requiredProps = {
  ...defaultProps,
  linkText: translation.terms_conditions,
  link: 'https://example.com'
};

const optionalProps = {
  ...defaultProps,
  linkText: translation.news_promotions,
  optional: true
};

describe('TermItem', () => {
  it('renders correctly', () => {
    render(<TermItem {...requiredProps} />);
  });

  it('renders required term label correctly', () => {
    const { getByText } = render(<TermItem {...requiredProps} />);
    expect(getByText(translation.terms_conditions)).toBeInTheDocument();
  });

  it('renders Agree text on required term item', () => {
    render(<TermItem {...requiredProps} />);

    const spanElement = screen.getByTestId('terms-agreement');
    expect(spanElement.textContent).toContain(translation.agree);
  });

  it('renders optional term label correctly', () => {
    const { getByText } = render(<TermItem {...optionalProps} />);
    expect(getByText(translation.news_promotions)).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<TermItem {...optionalProps} onChange={onChange} />);
    fireEvent.click(getByLabelText(translation.news_promotions));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
