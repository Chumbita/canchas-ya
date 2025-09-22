import { useState, useEffect } from "react";

export const useTimer = (initialSeconds) => {
  const [time, setTime] = useState(initialSeconds);

  useEffect(() => {
    if (time > 0) {
      const id = setTimeout(() => setTime(t => t - 1), 1000);
      return () => clearTimeout(id);
    }
  }, [time]);

  const reset = (seconds) => setTime(seconds);

  return { time, reset };
};
