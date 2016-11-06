import React from 'react';
import ReactDOM from 'react-dom';
import CustomGraphiQL from './custom_graphiql';
import '../node_modules/graphiql/graphiql.css';
import './index.css';

ReactDOM.render(
  <CustomGraphiQL url='http://localhost:3000/graphql' />,
  document.body
);
