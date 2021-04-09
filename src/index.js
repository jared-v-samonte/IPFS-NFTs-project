import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App.js';
import * as serviceWorker from './serviceWorker';
import BrowserRouter from 'react-router-dom/BrowserRouter'



const root = document.getElementById('root')

if (root !== null) {
  ReactDOM.render((
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
 ), root)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();