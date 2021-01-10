type Inputs = 'username' | 'nick' | 'email' | 'avatar' | 'password' | 'title' | 'shortDescription' | 'description';

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

function handleChange(event: ChangeEvent): void;

interface IUseForm {
  handleChange: typeof handleChange;
  hardChange: (data: Array<{ name: Inputs; value: string }>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleErrors: (data: IError[]) => void;
  fetching: boolean;
  errors: TErrors | Record<string, unknown>;
  values: TValues;
  resetValues: () => void;
}
