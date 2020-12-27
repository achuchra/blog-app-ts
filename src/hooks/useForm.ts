import { ChangeEvent, FormEvent, useState } from 'react';

const useForm = (callback: () => void): IUseForm => {
  const [values, setValues] = useState<TValues>({});
  const [errors, setErrors] = useState<TErrors>({});

  const handleErrors = (data: IError[]): void => {
    const errs = {} as Record<string, string>;
    if (data[0]) {
      data.map((item: IError) => {
        errs[item.field || 'invalid'] = item.message;
      });
      setErrors(errs);
    } else setErrors({});
  };

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
    callback();
  };

  return {
    handleChange,
    handleSubmit,
    handleErrors,
    errors,
    values,
  };
};

export default useForm;
