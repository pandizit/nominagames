import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { sessionService } from 'redux-react-session';
import { BrowserRouter } from 'react-router-dom';

import 'antd/dist/antd.less';
import 'bootstrap/dist/css/bootstrap.min.css';

sessionService.initSessionService(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
