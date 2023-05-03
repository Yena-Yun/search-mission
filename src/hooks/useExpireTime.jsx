import { useState, useEffect } from "react";

export default function useExpireTime() {
  const [sessionStorageCleared, setSessionStorageCleared] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      sessionStorage.clear();
      setSessionStorageCleared(true);
    }, 1 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return sessionStorageCleared;
}
