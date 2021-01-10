import { ChangeEvent, FormEvent, useState } from 'react';

const useForm = (callback: () => void): IUseForm => {
  const [values, setValues] = useState<TValues>({});
  const [errors, setErrors] = useState<TErrors>({});
  const [fetching, setFetching] = useState(false);

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

  const hardChange = (data: Array<{ name: Inputs; value: string }>): void => {
    const valuesToSet = { ...values };
    data.map((obj) => {
      const { name, value } = obj;
      valuesToSet[name] = value;
    });

    setValues({
      ...valuesToSet,
    });
  };

  const resetValues = () => {
    setValues({});
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<boolean> => {
    event.preventDefault();
    setFetching(true);
    await callback();
    setFetching(false);

    return true;
  };

  return {
    handleChange,
    handleSubmit,
    hardChange,
    handleErrors,
    fetching,
    errors,
    values,
    resetValues,
  };
};

export default useForm;
