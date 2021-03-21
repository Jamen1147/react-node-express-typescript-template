import * as React from 'react';
import { throttle } from 'lodash';
import styles from '../styles/_breakpoint.module.scss';

export type TBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TOrientation = 'portrait' | 'landscape';
export type TSize = Record<TBreakpoint, number>;

const sizes = Object.keys(styles).reduce<TSize>(
  (acc, size) => ({ ...acc, [size]: +styles[size].replace('px', '') }),
  {} as TSize
);

const getBreakpoint = (width: number) => {
  if (width < +sizes.sm) {
    return 'xs';
  }
  if (width >= +sizes.sm && width < +sizes.md) {
    return 'sm';
  }
  if (width >= +sizes.md && width < +sizes.lg) {
    return 'md';
  }
  if (width >= +sizes.lg && width < +sizes.xl) {
    return 'lg';
  }
  if (width >= +sizes.xl) {
    return 'xl';
  }
  return 'lg';
};

const getOrientation = () => {
  const height = document.body.clientHeight || window.innerHeight;
  const width = document.body.clientWidth || window.innerWidth;
  return height > width ? 'portrait' : 'landscape';
};

const useBreakpoint = (): {
  breakpoint: TBreakpoint;
  orientation: TOrientation;
} => {
  const [breakpoint, setBreakpoint] = React.useState<TBreakpoint>('lg');
  const [orientation, setOrientation] = React.useState<TOrientation>(
    'landscape'
  );

  React.useEffect(() => {
    const refreshBreakpoint = throttle(() => {
      setBreakpoint(
        getBreakpoint(document.body.clientWidth || window.innerWidth)
      );
      setOrientation(getOrientation());
    }, 300);

    window.addEventListener('resize', refreshBreakpoint);
    return () => window.removeEventListener('resize', refreshBreakpoint);
  }, []);

  return {
    breakpoint,
    orientation,
  };
};

export default useBreakpoint;
