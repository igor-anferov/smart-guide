import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CodeMirror from 'react-codemirror';

// eslint-disable-next-line import/no-webpack-loader-syntax
import code from '!raw-loader!./code.tex'

require('codemirror/lib/codemirror.css');
require('codemirror/mode/stex/stex');
require('codemirror/theme/monokai.css');

require('./editor.css')

const styles = theme => ({
  full_height: {
    height: '100%',
  },
});

class LatexEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: code,
    }
  }
  componentDidMount() {
    if (this.props.onChange) {
      this.props.onChange(this.state.code)
    }
  }
  updateCode(newCode) {
    this.setState({
      code: newCode,
    });
  }
  render() {
    const { classes } = this.props
    var options = {
      mode: 'stex',
      theme: 'monokai',
      autofocus: true,
      lineWrapping: true,
      lineNumbers: true,
      tabSize: 4,
      indentUnit: 4,
      readOnly: false,
    };
    return (
      <CodeMirror className={classes.full_height}
        value={this.state.code}
        onChange={(newCode) => {
            this.updateCode(newCode)
            if (this.props.onChange) {
              this.props.onChange(newCode)
            }
          }
        }
        options={options}
      />
    )
  }
}

export default withStyles(styles)(LatexEditor)
