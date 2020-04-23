import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function({
  checker,
  error,
  onChange,
  onValidChange,
  onErrorChange,
  ...props
}) {
  if (error && !onErrorChange)
    throw Error('onErrorChange is required for controlled ValidatedTextField');

  const [localErr, setLocalErr] = React.useState('')

  const changed = (event) => {
    onChange && onChange(event.target.value);
    const err =
      event.target.validationMessage ||
      (checker && checker(event.target.value));
    err && onErrorChange && onErrorChange(err);
    err || (onValidChange && onValidChange(err));
    setLocalErr(err);
  }

  return (
    <TextField
      {...props}
      onChange={changed}
      error={Boolean(localErr || error)}
      helperText={localErr || error || ''}
    />
  );
}
