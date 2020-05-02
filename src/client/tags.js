import React, { useState } from 'react'
import ChipInput from 'material-ui-chip-input';

export default function Tags({ value, onChange, ...props }) {
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  const validate = (tag) => {
    if (tag.match(/^([\p{L}\p{N}() ]+)$/u)) {
      setError('');
      return true;
    } else {
      setError(tag ? 'Тэг может содержать буквы, цифры и пробелы' : '');
      return false;
    }
  }

  return (
    <ChipInput
      fullWidth
      fullWidthInput
      label='Тэги'
      blurBehavior='add'
      newChipKeys={[',', ';', '#', 'Enter', 'Tab', 'Escape']}
      value={value}
      inputValue={text}
      helperText={error}
      error={Boolean(error)}
      onBeforeAdd={validate}
      onUpdateInput={(event) => {
        setText(event.target.value)
        if (event.target.value)
          validate(event.target.value)
        else
          setError('')
      }}
      onAdd={(tag) => {
        setText('')
        onChange([...value, tag.split(/ +/).join(' ')])
      }}
      onDelete={(tag, index) => onChange([...value.slice(0, index), ...value.slice(index + 1)])}
      {...props}
    />
  );
}
