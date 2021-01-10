//@ts-nocheck
import React, { FC, ReactElement, useState, useEffect } from 'react';
import useForm from '../../hooks/useForm';
import { http } from '../../transfer/httpClient';
import { ckEditorConfig } from '../../utils/ckEditorConfig';
import SingleInput from '../SingleInput';
import { getKeyValue } from '../../utils/getKeyValue';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Button from '@material-ui/core/Button';
import InputIcon from '@material-ui/icons/Input';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';
import './ArticleForm.scss';

interface IProps {
  own?: boolean;
  defaultData?: true | IFetchedArticle;
}

const useStyles = makeStyles(() => ({
  columnForm: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    maxWidth: '800px',
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

const ArticleForm: FC<IProps> = ({ own = false, defaultData = {} }: IProps): ReactElement => {
  const classes = useStyles();
  const [successActionMessage, setSuccessActionMessage] = useState('');

  const submit = async (): Promise<boolean> => {
    try {
      const res =
        own && getKeyValue('id')(defaultData)
          ? await http.updateArticle(getKeyValue('id')(defaultData), values)
          : await http.addArticle(values);
      if (res.errors && res.errors[0]) {
        handleErrors(res.errors);
      }
      if (res.id) {
        handleErrors([]);
        own ? null : resetValues();
        setSuccessActionMessage(own ? "Successfully updated article's data" : 'Successfully added new article!');
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

  useEffect(() => {
    if (defaultData) {
      const { title, shortDescription = '', description = '' } = defaultData;
      hardChange([
        { name: 'title', value: title },
        { name: 'shortDescription', value: shortDescription },
        { name: 'description', value: description },
      ]);
    }
  }, []);

  const handleCKChange = (event, editor) => {
    const data = editor.getData();
    hardChange([{ name: 'description', value: data }]);
  };

  const handleCKReady = (editor) => {
    const desc = getKeyValue('description')(defaultData);
    if (desc) {
      editor.setData(desc);
      hardChange([{ name: 'description', value: desc }]);
    }
  };

  const oneInput = (name: string, idx: number): ReactElement => (
    <SingleInput
      key={idx}
      name={name}
      values={values}
      errors={errors}
      handleChange={handleChange}
      className={classes.textField}
      defaultValue={getKeyValue(name)(defaultData) || null}
    ></SingleInput>
  );

  return (
    <>
      <Typography variant="h5" align="center" className={classes.vertMargin}>
        {own ? 'Edit article data' : 'Add new article'}
      </Typography>
      <form noValidate className={classes.columnForm} onSubmit={handleSubmit}>
        {['title', 'shortDescription'].map(oneInput)}
        <CKEditor editor={ClassicEditor} onChange={handleCKChange} config={ckEditorConfig} onReady={handleCKReady} />
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

export default ArticleForm;
