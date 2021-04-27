import React from 'react';
import { UseFormReturn } from 'react-hook-form';

type ContextProps<T> = UseFormReturn<T>;

const createContext = <T>() =>
  React.createContext<ContextProps<T> | null>(null);

const wizardContext = createContext<any>();

export const WizardContextProvider = wizardContext.Provider;

export const useWizard = <T>() => {
  const context = React.useContext(wizardContext);

  if (!context) {
    throw new Error(
      'useWizard should only be used inside <Wizard /> component'
    );
  }

  return context as ContextProps<T>;
};
