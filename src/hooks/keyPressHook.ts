import { useEffect, DependencyList, useCallback } from "react";

// Hook
export function useAcceptedKeyPress(
  callback: Function,
  deps: DependencyList
): void {
  const downHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === "Backspace") {
        callback(key);
      }
      if (key === "Enter") {
        callback(key);
      }

      if (key.match(/^[a-z]/)) {
        callback(key);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback, ...deps]
  );

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [downHandler]);
}
