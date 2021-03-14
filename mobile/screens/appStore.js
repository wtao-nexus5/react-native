import * as React from 'react';

const AppContext = React.createContext();
const {Provider} = AppContext;

const AppContextProvider = ({children}) => {
  const [dirty, setDirty] = React.useState(true);
  return (
    <Provider
      value={{
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
