import * as React from 'react';
import enData from './string-en.json';

const I18nContext = React.createContext();
const {Provider} = I18nContext;

const I18nProvider = ({children}) => {
  const [currentDictionary, setCurrentDictionary] = React.useState(enData);

  const changeDictionray = locale => {
    switch(locale) {
      case 'en':
      default:
        setCurrentDictionary(enData);
        break;
    }
  }
  return (
    <Provider
      value={{
        currentDictionary,
        changeDictionray
      }}>
      {children}
    </Provider>
  );
};

const useI18nContext = () => {
    return React.useContext(I18nContext);
};

export default {I18nProvider, useI18nContext};