import React, { FC, ReactElement, useState, MouseEvent } from 'react';
import useForm from '../hooks/useForm';
import { http } from '../transfer/httpClient';
import { getKeyValue } from '../utils/getKeyValue';
import { getCurrentUser } from '../store/actions/userActions';
import { useDispatch } from 'react-redux';

import SingleInput from '../components/SingleInput';
import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';

import { makeStyles } from '@material-ui/core/styles';

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
    margin: '25px 0px 0px',
  },
  anchorBlock: {
    display: 'block',
  },
}));

const Login: FC = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formLoginType, setFormLoginType] = useState(true);
  const [successActionMessage, setSuccessActionMessage] = useState('');

  const submit = async (): Promise<boolean> => {
    try {
      const res = formLoginType ? await http.userLogin(values) : await http.userRegister(values);
      console.log(res);
      if (res.errors && res.errors[0]) {
        handleErrors(res.errors);
      }
      if (res.id) {
        handleErrors([]);
        setSuccessActionMessage(formLoginType ? 'Successfully signed in!' : 'Created an account!');
        setTimeout(() => dispatch(getCurrentUser()), 500);
      }
    } catch (err) {
      console.log(err);
    }
    return true;
  };

  const { handleChange, handleSubmit, handleErrors, fetching, errors, values } = useForm(submit);

  const oneInput = (name: string, index: number): ReactElement => (
    <SingleInput key={index} name={name} values={values} errors={errors} handleChange={handleChange}></SingleInput>
  );

  const handleSwitchType = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    handleErrors([]);
    setFormLoginType(!formLoginType);
  };

  return (
    <>
      <Typography variant="h5" align="center" className={classes.vertMargin}>
        {formLoginType ? 'Sign in' : 'Sign up'}
      </Typography>
      <form noValidate className={classes.columnForm} onSubmit={handleSubmit}>
        {formLoginType
          ? ['username', 'password'].map(oneInput)
          : ['username', 'nick', 'email', 'password'].map(oneInput)}
        {errors.hasOwnProperty('invalid') ? <Alert severity="error">{getKeyValue('invalid')(errors)}</Alert> : null}
        {successActionMessage ? <Alert severity="success">{successActionMessage}</Alert> : null}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className={classes.vertMargin}
          endIcon={<InputIcon />}
          disabled={fetching}
        >
          Submit
        </Button>
        {fetching ? <LinearProgress className={classes.textField} /> : null}
        <Typography variant="body1" align="center" className={classes.vertMargin}>
          {formLoginType ? 'Not having an account yet?' : 'Signed up already?'}
          <a href="#" onClick={handleSwitchType} className={classes.anchorBlock}>
            {formLoginType ? 'Register' : 'Login'}
          </a>
        </Typography>
      </form>
    </>
  );
};

export default Login;
