import { useEffect, useRef, useState } from "react";

export function usePreviousCancel(value) {
  const [prevValue, setPrevValue] = useState();

  useEffect(() => {
    setPrevValue(value);
  }, [value]);

  return prevValue;
}

export function usePreviousClose(value) {
  const ref = useRef([undefined, undefined]);
  if (ref.current[0] !== value) {
    ref.current = [value, ref.current[0]];
  }
  return ref.current[1];
}
