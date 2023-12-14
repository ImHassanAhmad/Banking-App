/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type RenderResult, render, fireEvent } from '@testing-library/react';
import VerificationCodeInput from './VerificationCodeInput';
import { type VerificationCodeInputProps } from './types';
import { en } from '@app/i18n/translations';
import { randomNumber } from '@app/utils/number';

type ElementType<T> = T | null;

type SetupProps = RenderResult & {
  getCharacterParagraph: (index: number) => ElementType<HTMLParagraphElement>;
  getCharacterInput: (index: number) => ElementType<HTMLInputElement>;
  getInputContainer: (index: number) => ElementType<HTMLDivElement>;
};

const defaultProps: VerificationCodeInputProps = {
  onCodeComplete: (code: string) => {},
  onInputChange: () => {}
};

const mockLanguage = en;

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockLanguage
  })
}));

const setup = (props: Partial<VerificationCodeInputProps>): SetupProps => {
  const utils = render(<VerificationCodeInput {...{ ...defaultProps, ...props }} />);

  // To get the container of the individual character input container
  const getInputContainer = (index: number): HTMLDivElement =>
    utils.getByTestId(`verification-character-${index}`) as HTMLDivElement;

  // To get the input element that is when isActive is true
  const getCharacterInput = (index: number): HTMLInputElement | null =>
    getInputContainer(index).querySelector('input');

  // To get the p element that is when isActive is false
  const getCharacterParagraph = (index: number): HTMLParagraphElement | null =>
    getInputContainer(index).querySelector('p');

  return { ...utils, getInputContainer, getCharacterInput, getCharacterParagraph };
};

describe('VerificationCodeInput', () => {
  // Verification Code Input should render 'codeCharacterCount' number of inputs
  test('should render provided number of character inputs', () => {
    // generate a random number
    const random = randomNumber();
    const { getInputContainer } = setup({ codeCharacterCount: random });
    const inputs = [];
    for (let index = 0; index < random; index++) {
      inputs.push(getInputContainer(index));
    }
    // character divs should equal to 'codeCharacterCount'
    expect(inputs.length).toBe(random);
  });

  test('should have focus on first character input', () => {
    const { getCharacterInput } = setup({});
    const input = getCharacterInput(0);
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  test('should focus propogate to next inputs on input change', async () => {
    const random = randomNumber();
    const { getCharacterInput, getCharacterParagraph } = setup({
      codeCharacterCount: random
    });

    const checkFocus = (index: number): void => {
      const input = getCharacterInput(index);
      expect(input).toBeInTheDocument();
      expect(input).toHaveFocus();
    };

    for (let index = 0; index < random; index++) {
      // In case of last input, focus remains on the same and input elment also does not get replaced
      if (index === random - 1) {
        // ensure the focus is on the last character input
        checkFocus(index);
        fireEvent.input(getCharacterInput(index)!, { target: { value: `${index + 1}` } });
        // ensure the character input does not get replaced
        expect(getCharacterInput(index)).toBeInTheDocument();
        expect(getCharacterInput(index)?.value).toBe(`${index + 1}`);
        continue;
      }

      // Check if the focus is on the starting character input
      checkFocus(index);

      // fire the user input value
      fireEvent.input(getCharacterInput(index)!, { target: { value: `${index + 1}` } });
      // ensure that input element should be replaced by 'p'
      expect(getCharacterInput(index)).not.toBeInTheDocument();
      expect(getCharacterParagraph(index)).toBeInTheDocument();
      // ensure 'p' element has the value fired in the input
      expect(getCharacterParagraph(index)?.innerHTML).toBe(`${index + 1}`);
    }
  });

  test('should call onCodeComplete when all code character are added', () => {
    const random = randomNumber();
    const onCodeComplete = jest.fn();
    const { getCharacterInput } = setup({ codeCharacterCount: random, onCodeComplete });
    const inputs = [];
    for (let index = 0; index < random; index++) {
      inputs.push(`${index + 1}`);
      fireEvent.input(getCharacterInput(index)!, { target: { value: `${index + 1}` } });
    }
    expect(onCodeComplete).toBeCalledTimes(1);
    expect(onCodeComplete).toBeCalledWith(inputs.join(''));
  });

  test('should call I when all code character are added', () => {
    const random = randomNumber();
    const onInputChange = jest.fn();
    const { getCharacterInput } = setup({ codeCharacterCount: random, onInputChange });
    for (let index = 0; index < random; index++) {
      fireEvent.input(getCharacterInput(index)!, { target: { value: `1` } });
    }
    expect(onInputChange).toBeCalledTimes(random);
  });
});
