import { mapChildren, useSteps } from '@template/common';
import React from 'react';
import {
  useForm,
  UnpackNestedValue,
  UseFormProps,
  SubmitHandler,
} from 'react-hook-form';
import { Button } from '../Button';
import WizardStep from './Step';
import styles from './Wizard.module.scss';

export type WizardProps<T> = {
  onSubmit: SubmitHandler<T>;
  formProps?: UseFormProps<T>;
  initialStep?: number;
};

const Wizard = <T extends Record<string, unknown>>({
  onSubmit,
  formProps,
  initialStep = 0,
  children,
}: React.PropsWithChildren<WizardProps<T>>) => {
  const allWizardSteps = mapChildren(children, (child) => {
    if ((child.type as any).displayName === 'WizardStep') {
      return child;
    }
    return null;
  }).filter(Boolean);

  const {
    currentStep,
    isFirstStep,
    isLastStep,
    prevStep,
    nextStep,
  } = useSteps({ count: allWizardSteps.length, initialStep });

  const formState = useForm<T>(formProps);

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = formState;

  const handleFormSubmit = (
    value: UnpackNestedValue<T>,
    event?: React.BaseSyntheticEvent<object, any, any>
  ) => {
    if (isLastStep) {
      return onSubmit(value, event);
    }

    return nextStep();
  };

  const currentStepElement = allWizardSteps[currentStep];

  // TODO: Add styles

  return (
    <form onSubmit={handleSubmit<T>(handleFormSubmit)}>
      <div className={styles.steps}>
        {currentStepElement && (
          <currentStepElement.type
            {...currentStepElement.props}
            formState={formState}
          />
        )}
      </div>

      <div className={styles.controls}>
        <Button
          size="small"
          type="button"
          disabled={isFirstStep}
          onClick={prevStep}
        >
          Prev
        </Button>
        <Button
          size="small"
          type="submit"
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
        >
          {isLastStep ? 'Submit' : 'Next'}
        </Button>
      </div>
    </form>
  );
};

Wizard.Step = WizardStep;
export default Wizard;
