import { render, screen, fireEvent } from '@testing-library/react';
import IncomeSourceItem from './IncomeSourceItem';
describe('IncomeSourceItem', () => {
  test('renders with the correct title', () => {
    const title = 'Source of Income';
    render(<IncomeSourceItem title={title} checked={false} onChange={() => {}} />);
    const titleLabel = screen.getByText(title);
    expect(titleLabel).toBeInTheDocument();
  });
  test('is initially unchecked if checked prop is false', () => {
    render(<IncomeSourceItem title="Unchecked Item" checked={false} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });
  test('is initially checked if checked prop is true', () => {
    render(<IncomeSourceItem title="Checked Item" checked={true} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
  test('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    render(<IncomeSourceItem title="Clickable Item" checked={!false} onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
  });
});
