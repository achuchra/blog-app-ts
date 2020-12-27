import { ChangeEvent, FormEvent, useState } from 'react';

type Inputs = 'username' | 'nick' | 'email' | 'avatar' | 'password';

type TValues =
  | {
      [type in Inputs]: string;
    }
  | Record<string, unknown>;

interface IUseForm {
  handleChange: (event: ChangeEvent) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  values: TValues;
}

const useForm = (callback: () => void): IUseForm => {
  const [values, setValues] = useState<TValues>({});
  //TODO validation
  // const [errors, setErrors] = useState<TValues>({});

  const handleChange = (event: ChangeEvent): void => {
    event.preventDefault();
    const { name, value } = <HTMLInputElement>event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    //TODO validation
    //handling errors here
    callback();
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
