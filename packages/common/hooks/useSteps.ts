import React from 'react';

type Props = {
  count?: number;
  initialStep?: number;
};

export const useSteps = (props?: Props) => {
  const initStep = props?.initialStep || 0;
  const stepCount = props?.count || 0;
  const [currentStep, setCurrentStep] = React.useState(initStep);

  const prevStep = React.useCallback(
    () => setCurrentStep((prev) => Math.max(prev - 1, 0)),
    []
  );

  const nextStep = React.useCallback(
    () => setCurrentStep((prev) => Math.min(prev + 1, stepCount - 1)),
    [stepCount]
  );

  return {
    currentStep,
    isLastStep: currentStep === stepCount - 1,
    isFirstStep: currentStep === 0,
    prevStep,
    nextStep,
  };
};
