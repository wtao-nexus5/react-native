import * as React from 'react';
import MockFetch from '../mock/MockFetch';
import RestApis from '../apis/RestApis';

const AppContext = React.createContext();
const {Provider} = AppContext;

const AppContextProvider = ({children}) => {
  const [dirty, setDirty] = React.useState(true);
  const restApi = new RestApis(MockFetch, 'https://www.example.com');

  return (
    <Provider
      value={{
        restApi,
        dirty,
        setDirty
      }}>
      {children}
    </Provider>
  );
};

const useAppContext = () => {
    return React.useContext(AppContext);
  };

export default {AppContextProvider, useAppContext};
