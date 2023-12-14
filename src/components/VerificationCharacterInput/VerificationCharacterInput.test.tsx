import { type RenderResult, render, screen, fireEvent } from '@testing-library/react';
import VerificationCharacterInput from './VerificationCharacterInput';
import { type VerificationCharacterInputProps } from './types';

type SetupProps = RenderResult & {
  input: HTMLInputElement | undefined | null;
  focusIndicator: HTMLElement | null;
  inputValue: HTMLElement | null;
};

const defaultProps: VerificationCharacterInputProps = {
  digit: '',
  onBackSpace: () => {},
  onChange: (value) => {},
  isActive: false,
  index: 0
};

const setup = (props: Partial<VerificationCharacterInputProps>): SetupProps => {
  const utils = render(<VerificationCharacterInput {...{ ...defaultProps, ...props }} />);

  const input = screen.queryByTestId('verification-character-input')?.querySelector('input');
  const focusIndicator = screen.queryByTestId('verification-input-indicator');
  const inputValue = screen.queryByTestId('verification-character-value');

  /*
    "verification-character-input" is shown when "isActive" is true. "focusIndicator" is also visible when isActive is true.
    in case of "inActive" false we just show a paragraph element witht he value hence the "verification-character-value"
  */
  if (props.isActive) {
    expect(input).toBeInTheDocument();
    expect(inputValue).toBeNull();
    expect(focusIndicator).toBeInTheDocument();
  } else {
    expect(input).toBeUndefined();
    expect(inputValue).toBeInTheDocument();
    expect(focusIndicator).toBeNull();
  }

  return { ...utils, input, focusIndicator, inputValue };
};

// "VerificationCharacterInput" is a controlled component which is being controlled by the "digit" prop
describe('VerificationCharacterInput', () => {
  // ensure paragraph element is shown with the 'digit' value
  test('should show given value in non active state', () => {
    const { inputValue } = setup({
      digit: '1'
    });

    expect(inputValue?.textContent).toBe('1');
  });

  // ensure when 'isActive' is true input value equals 'digit' prop
  test('should show given value in focused state', () => {
    const { input } = setup({
      digit: '1',
      isActive: true
    });

    expect(input?.value).toBe('1');
  });

  // ensure 'onChange' callback is trigged
  test('should call onChange on input change', () => {
    const onChange = jest.fn();
    const { input } = setup({
      onChange,
      isActive: true
    });
    if (!input) throw Error('input has to be in the document');
    fireEvent.change(input, { target: { value: '1' } });
    // ensure onChangeCallback was called
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith('1');
  });

  // ensure onBackspace callbed is called on 'BackSpace'
  test('should call onBackSpace when backspace key is pressed', () => {
    const onBackSpace = jest.fn();
    const { input } = setup({
      onBackSpace,
      isActive: true
    });
    if (!input) throw Error('input has to be in the document');

    // fire backspace key event
    fireEvent.keyDown(input, { key: 'Backspace' });

    // ensure the callback was called
    expect(onBackSpace).toBeCalledTimes(1);
  });
});
