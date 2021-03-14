import * as React from 'react';
import MockFetch from '../mock/MockFetch';
import RestApis from '../apis/RestApis';

const AppContext = React.createContext();
const {Provider} = AppContext;

const AppContextProvider = ({children}) => {
  const [dirty, setDirty] = React.useState(true);
  const restApi = new RestApis(MockFetch, 'https://www.example.com');
  const [showError, setShowError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  return (
    <Provider
      value={{
        restApi,
        dirty,
        setDirty,
        showError, 
        setShowError,
        errorMsg, 
        setErrorMsg
      }}>
      {children}
    </Provider>
  );
};

const useAppContext = () => {
    return React.useContext(AppContext);
  };

export default {AppContextProvider, useAppContext};
