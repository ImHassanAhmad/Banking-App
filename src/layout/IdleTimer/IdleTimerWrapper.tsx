import { type FC, type PropsWithChildren } from 'react';
import { IdleTimerProvider } from 'react-idle-timer';
import { type IdleTimerWrapperProps } from './types';

const IdleTimerWrapper: FC<PropsWithChildren<IdleTimerWrapperProps>> = ({
  children,
  onIdle,
  onPrompt,
  idleTime,
  promptTime,
  onActive,
  crossTab = true
}) => {
  return (
    <IdleTimerProvider
      timeout={idleTime}
      onIdle={onIdle}
      stopOnIdle={true}
      startOnMount={true}
      onPrompt={onPrompt}
      crossTab={crossTab}
      promptBeforeIdle={promptTime}
      onActive={onActive}
      throttle={300}>
      {children}
    </IdleTimerProvider>
  );
};

export default IdleTimerWrapper;
