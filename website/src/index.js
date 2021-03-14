import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppStore from './screens/appStore';
import I18nStore from './I18n/I18nStore';

ReactDOM.render(
  <React.StrictMode>
    <AppStore.AppContextProvider>
      <I18nStore.I18nProvider>
        <App />
      </I18nStore.I18nProvider>
    </AppStore.AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
