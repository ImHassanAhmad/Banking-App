import { type RenderResult, render, waitFor } from '@testing-library/react';
import IdleTimerWrapper from './IdleTimerWrapper';
import { type IdleTimerWrapperProps } from './types';

interface IdleRenderResult extends RenderResult {}

const defaultProps: IdleTimerWrapperProps = {
  onIdle: jest.fn(),
  onPrompt: jest.fn(),
  onActive: jest.fn(),
  idleTime: 5000,
  promptTime: 1000,
  // TODO write test cases for crossTab functionality
  crossTab: false
};

const expectCallbackWithTimeout = async (
  callback: ReturnType<typeof jest.fn>,
  timeout: number
): Promise<void> => {
  await waitFor(
    () => {
      expect(callback).toBeCalledTimes(1);
    },
    {
      timeout
    }
  );
};

describe('IdleTimerWrapper', () => {
  const setup = (props: Partial<IdleTimerWrapperProps>): IdleRenderResult => {
    const result = render(<IdleTimerWrapper {...{ ...defaultProps, ...props }} />);
    return { ...result };
  };

  it('should call onPrompt after given time', async () => {
    const onPrompt = jest.fn();
    const promptTime = 2000;
    setup({ onPrompt, promptTime });
    await expectCallbackWithTimeout(onPrompt, promptTime + 2000);
  });
  it('should call onIdle after given time', async () => {
    const onIdle = jest.fn();
    const idleTime = 2000;
    setup({ onIdle, idleTime });
    await expectCallbackWithTimeout(onIdle, idleTime + 1000);
  });

  it('should call onPrompt before onIdle', async () => {
    const onPrompt = jest.fn();
    const onIdle = jest.fn();
    const promptTime = 1000;
    const idleTime = 2000;
    setup({ onPrompt, promptTime, onIdle, idleTime });
    await expectCallbackWithTimeout(onPrompt, promptTime + 2000);
    await expectCallbackWithTimeout(onIdle, idleTime + 1000);
  });
});
