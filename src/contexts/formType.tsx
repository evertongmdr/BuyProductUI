import React, { createContext, useState } from "react";

interface FormContextState {
  type: string;
  data: object
}

interface FormContextDispatch {
  setInfoForm(formContextDispatch:FormContextState): void
}

type Props = FormContextState & FormContextDispatch;

const FormContext = createContext<Props>({} as Props);

export const FormProvider: React.FC = ({ children }) => {
  
  const [form, setForm] = useState<FormContextState>({} as FormContextState);

  const setInfoForm = (formContextDispatch:FormContextState) =>{

    setForm(formContextDispatch);
  }

  return (
    <FormContext.Provider value={{ type: form.type, data: form.data, setInfoForm:setInfoForm}}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;

