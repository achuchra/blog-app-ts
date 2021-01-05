//@ts-nocheck
import React, { FC, ReactElement, useState } from 'react';
import useForm from '../hooks/useForm';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import JoditEditor from 'jodit-react';

import { getKeyValue } from '../utils/getKeyValue';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input';
import Typography from '@material-ui/core/Typography';
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

const AddArticle: FC = (): ReactElement => {
  const classes = useStyles();

  const submit = async (): Promise<boolean> => {
    console.log(values);
    return true;
  };

  const { handleChange, hardChange, handleSubmit, handleErrors, fetching, errors, values } = useForm(submit);

  const singleInput = (name: string): ReactElement => {
    const passwordType = name === 'password' ? 'password' : '';
    const isMultiline = name === 'shortDescription' || name === 'description';
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
        <CKEditor
          editor={ClassicEditor}
          onChange={handleCKChange}
          config={{
            toolbar: [
              'heading',
              '|',
              'bold',
              'italic',
              'blockQuote',
              'link',
              'numberedList',
              'bulletedList',
              'insertTable',
              'tableColumn',
              'tableRow',
              'mergeTableCells',
              'mediaEmbed',
              '|',
              'undo',
              'redo',
            ],
            placeholder: 'Content of your article',
          }}
        />

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
      </form>
    </>
  );
};

export default AddArticle;
