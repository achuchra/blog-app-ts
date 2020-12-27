type Inputs = 'username' | 'nick' | 'email' | 'avatar' | 'password';

type TValues =
  | {
      [Inputs: string]: string;
    }
  | Record<string, unknown>;

type TErrors =
  | {
      [key in Inputs]: {
        message: string;
      };
    }
  | Record<string, unknown>;

interface IError {
  field?: Inputs;
  message: string;
}

interface IUseForm {
  handleChange: (event: ChangeEvent) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleErrors: (data: IError[]) => void;
  errors: TErrors | Record<string, unknown>;
  values: TValues;
}
