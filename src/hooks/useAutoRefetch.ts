import { useEffect } from 'react';

function useAutoRefetch<T>(refetchFunction: () => T, interval: number = 15000): () => void {
  let intervalId: number | undefined;

  useEffect(() => {
    intervalId = window.setInterval(refetchFunction, interval);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [refetchFunction, interval]);

  // Return a function to manually stop the interval
  const stopAutoRefetch = (): void => {
    window.clearInterval(intervalId);
  };

  return stopAutoRefetch;
}

export default useAutoRefetch;
