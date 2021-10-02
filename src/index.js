import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.scss';
import Store from './redux/Store';
import App from '../src/app/App.js';

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


