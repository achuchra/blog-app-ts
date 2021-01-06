type Inputs = 'username' | 'nick' | 'email' | 'avatar' | 'password';

type TValues =
  | {
      [key in Inputs]: string;
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
  hardChange: (data: { name: string; value: string }) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleErrors: (data: IError[]) => void;
  fetching: boolean;
  errors: TErrors | Record<string, unknown>;
  values: TValues;
  resetValues: () => void;
}
