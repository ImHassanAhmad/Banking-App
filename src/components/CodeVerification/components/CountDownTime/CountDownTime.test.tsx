import React from 'react';
import { type RenderResult, render, screen } from '@testing-library/react';
import CountDownTime from './CountDownTime';
import { type CountDownTimeProps } from '../../types';

const defaultTimeToInitializeCountDownInSeconds = 59;
const customTimeToInitializeCountDownInSeconds = 30;
const fiveSecondsCountDown = 5;

const defaultProps: CountDownTimeProps = {
  seconds: defaultTimeToInitializeCountDownInSeconds,
  countDownComplete: jest.fn()
};

const setup = (props?: Partial<CountDownTimeProps>): RenderResult => {
  return render(<CountDownTime {...{ ...defaultProps, ...props }} />);
};

describe('CountDownTime component', () => {
  it('renders with the default seconds', () => {
    setup();
    expect(screen.getByText(`00:${defaultTimeToInitializeCountDownInSeconds}`)).toBeInTheDocument();
  });

  it('renders with custom seconds', () => {
    setup({ seconds: customTimeToInitializeCountDownInSeconds });
    expect(screen.getByText(`00:${customTimeToInitializeCountDownInSeconds}`)).toBeInTheDocument();
  });

  it('calls countDownComplete when countdown completes', () => {
    const countDownComplete = jest.fn();
    setup({ seconds: fiveSecondsCountDown });

    // Wait for the countdown to complete (you may need to adjust the timing here)
    setTimeout(() => {
      expect(countDownComplete).toHaveBeenCalled();
    }, 6000); // we are checking after six seconds since assuming the countdown is set to 5 seconds
  });

  it('matches snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});
