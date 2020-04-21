import React from 'react';
import ReactDOM from 'react-dom';
import Box from '@material-ui/core/Box';

class FileUploadButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onClick && this.props.onClick()
    this.input.click()
  }
  render() {
    const {
      forwardedRef,
      children,
      onClick,
      onSuccess,
      onFailure,
      accept,
      ...props
    } = this.props;
    return (
      <li {...props} ref={forwardedRef} onClick={ this.handleClick }>
        <Box display='none'>
          <input ref='input' type="file" accept={accept} onChange={(event) => {
            event.target.files.length && onSuccess && onSuccess(event.target.files[0])
          }} />
        </Box>
        { children }
      </li>
    );
  }
  componentDidMount() {
    this.input = ReactDOM.findDOMNode(this.refs.input)
  }
}
export default React.forwardRef((props, ref) => <FileUploadButton forwardedRef={ref} {...props} />)
