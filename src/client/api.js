import React from 'react';
import Box from '@material-ui/core/Box';

import Auth from './auth';

const baseUrl = '/api'

async function request(path, requestOptions) {
  return await fetch(new Request(baseUrl + path, requestOptions))
}

const context = React.createContext();
const { Provider, Consumer: ApiConsumer } = context;

class ApiProvider extends React.Component {
  constructor(props) {
    super(props)
    this.authenticatedRequest = this.authenticatedRequest.bind(this)
    this.succeeded = this.succeeded.bind(this)
  }

  authInProgress = false

  queue = []

  state = {
    needAuth: false,
  }

  succeeded() {
    this.authInProgress = false;
    this.setState({needAuth: false})
    for (let handle = this.queue.shift(); handle; handle = this.queue.shift())
      handle.resolve()
  }

  async authenticatedRequest(path, requestOptions) {
    if (this.authInProgress) {
      await new Promise((resolve, reject) => this.queue.push({ resolve, reject }))
      return await this.authenticatedRequest(path, requestOptions);
    } else {
      const results = await request(path, requestOptions);
      if (results.status === 401) {
        if (!this.authInProgress) {
          this.authInProgress = true;
          this.setState({needAuth: true})
        }
        return await this.authenticatedRequest(path, requestOptions);
      }
      return results
    }
  }

  render() {
    return (
      <Box height={1} overflow='hidden'>
        {this.state.needAuth ? (
          <Auth
            API={{request}}
            succeeded={this.succeeded}
          />
        ) : (
          <div/>
        )}
        <Provider value={{request: this.authenticatedRequest}}>
          {this.props.children}
        </Provider>
      </Box>
    );
  }
}

export { ApiProvider, ApiConsumer }
export default context
