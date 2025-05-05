import { useState, useEffect, useDebugValue } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // React DevTools-এ উইন্ডো সাইজ দেখানোর জন্য ডিবাগ লেবেল
  useDebugValue(windowSize);

  return windowSize;
}