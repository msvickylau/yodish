import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// Hot Module Replacement (HMR) is a tool to reload your application in the browser
if (module.hot) {
  module.hot.accept();
}
