//@ts-nocheck
import React, { FC, ReactElement, useState } from 'react';
import useForm from '../../hooks/useForm';
import { getKeyValue } from '../../utils/getKeyValue';
import { http } from '../../transfer/httpClient';
import { ckEditorConfig } from '../../utils/ckEditorConfig';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';
import './AddArticle.scss';

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

const AddArticle: FC = (): ReactElement => {
  const classes = useStyles();
  const [successActionMessage, setSuccessActionMessage] = useState('');

  const submit = async (): Promise<boolean> => {
    try {
      const res = await http.addArticle(values);
      if (res.errors && res.errors[0]) {
        handleErrors(res.errors);
      }
      if (res.id) {
        handleErrors([]);
        resetValues();
        setSuccessActionMessage('Successfully added new article!');
        setTimeout(() => setSuccessActionMessage(''), 3000);
      }
    } catch (err) {
      console.log(err);
    }
    return true;
  };

  const { handleChange, hardChange, handleSubmit, handleErrors, fetching, errors, values, resetValues } = useForm(
    submit,
  );

  const singleInput = (name: string): ReactElement => {
    const passwordType = name === 'password' ? 'password' : '';
    const isMultiline = name === 'shortDescription';
    const numOfRows = isMultiline ? '3' : undefined;

    return (
      <TextField
        hidden={true}
        error={errors.hasOwnProperty(name)}
        key={name}
        name={name}
        label={name}
        type={passwordType}
        multiline={isMultiline}
        value={getKeyValue(name)(values)}
        rows={numOfRows}
        onChange={handleChange}
        className={classes.textField}
        helperText={getKeyValue(name)(errors)}
      ></TextField>
    );
  };

  const handleCKChange = (event, editor) => {
    const data = editor.getData();
    hardChange({ name: 'description', value: data });
  };

  return (
    <>
      <Typography variant="h5" align="center" className={classes.vertMargin}>
        Add new article
      </Typography>
      <form noValidate className={classes.columnForm} onSubmit={handleSubmit}>
        {['title', 'shortDescription'].map(singleInput)}
        <CKEditor editor={ClassicEditor} onChange={handleCKChange} config={ckEditorConfig} />
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

        {successActionMessage ? (
          <Alert severity="success" className="marginTopBottom">
            {successActionMessage}
          </Alert>
        ) : null}
      </form>
    </>
  );
};

export default AddArticle;
