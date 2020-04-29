import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Controlled as CodeMirror} from 'react-codemirror2';

require('codemirror/lib/codemirror.css');
require('codemirror/mode/stex/stex');
require('codemirror/theme/monokai.css');

require('./editor.css')

const useStyles = makeStyles(theme => ({
  full_height: {
    height: '100%',
  },
}));

export default function LatexEditor({onChange, ...props}) {
  const classes = useStyles();
  return (
    <CodeMirror
      className={classes.full_height}
      onBeforeChange={(editor, date, value) => onChange(value)}
      options={{
        mode: 'stex',
        theme: 'monokai',
        autofocus: true,
        lineWrapping: true,
        lineNumbers: true,
        tabSize: 4,
        indentUnit: 4,
        readOnly: false,
      }}
      {...props}
    />
  );
}
