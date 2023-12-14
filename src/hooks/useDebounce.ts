import { useEffect, useRef, useMemo } from 'react';

interface useDebounceProps {
  callback: () => void;
  waitFor: number;
}

const useDebounce = ({ callback, waitFor }: useDebounceProps): (() => void) => {
  const ref = useRef<() => void>();
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    return (): void => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        ref.current?.();
      }, waitFor);
    };
  }, [waitFor]);

  return debouncedCallback;
};

export default useDebounce;
