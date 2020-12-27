import React, { FC, ReactElement, useState, MouseEvent } from 'react';
import useForm from '../hooks/useForm';
import { http } from '../transfer/httpClient';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';

interface IErrorItem {
  field: string;
  message: string;
}

const useStyles = makeStyles(() => ({
  columnForm: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    maxWidth: '500px',
  },
  textField: {
    marginBottom: '10px',
  },
  vertMargin: {
    margin: '20px 0',
  },
  anchorBlock: {
    display: 'block',
  },
}));

const Login: FC = (): ReactElement => {
  const classes = useStyles();
  const [formLoginType, setFormLoginType] = useState(true);
  const [errorMessages, setErrorMessages] = useState<any>({});

  const submit = async (): Promise<true> => {
    try {
      const res = formLoginType ? await http.userLogin(values) : await http.userRegister(values);
      console.log(res);
      if (res.errors[0]) {
        const errors: Record<string, unknown> = {};
        res.errors.map((item: IErrorItem) => {
          errors[item.field || 'credentials'] = item.message;
        });
        setErrorMessages(errors);
      }
    } catch (err) {
      console.log(err);
    }

    return true;
  };
  const { handleChange, handleSubmit, values } = useForm(submit);

  const handleSwitchType = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setErrorMessages({});
    setFormLoginType(!formLoginType);
  };

  console.log(errorMessages);
  const singleInput = (name: string): ReactElement => (
    <TextField
      error={!!errorMessages[name]}
      key={name}
      name={name}
      label={name}
      type={name === 'password' ? 'password' : ''}
      onChange={handleChange}
      className={classes.textField}
      helperText={errorMessages[name] ? errorMessages[name] : null}
    ></TextField>
  );

  return (
    <>
      <Typography variant="h5" align="center" className={classes.vertMargin}>
        {formLoginType ? 'Sign in' : 'Sign up'}
      </Typography>
      <form noValidate className={classes.columnForm} onSubmit={handleSubmit}>
        {formLoginType
          ? ['username', 'password'].map(singleInput)
          : ['username', 'nick', 'email', 'password'].map(singleInput)}
        {errorMessages.credentials ? <Alert severity="error">{errorMessages.credentials}</Alert> : null}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className={classes.vertMargin}
          endIcon={<InputIcon />}
        >
          Submit
        </Button>
      </form>
      {formLoginType ? (
        <Typography variant="body1" align="center">
          Not having an account yet?
          <a href="#" onClick={handleSwitchType} className={classes.anchorBlock}>
            Register
          </a>
        </Typography>
      ) : (
        <Typography variant="body1" align="center">
          Signed up already?
          <a href="#" onClick={handleSwitchType} className={classes.anchorBlock}>
            Login
          </a>
        </Typography>
      )}
    </>
  );
};

export default Login;
