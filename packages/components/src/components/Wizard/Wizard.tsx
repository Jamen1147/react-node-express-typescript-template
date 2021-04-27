import { mapChildren, useSteps } from '@template/common';
import React from 'react';
import cx from 'classnames';
import {
  useForm,
  UnpackNestedValue,
  UseFormProps,
  SubmitHandler,
} from 'react-hook-form';
import { Button } from '../Button';
import { WizardContextProvider } from './context';
import WizardStep from './Step';
import styles from './Wizard.module.scss';

export type WizardProps<T> = {
  onSubmit: SubmitHandler<T>;
  formProps?: UseFormProps<T>;
  initialStep?: number;
  prevButton?: React.ReactNode;
  nextButton?: React.ReactNode;
  submitButton?: React.ReactNode;
  formClassName?: string;
  stepsClassName?: string;
  controlsClassName?: string;
};

const Wizard = <T extends Record<string, unknown>>({
  onSubmit,
  formProps,
  initialStep = 0,
  prevButton = 'Prev',
  nextButton = 'Next',
  submitButton = 'Submit',
  formClassName,
  stepsClassName,
  controlsClassName,
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
    formState: { isSubmitting, errors },
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
    <WizardContextProvider value={formState}>
      <form
        onSubmit={handleSubmit<T>(handleFormSubmit)}
        className={cx(styles.form, formClassName)}
      >
        <div className={cx(styles.steps, stepsClassName)}>
          {currentStepElement && (
            <currentStepElement.type
              {...currentStepElement.props}
              formState={formState}
            />
          )}
        </div>

        <div className={cx(styles.controls, controlsClassName)}>
          <Button
            size="small"
            type="button"
            disabled={isFirstStep}
            onClick={prevStep}
          >
            {prevButton}
          </Button>
          <Button
            size="small"
            type="submit"
            loading={isSubmitting}
            disabled={!!Object.keys(errors).length || isSubmitting}
          >
            {isLastStep ? submitButton : nextButton}
          </Button>
        </div>
      </form>
    </WizardContextProvider>
  );
};

Wizard.Step = WizardStep;
export default Wizard;
