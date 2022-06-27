import { useCallback, useRef } from 'react';

function useDebounce(callBack, delay) {
  const timer = useRef(null);

  const debouncedCallback = useCallback((...args) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callBack(...args);
    }, delay);
  }, [callBack, delay]);

  return debouncedCallback;
}

export default useDebounce;
