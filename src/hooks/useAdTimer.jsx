import { useEffect, useState } from 'react';

export const useAdTimer = (start) => {
  const [canClose, setCanClose] = useState(false);
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    let interval;

    if (start) {
      setCanClose(false);
      setTimer(5);
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanClose(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [start]);

  return { canClose, timer };
};
