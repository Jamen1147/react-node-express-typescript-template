import { Children, isValidElement, ReactElement } from 'react';

export const mapChildren = <P = any>(
  children: any,
  func: (el: ReactElement<P>, index: number) => any
) => {
  let index = 0;

  return Children.map(children, (child) =>
    isValidElement<P>(child) ? func(child, index++) : child
  );
};

export const forEachChild = <P = any>(
  children: any,
  func: (el: ReactElement<P>, index: number) => void
) => {
  let index = 0;
  Children.forEach(children, (child) => {
    if (isValidElement<P>(child)) func(child, index++);
  });
};
