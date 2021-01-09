import React, { FC, ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';
import { getKeyValue } from '..//utils/getKeyValue';

interface IProps {
  name: string;
  values: TValues;
  handleChange: typeof handleChange;
  errors?: TErrors | Record<string, unknown>;
  className?: string;
}

const SingleInput: FC<IProps> = ({ name, errors = {}, values, handleChange, className = '' }: IProps): ReactElement => {
  const passwordType = name === 'password' ? 'password' : '';
  const isMultiline = name === 'shortDescription';
  const numOfRows = isMultiline ? '3' : undefined;
  return (
    <TextField
      error={errors.hasOwnProperty(name)}
      key={name}
      name={name}
      label={name}
      type={passwordType}
      multiline={isMultiline}
      value={getKeyValue(name)(values)}
      rows={numOfRows}
      onChange={handleChange}
      className={className}
      helperText={getKeyValue(name)(errors)}
    ></TextField>
  );
};

export default SingleInput;
