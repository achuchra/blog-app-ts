import React, { FC, ReactElement, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../store/actions/userActions';
import { getKeyValue } from '../utils/getKeyValue';
import { http } from '../transfer/httpClient';
import { RootState } from '../store/reducers';
import { NavLink } from 'react-router-dom';
import useForm from '../hooks/useForm';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SingleInput from '../components/SingleInput';
import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  flexTable: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

    '& > div': {
      width: '100%',
      border: '1px solid #eee',
      padding: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',

      '&:not(:first-child)': {
        borderTop: 'none',
      },
    },
  },
  settingsFormWrapper: {
    width: '100%',

    '& > form': {
      overflow: 'hidden',
      transition: 'max-height 0.4s ease-out',
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto',
      maxWidth: '500px',
    },
  },
  settingsFormClosed: {
    maxHeight: '0',
  },
  settingsForm: {
    maxHeight: '370px',
  },
  textField: {
    marginBottom: '10px',
  },
  vertMargin: {
    margin: '25px 0px 0px',
  },
}));

const Settings: FC = (): ReactElement => {
  const curr = useSelector((state: RootState) => state.currentUser.currentUser) as IFetchedCurrentUser;
  const [formOpen, setFormOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleFormOpen = () => {
    setFormOpen(!formOpen);
  };

  const submit = async (): Promise<boolean> => {
    const valuesToSend = Object.assign({ ...values }, curr);
    console.log(valuesToSend);
    try {
      const res = await http.userUpdate(valuesToSend);
      console.log(res);
      if (!res.errors) {
        handleErrors([]);
        dispatch(getCurrentUser());
      }
      if (res.errors && res.errors[0]) {
        handleErrors(res.errors);
      }
    } catch (err) {
      console.log(err);
    }

    return true;
  };

  const { handleChange, handleSubmit, handleErrors, fetching, errors, values } = useForm(submit);

  const oneInput = (name: string): ReactElement => {
    return <SingleInput name={name} values={values} errors={errors} handleChange={handleChange}></SingleInput>;
  };

  console.log('errs', errors);
  return (
    <>
      <Box mt={2.5}>
        <Typography variant="h5" align="center">
          Hello, {curr.currentUser.nick}
        </Typography>
      </Box>
      <Typography variant="body1" align="center">
        Manage your account
      </Typography>
      <Box mt={3} className={classes.flexTable}>
        <div>
          <Typography variant="body1" align="left">
            Add new article
          </Typography>
          <Button component={NavLink} to="/add-article" variant="contained" color="primary">
            New article
          </Button>
        </div>
        <div>
          <Typography variant="body1" align="left">
            Manage your articles
          </Typography>
          <Button component={NavLink} to="/dashboard" variant="contained" color="primary">
            Dashboard
          </Button>
        </div>
        <div>
          <Typography variant="body1" align="left">
            Change user data
          </Typography>
          <Button onClick={handleFormOpen} variant="contained" color="primary">
            {formOpen ? 'Close settings' : 'Open settings'}
          </Button>
          <div className={classes.settingsFormWrapper}>
            <form action="#" className={formOpen ? classes.settingsForm : classes.settingsFormClosed}>
              <Typography variant="body1" align="center" className={classes.vertMargin}>
                Set either one or multiple new data
              </Typography>
              {['nick', 'email'].map(oneInput)}
              <Typography variant="body1" align="center" className={classes.vertMargin}>
                Fill in your current or new password
              </Typography>
              {['password'].map(oneInput)}
              {errors.hasOwnProperty('invalid') ? (
                <Alert severity="error">{getKeyValue('invalid')(errors)}</Alert>
              ) : null}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                className={classes.vertMargin}
                endIcon={<InputIcon />}
                disabled={fetching}
                onClick={handleSubmit}
              >
                Save new data
              </Button>
              {fetching ? <LinearProgress className={classes.textField} /> : null}
            </form>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Settings;
