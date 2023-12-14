export interface IdleTimerWrapperProps {
  onIdle: () => void;
  onPrompt: () => void;
  onActive: () => void;
  idleTime: number;
  promptTime: number;
  crossTab?: boolean;
}
