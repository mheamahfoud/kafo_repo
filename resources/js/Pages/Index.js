import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import {createRoot} from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from '../redux/store';
import moment from 'moment-timezone';
const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

moment.tz.setDefault();

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
 
)
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('app'),
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
