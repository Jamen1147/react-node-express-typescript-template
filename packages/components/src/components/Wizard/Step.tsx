import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';

export type RenderProps<T> = (formState: UseFormReturn<T>) => JSX.Element;

export type WizardStepProps<T> = {
  formState: UseFormReturn<T>;
  children: RenderProps<T> | React.ReactNode;
};

const WizardStep = <T extends Record<string, any>>({
  children,
  formState,
}: React.PropsWithChildren<WizardStepProps<T>>) => {
  if (typeof children === 'function' && formState) {
    return (children as RenderProps<T>)(formState);
  }
  return children;
};

WizardStep.displayName = 'WizardStep';
export default WizardStep;
