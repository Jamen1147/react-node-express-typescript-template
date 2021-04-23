import { DependencyList, useEffect, useRef } from 'react';
import { useIsMounted } from './useIsMounted';

export const useMountedEffect = (fn: Function, deps: DependencyList) => {
  const mounted = useIsMounted();
  const cleanup = useRef<Function | undefined>(undefined);

  useEffect(() => {
    if (mounted.current) {
      cleanup.current = fn();
    }
    return () => cleanup.current && cleanup.current();
  }, deps);
};
