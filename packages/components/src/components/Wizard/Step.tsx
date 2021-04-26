import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';

export type RenderProps<T> = (formState: UseFormReturn<T>) => JSX.Element;

export type WizardStepProps<T> = {
  children: RenderProps<T> | React.ReactNode;
};

const WizardStep = <T extends Record<string, any>>({
  // @ts-ignore, this formState prop coming from wizard container,
  // and should not expect consumer to pass this prop
  formState,
  children,
}: WizardStepProps<T>) => {
  if (typeof children === 'function' && formState) {
    return (children as RenderProps<T>)(formState) as JSX.Element;
  }
  return children as React.ReactElement;
};

WizardStep.displayName = 'WizardStep';
export default WizardStep;
