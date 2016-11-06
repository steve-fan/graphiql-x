import React from 'react';
import fetch from 'isomorphic-fetch';
import GraphiQL from 'graphiql';

class CustomGraphiQL extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: props.url,
      inputVisible: false
    };

    this.fetcher = this.fetcher.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.showUrlInput = this.showUrlInput.bind(this);
    this.saveUrl = this.saveUrl.bind(this);
  }

  fetcher(graphQLParams) {
    return fetch(this.state.url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphQLParams)
    }).then(response => response.json());
  }

  handleUrlChange(event) {
    this.setState({ url: event.target.value });
  }

  showUrlInput() {
    this.setState({ inputVisible: true });
  }

  saveUrl(event) {
    if (event.key === 'Enter') {
      this.setState({ inputVisible: false });
      // introspection requests
      this.refs.graphiql._ensureOfSchema();
    }
  }

  render() {
    const { props } = this;
    return (
      <GraphiQL {...props} fetcher={this.fetcher} ref='graphiql'>
        <GraphiQL.Toolbar>
          { this.state.inputVisible && (
            <input
              className='url-input'
              type='text'
              onKeyPress={this.saveUrl}
              onChange={this.handleUrlChange}
              value={this.state.url}
            />
          )}
          { !this.state.inputVisible && <span className='url-span' onClick={this.showUrlInput}>{this.state.url}</span> }
        </GraphiQL.Toolbar>
      </GraphiQL>
    );
  }
}

CustomGraphiQL.propTypes = {
  url: React.PropTypes.string.isRequired
};

export default CustomGraphiQL;
